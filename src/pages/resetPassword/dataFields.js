import { mustRequired, passwordValidate } from '@/config/validate'

const dataFields = [
  {
    prop: 'oldPasswordShow',
    label: '旧密码',
    type: 'text',
    width: '360px',
    rules: [
      mustRequired('请输入旧密码'),
      passwordValidate
    ]
  },
  {
    prop: 'newPasswordShow',
    label: '新密码',
    type: 'text',
    width: '360px',
    rules: [
      mustRequired('请输入新密码'),
      passwordValidate
    ]
  },
  {
    prop: 'newPasswordConfirm',
    label: '确认密码',
    type: 'text',
    width: '360px',
    rules: [
      mustRequired('请确认密码'),
      passwordValidate
    ]
  }
]
export default dataFields
