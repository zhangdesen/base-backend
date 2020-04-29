// axios的实例子
import axios from 'axios'
import {
  requestSuccessFunc,
  requestFailFunc,
  responseSuccessFunc,
  responseFailFunc
} from '@/interceptors/ajax'
// 固定配置
const AXIOS_DEFAULT_CONFIG = {
  // sso那边根据此字段判断是否走前后端分离
  headers: {'X-Requested-With': 'XMLHttpRequest'}
}

let axiosInstance = {}

axiosInstance = axios.create(AXIOS_DEFAULT_CONFIG)

// 注入请求拦截
axiosInstance.interceptors.request.use(requestSuccessFunc, requestFailFunc)
// 注入失败拦截
axiosInstance.interceptors.response.use(responseSuccessFunc, responseFailFunc)

export default axiosInstance
