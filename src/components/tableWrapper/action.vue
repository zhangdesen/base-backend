<template>
  <div class="action-wrapper" id="actions" v-if="showAction">
    <slot name="actionslot">
      <quark-button @click="createForm" :permissionList="createPermission">新增</quark-button>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'Action',
  props: {
    showAction: {
      type: Boolean,
      default: true
    },
    createPermission: {
      type: Array
    },
    namespace: {
      required: true
    },
    formNamespace: {
      type: String
    }
  },
  methods: {
    createForm () {
      this.$store.dispatch(`${this.namespace}/createForm`, this.formNamespace)
    }
  }
}
</script>

<style scoped lang="scss">
.action-wrapper {
  padding: 8px;
  border: 1px solid #ddd;
  border-bottom: none;
  position: relative;
}
</style>
