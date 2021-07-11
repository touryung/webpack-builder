/**
 * ES6、CSS、Scss、图片、字体解析
 * CSS 前缀补齐、CSS px 转 rem、CSS 提取到单文件
 * 目录清理、多页面打包、错误捕获和处理、命令行日志优化
 */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const glob = require("glob");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const FriedlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const projectRoot = process.cwd();

const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  const entryFiles = glob.sync(path.join(projectRoot, "./src/**/index.js"));
  entryFiles.forEach((pathStr) => {
    const match = pathStr.match(/src\/(.*)\/index\.js/);
    const pageName = match?.[1];
    entry[pageName] = pathStr;
    htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        template: path.join(projectRoot, `./src/${pageName}/index.html`),
        filename: `${pageName}.html`,
        chunks: ["vendors", "commons", pageName],
        minify: {
          html: true,
          minifyJS: true,
          minifyCSS: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
        },
      })
    );
  });

  return {
    entry,
    htmlWebpackPlugins,
  };
};
const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
  entry,
  output: {
    path: path.join(projectRoot, "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
          "postcss-loader",
          {
            loader: "px2rem-loader",
            options: {
              remUnit: 75,
              remProcision: 8,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10240,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: "file-loader",
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new FriedlyErrorsWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: "[name].css" }),
    ...htmlWebpackPlugins,
    function errorPlugin() {
      // 错误捕获
      this.hooks.done.tap("done", (stats) => {
        if (stats.compilation.errors && stats.compilation.errors.length > 0 && process.argv.indexOf("--watch") === -1) {
          console.log("🚧 构建期间错误捕获"); // eslint-disable-line
          process.exit(1);
        }
      });
    },
  ],
  stats: "errors-only",
};
