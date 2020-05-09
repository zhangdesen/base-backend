import {th} from '@/config/th'

const dataFields = [

  {
    prop: 'action',
    label: '操作',
    width: '220px',
    action: {
      props: ['scopeData'],
      template: `<div>
      <quark-button type="primary" @click="edit">编辑</quark-button>
      <quark-button type="primary" @click="see" plain>查看</quark-button>
      <quark-button v-if="scopeData.row.status === 1" type="danger" @click="switchAction">关闭</quark-button>
      <quark-button v-else type="success" @click="switchAction">开通</quark-button>
      </div>`,
      methods: {
        edit () {
          this.$emit('action', {
            actionName: 'editTable',
            row: this.scopeData.row
          })
        },
        see () {
          this.$emit('action', {
            actionName: 'seeTable',
            row: this.scopeData.row
          })
        },
        switchAction () {
          this.$emit('action', {
            actionName: 'handleSwitch',
            row: this.scopeData.row,
            name: this.scopeData.row.cityName,
            status: this.scopeData.row.status === 0 ? '开通' : '关闭',
            ajaxData: {
              id: this.scopeData.row.id,
              status: this.scopeData.row.status === 0 ? 1 : 0
            }
          })
        }
      }
    }
  },
  {
    prop: 'country',
    label: '国家',
    width: '100px'
  },
  {
    prop: 'province',
    label: '省份',
    width: '100px'
  },
  {
    prop: 'cityName',
    label: '城市名称',
    width: '100px'
  },
  {
    prop: 'cityCode',
    label: '城市代码',
    width: '100px'
  },
  {
    prop: 'adcode',
    label: '区域编码',
    width: '100px'
  },
  {
    prop: 'areaTypeName',
    label: '区域层级',
    width: '100px'
  },
  {
    prop: 'cityLevel',
    label: '城市级别',
    width: '100px',
    render: {
      props: ['scopeData', 'selectSource'],
      template: `<div>{{this.scopeData.row.cityLevel | findValue(selectSource.cityLevel)}}</div>`
    }
  },
  {
    prop: 'telCode',
    label: '电话区号',
    width: '100px'
  },
  {
    prop: 'position',
    label: '排序',
    width: '100px'
  },
  {
    prop: 'status',
    label: '状态',
    width: '100px',
    render: {
      props: ['scopeData', 'selectSource'],
      template: `<div>{{this.scopeData.row.status | findValue(selectSource.status)}}</div>`
    }
  },
  ...th
]

export default dataFields
