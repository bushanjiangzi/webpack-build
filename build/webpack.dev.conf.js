const {merge} = require('webpack-merge')
const path = require('path')
const baseConfig = require('./webpack.base.conf')

const devConf = {
  mode: 'development',
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, '../dist')
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, "../dist"),
    compress: true,
    host: '10.10.9.5',
    port: 1024,
    hot: true,
    open: true,
    proxy: {
      // '/api/saas/': 'http://10.10.9.26:8090/' // 测试服务器
    }
  }
}

module.exports = merge(baseConfig, devConf)
