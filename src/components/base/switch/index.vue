<template>
  <el-switch
    :value="value"
    :active-text="activeText"
    :inactive-text="inactiveText"
    :disabled="disabled"
    @input="changeSwitch($event)"
  ></el-switch>
</template>

<script>
export default {
  name: 'quarkSwitch',
  props: {
    value: {},
    prop: {
      type: String
    },
    activeText: {
      type: String
    },
    inactiveText: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    changeSwitch (value) {
      this.$emit('changeSwitch', {value, key: this.prop})
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
