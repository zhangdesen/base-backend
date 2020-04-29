// 封装基础通用函数（简单的通用函数定义）
import moment from 'moment'
import { cloneDeep } from 'lodash'

// 设置页面标题 @param {*} name 标题名称
export function setTitle (name) {
  document.title = name
}

// 解析url
export function param2Obj (url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}

// 对象合并
export function MergeRecursive (obj1, obj2) {
  let obj = cloneDeep(obj1)
  for (var p in obj2) {
    try {
      if (obj2[p].constructor === Object) {
        obj[p] = MergeRecursive(obj[p], obj2[p])
      } else {
        obj[p] = obj2[p]
      }
    } catch (e) {
      obj[p] = obj2[p]
    }
  }
  return obj
}

export const initDate = function (value, format = 'YYYY-MM-DD HH:mm:ss') {
  if (!value) return ''
  return moment(value).format(format)
}
