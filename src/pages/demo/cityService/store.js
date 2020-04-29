import table from '@/store/table'
import { cloneDeep } from 'lodash'
import { MergeRecursive } from '@/utils/fun'

const store = {
  namespaced: true,
  state: {
    initUrl: 'MDDS_CITY_SERVICE_INIT',
    baseUrl: 'MDDS_CITY_SERVICE_LIST',
    switchUrl: 'MDDS_CITY_SERVICE_UPDATE_STATUS',
    confirmUrl: 'MDDS_CITY_SERVICE_UPDATE_STATUS',
    selectSource: {
      country: [],
      province: [],
      cityName: []
    },
    form: {
      ...cloneDeep(table.state),
      createUrl: 'MDDS_CITY_SERVICE_CREATE',
      editUrl: 'MDDS_CITY_SERVICE_UPDATE'
    }
  },
  mutations: {
  },
  actions: {

  }
}

export default MergeRecursive(table, store)
