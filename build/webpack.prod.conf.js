const path = require('path')
const webpack = require('webpack')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const {merge} = require('webpack-merge')
const baseConf = require('./webpack.base.conf')

const prodConfig = {
  mode: 'production',
  devtool: 'none',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, '../dist/')
  },
  plugins: [
    new CleanWebpackPlugin({
      root: path.resolve(__dirname, '../dist'),
      dry: false // 启用删除文件
    }),
    // new CopyWebpackPlugin({
    //   patterns: [{
    //     from: path.resolve(__dirname, '../public'),
    //     to: '../dist'
    //   }]
    // }),
    new webpack.DefinePlugin({
    	'process.env.NODE_ENV': JSON.stringify('production')
    }), // 在非nodejs环境中定义环境进行相应的区分
    new webpack.HashedModuleIdsPlugin() // 模块标识符，不添加本地依赖时，hash值和vendor文件不发生改变
  ],
  optimization: {
    splitChunks: {
      chunks: "async",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
      default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: false,
          name: '99'
        }
      }
    }
  }
}
module.exports = merge(baseConf, prodConfig)
