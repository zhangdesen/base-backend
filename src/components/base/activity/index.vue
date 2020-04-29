<template>
  <div class="wrapper">
    <el-form-item v-for="item in children" :key="item.prop" :prop="item.prop">
      <span class="item">{{item.label}}
        <quarkInput
          :type="item.type"
          :prop="item.prop"
          :value="value[item.prop]"
          :placeholder="item.placeholder"
          :width="item.width"
          :disabled="disabled"
          @changeInput="changeInput($event, item.prop)"
        ></quarkInput>
      </span>
    </el-form-item>
  </div>
</template>

<script>
import quarkInput from '../input'
export default {
  name: 'quarkActivity',
  components: {
    quarkInput
  },
  props: {
    children: {
      type: Array,
      default () {
        return []
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: Object
    }
  },
  methods: {
    changeInput (value, key) {
      this.$emit('changeInput', {key, value})
    }
  }
}
</script>

<style lang="scss" scoped>
  .wrapper {
    display: flex;
    .item{
      margin-right: 10px;
    }
  }
</style>
