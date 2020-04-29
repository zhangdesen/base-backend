
const iframe = {

  methods: {

    callFunction (signal) {
      let functionName = signal.functionName
      let args = []
      if (signal.arguments) {
        if (Array.isArray(signal.arguments)) {
          args = signal.arguments
        } else {
          args.push(signal.arguments)
        }
      }
      this[functionName](args)
    },

    openTabPage (args) {
      if (Array.isArray(args)) { // 兼容接收消息过来是数组
        args = args[0]
      }
      this.$store.commit('addIframe', args.url)
      this.$router.push({
        path: '/iframe',
        query: {
          title: args.text,
          url: args.url
        }
      })
    },

    closeActiveTabPage () {
      this.$store.commit('tabRemove', {path: this.$route.fullPath, url: this.$route.query.url})
    },

    emitParent (args) {
      if (Array.isArray(args)) { // 兼容接收消息过来是数组
        args = args[0]
      }
      const { actionName, parentId, data = {} } = args
      if (parentId) {
        return window.parent.frames[`iframe_${parentId}`].store.dispatch(actionName, data)
      }
      // 调用页面方法
      this.$store.dispatch(actionName, data)
    }

  },
  created () {
    window.addEventListener('message', (e) => {
      let signal = e.data
      if (signal && signal.functionName) {
        // console.log('接收跨域消息：[' + window.location.href + '] ' + JSON.stringify(signal))
        if (signal.arguments[0] && typeof signal.arguments[0] === 'object') {
          signal.arguments[0].sourceIframe = e.source
        }
        this.callFunction(signal)
      }
    }, false)
  }
}

export default iframe
