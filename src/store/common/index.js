import makeApi from '@/plugins/api'

const common = {
  state: {
    me: {}, // 个人信息
    externalSearch: false // 外部系统搜索
  },
  mutations: {
    setMe (state, data) {
      state.me = data
    },
    setExternalSearch (state) {
      // 判断是不是外部打开隐藏菜
      const { href } = location
      href.includes('externalSearch=1') ? state.externalSearch = true : state.externalSearch = false
      // iframe打开
      if (window.top !== window.self) {
        state.externalSearch = true
      }
    }
  },
  actions: {
    async getMe ({commit}) {
      const {data} = await makeApi['GET_ME']()
      commit('setMe', data)
    }
  }
}

export default common
