import table from '@/store/table'
import { cloneDeep } from 'lodash'
import { MergeRecursive } from '@/utils/fun'

const store = {
  namespaced: true,
  // namespace: 'city',
  state: {
    initUrl: 'GDS_BRAND_INIT',
    baseUrl: 'GDS_BRAND_LIST',
    switchUrl: 'GDS_BRAND_UPDATEBRAND_STATUS',
    confirmUrl: 'GDS_SPU_EVICTDIRECTIONCACHE',
    form: {
      ...cloneDeep(table.state)
    },
    test: {
      ...cloneDeep(table.state),
      createUrl: 'GDS_BRAND_CREATEBRAND',
      editUrl: 'GDS_BRAND_UPDATEBRAND'
    }
  },
  mutations: {
  },
  actions: {

  }
}
export default MergeRecursive(table, store)
