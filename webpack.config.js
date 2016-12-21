'use strict'
const webpack           = require('webpack');
const path              = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const BUILD_DIR         = path.resolve(__dirname, 'dist');
const APP_DIR           = path.resolve(__dirname, 'src');


module.exports = {
  entry: `${APP_DIR}/index.js`,
  output: {
    path: BUILD_DIR,
    filename: '/js/[name].js',
  },
  cache: true,
  debug: true,
  devtool: 'eval-source-map',
  stats: {
    colors: true,
    reasons: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Quotinerary2',
      xhtml: true,
      inject: false,
      template: require('html-webpack-template'),
      appMountId: 'root-container',
            scripts: [
        "/socket.io/socket.io.js"
      ]
    }),
    new ExtractTextPlugin('/css/[name].css', {
      allChunks: true
    }),
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     'CLIENT_ID': JSON.stringify('9debd6d8d3c9644df10d'),
    //     'CLIENT_SECRET': JSON.stringify('e9bb5e577bdcc6b30c1bad26a095c627ebd2688d'),
    //   }
    // })
  ],

  module : {
    include: path.join(__dirname, 'src'),
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.(svg|gif|png|jpg)$/,
        loader: 'file-loader?name=/img/[name].[hash:base64:5].[ext]'
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel'
      },
      {
        test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader?name=/fonts/[name].[ext]'
      }
    ]
  }
};
