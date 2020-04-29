'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production' //node环境变量
process.env.BUILD_ENV = 'release' //构建环境变量
process.config.PrerenderSPA = false //是否开启spa预渲染

const process_argv = process.argv.splice(2)
const build_env_argv =  process_argv[0]
const buildpage_env_argv =  process_argv[1]
console.log("正在构建["+build_env_argv+"]环境")
if(build_env_argv == "rd"){
  process.env.BUILD_ENV = 'rd'
}
if(build_env_argv == "qa"){
  process.env.BUILD_ENV = 'qa'
}
if(build_env_argv == "pre"){
  process.env.BUILD_ENV = 'pre'
}
if(buildpage_env_argv == 'buildpage'){
  process.config.PrerenderSPA = true //开启SPA预渲染
  console.log("开启SPA预渲染")
}

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
// rd环境构建使用特别配置
if(process.env.BUILD_ENV == "rd"){
  config.build = Object.assign({},config.build,config.buildrd)
}
// qa环境构建使用特别配置
if(process.env.BUILD_ENV == "qa"){
  config.build = Object.assign({},config.build,config.buildqa)
}
// pre环境构建使用特别配置
if(process.env.BUILD_ENV == "pre"){
  config.build = Object.assign({},config.build,config.buildpre)
}

const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('building for production...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
