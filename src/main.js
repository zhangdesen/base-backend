/* eslint-disable func-call-spacing */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { install as plugins } from './plugins'
import Element from 'element-ui'
import Watermark from './plugins/watermark'
import './utils/globalComponent'
import './utils/globalDirectives'
import './utils/globalFilters'

import './style/reset.scss'
import 'font-awesome/css/font-awesome.min.css'
import 'element-ui/lib/theme-chalk/index.css'

import './style/element-ui.scss'
import './style/element-variables.scss'

(async () => {
  plugins.install(Vue) // 安装全局函数
  Vue.use(Element)
  Vue.config.productionTip = false
  const { Loading } = Element
  let loadingInstance = Loading.service({ fullscreen: true })

  store.commit('setExternalSearch')
  await store.dispatch('getMe')
  await store.dispatch('getProjectData')

  loadingInstance.close()

  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    components: {
      App
    },
    template: '<App/>',
    created () {
      if (!this.$store.state.common.externalSearch) { Watermark.set(store.state.common.me.name) }
      // iframe页面刷新
      if (this.$route.path === '/iframe') {
        this.$store.commit('addIframe', this.$route.query.url)
      }
    }
  })
})()
