import Vue from 'vue'
import moment from 'moment'

const findObjectById = function (id, list, defaultProp) {
  if (list && list.length) {
    for (let i = 0; i < list.length; i++) {
      let obj = list[i]
      if (obj[defaultProp.id] === id) {
        return obj
      }
    }
    return null
  }
}

Vue.filter('date', (value, format) => {
  return moment(value).format(format)
})

Vue.filter('findValue', (id, arr, defaultProp = {id: 'id', value: 'value'}) => {
  const obj = findObjectById(id, arr, defaultProp)
  if (obj) {
    return obj[defaultProp.value] ? obj[defaultProp.value] : '--'
  }
})

export default Vue
