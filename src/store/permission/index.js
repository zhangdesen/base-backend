import makeApi from '@/plugins/api'
const permission = {
  state: {

  },
  mutations: {
    setPermission (state, {path, data}) {
      state[path] = data
    }
  },
  actions: {
    async getPermission ({commit}, { payload: { params, path, success } }) {
      const {data} = await makeApi['GET_PERMISSION']({params: {permissions: params.join(',')}})
      commit('setPermission', {path, data})
      success(data)
    }
  }
}

export default permission
