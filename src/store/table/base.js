
/**
 *此文件不建议修改，如需修改或添加方法可在index改
*/

import makeApi from '@/plugins/api'
import router from '@/router'
import { initDate, param2Obj } from '@/utils/fun'
import { Message, MessageBox } from 'element-ui'
import Vue from 'vue'

const FORM = 'form' // 表单对象默认值

// 获取表格高度
function getTableHeight () {
  let heigth = 44
  if (window.top !== window.self) heigth = 14
  const documentHeight = document.body.clientHeight
  const searchFormEle = document.getElementById('searchForm')
  const elHeaderEle = document.getElementsByClassName('el-header')[0]
  const paginationEle = document.getElementById('tablePagination')
  const actionBtnEle = document.getElementById('actions')
  let searchFormHeight = searchFormEle ? searchFormEle.offsetHeight : 0
  let paginationHeight = paginationEle ? paginationEle.offsetHeight : 0
  let actionBtnHeight = actionBtnEle ? actionBtnEle.offsetHeight : 0
  let elHeaderHeight = elHeaderEle ? elHeaderEle.offsetHeight : 0
  return documentHeight - (searchFormHeight + elHeaderHeight + paginationHeight + actionBtnHeight + heigth)
}

function setUpdateObj (state, obj) {
  let data
  if (obj.formNamespace) {
    data = state[obj.formNamespace][obj.type]
  } else {
    data = state.searchObject
  }
  return data
}

function setFormState (state, name) {
  if (typeof name === 'object') {
    return name.formNamespace ? state[name.formNamespace] : state[FORM]
  } else if (typeof name === 'string') {
    return state[name]
  }
  return state
}

function setBaseState (state, name) {
  let newState = state
  if (typeof name === 'object') {
    if (name.formNamespace) {
      newState = state[name.formNamespace]
      delete name.formNamespace
    }
  } else if (typeof name === 'string') {
    newState = state[name]
  }
  return newState
}

const base = {
  state: {
    ruleForm: {}, // 弹窗存储的数据
    rules: {}, // 弹窗校验规则
    dialogVisible: false, // 弹窗展示状态
    dialogTitle: '提示', // 弹窗标题
    radioId: '', // 单选选中
    editType: '', // 创建编辑查看状态
    loading: null, // 表格加载动画
    baseUrl: '', // 基础数据url
    initUrl: '', // 初始化url
    switchUrl: '', // 开通关闭url
    confirmUrl: '', // 失效/删除等确认操作信息url,单次控制
    listCountUrl: '', // 列表页面总数，因为总数有时会异步获取
    rowKey: 'id', // 多选识别字段
    selectionAllList: [], // 全选数值包含跨页数据
    selectionAllIds: [], // 全选id
    selectionDisabledIds: [], // 不可选中的id
    selectSource: {}, // 下拉资源数据
    filters: {
      // 过滤条件
      order: void 0,
      pageSize: 25,
      sort: void 0
    },
    loadDataParams: {
      // 加载基础数据
      pageNo: 1
    },
    tableDataSource: [], // 表格数据
    tableHeight: 200, // 表格高度
    searchObject: {} // 搜索数据
  },
  mutations: {
    // 初始化加载资源
    initSource (state, data) {
      state.selectSource = Object.assign({}, state.selectSource, data)
    },
    // 解析加载的表格数据
    parseResponse (state, payload) {
      const {data, formNamespace} = payload
      let newState = setBaseState(state, formNamespace)
      Vue.set(newState, 'loading', false)
      Vue.set(newState, 'tableDataSource', data.results || data)
      Vue.set(newState.loadDataParams, 'count', data.count)
      Vue.set(newState, 'selectionAllIds', newState.selectionAllList.map(row => {
        return row[newState.rowKey]
      }))
    },
    // 搜索默认设置
    setSearchDefaultValue (state, searchFields) {
      if (!searchFields) return console.error('请传入需要searchFields')
      searchFields.forEach((item) => {
        if (item.default !== undefined) {
          Vue.set(state.searchObject, item.prop, item.default)
          Vue.set(state.loadDataParams, item.prop, item.default)
        }
      })
    },
    // 表格多选
    handleSelectionChange (state, obj) {
      let { selection, formNamespace, type } = obj
      let newState = setBaseState(state, formNamespace)
      if (type === 'rowClick') {
        let index
        let selectionAllList = newState.selectionAllList
        const { rowKey } = newState
        if (selectionAllList.find((item, i) => {
          index = i
          return item[rowKey] === selection[rowKey]
        })) {
          selectionAllList.splice(index, 1)
        } else {
          selectionAllList.push(selection)
        }
        selection = selectionAllList
      }
      // 如果总记忆中还没有选择的数据，那么就直接取当前页选中的数据，不需要后面一系列计算
      if (!newState.selectionAllList.length) {
        newState.selectionAllList = selection
        newState.selectionAllIds = selection.map(row => {
          return row[newState.rowKey]
        })
        return
      }
      // 标识当前行的唯一键的名称
      let rowKey = newState.rowKey
      // 总选择里面的key集合
      let selectAllIds = newState.selectionAllList.map(row => {
        return row[rowKey]
      })
      // 获取当前页选中的id
      let selectIds = selection.map(row => {
        // 如果总选择里面不包含当前页选中的数据，那么就加入到总选择集合里
        if (selectAllIds.indexOf(row[rowKey]) < 0) {
          newState.selectionAllList.push(row)
        }
        return row[rowKey]
      })
      // 得到当前页没有选中的id
      const noSelectIds = []
      newState.tableDataSource.forEach(row => {
        if (selectIds.indexOf(row[rowKey]) < 0) {
          noSelectIds.push(row[rowKey])
        }
      })
      const intersection = noSelectIds.filter(id => selectAllIds.includes(id)) // 交集
      newState.selectionAllList = newState.selectionAllList.filter((row) => {
        return intersection.indexOf(row[rowKey]) === -1
      })
      newState.selectionAllIds = newState.selectionAllList.map(row => {
        return row[newState.rowKey]
      })
    },
    // 表格单选
    handleRadioChange (state, data) {
      const { radioData, formNamespace } = data
      let newState = setBaseState(state, formNamespace)
      newState.radioData = radioData
      newState.radioId = radioData[newState.rowKey]
    },
    // input输入框
    changeInput (state, obj) {
      const { key, value } = obj
      let newState = setUpdateObj(state, obj)
      Vue.set(newState, key, value.trim())
      // state.searchObject = {...state.searchObject, [key]: value}
    },
    // 级联框
    changeCascader (state, obj) {
      const { key, value, field } = obj
      let newState = setUpdateObj(state, obj)
      Vue.set(newState, key, value)
      // 兼容后端级联只要最后一个值
      if (field) {
        Vue.set(newState, field, value[value.length - 1])
      }
    },
    // 日期框
    changeDate (state, obj) {
      const { key, value, firstDate, lastDate } = obj
      let newState = setUpdateObj(state, obj)
      if (value) {
        if (firstDate) {
          Vue.set(newState, key, [initDate(value[0]), initDate(value[1])])
          Vue.set(newState, firstDate, initDate(value[0]))
          Vue.set(newState, lastDate, initDate(value[1]))
        } else {
          Vue.set(newState, key, initDate(value))
        }
      } else {
        Vue.set(newState, key, void 0)
        Vue.set(newState, firstDate, void 0)
        Vue.set(newState, lastDate, void 0)
      }
    },
    // 选择框
    changeSelect (state, obj) {
      const { key, value, multiple, field } = obj
      let newState = setUpdateObj(state, obj)
      Vue.set(newState, key, value)
      if (multiple && field) {
        Vue.set(newState, field, value && value.length ? value.join(',') : void 0) // 后端的数组需要转成‘，’分割，但是elmentui的展示需要是数组格式
      }
    },
    // switch选择
    changeSwitch (state, obj) {
      const { key, value } = obj
      let newState = setUpdateObj(state, obj)
      Vue.set(newState, key, value)
    },
    // 单选框
    changeRadio (state, obj) {
      const { key, value } = obj
      let newState = setUpdateObj(state, obj)
      Vue.set(newState, key, value)
    },
    // 多选框
    changeCheckbox (state, obj) {
      const { key, value } = obj
      let newState = setUpdateObj(state, obj)
      Vue.set(newState, key, value)
    },
    // 树形结构
    changeTree (state, obj) {
      const { key, value } = obj
      let newState = setUpdateObj(state, obj)
      Vue.set(newState, key, value)
    },
    // 动态设置表格高度
    setTableHeight (state) {
      Vue.nextTick(() => {
        state.tableHeight = getTableHeight()
        window.onresize = () => {
          setTimeout(() => {
            state.tableHeight = getTableHeight()
          }, 500)
        }
      })
    },
    // url查询
    querySearch (state, searchFields) {
      const { href } = location
      const selectList = ['select', 'radio', 'cascader']
      if (href.includes('web_search=1')) { // 列表页启用外部搜索进入
        const query = param2Obj(href)
        Object.keys(query).forEach((key) => {
          // 数字字符串转为数字类型，因为下拉框的id需要数字类型
          searchFields.forEach((item) => {
            // 是不是数组
            if (item.field && item.field === key) {
              query[key] = query[key].split(',').map((item) => {
                return Number(item)
              })
            } else if (item.prop === key && selectList.includes(item.type) && !isNaN(query[key])) {
              // 这些是后端初始化的接口id值，需要转数字
              query[key] = Number(query[key])
            }
          })
        })
        state.searchObject = Object.assign(state.searchObject, query)
        state.loadDataParams = Object.assign(state.loadDataParams, query)
        // url包含searchDisabled就是要搜索框不可编辑
        if (href.includes('web_search_disabled=1')) {
          Object.keys(query).forEach((key) => {
            this.searchFields.forEach((item, index) => {
              if (item.prop === key) {
                searchFields[index].disabled = true
              }
            })
          })
          state.filters = Object.assign(state.filters, query)
        }
      }
    },
    // 设置表单检验规则
    handleOpen (state, obj) {
      let newState = setFormState(state, obj)
      const { formFields } = obj
      formFields.forEach((item) => {
        // 递归调用
        if (item.children) {
          return this.commit(`${obj.namespace}/handleOpen`, {formFields: item.children, formNamespace: obj.formNamespace, namespace: obj.namespace})
        }
        newState.rules[item.prop] = item.rules
        if (newState.editType === 'create' && item.default !== 'undefined') {
          Vue.set(newState.ruleForm, item.prop, item.default)
        }
      })
    },
    // 新增
    createForm (state, formNamespace = FORM) {
      let newState = setFormState(state, formNamespace)
      newState.editType = 'create'
      newState.dialogTitle = '新增'
      newState.ruleForm = {}
      newState.dialogVisible = true
    },
    // 编辑
    editTable (state, payload) {
      let newState = setFormState(state, payload)
      newState.editType = 'edit'
      newState.dialogTitle = payload.title || '编辑'
      newState.ruleForm = JSON.parse(JSON.stringify(payload.row))
      newState.dialogVisible = true
    },
    // 查看
    seeTable (state, payload) {
      let newState = setFormState(state, payload)
      newState.editType = 'see'
      newState.dialogTitle = payload.title || '查看'
      newState.ruleForm = JSON.parse(JSON.stringify(payload.row))
      newState.dialogVisible = true
    },
    // 关闭弹窗前
    beforeClose (state, formNamespace = FORM) {
      let newState = setFormState(state, formNamespace)
      newState.dialogVisible = false
    },
    // x关闭
    closeDialog (state, formNamespace = FORM) {
      let newState = setFormState(state, formNamespace)
      newState.dialogVisible = false
    },
    // 关闭后
    afterClose (state, formNamespace = FORM) {
      let newState = setFormState(state, formNamespace)
      newState.editType = ''
      // 判断数组防止关闭弹窗报错
      Object.keys(newState.ruleForm).forEach((key) => {
        if (Array.isArray(newState.ruleForm[key])) {
          newState.ruleForm[key] = []
        } else {
          delete newState.ruleForm[key]
        }
      })
      Object.keys(newState.searchObject).forEach((key) => {
        if (Array.isArray(newState.searchObject[key])) {
          newState.searchObject[key] = []
        } else {
          Vue.set(newState.searchObject, key, null)
          delete newState.searchObject[key]
        }
      })
      Object.keys(newState.loadDataParams).forEach((key) => {
        if (Array.isArray(newState.loadDataParams[key])) {
          newState.loadDataParams[key] = []
        } else {
          Vue.set(newState.loadDataParams, key, null)
          delete newState.loadDataParams[key]
        }
      })
      // 防止出现表格，手动重置
      Vue.set(newState.loadDataParams, 'pageNo', 1)
      Vue.set(newState.loadDataParams, 'count', 0)
      newState.selectionAllList = []
      newState.selectionAllIds = []
      newState.selectionDisabledIds = []
      newState.tableDataSource = []
    },
    // 新开页面
    openNewTab (state, data) {
      // 防止只传入路径
      if (typeof data === 'string') {
        data = {path: data}
      }
      if (data.row) {
        data = data.row
      }
      data.query = {
        ...data.query,
        parentId: param2Obj(location.href).parentId || window.name.split('_')[1] || null, // 对应的iframe的name值id
        parentStore: router.currentRoute.fullPath // 识别父页面是哪个，子页面可根据parentStore的值调用父页面的方法
      }
      router.push(data)
    },
    // 列表页进入的tab表单等，表单提交完毕更新父级页面。这边只刷新列表，需要修改的话可重写方法
    updateParent (state, {parentStore, parentId}) {
      if (parentStore && this.state[parentStore]) this.dispatch(`${parentStore}/loadData`)
      if (this.state.common.externalSearch) {
        window.parent.postMessage({
          functionName: 'emitParent',
          arguments: [{actionName: parentStore + '/loadData', parentStore, parentId}]
        }, '*')
      }
    },
    // 通知系统执行操作
    emitSystem (state, obj) {
      if (this.state.common.externalSearch) {
        window.parent.postMessage({
          functionName: 'closeActiveTabPage',
          arguments: []
        }, '*')
      }
    }
  },
  actions: {
    async initSource ({ commit, state }, params = {}) {
      const {data} = await makeApi[state.initUrl](params)
      commit('initSource', data)
    },
    async loadData ({ commit, state }, param = {}) {
      const { formNamespace } = param
      let newState = setBaseState(state, param)
      newState.loading = true
      const params = Object.assign(newState.loadDataParams, param, newState.filters)
      const {data} = await makeApi[newState.baseUrl]({ params })
      commit('parseResponse', {data, formNamespace})
    },
    async loadFirstPage ({ dispatch }, formNamespace) {
      await dispatch('loadData', {pageNo: 1, formNamespace})
    },
    async handleSearchConfirm ({state, dispatch}, formNamespace) {
      let newState = setBaseState(state, formNamespace)
      newState.loadDataParams = {pageNo: 1}
      await dispatch('loadData', {...newState.searchObject, formNamespace})
    },
    async handleRefresh ({state, dispatch}, formNamespace) {
      let newState = setBaseState(state, formNamespace)
      Object.keys(newState.searchObject).forEach((key) => {
        if (Array.isArray(newState.searchObject[key])) {
          newState.searchObject[key] = [] // 为了支持elementui多选等必须要数组格式
        } else {
          newState.searchObject[key] = null
        }
      })
      Object.assign(newState.searchObject, newState.filters)
      newState.selectionAllList = []
      newState.loadDataParams = {pageNo: 1}
      await dispatch('loadData', {...newState.searchObject, formNamespace})
    },
    async handleCurrentChange ({dispatch}, obj) {
      const {currentPage, formNamespace} = obj
      await dispatch('loadData', {
        pageNo: currentPage,
        formNamespace: formNamespace
      })
    },
    async handleSizeChange ({dispatch, state}, obj) {
      const {size, formNamespace} = obj
      let newState = setBaseState(state, formNamespace)
      newState.filters.pageSize = size
      await dispatch('loadData', {
        pageNo: 1,
        formNamespace
      })
    },
    async handleReload ({dispatch}, formNamespace) {
      await dispatch('loadData', {formNamespace})
    },
    async handleSortChange ({state, dispatch}, obj) {
      const {prop, order, formNamespace} = obj
      let newState = setBaseState(state, formNamespace)
      if (!prop) return
      newState.filters.sort = prop
      order === 'ascending' ? newState.filters.order = 'asc' : newState.filters.order = 'desc'
      await dispatch('loadData', {formNamespace})
    },
    async tableAction ({dispatch}, actions) {
      const actionName = actions.actionName
      await dispatch(actionName, actions)
    },
    async handleSwitch ({state, dispatch}, data) {
      const { name, status, ajaxData, formNamespace } = data
      let newState = setBaseState(state, formNamespace)
      MessageBox({
        title: '提示',
        message: `是否将<span style="color: #f04848">${name}</span>修改为${status}状态`,
        showCancelButton: true,
        type: 'warning',
        dangerouslyUseHTMLString: true,
        callback: async (action, instance, done) => {
          if (action === 'confirm') {
            const {message} = await makeApi[newState.switchUrl]({ data: ajaxData })
            Message.success(message)
            await dispatch('loadData', {formNamespace})
          }
        }
      })
    },
    async handleConfirm ({state, dispatch}, data) {
      const { title, formNamespace, ajaxData } = data
      let newState = setBaseState(state, formNamespace)
      MessageBox({
        title: '提示',
        message: title || '是否执行此操作',
        showCancelButton: true,
        type: 'warning',
        callback: async (action, instance, done) => {
          if (action === 'confirm') {
            const {message} = await makeApi[newState.confirmUrl]({ params: ajaxData })
            Message.success(message)
            await dispatch('loadData', {formNamespace})
          }
        }
      })
    },
    createForm ({commit}, data) {
      commit('createForm', data)
    },
    editTable ({commit}, data) {
      commit('editTable', data)
    },
    seeTable ({commit}, data) {
      commit('seeTable', data)
    },
    openNewTab ({commit}, data) {
      commit('openNewTab', data)
    },
    async picUpload ({state}, obj) {
      const { key, value } = obj
      let newState = setUpdateObj(state, obj)
      let fd = new FormData()
      fd.append('file', value)
      const {data} = await makeApi[state.uploadUrl || 'COMMON_FILEUPLOAD']({ data: fd })
      Vue.set(newState, key, data[0])
    },
    async formConfirm ({dispatch}, formNamespace) {
      await dispatch('formConfirmRequest', {formNamespace})
    },
    async formConfirmRequest ({state, dispatch}, payload) {
      let newState = setFormState(state, payload.formNamespace)
      const url = newState.editType === 'create' ? newState.createUrl : newState.editUrl
      const {message} = await makeApi[url]({ data: payload.ajaxData || newState.ruleForm })
      Message.success(message)
      await dispatch('loadData')
      newState.dialogVisible = false
    },
    async complexFormConfirm ({dispatch}, obj) {
      await dispatch('complexFormConfirmRequest', obj)
    },
    async complexFormConfirmRequest ({state, commit}, payload) {
      let newState = setFormState(state, payload.formNamespace)
      const url = newState.editType === 'create' ? newState.createUrl : newState.editUrl
      const {message} = await makeApi[url]({ data: payload.ajaxData || newState.ruleForm })
      Message.success(message)
      this.commit('tabRemove', {path: payload.fullPath}, {root: true})
      commit('updateParent', payload)
      commit('emitSystem')
    },
    closeComplexForm ({commit}, obj) {
      this.commit('tabRemove', {path: obj.fullPath}, {root: true})
      commit('emitSystem', obj)
    }
  }
}

export default base
