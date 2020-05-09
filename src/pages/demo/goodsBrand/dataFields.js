import { th } from '@/config/th'

const dataFields = [
  {
    prop: 'action',
    label: '操作',
    width: '310px',
    action: {
      props: ['scopeData'],
      template: `<div>
      <quark-button type="info" @click="see">查看</quark-button>
      <quark-button type="primary" @click="edit">编辑</quark-button>
      <quark-button v-if="scopeData.row.status === 1" type="danger" @click="handleSwitch">禁用</quark-button>
      <quark-button v-else type="success" @click="handleSwitch">启用</quark-button>
      <quark-button type="warning" @click="handleConfirm">清除缓存</quark-button>
</div>`,
      methods: {
        see () {
          this.$emit('action', {
            actionName: 'seeTable',
            row: this.scopeData.row
          })
        },
        edit () {
          this.$emit('action', {
            actionName: 'editTable',
            row: this.scopeData.row
          })
        },
        handleSwitch () {
          this.$emit('action', {
            actionName: 'handleSwitch',
            row: this.scopeData.row,
            name: this.scopeData.row.name,
            status: this.scopeData.row.status === 0 ? '启用' : '禁用',
            ajaxData: {
              id: this.scopeData.row.id,
              status: this.scopeData.row.status === 0 ? 1 : 0
            }
          })
        },
        handleConfirm () {
          this.$emit('action', {
            actionName: 'handleConfirm',
            title: '是否清除缓存',
            ajaxData: {
              brandId: this.scopeData.row.id
            }
          })
        }
      }
    }
  },
  {
    prop: 'id',
    label: 'ID',
    width: '70px'
  },
  {
    prop: 'name',
    label: '品牌名称',
    width: '120px'
  },
  {
    prop: 'type',
    label: '品牌类型',
    width: '100px',
    render: {
      props: ['scopeData', 'selectSource'],
      template: `<div>{{this.scopeData.row.type | findValue(selectSource.brandType)}}</div>`
    }
  },
  {
    prop: 'description',
    label: '品牌描述',
    width: '120px'
  },
  {
    prop: 'images',
    label: '品牌图片',
    width: '120px',
    render: {
      props: ['scopeData'],
      template: `<img style="width:96px;height:96px" alt="" :src="this.scopeData.row.images" />`
    }
  },
  {
    prop: 'status',
    label: '品牌状态',
    width: '80px',
    render: {
      props: ['scopeData'],
      template: ` <span v-if="scopeData.row.status === 0" style="color: #F56C6C">禁用</span>
      <span v-else-if="scopeData.row.status === 1" style="color: #67C23A">启用</span>`
    }
  },
  ...th
]

export default dataFields
