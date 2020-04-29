<template>
  <div>
    <Table-wrapper
      :dataFields="dataFields"
      :searchFields="searchFields"
      :namespace="namespace"
    ></Table-wrapper>
    <Form :formFields="formFields" :namespace="namespace"></Form>
    <Form :formFields="testFormFields" :namespace="namespace" formNamespace="testForm"></Form>
  </div>
</template>
<script>
import searchFields from './searchFields'
import dataFields from './dataFields'
import formFields from './formFields'
import testFormFields from './testFormFields'
import firstFields from './firstFields'
import secondFields from './secondFields'
import store from './store'
import registerModule from '@/mixins/registerModule'

export default {
  name: 'City',
  mixins: [registerModule],
  data () {
    return {
      searchFields,
      dataFields,
      formFields,
      baseFormFields: testFormFields,
      testFormFields,
      store
    }
  },
  computed: {
    ruleForm () {
      return this.$store.state[this.namespace] && this.$store.state[this.namespace].form.ruleForm
    },
    testForm () {
      return this.$store.state[this.namespace] && this.$store.state[this.namespace].testForm.ruleForm
    }
  },
  created () {
    this.initSource()
    this.loadFirstPage()
    this.querySearch(this.searchFields)
  },
  watch: {
    'ruleForm.parentAdcode' (newValue) {
      if (!newValue || isNaN(newValue)) return
      clearTimeout(this.timer)
      this.timer = setTimeout(async () => {
        const { data } = await this.$http['MDDS_AREA_GETAREAINFO']({params: {adcode: newValue}})
        this.ruleForm.parentName = data.name || ''
      }, 500)
    },
    'testForm.level' (newValue) {
      if (this.$store.state[this.namespace].testForm.editType === 'create') {
        this.testFormFields = JSON.parse(JSON.stringify(this.baseFormFields))
        if (newValue === 1) {
          this.testFormFields.push(...firstFields)
        } else {
          this.testFormFields.push(...secondFields)
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped></style>
