import { mustRequired, stringLength10, stringLength100 } from '@/config/validate'

const dataFields = [
  {
    prop: 'name',
    label: '品牌名称',
    type: 'text',
    placeholder: '最多输入10个字符',
    rules: [
      mustRequired('请输入品牌名称'),
      stringLength10
    ]
  },
  {
    prop: 'type',
    label: '品牌类型',
    type: 'select',
    source: 'brandType',
    rules: [
      mustRequired('请输入品牌类型')
    ]
  },
  {
    prop: 'images',
    label: '品牌图片',
    type: 'upload',
    rules: [
      mustRequired('请上传品牌图片')
    ]
  },
  {
    prop: 'description',
    label: '品牌描述',
    type: 'textarea',
    placeholder: '最多输入100个字符',
    rules: [
      mustRequired('请输入品牌描述'),
      stringLength100
    ]
  },
  {
    prop: 'remark',
    label: '备注信息',
    type: 'textarea',
    placeholder: '最多输入100个字符',
    rules: [
      stringLength100
    ]
  },
  {
    prop: 'status',
    label: '品牌状态',
    type: 'radio',
    source: 'brandStatus',
    default: 0,
    editShow: false,
    rules: [
      mustRequired('请输入品牌状态')
    ]
  }
]

export default dataFields
