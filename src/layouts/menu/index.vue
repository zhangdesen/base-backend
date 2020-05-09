<template>
  <div class="aside-menu">
    <div class="wrapper">
      <div class="top">
        <h2>{{systemName}}系统</h2>
        <p>{{ this.$store.state.common.me.name }}</p>
        <div class="icon">
          <span
            class="fa fa-ls fa-phone"
            @click="handleMenuIcon('phone')"
            title="呼叫弹窗"
          ></span>
          <span
            class="fa fa-ls fa-user"
            @click="handleMenuIcon('user')"
            title="个人资料"
          ></span>
          <span
            class="fa fa-ls fa-envelope"
            @click="handleMenuIcon('notice')"
            title="系统消息"
          ></span>
          <span
            class="fa fa-ls fa-gear"
            @click="handleMenuIcon('setMenu')"
            title="设置系统菜单"
          ></span>
          <span
            class="fa fa-ls fa-book"
            @click="handleMenuIcon('confluence')"
            title="登录积聚平台"
          ></span>
          <span
            class="fa fa-ls fa-sign-out"
            @click="handleMenuIcon('logout')"
            title="安全退出"
          ></span>
        </div>
      </div>
      <div class="search-wrapper">
        <el-input
          placeholder="快速搜索"
          v-model="searchValue"
          @keyup.enter.native="globalSearch"
        >
          <i
            slot="prefix"
            style="cursor:pointer;position: absolute;top: 50%;left: 8px;transform: translateY(-50%)"
            class="el-icon-search"
            @click="globalSearch"
          ></i>
        </el-input>
      </div>
    </div>
    <vue-scroll :ops="ops">
      <el-menu
        :default-active="defaultActive"
        background-color="#2F404F"
        text-color="#A7B1C1"
        active-text-color="#fff"
        unique-opened
        @select="handleSelect"
        :style="{ height: menuHeight + 'px' }"
      >
        <app-child
          v-for="item in menuData"
          :key="item.name"
          :item-data="item"
        ></app-child>
      </el-menu>
    </vue-scroll>
    <div class="foot">
      <p>Copyright © 2010-{{ new Date().getFullYear() }}</p>
      <p>
        <a target="_blank" href="/">BaseAdmin</a> All
        Rights Reserved
      </p>
    </div>
  </div>
</template>

<script>
import Child from './child'
import vuescroll from 'vuescroll/dist/vuescroll-native'
import {systemName} from '@/config/system'

export default {
  data () {
    return {
      searchValue: '',
      defaultActive: '',
      menuHeight: '0px',
      ops: {
        bar: {
          background: '#fff',
          opacity: 0.4
        },
        rail: {
          size: '1px'
        }
      },
      systemName
    }
  },

  components: {
    'app-child': Child,
    'vue-scroll': vuescroll // window环境美化作用
  },

  computed: {
    // 获取左侧菜单
    menuData () {
      return this.$store.state.menu.menuData
    }
  },

  methods: {
    handleSelect (key, keyPath, node) {
      if (key.indexOf('http') === -1) {
        this.defaultActive = key
        this.$router.push(key)
      } else {
        this.$router.push({
          path: '/iframe',
          query: {
            title: node.$el.innerText,
            url: key
          }
        })
      }
    },

    globalSearch () {
      this.$router.push({
        path: '/iframe',
        query: {
          title: `全局搜索${this.searchValue}`,
          url: `${process.env.URL_LIST.search}/globalSearch?content=${this.searchValue}&type=ALL&page=1`
        }
      })
    },

    handleMenuIcon (type) {
      switch (type) {
        case 'user':
          this.$router.push({path: '/resetPassword'})
          break
        case 'notice':
          this.$router.push({
            path: '/iframe',
            query: {
              title: '系统公告',
              url: process.env.URL_LIST.notice
            }
          })
          break
        case 'confluence':
          window.open(process.env.URL_LIST.confluence)
          break
        case 'phone':
          this.$message.error('暂不支持')
          break
        case 'setMenu':
          this.$message.error('暂不支持')
          console.log(this.$store.state.menu.projectData)
          break
        case 'logout':
          this.$confirm('确定退出？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              location.href = process.env.URL_LIST.logout + location.origin
            })
            .catch(() => {})
          break
        default:
          break
      }
    }
  },
  mounted () {
    this.defaultActive = location.pathname
    this.menuHeight = document.body.clientHeight - 200
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  background-color: #233A48;
  color: #fff;
  margin-bottom: 10px;
  height: 140px;
   padding: 10px 14px;
   box-sizing: border-box;
  .top {
    padding-bottom:10px;
    h2 {
      font-weight: 500;
      font-size: 16px;
      margin-bottom: 6px;
    }
    .blue {
      color: #008cd6;
    }
    .orange {
      color: #F6AB00;
    }
    p {
      line-height: 24px;
      color: #8095a8;
    }
    .icon {
      span {
        width: 24px;
        height: 24px;
        line-height: 24px;
        display: inline-block;
        font-size: 13px;
        text-align: center;
        border-radius: 2px;
        color: #888;
        background: #fff;
        cursor: pointer;
      }
    }
  }
}
.foot {
  position: fixed;
  bottom: 0;
  padding: 8px 0;
  text-align: center;
  width: 220px;
  background-color: #2f404e;
  p {
    font-size: 12px;
    margin-bottom: 4px;
    color: #ccc;
    a {
      color: #ccc;
    }
  }
}
</style>
<style lang="scss">
.aside-menu {
  .el-input__inner {
    height: 30px !important;
  }
  .el-input__icon {
    line-height: 30px;
  }
  .el-menu {
    border: none;
  }
  .el-menu-item,
  .el-submenu__title {
    height: 45px !important;
    line-height: 45px !important;
  }
  .el-submenu .el-menu-item {
    height: 32px !important;
    line-height: 32px !important;
  }
  .el-submenu__title,
  .el-menu-item {
    font-size: 13px;
  }
  .is-opened {
    position: relative;
    div:after {
      content: ' ';
      width: 4px;
      display: block;
      background-color: #F6AB00;
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
    }
  }
}
</style>
