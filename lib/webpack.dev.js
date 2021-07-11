/**
 * 热更新、SourceMap
 */
const path = require("path");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base");

const projectRoot = process.cwd();

const devConfig = {
  mode: "development",
  devServer: {
    contentBase: path.join(projectRoot, "dist"),
    hot: true,
    stats: "errors-only",
  },
  devtool: "source-map",
};

module.exports = merge(baseConfig, devConfig);
