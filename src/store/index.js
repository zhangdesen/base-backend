// 封装Vuex操作
import Vue from 'vue' // get vue
import Vuex from 'vuex' // get vuex

import permission from './permission'
import menu from './menu'
import common from './common'
import cache from './cache'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    menu,
    permission,
    common,
    cache
  }
})

export default store
