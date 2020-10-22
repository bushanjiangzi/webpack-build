module.exports = [
  {
    title: '主页',
    name: 'index',
    outputPath: 'index',
    entryFile: './src/views/index/index.js',
    template: '../src/views/index/index.html'
  },
  {
    title: '登录',
    name: 'login',
    outputPath: 'login',
    entryFile: './src/views/login/login.js',
    template: '../src/views/login/index.html'
  },
  {
    title: '个人中心',
    name: 'center',
    outputPath: 'center',
    entryFile: './src/views/center/center.js',
    template: '../src/views/center/index.html'
  }
]
