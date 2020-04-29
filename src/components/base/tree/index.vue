<template>
  <el-tree
    :data="data"
    :show-checkbox="showCheckbox"
    :highlight-current="highlightCurrent"
    :default-expand-all="defaultExpandAll"
    :node-key="nodeKey"
    :default-checked-keys="defaultCheckedKeys"
    :props="defaultProps"
    @check="changeTree(arguments)"
  ></el-tree>
</template>

<script>
export default {
  name: 'quarkTree',
  props: {
    prop: {
      type: String
    },
    value: {},
    source: {
      type: Array,
      default () {
        return []
      }
    },
    showCheckbox: {
      type: Boolean,
      default: true
    },
    highlightCurrent: {
      type: Boolean,
      default: true
    },
    defaultExpandAll: {
      type: Boolean,
      default: true
    },
    nodeKey: {
      type: String,
      default: 'id'
    },
    childrenText: {
      type: String,
      default: 'children'
    },
    defaultProps: {
      type: Object,
      default () {
        return {
          children: 'sonAreaTreeInfo',
          label: 'name'
        }
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    defaultCheckedKeys: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    data () {
      if (this.disabled) {
        this.setDisabled(this.source)
      }
      return this.source
    }
  },
  methods: {
    changeTree (value) {
      this.$emit('changeTree', {value, key: this.prop})
    },
    setDisabled (data) {
      data.forEach((item) => {
        item.disabled = true
        if (item[this.childrenText] && item[this.childrenText].length) {
          this.setDisabled(item[this.childrenText])
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
