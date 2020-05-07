/**
 * Created by zds on 2018/12/18.
 *
 */
import { mustRequired, mustNumber, NumberLength15, stringLength20 } from '@/config/validate'
const dataFields = [

  {
    prop: 'level',
    label: '区域层级',
    type: 'select',
    source: 'levelList',
    rules: [
      mustRequired('请输入区域层级')
    ]
  },
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
  },
  {
    prop: 'name',
    label: '地理区域名称',
    type: 'text',
    rules: [
      mustRequired('请输入地理区域名称'),
      stringLength20
    ]
  },
  {
    prop: 'adcode',
    label: '地理区域编码',
    type: 'int',
    rules: [
      mustRequired('请输入地理区域编码'),
      NumberLength15
    ]
  },
  {
    prop: 'table',
    // label: '表格展示',
    type: 'tableWrapper',
    height: '260px',
    width: '520px',
    showAction: false,
    showRadio: true,
    searchFields: [
      {
        prop: 'name',
        label: '城市名称',
        type: 'text'
      }
    ],
    dataFields: [
      {
        prop: 'cityName',
        label: '城市名称'
      },
      {
        prop: 'cityCode',
        label: '城市编码',
        width: '120px'
      }
    ]
  }
]

export default dataFields
