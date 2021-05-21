const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
const rewrites = []
const entries = require('./entries')
const pages = {}
Object.keys(entries).forEach(item => {
  pages[item] = {
    // page 的入口
    entry: 'src/pages/' + item + '/app.js',
    // 模板来源
    template: 'public/index.html',
    // 在 dist/index.html 的输出
    filename: item + '.html',
    chunks: ['chunk-vendors', 'chunk-common', item] 
  }
  rewrites.push({
    // eslint-disable-next-line no-useless-escape
    from: new RegExp('^\/' + (item == 'index' ? '' : item) + '$'),
    to: '/' + item + '.html'
  })
})

module.exports = {
  publicPath: '/',
  filenameHashing: true,
  pages,
  productionSourceMap: false,// 生产环境 sourceMap
	chainWebpack: config => {
		config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()
	},
	devServer: {
		port: 8888,
    hot: true,
    historyApiFallback: {
			rewrites: rewrites
		}
	}
}