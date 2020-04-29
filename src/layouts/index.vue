<template>
  <div class="container">
    <el-container>
      <el-aside width="220px" v-if="!$store.state.common.externalSearch">
        <app-menu></app-menu>
      </el-aside>
      <el-container>
        <el-header height="90px" v-if="!$store.state.common.externalSearch">
          <app-header></app-header>
        </el-header>
        <el-main :class="{ 'padding0': $store.state.common.externalSearch }">
          <!-- 不加动画效果 -->
          <keep-alive :include="include">
            <router-view :key="$route.fullPath.split('#')[0]"></router-view>
          </keep-alive>
          <!-- <transition name="fade-transform" mode="out-in">
            多了split('#')是为了防止url包含hash成为独立页面
            <keep-alive :include="include">
              <router-view :key="$route.fullPath.split('#')[0]"></router-view>
            </keep-alive>
          </transition> -->
          <iframe width="100%" height="100%" frameborder="0" scrolling="auto" :src="item.url" v-for="item in iframeArr" :key="item.id" v-show="$route.query.url === item.url" :name="'iframe_' + item.id" :data-id="item.id" :data-master-id="param2Obj(item.url).parentId"></iframe>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from './header'
import Menu from './menu'
import { param2Obj } from '@/utils/fun'

export default {
  components: {
    'app-header': Header,
    'app-menu': Menu
  },
  computed: {
    include () {
      return this.$store.state.cache.cacheArr
    },
    iframeArr () {
      return this.$store.state.cache.iframeArr
    }
  },
  methods: {
    param2Obj (url) {
      return param2Obj(url)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-container,
.container {
  height: 100%;
}

.el-header {
  padding: 0;
}

.el-aside {
  background-color: #2f404f;
}

.el-main {
  padding: 15px;
  height: 100%;
  width: 100%;
  background-color: #fff;
}
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all .5s;
}
.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}
.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.padding0{
  padding: 0;
}
</style>
