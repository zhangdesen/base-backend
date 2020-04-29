import { mustRequired, mustNumber, NumberLength15 } from '@/config/validate'
const dataFields = [
  {
    prop: 'parentAdcode',
    label: '父级区域编码',
    type: 'int',
    rules: [
      mustRequired('请输入父级区域编码'),
      mustNumber,
      NumberLength15
    ]
  },
  {
    prop: 'parentName',
    label: '父级区域名称',
    type: 'text',
    createDisabled: true,
    editDisabled: true
  }
]

export default dataFields
