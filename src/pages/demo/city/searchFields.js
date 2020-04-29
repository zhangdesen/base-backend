/**
 * Created by zds on 2018/12/18.
 */
const dataFields = [
  {
    prop: 'name',
    label: '名称',
    type: 'text'
  },
  {
    prop: 'level',
    label: '区域层级',
    type: 'select',
    source: 'levelList',
    default: 1
  },
  {
    prop: 'adcode',
    label: '区域编码',
    type: 'number'
  }
]

export default dataFields
