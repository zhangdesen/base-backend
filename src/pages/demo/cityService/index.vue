<template>
<div>
  <table-wrapper
    :dataFields="dataFields"
    :searchFields="searchFields"
    :namespace="namespace"
    :showCheckBox="true"
  ></table-wrapper>
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
  name: 'CityService',
  mixins: [registerModule],
  data () {
    return {
      searchFields,
      dataFields,
      formFields,
      store
    }
  },
  computed: {
    ruleForm () {
      return this.$store.state[this.namespace] && this.$store.state[this.namespace].form.ruleForm
    },
    selectSource () {
      return this.$store.state[this.namespace] && this.$store.state[this.namespace].selectSource
    },
    editType () {
      return this.$store.state[this.namespace] && this.$store.state[this.namespace].form.editType
    }
  },
  methods: {
    async getAreaList (adcode = '') {
      const {data} = await this.$http['MDDS_AREA_LIST_BYADCODE']({data: {adcode}})
      return data
    }
  },
  async created () {
    this.initSource()
    await this.loadFirstPage()
    this.querySearch(this.searchFields)
    const data = await this.getAreaList()
    this.selectSource.country = data.areaList
    this.$store.state[this.namespace].selectionAllList = [{id: 67}]
    this.$store.state[this.namespace].selectionAllIds = [67]
  },
  watch: {
    async 'ruleForm.country' (newValue) {
      if (this.editType === 'create') {
        this.ruleForm.countryAdcode = newValue
        this.ruleForm.province = ''
        this.ruleForm.provinceAdcode = ''
        if (!newValue) return
        const data = await this.getAreaList(newValue)
        this.selectSource.province = data.areaList
      }
    },
    async 'ruleForm.province' (newValue) {
      if (this.editType === 'create') {
        this.ruleForm.provinceAdcode = newValue
        this.ruleForm.adcode = ''
        this.ruleForm.cityName = ''
        if (!newValue) return
        const data = await this.getAreaList(newValue)
        this.selectSource.cityName = data.areaList
      }
    },
    'ruleForm.cityName' (newValue) {
      if (this.editType === 'create') {
        if (!newValue) return
        this.ruleForm.adcode = newValue
      }
    }
  }
}
</script>
<style lang="scss" scoped></style>
