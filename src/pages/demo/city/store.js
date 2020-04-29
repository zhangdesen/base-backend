import table from '@/store/table'
import { cloneDeep } from 'lodash'
import { MergeRecursive } from '@/utils/fun'

const store = {
  namespaced: true,
  // namespace: 'city',
  state: {
    initUrl: 'MDDS_AREA_INIT',
    baseUrl: 'MDDS_AREA_PAGE',
    searchObject: {
      level: 1
    },
    loadDataParams: {
      level: 1
    },
    form: {
      ...cloneDeep(table.state),
      createUrl: 'MDDS_AREA_ADD',
      editUrl: 'MDDS_AREA_UPDATE',
      baseUrl: 'COMMON_AREA_CITYIES_BY_SKUIDS',
      filters: {
        skuIds: 21081,
        listType: 1,
        pageSize: 50
      }
    },
    testForm: {
      ...cloneDeep(table.state)
    }
  },
  mutations: {
  },
  actions: {
    tableSearch ({state, dispatch}, data) {
      state.loadDataParams = { pageNo: 1 }
      dispatch('loadData', data.searchData)
    },
    async editTable ({commit, dispatch}, data) {
      await dispatch('loadFirstPage', 'form')
      commit('editTable', data)
    },
    openTestForm ({state}, data) {
      const newState = state.testForm
      newState.dialogVisible = true
    }
  }
}
export default MergeRecursive(table, store)
