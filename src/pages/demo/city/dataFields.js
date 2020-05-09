/**
 * Created by zds on 2018/12/18.
 */
import { th } from '@/config/th'

const dataFields = [
  {
    prop: 'action',
    label: '操作',
    width: '100px',
    action: {
      props: ['scopeData'],
      template: `<quark-button @click="edit" :permissionList="['quark:area:update']">编辑</quark-button>`,
      methods: {
        edit () {
          this.$emit('action', {
            actionName: 'editTable',
            row: this.scopeData.row
          })
        }
      }
    }
  },
  {
    prop: 'id',
    label: 'ID',
    width: '60px',
    sort: true
  },
  {
    prop: 'level',
    label: '区域层级',
    width: '80px'
  },
  {
    prop: 'name',
    label: '名称',
    width: '120px'
  },
  {
    prop: 'adcode',
    label: '区域编码',
    width: '120px'
  },
  {
    prop: 'parentAdcode',
    label: '父级区域编码',
    width: '120px'
  },
  {
    prop: 'render',
    label: '查看',
    width: '300px',
    render: {
      props: ['scopeData'],
      template: `<div>
<el-button size="mini" type="primary" plain v-if="scopeData.row.parentAdcode" @click="search({'adcode':scopeData.row.parentAdcode})">查看父级</el-button>
<el-button size="mini" v-else style="opacity: 0">查看父级</el-button>
<el-button size="mini" type="success" plain @click="search({'level': scopeData.row.level, 'parentCode':scopeData.row.parentAdcode})">查看同级</el-button>
<el-button size="mini" type="info" plain @click="search({'parentAdcode': scopeData.row.adcode})">查看子级</el-button>
</div>`,
      methods: {
        search (searchData) {
          this.$emit('action', {
            actionName: 'createForm',
            searchData: searchData,
            formNamespace: 'testForm'
          })
        }
      }
    }
  },
  ...th
]

export default dataFields
