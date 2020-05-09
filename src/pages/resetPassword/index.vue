<template>
  <complex-form
    :formFields="dataFields"
    :namespace="namespace"
  ></complex-form>
</template>

<script>
import dataFields from './dataFields'
import store from './store'
import registerModule from '@/mixins/registerModule'

export default {
  name: 'ResetPassword',
  mixins: [registerModule],
  data () {
    return {
      dataFields,
      store
    }
  }
}
</script>

<style lang="scss" scoped></style>
