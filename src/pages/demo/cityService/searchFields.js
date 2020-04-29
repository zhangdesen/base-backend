
const dataFields = [
  {
    prop: 'cityName',
    label: '名称',
    type: 'text'
  },
  {
    prop: 'cityLevel',
    label: '城市级别',
    type: 'select',
    source: 'cityLevel'
  },
  {
    prop: 'adcode',
    label: '区域编码',
    type: 'number'
  },
  {
    prop: 'status',
    label: '开通状态',
    type: 'select',
    source: 'cityStatus'
  }
]

export default dataFields
