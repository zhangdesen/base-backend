import { mustRequired, mustNumber } from '@/config/validate'

const dataFields = [
  {
    prop: 'country',
    label: '选择国家',
    type: 'select',
    source: 'country',
    editDisabled: true,
    defaultProps: {
      id: 'adcode',
      value: 'name'
    },
    rules: [
      mustRequired('请选择国家')
    ]
  },
  {
    prop: 'countryAdcode',
    label: '区域编码',
    type: 'text',
    createDisabled: true,
    editDisabled: true,
    rules: [
      mustNumber
    ]
  },
  {
    prop: 'province',
    label: '选择省份',
    type: 'select',
    source: 'province',
    editDisabled: true,
    defaultProps: {
      id: 'adcode',
      value: 'name'
    },
    rules: [
      mustRequired('请选择省份')
    ]
  },
  {
    prop: 'provinceAdcode',
    label: '区域编码',
    type: 'text',
    createDisabled: true,
    editDisabled: true,
    rules: [
      mustNumber
    ]
  },
  {
    prop: 'cityName',
    label: '选择城市',
    type: 'select',
    source: 'cityName',
    defaultProps: {
      id: 'adcode',
      value: 'name'
    },
    editDisabled: true,
    rules: [
      mustRequired('请选择城市')
    ]
  },
  {
    prop: 'adcode',
    label: '区域编码',
    type: 'text',
    createDisabled: true,
    editDisabled: true,
    rules: [
      mustNumber
    ]
  },
  {
    prop: 'cityCode',
    label: '城市代码',
    type: 'text',
    rules: [
      mustRequired('请填写城市代码')
    ]
  },
  {
    prop: 'telCode',
    label: '电话区号',
    type: 'text',
    rules: [
      mustRequired('请填写电话区号')
    ]
  },
  {
    prop: 'position',
    label: '排序',
    type: 'text',
    rules: [
      mustNumber
    ]
  },
  {
    prop: 'cityLevel',
    label: '城市级别',
    type: 'radio',
    source: 'cityLevel',
    default: 1,
    rules: [
      mustRequired('请选择城市级别')
    ]
  },
  {
    prop: 'status',
    label: '开通状态',
    type: 'radio',
    source: 'cityStatus',
    default: 0,
    editShow: false,
    rules: [
      mustRequired('请选择开通状态')
    ]
  }
]

export default dataFields
