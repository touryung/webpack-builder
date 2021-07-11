/**
 * 代码压缩、基础资源提取、公共资源提取、文件指纹
 * HTML 由 HtmlWebpackPlugin 压缩，JS 由 webpack 压缩
 */
const { merge } = require("webpack-merge");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const baseConfig = require("./webpack.base");

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name]_[chunkhash:8].js",
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10240,
              name: "[name]_[hash:8].[ext]",
            },
          },
        ],
      },
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
    new MiniCssExtractPlugin({ filename: "[name]_[contenthash:8].css" }),
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

module.exports = merge(baseConfig, prodConfig);
