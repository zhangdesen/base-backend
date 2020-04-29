<!-- 搜索栏部分 -->
<template>
  <div class="search-form" id="searchForm" v-if="showSearch">
    <div class="search-form-item" v-for="item in searchFields" :key="item.prop">
      <template v-if="item.show !== false">
        <template>
          <el-tooltip
            class="search-label"
            :content="item.label"
            placement="top"
            v-if="item.label && item.label.length > 6"
            ><span>{{ item.label + '：' }}</span></el-tooltip
          >
          <span class="search-label" v-else>{{ item.label + '：' }}</span>
        </template>
        <div class="item">
          <slot :name="item.prop">
            <!--输入框-->
            <quark-input
              v-if="item.type === 'text' || item.type === 'number' || item.type === 'int'"
              :type="item.type"
              :prop="item.prop"
              :value="searchObject[item.prop]"
              :placeholder="item.placeholder"
              :append="item.append"
              :disabled="item.disabled ? true : editType === 'see'"
              @keyUpEnter="handleSearchConfirm"
              @changeInput="changeInput"
            ></quark-input>
            <!--下拉框-->
            <quark-select
              v-else-if="item.type === 'select'"
              :prop="item.prop"
              :field="item.field"
              :value="searchObject[item.prop]"
              :source="selectSource[item.source]"
              :multiple="item.multiple"
              :collapseTags="true"
              :defaultProps="item.defaultProps"
              :disabled="item.disabled ? true : editType === 'see'"
              @changeSelect="changeSelect"
            ></quark-select>
            <!--级联框-->
            <quark-cascader
              v-else-if="item.type === 'cascader'"
              :prop="item.prop"
              :field="item.field"
              :value="searchObject[item.prop]"
              :options="selectSource[item.source]"
              :disabled="item.disabled ? true : editType === 'see'"
              @changeCascader="changeCascader"
            ></quark-cascader>
            <!--日期-->
            <quark-date
              v-else-if="item.type === 'date'"
              :prop="item.prop"
              :firstDate="item.firstDate"
              :lastDate="item.lastDate"
              :value="searchObject[item.prop]"
              :dateType="item.dateType"
              :pickerOptions="item.pickerOptions"
              :disabled="item.disabled ? true : editType === 'see'"
              @changeDate="changeDate"
            ></quark-date>
          </slot>
        </div>
      </template>
    </div>
    <el-button
      type="primary"
      class="search-btn"
      size="mini"
      @click="handleSearchConfirm()"
      :disabled="editType === 'see'"
      >搜索</el-button
    >
    <el-button
      type="primary"
      icon="el-icon-refresh"
      circle
      class="refresh"
      @click="handleRefresh"
      :disabled="editType === 'see'"
    ></el-button>
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: {
    searchFields: {
      type: Array,
      default () {
        return []
      }
    },
    namespace: {
      required: true
    },
    formNamespace: {
      type: String
    },
    showSearch: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    searchObject () {
      return this.getStoreData('searchObject')
    },
    editType () {
      return this.getStoreData('editType')
    },
    selectSource () {
      return this.$store.state[this.namespace].selectSource
    }
  },
  methods: {
    setType (obj) {
      Object.assign(obj, {type: 'searchObject', formNamespace: this.formNamespace})
    },
    getStoreData (key) {
      return this.formNamespace ? this.$store.state[this.namespace][this.formNamespace][key] : this.$store.state[this.namespace][key]
    },
    handleRefresh () {
      this.$store.dispatch(`${this.namespace}/handleRefresh`, this.formNamespace)
    },
    handleSearchConfirm () {
      this.$store.dispatch(`${this.namespace}/handleSearchConfirm`, this.formNamespace)
    },
    changeInput (obj) {
      this.setType(obj)
      this.$store.commit(`${this.namespace}/changeInput`, obj)
    },
    changeCascader (obj) {
      this.setType(obj)
      this.$store.commit(`${this.namespace}/changeCascader`, obj)
    },
    changeDate (obj) {
      this.setType(obj)
      this.$store.commit(`${this.namespace}/changeDate`, obj)
    },
    changeSelect (obj) {
      this.setType(obj)
      this.$store.commit(`${this.namespace}/changeSelect`, obj)
    }
  }
}
</script>

<style scoped lang="scss">
.search-form {
  background-color: #fff;
  padding: 10px 60px 0 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
  max-height: 180px;
  overflow: auto;
  .search-form-item {
    margin-bottom: 10px;
    margin-right: 6px;
    display: flex;
    align-items: center;
    text-align: right;
    .item {
      flex: 1;
    }
  }
  .search-label {
    width: 96px;
    color: #606266;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

.search-btn {
  margin-bottom: 10px;
  margin-left: 12px;
  vertical-align: middle;
}

.refresh {
  position: absolute;
  right: 16px;
  top: 10px;
}
</style>
