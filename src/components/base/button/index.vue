<template>
  <el-tooltip
    v-if="isPermission"
    class="item"
    effect="dark"
    content="当前没有权限，请联系管理员"
    placement="top"
  >
  <!-- 设置disabled后tooltip后不能使用，所以直接加个class -->
    <el-button
      class="is-disabled"
      :size="size"
      :type="type"
      :plain="plain"
      :round="round"
      :circle="circle"
      :loading="loading"
      :disabled="disabled"
      :icon="icon"
      :autofocus="autofocus"
      :nativeType="nativeType"
      @click="handleClick"
    >
      <span v-if="$slots.default"><slot></slot></span>
    </el-button>
  </el-tooltip>
  <el-button
    v-else
    :size="size"
    :type="type"
    :plain="plain"
    :round="round"
    :circle="circle"
    :loading="loading"
    :disabled="disabled"
    :icon="icon"
    :autofocus="autofocus"
    :nativeType="nativeType"
    @click="handleClick"
  >
    <span v-if="$slots.default"><slot></slot></span>
  </el-button>
</template>

<script>
export default {
  name: 'quarkButton',
  props: {
    size: {
      type: String,
      default: 'mini',
      validator (value) {
        return ['medium', 'small', 'mini'].indexOf(value) !== -1
      }
    },
    type: {
      type: String,
      default: 'primary',
      validator (value) {
        return (
          ['primary', 'success', 'warning', 'danger', 'info', 'text'].indexOf(
            value
          ) !== -1
        )
      }
    },
    plain: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    circle: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    nativeType: {
      type: String,
      default: 'button',
      validator (value) {
        return ['button', 'submit', 'reset'].indexOf(value) !== -1
      }
    },
    permissionList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      isPermission: false
    }
  },
  methods: {
    handleClick (e) {
      if (this.isPermission) return e.preventDefault()
      this.$emit('click', e)
    }
  },
  created () {
    const currentPermissionList = this.$store.state.permission[this.$route.fullPath] || []
    if (!(this.permissionList.every(elem => currentPermissionList.indexOf(elem) > -1))) {
      this.isPermission = true
    }
  }
}
</script>
<style lang="scss" scoped></style>
