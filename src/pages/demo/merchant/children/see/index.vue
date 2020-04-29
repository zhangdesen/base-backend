<template>
  <ComplexForm :namespace="namespace" :formFields="tabFormFields"></ComplexForm>
</template>

<script>
import tabFormFields from '../tabFormFields'
import formFields from '../formFields'
import store from './store'
import registerModule from '@/mixins/registerModule'

export default {
  name: 'MerchantSee',
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
    this.$store.dispatch(`${this.$route.fullPath}/getMerchant`, this.$route.query.id)
  }
}
</script>
<style lang="scss" scoped>
</style>
