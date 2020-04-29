import Vue from 'vue'
import moment from 'moment'

const findObjectById = function (id, list) {
  if (list && list.length) {
    for (let i = 0; i < list.length; i++) {
      let obj = list[i]
      if (obj.id === id) {
        return obj
      }
    }
    return null
  }
}

Vue.filter('date', (value, format) => {
  return moment(value).format(format)
})

Vue.filter('findValue', (id, arr) => {
  const obj = findObjectById(id, arr)
  if (obj) {
    return obj.value ? obj.value : '--'
  }
})

export default Vue
