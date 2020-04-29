"use strict";
const merge = require("webpack-merge");
const devEnv = require("./dev.env");

module.exports = merge(devEnv, {
  NODE_ENV: '"test"',
  BUILD_ENV: '"test"',
  API_HOST_LIST: {
    // api接口请求地址host配置
  },
  URL_LIST: {
    // 页面通用地址url配置
  }
});
