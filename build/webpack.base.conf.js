const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const pages = require('../config/router.js')

const entryObj = function () {
  let obj = {}
  pages.forEach((item) =>{
    obj[item.name] = item.entryFile
  })
  return obj
}

const htmlPluginArr = pages.map((item) => {
  let outputPath = ''
  switch (process.env.NODE_ENV) {
    case 'test':
      outputPath = path.resolve(__dirname, '../dist-test/' + item.outputPath + '.html')
      break
    case 'production':
      outputPath = path.resolve(__dirname, '../dist/' + item.outputPath + '.html')
      break
    case 'development':
      outputPath = path.resolve(__dirname, '../dist/' + item.outputPath + '.html')
      break
  }
  return new HtmlWebpackPlugin({
    title: item.title,
    filename: outputPath,
    // template: item.name === 'index' ? path.resolve(__dirname, '../public/index.html') : path.resolve(__dirname, '../config/template.html'),
    template: path.resolve(__dirname, item.template),
    hash: true,
    chunks: [item.name],
    favicon: path.resolve(__dirname, '../public/favicon.ico')
  })
})

let toPath = ''
switch (process.env.NODE_ENV) {
  case 'production':
    toPath = path.resolve(__dirname, '../dist/public')
    break
  case 'development':
    toPath = path.resolve(__dirname, '../dist/public')
    break
  case 'test':
    toPath = path.resolve(__dirname, '../dist-test/public')
    break
}
module.exports = {
  entry: entryObj(),
  plugins: htmlPluginArr.concat([new CompressionWebpackPlugin({
    filename: '[name].gz[query]',
    algorithm: 'gzip',
    test: /\.js$|\.css$/,
    threshold: 10240,
    minRatio: 0.8,
    deleteOriginalAssets: false
  }), new CopyWebpackPlugin({
    patterns: [{
      from: path.resolve(__dirname, '../public'),
      to: toPath
    }]
  })]),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src/')
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader' // 将js字符串生成为style节点
          },
          {
            loader: 'css-loader', // 将css转换为CommonJS模块
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader', // 将sass文件转换为css
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: './image'
          }
        }]
      },
      {
        test: /\.(js)$/,
        exclude: /(node_modules)/, // 排除文件
        loader: 'babel-loader'
      }
    ]
  },
  performance: {
    hints: false,
    maxEntrypointSize: 2048000,
    maxAssetSize: 2048000
  }
}