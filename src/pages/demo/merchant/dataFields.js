import { th } from '@/config'

const dataFields = [
  {
    prop: 'action',
    label: '操作',
    width: '160px',
    action: {
      props: ['scopeData'],
      template: `<div>
      <quark-button @click="see" plain>查看</quark-button>
      <quark-button @click="edit">编辑</quark-button>
      </div>`,
      methods: {
        edit () {
          this.$emit('action', {
            actionName: 'openNewTab',
            row: {
              path: '/ops/merchant/edit',
              query: {
                title: this.scopeData.row.name,
                id: this.scopeData.row.id
              }
            }
          })
        },
        see () {
          this.$emit('action', {
            actionName: 'openNewTab',
            row: {
              path: '/ops/merchant/see',
              query: {
                title: this.scopeData.row.name,
                id: this.scopeData.row.id
              }
            }
          })
        }
      }
    }
  },
  {
    prop: 'id',
    label: '商户ID',
    type: 'text',
    width: '60px'
  },
  {
    prop: 'name',
    label: '商户名称',
    type: 'text',
    width: '150px'
  },
  {
    prop: 'companyName',
    label: '公司名称',
    type: 'text',
    width: '150px'
  },
  {
    prop: 'type',
    label: '商户类型',
    width: '120px',
    render: {
      props: ['scopeData', 'selectSource'],
      template: `<div>{{this.scopeData.row.type | findValue(selectSource.merchantTypeList)}}</div>`
    }
  },
  {
    prop: 'invoicingAllowed',
    label: '是否允许开设发票',
    width: '150px',
    render: {
      props: ['scopeData', 'selectSource'],
      template: `<div>{{this.scopeData.row.invoicingAllowed | findValue(selectSource.invoicingAllowedEnumList)}}</div>`
    }
  },
  {
    prop: 'allowedRefund',
    label: '允许用户自助退款',
    width: '120px',
    render: {
      props: ['scopeData', 'selectSource'],
      template: `<div>{{this.scopeData.row.allowedRefund | findValue(selectSource.invoicingAllowedEnumList)}}</div>`
    }
  },
  {
    prop: 'status',
    label: '商户状态',
    width: '120px',
    render: {
      props: ['scopeData', 'selectSource'],
      template: `<div>{{this.scopeData.row.status | findValue(selectSource.statusList)}}</div>`
    }
  },
  ...th
]

export default dataFields
