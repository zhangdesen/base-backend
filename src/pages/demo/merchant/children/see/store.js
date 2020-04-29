import table from '@/store/table'
import makeApi from '@/plugins/api'
import { cloneDeep } from 'lodash'
import { MergeRecursive } from '@/utils/fun'

const store = {
  namespaced: true,
  state: {
    initUrl: 'MDDS_MERCHANT_INIT',
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
    },
    complexForm: {
      ...cloneDeep(table.state),
      editType: 'see',
      createUrl: 'CREATE_MERCHANT'
    }
  },
  mutations: {
    updateRuleForm (state, data) {
      state.complexForm.ruleForm = data
    }
  },
  actions: {
    async getMerchant ({commit}, id) {
      const { data } = await makeApi['GET_MERCHANT']({params: {id}})
      commit('updateRuleForm', data)
    }
  }
}
export default MergeRecursive(table, store)
