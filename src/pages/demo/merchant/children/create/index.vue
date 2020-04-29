<template>
  <ComplexForm :namespace="namespace" :formFields="tabFormFields"></ComplexForm>
</template>

<script>
import tabFormFields from '../tabFormFields'
import formFields from '../formFields'
import store from './store'
import registerModule from '@/mixins/registerModule'

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
  }
}
</script>
<style lang="scss" scoped>
</style>
