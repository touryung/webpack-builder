const path = require("path");
const rimraf = require("rimraf");
const webpack = require("webpack");

const Mocha = require("mocha");
const mocha = new Mocha({
  timeout: "10000ms",
});

// 切换工作目录到模板
process.chdir(path.join(__dirname, "../template"));
const prodConfig = require("../../lib/webpack.prod");

rimraf("./dist", () => {
  webpack(prodConfig, (err, stats) => {
    if (err) {
      console.error(err);
      process.exit(2);
    }
    console.log(
      stats.toString({
        colors: true,
        modules: false,
        children: false,
      })
    );

    console.log("🚀 构建成功，开始测试 🚀");

    mocha.addFile(path.join(__dirname, "html.test.js"));
    mocha.addFile(path.join(__dirname, "css-js.test.js"));
    mocha.run();
  });
});
