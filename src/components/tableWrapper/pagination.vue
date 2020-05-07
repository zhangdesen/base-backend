<!-- 分页配置 -->
<template>
  <div class="table-pagination" id="tablePagination" v-if="showPagination">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="loadDataParams.pageNo || 0"
      :page-sizes="[10, 25, 50, 100]"
      :page-size="loadDataParams.pageSize || 25"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="loadDataParams.count || 0"
      :small="small"
      :pager-count="5"
    >
    </el-pagination>
    <el-button
      :loading="loading"
      size="mini"
      icon="el-icon-refresh"
      @click="handleReload"
      class="reload-btn"
    ></el-button>
  </div>
</template>

<script>

export default {
  name: 'Pagination',
  props: {
    namespace: {
      require: true
    },
    formNamespace: {
      type: String
    },
    showPagination: {
      type: Boolean,
      default: true
    },
    small: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    loading () {
      return this.getStoreData('loading')
    },
    loadDataParams () {
      return this.getStoreData('loadDataParams')
    }
  },
  methods: {
    getStoreData (key) {
      return this.formNamespace ? this.$store.state[this.namespace][this.formNamespace][key] : this.$store.state[this.namespace][key]
    },
    handleCurrentChange (currentPage) {
      this.$store.dispatch(`${this.namespace}/handleCurrentChange`, {currentPage, formNamespace: this.formNamespace})
    },
    handleSizeChange (size) {
      this.$store.dispatch(`${this.namespace}/handleSizeChange`, {size, formNamespace: this.formNamespace})
    },
    handleReload () {
      this.$store.dispatch(`${this.namespace}/handleReload`, this.formNamespace)
    }
  }
}
</script>

<style lang="scss" scoped>
.table-pagination {
  text-align: left;
  border: 1px solid #ddd;
  border-top: none;
  padding: 3px;
  display: flex;
}
</style>
