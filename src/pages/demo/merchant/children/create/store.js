import table from '@/store/table'
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
      editType: 'create',
      createUrl: 'CREATE_MERCHANT'
    },
    form: {
      ...cloneDeep(table.state)
    }
  },
  mutations: {

  },
  actions: {
    openDialog ({state}) {
      state.form.dialogVisible = true
    }
  }
}
export default MergeRecursive(table, store)
