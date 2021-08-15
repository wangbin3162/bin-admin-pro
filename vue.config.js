// 配置路径别名
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // 配置基础链接地址，根据发布环境添加
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  // dev跨域问题
  devServer: {
    port: '8090',
    open: true
    // proxy: {
    //   '/admin': { target: 'http://localhost:8088/cms' }
    // }
  },
  outputDir: 'docs',
  productionSourceMap: false,
  lintOnSave: process.env.NODE_ENV !== 'production',
  assetsDir: 'static',
  filenameHashing: true, // 发布打包文件是否有哈希后缀
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
    if (process.env.NODE_ENV === 'production') {
      config.optimization.splitChunks({
        cacheGroups: {
          common: {
            name: 'chunk-common',
            chunks: 'all',
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 1,
            reuseExistingChunk: true
          },
          vendors: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            priority: 2,
            reuseExistingChunk: true,
            enforce: true
          },
          BinUINext: {
            name: 'chunk-bin-ui-next',
            test: /[\\/]node_modules[\\/]bin-ui-next[\\/]/,
            chunks: 'all',
            priority: 3,
            reuseExistingChunk: true,
            enforce: true
          },
          echarts: {
            name: 'chunk-echarts',
            test: /[\\/]node_modules[\\/]echarts[\\/]/,
            chunks: 'all',
            priority: 3,
            reuseExistingChunk: true,
            enforce: true
          },
          brace: {
            name: 'chunk-brace',
            test: /[\\/]node_modules[\\/]brace[\\/]/,
            chunks: 'all',
            priority: 3,
            reuseExistingChunk: true,
            enforce: true
          }
        }
      })
    }
  }
}
