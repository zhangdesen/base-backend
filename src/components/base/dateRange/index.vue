<template>
  <div>
    <el-date-picker
      :style="{width: firstDate.width}"
      :value="firstDateValue"
      :type="firstDate.dateType || 'date'"
      :placeholder="firstDate.placeholder"
      :picker-options="firstDate.pickerOptions"
      :disabled="firstDate.disabled"
      @input="changeDate($event, firstDate.prop)"
    ></el-date-picker>
    {{splitName}}
    <el-date-picker
      :style="{width: lastDate.width}"
      :value="lastDateValue"
      :type="lastDate.dateType || 'date'"
      :placeholder="lastDate.placeholder"
      :picker-options="lastDate.pickerOptions"
      :disabled="lastDate.disabled"
      @input="changeDate($event, lastDate.prop)"
    ></el-date-picker>
  </div>
</template>

<script>
export default {
  name: 'quarkDateRange',
  props: {
    firstDate: {
      type: Object
    },
    firstDateValue: {},
    lastDate: {
      type: Object
    },
    lastDateValue: {},
    splitName: {
      type: String,
      default: '-'
    }
  },
  methods: {
    changeDate (value, key) {
      this.$emit('changeDate', {key, value})
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
