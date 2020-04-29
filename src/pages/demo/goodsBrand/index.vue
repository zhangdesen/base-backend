<template>
  <div>
    <Table-wrapper
      :dataFields="dataFields"
      :searchFields="searchFields"
      :namespace="namespace"
    ></Table-wrapper>
    <Form :formFields="formFields" :namespace="namespace"></Form>
  </div>
</template>
<script>
import searchFields from './searchFields'
import dataFields from './dataFields'
import formFields from './formFields'
import store from './store'
import registerModule from '@/mixins/registerModule'

export default {
  name: 'Brand',
  mixins: [registerModule],
  data () {
    return {
      searchFields,
      dataFields,
      formFields,
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
