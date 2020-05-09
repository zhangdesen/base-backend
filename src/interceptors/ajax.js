import { Message } from 'element-ui'
import qs from 'qs'

export function requestSuccessFunc (requestObj) {
  // 自定义请求拦截逻辑，可以处理权限，请求发送监控等
  if (requestObj.method === 'get') {
    requestObj.params = {
      ...requestObj.params,
      _t: new Date().getTime()
    }
  } else if (requestObj.method === 'post' && requestObj.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
    requestObj.data = qs.stringify(requestObj.data, { allowDots: true })
  }
  return requestObj
}

export function requestFailFunc (requestError) {
  // 自定义发送请求失败逻辑，断网，请求发送监控等
  return Promise.reject(requestError)
}

export function responseSuccessFunc (responseObj) {
  // 自定义响应成功逻辑，全局拦截接口，根据不同业务做不同处理，响应成功监控等
  // ...
  // 假设我们请求体为
  // {
  // errCode
  // errMsg
  // success
  // data
  // }
  const resData = responseObj.data
  const { code, data } = resData
  switch (code) {
    case 0: // 如果业务成功，直接进成功回调
      return resData
    case 1001:
      // 如果业务失败，根据不同 code 做不同处理
      // 授权过期或未授权跳登录
      // 特定弹窗
      // 跳转特定页面...  location.href = xxx
      // 如果情况够多，也可以有一个专门的handleError来处理
      return
    case 302:
      Message({
        message: resData.message,
        type: 'error',
        duration: 2000,
        onClose: () => {
          location.href = `${process.env.API_HOST_LIST.sso}/login?redirectUrl=${encodeURIComponent(location.href)}`
        }
      })
      return Promise.reject(new Error('no login'))
    case -1:
      // 业务中还会有一些特殊 code 逻辑，我们可以在这里做统一处理，也可以下放它们到业务层
      let message = resData.message
      if (Array.isArray(data)) {
        message = data.join('，')
      }
      Message.error(message)
      return Promise.reject(new Error('error conde'))
    default:
      return resData
  }
}

export function responseFailFunc (responseError) {
  // 响应失败，可根据 responseError.message 和 responseError.response.status 来做监控处理
  Message({
    message: responseError,
    type: 'error',
    duration: 5000
  })
  return Promise.reject(responseError)
}
