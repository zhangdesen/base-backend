import makeApi from '@/plugins/api'
import router from '../../router'
import {systemSortKey} from '@/config/system'

const menu = {
  state: {
    /**  系统  ** */
    projectData: [], // 后台的所有系统
    activeName: '', // 当前系统
    /**  菜单  ** */
    menuData: [],
    /**  tab  ** */
    options: [{ name: '首页', path: '/' }], // 当前打开的tabs
    sortOptions: ['/'], // 每次都对tabs排序位置
    currentPath: '/' // 当前路径
  },

  mutations: {
    // 设置系统菜单数据
    setProjectData (state, data) {
      state.projectData = data
      state.activeName = data[0] && data[0].name
      state.menuData = data[0] ? data[0].subMenus : []
    },

    // 改变当前系统
    changeProject (state, name) {
      state.activeName = name
      let currentProject = state.projectData.find(ele => {
        return ele.name === name
      })
      state.menuData = currentProject ? currentProject.subMenus : []
    },

    // 添加tab
    addTab (state, data) {
      state.options.push(data)
      state.currentPath = data.path
    },

    // 删除tab
    tabRemove (state, {path, url}) {
      // 这边会存在问题，编辑查看页面会存在相同的name，但是url会不一样。这种缓存会把编辑这种页面一起缓存
      if (this.state.common.externalSearch) {
        return this.commit('removeIframe', url, {root: true})
      }
      const routes = router.options.routes
      for (let i = 0, len = routes.length; i < len; i++) {
        if (routes[i].path === path.split('?')[0]) {
          this.commit('removeCachePage', routes[i].name, {root: true}) // 移除缓存
          break
        }
      }
      for (let i = 0, len = state.options.length; i < len; i++) {
        if (state.options[i].path === path) {
          state.options.splice(i, 1)
          break
        }
      }
      for (let i = 0, len = state.sortOptions.length; i < len; i++) {
        if (state.sortOptions[i] === path) {
          state.sortOptions.splice(i, 1)
          break
        }
      }
      router.push(state.sortOptions[state.sortOptions.length - 1]) // 跳转到最后一次点击的路径
      this.commit('removeIframe', url, {root: true})
    },

    // 新开tab或点击tab对其位置记录
    sortTab (state, path) {
      if (state.sortOptions.includes(path)) {
        const index = state.sortOptions.indexOf(path)
        state.sortOptions.splice(index, 1)
      }
      state.sortOptions.push(path)
    },

    // 设置当前激活的tab
    setCurrentPath (state, path) {
      state.currentPath = path
    }
  },
  actions: {
    async getProjectData ({commit}, key = systemSortKey) {
      // 外部系统不请求menu接口
      if (this.state.common.externalSearch) {
        return commit('setProjectData', [])
      }
      const {data} = await makeApi['GET_MENU']()
      const isArray = Array.isArray(key)
      data.forEach((item, index) => {
        if (isArray) {
          if (key.includes(item.key)) {
            data.splice(index, 1)
            data.unshift(item)
          }
        } else {
          if (item.key === key) {
            data.splice(index, 1)
            data.unshift(item)
          }
        }
      })
      commit('setProjectData', data)
    }
  }
}

export default menu
