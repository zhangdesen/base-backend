// 路由存放
import demo from './demo'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: resolve => require(['@/pages/home'], resolve),
    meta: {
      title: '首页', // 页面标题
      keepAlive: true // 是否缓存页面
    }
  },
  {
    path: '/iframe',
    name: 'Iframe',
    meta: {
      title: '新页面', // 页面标题
      keepAlive: true // 是否缓存页面
    }
  },
  {
    path: '/notPermission',
    component: resolve => require(['@/pages/notPermission'], resolve),
    name: 'NotPermisson',
    meta: {
      title: '权限不足',
      keepAlive: true
    }
  },
  ...demo,
  {
    path: '*',
    redirect: '/'
  }
]

export default routes
