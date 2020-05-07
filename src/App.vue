<template>
  <div id="app">
     <Layouts/>
  </div>
</template>

<script>
import layouts from '@/layouts'
import iframe from './mixins/iframe'
export default {
  name: 'App',
  mixins: [iframe],
  components: {
    Layouts: layouts
  }
}
</script>

<style>
#app{
  height: 100%;
  min-width: 720px
}
body .el-table th.gutter {
  display: table-cell !important;
}
</style>
