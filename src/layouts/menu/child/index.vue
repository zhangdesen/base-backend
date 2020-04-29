<template>
  <div>
    <el-menu-item v-if="itemData.subMenus == null" :index="itemData.url">
      <span v-if="itemData.icon" :class="['fa', itemData.icon, 'fa-ls']"></span>
      <span> {{ itemData.name }}</span>
    </el-menu-item>
    <el-submenu v-if="itemData.subMenus != null" :index="itemData.name">
      <template slot="title">
        <i v-if="itemData.icon" :class="['fa', itemData.icon, 'fa-ls']"></i>
        <span> {{ itemData.name }}</span>
      </template>
      <!--调用组件自身，循环item的children，实现递归  Number(itemData.index)-->
      <child
        v-for="(item) in itemData.subMenus"
        :key="item.name"
        :item-data="item"
      ></child>
    </el-submenu>
  </div>
</template>

<script>
export default {
  name: 'child',

  props: {
    itemData: {
      type: Object,
      default () {
        return {}
      },
      required: true
    }
  }
}
</script>

<style scoped></style>
