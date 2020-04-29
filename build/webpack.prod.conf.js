'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

// const env = process.env.NODE_ENV === 'testing'
//   ? require('../config/test.env')
//   : require('../config/prod.env')
// const HtmlStringReplace = require('html-string-replace-webpack-plugin')

let envConfig = require('../config/prod.env')
if (process.env.BUILD_ENV == 'rd') {
  config.build = Object.assign({}, config.build, config.buildrd)
  envConfig = require('../config/rd.env')
}
if (process.env.BUILD_ENV == 'qa') {
  config.build = Object.assign({}, config.build, config.buildqa)
  envConfig = require('../config/qa.env')
}
if (process.env.BUILD_ENV == 'pre') {
  config.build = Object.assign({}, config.build, config.buildpre)
  envConfig = require('../config/pre.env')
}
const env = Object.assign({}, envConfig)

const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      // Setting the following option to `false` will not extract CSS from codesplit chunks.
      // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
      // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`,
      // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
      allChunks: true
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'testing'
        ? 'index.html'
        : config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: false
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // new HtmlStringReplace({
    //   enable: true,
    //   patterns: [
    //       {
    //           // eg. 替换css的cdn前缀
    //           match: /href=\"\/([^\"]*\.css)\"/g,
    //           replacement: function (match, $1) {
    //               return 'href=' + CDN_PREFIX + '/' + $1;
    //           }
    //       },
    //       {
    //           // eg. 替换js、img(jpg|png|jpeg|gif|svg)和video(mp4|webm|ogg|mp3|wav|flac|aac)的cdn前缀
    //           match: /src=\"\/([^\"]*)\.(js|jpg|png|jpeg|gif|svg|mp4|webm|ogg|mp3|wav|flac|aac)\"/g,
    //           replacement: 'src=' + CDN_PREFIX + '/$1.$2'
    //       }
    //   ]
    // }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks (module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    // This instance extracts shared chunks from code splitted chunks and bundles them
    // in a separate chunk, similar to the vendor chunk
    // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 3
    }),

    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

if (process.config.PrerenderSPA == true) {
  try {
    const PrerenderSPAPlugin = require('prerender-spa-plugin')
    const Renderer = PrerenderSPAPlugin.PuppeteerRenderer
    const prerenderSPAPluginRoutes = config.build.prerenderSPAPluginRoutes
    //  PrerenderSPAPlugin 预渲染配置
    webpackConfig.plugins.push(
      new PrerenderSPAPlugin({
        staticDir: path.join(__dirname, '../dist'),
        routes: prerenderSPAPluginRoutes,
        renderer: new Renderer({
          headless: true,
          maxConcurrentRoutes: 1
        })
      })
    )
    console.log('SPA预渲染路由', prerenderSPAPluginRoutes)
  } catch (error) {
    console.log('SPA预渲染开启失败', "Cannot find module 'prerender-spa-plugin' , You can run 'npm install prerender-spa-plugin@3.4.0 --save'")
  }
}

module.exports = webpackConfig
