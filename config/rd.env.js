'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
// rd环境项目构建配置
module.exports = merge(prodEnv, {
  NODE_ENV: '"production"',
  BUILD_ENV: '"rd"',
  API_HOST_LIST: {
    // api接口请求地址host配置
  },
  URL_LIST: {
   // 页面通用地址url配置
  }
})
