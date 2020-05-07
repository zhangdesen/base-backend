<template>
  <ComplexForm :namespace="namespace" :formFields="tabFormFields"></ComplexForm>
</template>

<script>
import tabFormFields from '../tabFormFields'
import formFields from '../formFields'
import store from './store'
import registerModule from '@/mixins/registerModule'
import { changeField } from '@/utils/fun'

export default {
  name: 'MerchantCreate',
  mixins: [registerModule],
  data () {
    return {
      tabFormFields,
      formFields,
      store
    }
  },
  created () {
    this.initSource()
    changeField(this.tabFormFields, 'name', 'disabled', true)
  }
}
</script>
<style lang="scss" scoped>
</style>
