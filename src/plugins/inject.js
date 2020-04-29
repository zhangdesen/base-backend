import api from './api'
import _ from 'lodash'
window.makeApi = api
export default {
  install: (Vue, options) => {
    // 需要挂载的都放在这里
    Vue.prototype.$http = api
    Vue.prototype.$lodash = _
  }
}
