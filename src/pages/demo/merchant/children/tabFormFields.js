import {
  mustRequired,
  stringLength5,
  stringLength20,
  stringLength50,
  requiredEmail,
  mobileTest,
  idCardTest
} from '@/config/validate'

const dataFields = [
  {
    title: '基本信息',
    children: [
      {
        prop: 'type',
        label: '商户类型',
        type: 'select',
        source: 'merchantTypeList',
        editDisabled: true,
        rules: [
          mustRequired('请选择商户类型')
        ]
      },
      {
        prop: 'name',
        label: '商户名称',
        type: 'text',
        placeholder: '最多输入20个字符',
        rules: [
          mustRequired('请输入商户名称'),
          stringLength20
        ]
      },
      {
        prop: 'companyName',
        label: '公司名称',
        type: 'text',
        editDisabled: true,
        placeholder: '最多输入20个字符',
        rules: [
          mustRequired('请输入公司名称'),
          stringLength20
        ]
      },
      {
        prop: 'licencePicFront',
        label: '营业执照图片',
        type: 'upload',
        editDisabled: true,
        rules: [
          mustRequired('请上传营业执照图片')
        ],
        children: [
          {
            prop: 'licencePicFront',
            label: '正面',
            rules: [
              mustRequired('请上传营业执照正面')
            ]
          },
          {
            prop: 'licencePicReverse',
            label: '反面',
            rules: [
              mustRequired('请上传营业执照反面')
            ]
          }
        ]
      },
      {
        prop: 'licenceNo',
        label: '营业执照号码',
        type: 'number',
        editDisabled: true,
        rules: [
          mustRequired('请输入营业执照号码')
        ]
      },
      {
        prop: 'registerAddress',
        label: '公司注册地址',
        type: 'text',
        editDisabled: true,
        rules: [
          mustRequired('请输入公司注册地址'),
          stringLength50
        ]
      },
      {
        prop: 'currentAddress',
        label: '公司实际地址',
        type: 'text',
        editDisabled: true,
        rules: [
          mustRequired('请输入公司实际地址'),
          stringLength50
        ]
      },
      {
        prop: 'legalPerson',
        label: '法人名字',
        type: 'text',
        editDisabled: true,
        rules: [
          mustRequired('请输入法人名字'),
          stringLength5
        ]
      }
    ]
  },
  {
    title: '联系人信息',
    children: [
      {
        prop: 'contactName',
        label: '联系人姓名',
        type: 'text',
        editDisabled: true,
        rules: [
          mustRequired('请输入联系人姓名'),
          stringLength5
        ]
      },
      {
        prop: 'contactIdentity',
        label: '联系人身份证号码',
        type: 'text',
        editDisabled: true,
        rules: [
          mustRequired('请输入联系人身份证号码'),
          idCardTest
        ]
      },
      {
        prop: 'contactAddress',
        label: '联系地址',
        type: 'text',
        editDisabled: true,
        rules: [
          mustRequired('请输入联系地址'),
          stringLength50
        ]
      },
      {
        prop: 'contactPhone',
        label: '手机号',
        type: 'number',
        editDisabled: true,
        rules: [
          mustRequired('请输入手机号'),
          mobileTest
        ]
      },
      {
        prop: 'mail',
        label: '邮箱',
        type: 'text',
        editDisabled: true,
        rules: [
          mustRequired('请输入邮箱'),
          requiredEmail
        ]
      },
      {
        prop: 'status',
        label: '商户状态',
        type: 'radio',
        source: 'statusList',
        default: 1,
        editDisabled: true,
        rules: [
          mustRequired('请选择商户状态')
        ]
      },
      {
        prop: 'allowedRefund',
        label: '允许用户自助退款',
        type: 'radio',
        source: 'invoicingAllowedEnumList',
        default: 0,
        rules: [
          mustRequired('请选择允许用户自助退款')
        ]
      }
    ]
  },
  {
    title: '设置',
    children: [
      {
        prop: 'invoicingAllowed',
        label: '是否允许开设发票',
        type: 'select',
        source: 'invoicingAllowedEnumList',
        editDisabled: true,
        rules: [
          mustRequired('请选择是否允许开设发票')
        ]
      }
    ]
  }
]

export default dataFields
