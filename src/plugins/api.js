import apis from '@/service/apis'
import axios from './ajax'
const makeApi = apis => {
  const res = {}
  Object.keys(apis).forEach(item => {
    const api = apis[item]
    Object.defineProperty(res, `${api.name}`, {
      value (params) {
        return axios({
          ...api,
          ...params
        })
      },
      enumerable: true,
      writable: false
    })
  })
  return res
}
export default makeApi(apis)
