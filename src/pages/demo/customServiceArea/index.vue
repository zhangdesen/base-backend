<template>
  <!-- 测试缓存 -->
  <div>
    <h2>{{ this.$route.meta.title }},包含缓存测试</h2>
    <el-input v-model="value"></el-input>
  </div>
</template>
<script>
export default {
  name: 'customServiceArea',
  data () {
    return {
      value: ''
    }
  },
  created () {
    this.$http['DEMO']()
  }
}
</script>
<style lang="scss" scoped></style>
