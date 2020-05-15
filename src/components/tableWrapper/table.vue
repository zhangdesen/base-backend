<!-- 表格部分 -->

<template>
  <el-table
      ref="table"
      size="small"
      border
      highlight-current-row
      v-loading="loading"
      :height="tableHeight"
      :style="{ width: tableWidth }"
      :row-key="rowKey"
      :data="tableDataSource"
      :default-sort="defaultSort"
      @sort-change="handleSortChange"
      @select="handleSelectionChange"
      @select-all="handleSelectionChange"
      @row-click="rowClick"
    >
      <!--是否加载完毕-->
      <div slot="empty">
        <span v-if="loading === false && tableDataSource.length === 0">暂无数据</span>
        <slot v-else-if="loading === null"></slot>
      </div>

      <!-- 多选框 -->
      <el-table-column
        type="selection"
        width="42"
        align="center"
        v-if="showCheckBox"
        :selectable="selectable"
      ></el-table-column>

      <!--单选框-->
      <el-table-column label="" width="55" v-if="showRadio">
        <template slot-scope="scope">
          <el-radio
            style="margin-left: 8px"
            :label="scope.row.id"
            :value="radioId"
            @change.native="handleRadioChange(scope.row)"
            :disabled="editType === 'see'"
            >&nbsp;</el-radio>
        </template>
      </el-table-column>

      <!-- 展开内容 -->
      <el-table-column align="center" width="30" type="expand" v-if="expand">
        <template slot-scope="scope">
          <slot name="expandTable" :scope="scope"></slot>
        </template>
      </el-table-column>

      <!-- 序号 -->
      <el-table-column label="序号" align="center" width="50" v-if="showIndex">
        <template slot-scope="scope">
          {{ scope.$index + 1 + filters.pageSize * (loadDataParams.pageNo - 1) }}
        </template>
      </el-table-column>

      <!-- 数据,操作部分 -->
      <template v-for="(column, index) in dataFields">
        <el-table-column
          v-if="column.prop !== 'action' && !column.render && column.show !== false"
          :key="column.prop"
          :fixed="column.fixed"
          :prop="column.prop"
          :label="column.label"
          :width="column.width"
          :show-overflow-tooltip="column.tooltip !== false"
          :sortable="column.sort"
          :render-header="column.renderHeader"
          :align="column.align ? column.align : 'left'"
        ></el-table-column>

        <!-- render显示部分 -->
        <el-table-column
          v-if="column.prop !== 'action' && column.render && column.show !== false"
          :key="column.prop"
          :fixed="column.fixed"
          :prop="column.prop"
          :label="column.label"
          :width="column.width"
          :show-overflow-tooltip="column.tooltip !== false"
          :sortable="column.sort"
          :render-header="column.renderHeader"
          :align="column.align ? column.align : 'left'"
        >
          <template slot-scope="scope">
            <component
              v-bind:is="column.render"
              :scopeData="scope"
              :selectSource="selectSource"
              :editType="editType"
              :ruleForm="ruleForm"
              @action="tableAction"
            >
            </component>
          </template>
        </el-table-column>
        <!-- action操作部分 -->
        <el-table-column
          :align="column.align ? column.align : 'left'"
          v-if="column.prop === 'action' && column.show !== false"
          :key="column.prop + index"
          :fixed="column.fixed"
          :width="column.width"
          :label="column.label || '操作'"
          :render-header="column.renderHeader"
        >
          <template slot-scope="scope">
            <component
              v-bind:is="column.action"
              :scopeData="scope"
              :selectSource="selectSource"
              :editType="editType"
              :ruleForm="ruleForm"
              @action="tableAction"
            >
            </component>
          </template>
        </el-table-column>
      </template>
    </el-table>
</template>

<script>

export default {
  name: 'Table',
  props: {
    dataFields: {
      type: Array
    },
    width: {
      type: String | Number
    },
    namespace: {
      required: true
    },
    showIndex: {
      type: Boolean,
      default: true
    },
    showRadio: {
      type: Boolean,
      default: false
    },
    expand: {
      type: Boolean,
      default: false
    },
    showCheckBox: {
      type: Boolean,
      default: false
    },
    defaultSort: {
      type: Object,
      default () {
        return { prop: 'date', order: 'descending' }
      }
    },
    formNamespace: {
      type: String
    },
    height: {
      type: String,
      default: '74px'
    }
  },
  data () {
    return {
      scrollTop: 0, // 表格出现滚动条滚动的高度
      scrollLeft: 0
    }
  },
  computed: {
    selectSource () {
      return this.$store.state[this.namespace].selectSource
    },
    tableHeight () {
      return this.formNamespace ? this.height : this.$store.state[this.namespace].tableHeight
    },
    rowKey () {
      return this.getStoreData('rowKey')
    },
    tableDataSource () {
      return this.getStoreData('tableDataSource')
    },
    loading () {
      return this.getStoreData('loading')
    },
    filters () {
      return this.getStoreData('filters')
    },
    loadDataParams () {
      return this.getStoreData('loadDataParams')
    },
    editType () {
      return this.getStoreData('editType')
    },
    ruleForm () {
      return this.getStoreData('ruleForm')
    },
    selectionAllIds () {
      return this.getStoreData('selectionAllIds')
    },
    selectionDisabledIds () {
      return this.getStoreData('selectionDisabledIds')
    },
    radioId () {
      return this.getStoreData('radioId')
    },
    tableWidth () {
      if (typeof this.width === 'number') {
        return this.width + 'px'
      } else if (typeof this.width === 'string') {
        return this.width
      } else {
        return '100%'
      }
    }
  },
  methods: {
    getStoreData (key) {
      return this.formNamespace ? this.$store.state[this.namespace][this.formNamespace][key] : this.$store.state[this.namespace][key]
    },

    setType (obj) {
      Object.assign({formNamespace: this.formNamespace}, obj)
    },

    handleSortChange (val) {
      this.setType(val)
      this.$store.dispatch(`${this.namespace}/handleSortChange`, val)
    },
    tableAction (val) {
      this.setType(val)
      this.$store.dispatch(`${this.namespace}/tableAction`, val)
      window.event.stopPropagation() // 防止多选出现时点击按钮执行选中，取消冒泡
    },
    handleSelectionChange (val) {
      let obj = { selection: val, formNamespace: this.formNamespace }
      this.$store.commit(`${this.namespace}/handleSelectionChange`, obj)
    },
    handleRadioChange (val) {
      let obj = { radioData: val, formNamespace: this.formNamespace }
      this.$store.commit(`${this.namespace}/handleRadioChange`, obj)
    },
    setSelection () {
      this.$nextTick(() => {
        this.$refs.table.clearSelection()
        if (this.selectionAllIds.length) {
          for (let i = 0; i < this.tableDataSource.length; i++) {
            if (this.selectionAllIds.indexOf(this.tableDataSource[i][this.rowKey]) >= 0) {
              this.$refs.table.toggleRowSelection(this.tableDataSource[i], true) // 设置选中
            }
          }
        }
      })
    },

    rowClick (row, event, column) {
      if (this.editType === 'see') return
      if (this.showRadio) {
        this.handleRadioChange(row)
      } else if (this.showCheckBox) {
        if (this.selectionDisabledIds.includes(row[this.rowKey])) {
          return console.log('设置不允许取消修改')
        }
        let obj = { selection: row, formNamespace: this.formNamespace, type: 'rowClick' }
        this.$store.commit(`${this.namespace}/handleSelectionChange`, obj)
      } else {
        // this.$store.commit(`${this.namespace}/rowClick`, obj)
      }
    },

    selectable (row, index) {
      if (this.editType === 'see') {
        return 0
      } else if (this.selectionDisabledIds.length) {
        if (this.selectionDisabledIds.indexOf(row[this.rowKey]) >= 0) {
          return 0
        }
        return 1
      } else {
        return 1
      }
    },

    listenScroll (el) {
      this.scrollTop = el.scrollTop
      this.scrollLeft = el.scrollLeft
    },

    setScrollTop () {
      // 定位列表页缓存页表格滚动高度位置
      if (this.scrollTop) {
        setTimeout(() => {
          this.$refs.table.bodyWrapper.scrollTo(this.scrollLeft, this.scrollTop)
        }, 200)
      }
    }
  },

  activated () {
    const bodyWrapper = this.$refs.table.bodyWrapper
    bodyWrapper.addEventListener('scroll', () => {
      this.listenScroll(bodyWrapper)
    })
    this.setScrollTop()
  },

  deactivated () {
    const bodyWrapper = this.$refs.table.bodyWrapper
    bodyWrapper.removeEventListener('scroll', () => {
      this.listenScroll(bodyWrapper)
    })
  },

  created () {
    this.setSelection()
  },

  watch: {
    selectionAllIds () {
      this.setSelection()
    }
  }
}
</script>

<style scoped></style>
