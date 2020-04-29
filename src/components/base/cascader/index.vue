<template>
  <el-cascader
    size="small"
    :style="{width: width}"
    :options="options"
    :value="value"
    :filterable="filterable"
    :clearable="clearable"
    :change-on-select="changeOnSelect"
    :props="defaultProps"
    :disabled="disabled"
    @input="changeCascader($event, prop)"
  ></el-cascader>
</template>

<script>
export default {
  name: 'quarkCascader',
  props: {
    options: {
      type: Array
    },
    prop: {
      type: String
    },
    field: {
      type: String
    },
    value: {
      type: Array,
      default () {
        return []
      }
    },
    clearable: {
      type: Boolean,
      default: true
    },
    filterable: {
      type: Boolean,
      default: true
    },
    changeOnSelect: {
      type: Boolean,
      default: true
    },
    defaultProps: {
      type: Object,
      default () {
        return {
          label: 'name',
          value: 'id'
        }
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    width: {
      type: String
    }
  },
  methods: {
    changeCascader (value) {
      this.$emit('changeCascader', {key: this.prop, value: value, field: this.field})
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
