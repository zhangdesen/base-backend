<template>
  <div :style="{color: color, minWidth: width}">{{value}}</div>
</template>

<script>
export default {
  name: 'quarkTxt',
  props: {
    prop: {
      type: String
    },
    value: {},
    color: {
      type: String
    },
    width: {
      type: String,
      default: '80px'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
