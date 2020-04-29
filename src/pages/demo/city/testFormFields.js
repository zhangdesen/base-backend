/**
 * Created by zds on 2018/12/18.
 *
 */
import { mustRequired } from '@/config/validate'
const dataFields = [
  {
    prop: 'level',
    label: '区域层级',
    type: 'radio',
    source: 'levelList',
    default: 1,
    rules: [
      mustRequired('请输入区域层级')
    ]
  }
]

export default dataFields
