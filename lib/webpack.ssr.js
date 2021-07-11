/**
 * 忽略 CSS 和 CSS 预处理器解析、其余和生产阶段一致
 */
const { merge } = require("webpack-merge");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin");
const baseConfig = require("./webpack.base");

const ssrConfig = {
  mode: "production",
  module: {
    rules: [
      { test: /\.css$/, use: "ignore-loader" },
      { test: /\.scss$/, use: "ignore-loader" },
    ],
  },
  plugins: [
    new CssMinimizerWebpackPlugin(),
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: "react",
          entry: "https://unpkg.com/react@17/umd/react.production.min.js",
          global: "React",
        },
        {
          module: "react-dom",
          entry: "https://unpkg.com/react-dom@17/umd/react-dom.production.min.js",
          global: "ReactDOM",
        },
      ],
    }),
  ],
  optimization: {
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        commons: {
          name: "commons",
          chunks: "all",
          minChunks: 2,
        },
      },
    },
  },
};

module.exports = merge(baseConfig, ssrConfig);
