<template>
  <el-breadcrumb separator="/" class="breadcrumb">
    <el-breadcrumb-item :to="{ path: item.path, query: item.query }" v-for="(item, index) in data" :key="index">{{item.name}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'quarkBreadcrumb',
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.breadcrumb{
  margin-bottom: 10px;
}
</style>
