<template>
  <el-select
    size="small"
    :style="{width: width}"
    :value="value"
    :placeholder="placeholder"
    :multiple="multiple"
    :filterable="filterable"
    :clearable="clearable"
    :collapse-tags="collapseTags"
    :disabled="disabled"
    @input="changeSelect($event, prop, multiple, field)"
    :filter-method="pinyinMatch"
    @visible-change="visibleChange">
    <el-option
      v-for="item in cloneSource"
      :key="item[defaultProps.id]"
      :label="item[defaultProps.value]"
      :value="item[defaultProps.id]"
      :disabled="item.disabled"
    ></el-option>
  </el-select>
</template>

<script>
import PinyinMatch from 'pinyin-match'
export default {
  name: 'quarkSelect',
  props: {
    prop: {
      type: String
    },
    value: {

    },
    placeholder: {
      type: String
    },
    field: {
      type: String
    },
    clearable: {
      type: Boolean,
      default: true
    },
    filterable: {
      type: Boolean,
      default: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    collapseTags: {
      type: Boolean,
      default: false
    },
    source: {
      type: Array
    },
    width: {
      type: String
    },
    defaultProps: {
      type: Object,
      default () {
        return {
          id: 'id',
          value: 'value'
        }
      }
    }
  },
  data () {
    return {
      cloneSource: []
    }
  },
  methods: {
    pinyinMatch (value) {
      if (value) {
        let results = []
        this.source.forEach((item) => {
          let isMatch = PinyinMatch.match(item.value, value)
          if (isMatch) {
            results.push(item)
          }
        })
        this.cloneSource = JSON.parse(JSON.stringify(results))
      } else {
        this.cloneSource = JSON.parse(JSON.stringify(this.source))
      }
    },
    visibleChange (value) {
      if (value) this.cloneSource = JSON.parse(JSON.stringify(this.source)) // 打开下拉时重置
    },
    changeSelect (value) {
      this.$emit('changeSelect', {key: this.prop, value: value, multiple: this.multiple, field: this.field})
    }
  },
  created () {
    this.cloneSource = this.source
  },
  watch: {
    source (newValue) {
      this.cloneSource = newValue
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
