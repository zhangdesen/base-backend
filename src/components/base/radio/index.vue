<template>
  <el-radio-group
    size="medium"
    :style="{width: width}"
    :value="value"
    @input="changeRadio($event)"
    :disabled="disabled">
    <el-radio v-for="(item,index) in source" :label="item.id" :key="index">{{item.value}}</el-radio>
  </el-radio-group>
</template>

<script>
export default {
  name: 'quarkRadio',
  props: {
    prop: {
      type: String
    },
    value: {},
    disabled: {
      type: Boolean,
      default: false
    },
    source: {
      type: Array,
      default () {
        return []
      }
    },
    width: {
      type: String
    }
  },
  methods: {
    changeRadio (value) {
      this.$emit('changeRadio', {value, key: this.prop})
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
