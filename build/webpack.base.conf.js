const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const pages = require('../config/index.js')

const entryObj = function () {
  let obj = {}
  pages.forEach((item) =>{
    obj[item.name] = item.entryFile
  })
  obj.main = './src/main.js'
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
    template: path.resolve(__dirname, '../config/template.html'),
    hash: true,
    chunks: [item.name]
  })
})

let maintHtml = ''
switch (process.env.NODE_ENV) {
  case 'production':
    maintHtml = '../dist/index.html'
    break
  case 'development':
    maintHtml = '../dist/index.html'
    break
  case 'test':
    maintHtml = '../dist-test/index.html'
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
  })]),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src/')
    }
  },
  module: {
    rules: [
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