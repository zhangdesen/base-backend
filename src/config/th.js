// 表格基础头部数据
import user from '../components/user'

const th = [
  {
    prop: 'createBy',
    label: '创建人',
    width: '100px',
    tooltip: true,
    render: {
      props: ['scopeData'],
      components: {user},
      template: `<user :userName="this.scopeData.row.createBy" />`
    }
  },
  {
    prop: 'createTime',
    label: '创建时间',
    width: '135px',
    tooltip: true,
    render: {
      props: ['scopeData'],
      template: `<span v-if="this.scopeData.row.createTime">{{this.scopeData.row.createTime | date('YYYY-MM-DD HH:mm:ss')}}</span><span v-else>--</span>`
    }
  },
  {
    prop: 'modifyBy',
    label: '修改人',
    width: '100px',
    tooltip: true,
    render: {
      props: ['scopeData'],
      components: {user},
      template: `<user :userName="this.scopeData.row.modifyBy" />`
    }
  },
  {
    prop: 'modifyTime',
    label: '修改时间',
    width: '135px',
    tooltip: true,
    render: {
      props: ['scopeData'],
      template: `<span v-if="this.scopeData.row.modifyTime">{{this.scopeData.row.modifyTime | date('YYYY-MM-DD HH:mm:ss')}}</span><span v-else>--</span>`
    }
  }
]

export default th
