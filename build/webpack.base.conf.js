const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

let outputHtml = ''

switch (process.env.NODE_ENV) {
  case 'production':
    outputHtml = '../dist/index.html'
    break
  case 'development':
    outputHtml = '../dist/index.html'
    break
  case 'test':
    outputHtml = '../dist-test/index.html'
    break
}
module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      filename: path.resolve(__dirname, outputHtml)
    })
  ],
  resolve: {
    // alias: {
    //   '@': path.resolve(__dirname, '../src/')
    // },
    extensions: ['.js']
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