const cache = {
  state: {
    cacheArr: [],
    iframeArr: [],
    id: 0
  },

  mutations: {
    // 添加
    addCachePage (state, name) {
      if (!state.cacheArr.includes(name)) {
        state.cacheArr.push(name)
      }
    },

    // 移除
    removeCachePage (state, name) {
      for (let i = 0, len = state.cacheArr.length; i < len; i++) {
        if (state.cacheArr[i] === name) {
          state.cacheArr.splice(i, 1)
          break
        }
      }
    },

    addIframe (state, url) {
      if (!(state.iframeArr.some(item => item.url === url))) {
        state.iframeArr.push({url, id: state.id++})
      }
    },

    removeIframe (state, url) {
      state.iframeArr.forEach((item, index) => {
        if (item.url === url) {
          state.iframeArr.splice(index, 1)
        }
      })
    }
  }
}

export default cache
