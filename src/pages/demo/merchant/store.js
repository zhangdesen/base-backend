import table from '@/store/table'
import { MergeRecursive } from '@/utils/fun'

const store = {
  namespaced: true,
  state: {
    initUrl: 'MDDS_MERCHANT_INIT',
    baseUrl: 'MDDS_MERCHANT_PAGE',
    selectSource: {
      statusList: [
        {
          id: 0,
          value: '禁用'
        },
        {
          id: 1,
          value: '启用'
        }
      ]
    }
  },
  mutations: {

  },
  actions: {
    createForm ({ commit }) {
      commit('openNewTab', '/ops/merchant/create')
    }
  }
}
export default MergeRecursive(table, store)
