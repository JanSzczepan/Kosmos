const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const env = process.env.NODE_ENV;

module.exports = {
  entry: './app/index.js',

  mode: env,

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: env == 'development' ? '/' : './',
    assetModuleFilename: './images/[name][ext][query]',
  },

  devServer: {
    static: [
      {
        directory: path.join(__dirname, 'public'),
        watch: true,
      }
    ],
    port: 3500,
    open: true,
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          env == 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: "asset/resource"
      },
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({template: './app/index.html'}),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new CopyPlugin({
      patterns: [
        { from: "app/public/images", to: "images" },
      ],
    }),
  ]
};
