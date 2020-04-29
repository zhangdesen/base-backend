"use strict";
const merge = require("webpack-merge");
const prodEnv = require("./prod.env");
// 本地开发环境配置
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"', // node环境变量
  BUILD_ENV: '""', // 构建环境变量
  API_HOST_LIST: {
    // api接口请求地址host配置
    mock: '"/mockApi"'
  },
  URL_LIST: {
    // 页面通用地址url配置
  }
});
