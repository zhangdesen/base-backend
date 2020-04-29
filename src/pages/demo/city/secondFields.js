import { mustRequired, NumberLength15, stringLength20 } from '@/config/validate'
const dataFields = [
  {
    prop: 'name',
    label: '地理区域名称',
    type: 'text',
    rules: [
      mustRequired('请输入地理区域名称'),
      stringLength20
    ]
  },
  {
    prop: 'adcode',
    label: '地理区域编码',
    type: 'int',
    rules: [
      mustRequired('请输入地理区域编码'),
      NumberLength15
    ]
  }
]

export default dataFields
