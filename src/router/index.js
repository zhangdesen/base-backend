import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import Interceptors from '../interceptors'

let {
  routerBeforeEachFunc,
  routerAfterEachFunc,
  rewriteRouterPushFunc
} = Interceptors

Router.prototype.push = rewriteRouterPushFunc

Vue.use(Router)

const ROUTER_DEFAULT_CONFIG = {
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
}

let routerInstance = new Router({
  ...ROUTER_DEFAULT_CONFIG,
  routes
})

routerInstance.beforeEach(routerBeforeEachFunc)

routerInstance.afterEach(routerAfterEachFunc)

window.router = routerInstance // 为了面包屑效果绑定到window

export default routerInstance

// 异步组件
// 高阶函数
