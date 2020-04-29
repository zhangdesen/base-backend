import Router from 'vue-router'
import {setTitle, param2Obj} from '../utils/fun.js' // 简单的通用函数
import store from '../store'
import qs from 'qs'
import router from '../router'
import {systemKey} from '@/config/system'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({showSpinner: false})

function routeNext (to, from, next) {
  const meta = to.meta
  const path = to.path
  if (meta.title) {
    setTitle(`${systemKey}-${meta.title}`)
  } else {
    setTitle('后台管理系统')
  }
  // 提示权限不足
  if (meta.enterPermission && store.state.permission[path] && !(meta.enterPermission.every(elem => store.state.permission[path].indexOf(elem) > -1))) {
    return next({path: '/notPermission'})
  }

  // 添加tab
  if (path !== '/' && !store.state.menu.options.some(item => { return to.fullPath === item.path })) {
    const name = to.query.title ? to.query.title : meta.title
    store.commit('addTab', { name: name, path: to.fullPath })
  } else {
    store.commit('setCurrentPath', to.fullPath)
  }
  // 对tab进行跟踪记录顺序
  store.commit('sortTab', to.fullPath)
  // 默认添加缓存,需要记得在page上加入name
  if (meta.keepAlive !== false) {
    store.commit('addCachePage', to.name)
  }
  next()
}

// 路由钩子函数(进入页面之前、前置)
export function routerBeforeEachFunc (to, from, next) {
  // 这里可以做页面拦截，在这里面做权限处理（可以做登录验证等等进入页面之前的权限验证）
  NProgress.start()
  const meta = to.meta
  const path = to.path

  // 存在权限且权限未加载过
  if (meta && meta.enterPermission && !store.state.permission[path]) {
    store.dispatch({
      type: 'getPermission',
      payload: {
        params: meta.pagePermission,
        path,
        success: () => {
          routeNext(to, from, next)
        }
      }
    })
  } else {
    routeNext(to, from, next) // 必须要执行的；进行管道中的下一个钩子；可加参数定义操作
  }
}

// 路由钩子函数(进入页面之后、后置)
export function routerAfterEachFunc (to, from) {
  // 可以做进入页面之后的初始化操作
  NProgress.done()
}

// 重写下push方法，以便兼容iframe页面
const routerPush = Router.prototype.push
export function rewriteRouterPushFunc (data) {
  if (typeof data === 'object' && data.path === '/iframe') {
    store.commit('addIframe', data.query.url)
  }
  if (window.top !== window.self) {
    data.query = {
      ...data.query,
      parentStore: this.currentRoute.fullPath,
      parentId: param2Obj(location.href).parentId || window.name.split('_')[1] || null
    }
    const searchParams = qs.stringify(data ? data.query : '')
    let defaultTitle
    router.options.routes.forEach((item) => {
      if (item.path === data.path) {
        defaultTitle = item.meta.title
      }
    })
    const signal = {
      functionName: 'openTabPage',
      arguments: [
        {
          url: location.origin + data.path + '?' + searchParams,
          text: data.query && data.query.title ? data.query.title : defaultTitle || '',
          hasMaster: true
        }
      ]
    }
    // console.log('发送跨域消息：[' + window.location.href + '] ' + JSON.stringify(signal))
    return window.parent.postMessage(signal, '*')
  }
  return routerPush.call(this, data)
}
