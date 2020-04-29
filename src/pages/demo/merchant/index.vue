<template>
  <Table-wrapper
      :dataFields="dataFields"
      :searchFields="searchFields"
      :namespace="namespace"
    ></Table-wrapper>
</template>
<script>
import searchFields from './searchFields'
import dataFields from './dataFields'
import store from './store'
import registerModule from '@/mixins/registerModule'

export default {
  name: 'Merchant',
  mixins: [registerModule],
  data () {
    return {
      searchFields,
      dataFields,
      store
    }
  },
  created () {
    this.initSource()
    this.loadFirstPage()
    this.querySearch(this.searchFields)
  }
}
</script>
<style lang="scss" scoped></style>
