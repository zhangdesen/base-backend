<template>
  <el-input
    v-input-enter="type"
    size="small"
    :type="inputType"
    :style="{width: width}"
    :data-prop="prop"
    :clearable="clearable"
    :readonly="readonly"
    :value="value"
    :placeholder="placeholder"
    :disabled="disabled"
    :show-word-limit="showWordLimit"
    :maxlength="maxlength"
    :autosize="autosize"
    @input="changeInput($event)"
    @keyup.enter.native="keyUpEnter(value)">
    <template slot="append" v-if="append">{{append}}</template>
  </el-input>
</template>

<script>
export default {
  name: 'quarkInput',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    prop: {
      type: String
    },
    value: {},
    placeholder: {
      type: String
    },
    clearable: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    append: {
      type: String
    },
    readonly: {
      type: Boolean,
      default: false
    },
    width: {
      type: String
    },
    showWordLimit: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: Number
    },
    autosize: {
      type: Object,
      default () {
        return {
          minRows: 2, maxRows: 6
        }
      }
    }
  },
  computed: {
    inputType () {
      if (this.type === 'textarea') return 'textarea'
      if (this.type === 'number' || this.type === 'int' || this.type === 'float' || this.type === 'money' || this.type === 'positive') return 'number'
      return 'text'
    }
  },
  methods: {
    keyUpEnter () {
      this.$emit('keyUpEnter')
    },
    changeInput (value) {
      this.$emit('changeInput', {key: this.prop, value})
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
