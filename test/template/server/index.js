if (typeof self === "undefined") {
  global.self = {};
}

const express = require("express");
const path = require("path");
const fs = require("fs");

const SSR = require("../dist/index-server");
const { renderToString } = require("react-dom/server");

// 替换的模板和初始数据
const template = fs.readFileSync(path.join(__dirname, "../dist/index.html"), "utf8");
const initialData = require("./data.json");

// 返回要渲染的 html 字符串
const renderMarkUp = (html) => {
  const initialDataStr = JSON.stringify(initialData);
  return template
    .replace("<!--HTML_PLACEHOLDER-->", html)
    .replace("<!-- INITIAL_DATA_PLACEHOLDER -->", `<script>window.__initial_data=${initialDataStr}</script>`);
};

// 服务器
const server = (port) => {
  const app = express();

  app.use(express.static(path.join(__dirname, "dist")));

  app.get("/index", (_, res) => {
    const html = renderMarkUp(renderToString(SSR));
    res.status(200).send(html);
  });

  app.listen(port, () => {
    console.log("app is listening on http://localhost:" + port + "/index");
  });
};

server(process.env.PORT || 3000);
