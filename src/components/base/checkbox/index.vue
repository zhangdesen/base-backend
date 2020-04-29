<template>
  <el-checkbox-group
    :value="value"
    :disabled="disabled"
    @input="changeCheckbox($event)">
    <el-checkbox v-for="(item,index) in source" :label="item.id" :key="index" :disabled="item.disabled">{{item.value}}</el-checkbox>
  </el-checkbox-group>
</template>

<script>
export default {
  name: 'quarkCheckbox',
  props: {
    prop: {
      type: String
    },
    value: {
      type: Array,
      default () {
        return []
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    source: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    changeCheckbox (value) {
      this.$emit('changeCheckbox', {key: this.prop, value})
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
