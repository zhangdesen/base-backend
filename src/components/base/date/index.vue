<template>
  <el-date-picker
    size="small"
    align="right"
    :style="{width: width}"
    :type="dateType"
    :value="value"
    :unlink-panels="unlinkPanels"
    range-separator="~"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    :picker-options="pickerOptions"
    @input="changeDate($event)"
    @change="changeDateConfirm($event)"
    :disabled="disabled"
  ></el-date-picker>
</template>

<script>
export default {
  name: 'quarkDate',
  props: {
    dateType: {
      type: String,
      default: 'date'
    },
    prop: {
      type: String
    },
    firstDate: {
      type: Object
    },
    lastDate: {
      type: Object
    },
    value: {},
    unlinkPanels: {
      type: Boolean,
      default: true
    },
    pickerOptions: {
      type: Object
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
    changeDate (value) {
      this.$emit('changeDate', {key: this.prop, value: value, firstDate: this.firstDate ? this.firstDate.prop : null, lastDate: this.lastDate ? this.lastDate.prop : null})
    },
    changeDateConfirm (value) {
      this.$emit('changeDateConfirm', value, this.prop, this.firstDate ? this.firstDate.prop : null, this.lastDate ? this.lastDate.prop : null)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
