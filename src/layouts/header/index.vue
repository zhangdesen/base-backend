<template>
  <div>
    <div class="tab-system">
      <el-tabs
        v-model="activeName"
        id="sys"
        :class="[sysPrev ? 'sysPrev' : '', sysNext ? 'sysNext' : '']"
      >
        <el-tab-pane
          v-for="item in projectData"
          :key="item.key"
          :label="item.name"
          :name="item.name"
        >
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="tab-item">
      <el-tabs
        v-model="currentPath"
        type="border-card"
        closable
        @tab-click="tabClick"
        @tab-remove="tabRemove"
      >
        <el-tab-pane
          v-for="item in options"
          :key="item.path"
          :label="item.name"
          :name="item.path"
        >
        </el-tab-pane>
      </el-tabs>

      <div class="right-wrapper">
        <a href="javascript:;" class="logout" @click="logout">
          <span
            class="fa fa-sign-out fa-ls"
            style="font-size: 14px;margin-right: 2px"
          ></span
          >退出
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sysPrev: true,
      sysNext: false
    }
  },
  computed: {
    projectData () {
      return this.$store.state.menu.projectData
    },

    activeName: {
      get () {
        return this.$store.state.menu.activeName
      },
      set (val) {
        this.$store.commit('changeProject', val)
      }
    },

    // 获取tab数组
    options () {
      return this.$store.state.menu.options
    },

    currentPath: {
      get () {
        return this.$store.state.menu.currentPath
      },
      set (val) {
        this.$store.commit('setCurrentPath', val)
      }
    }
  },
  methods: {
    logout () {
      this.$confirm('确定退出？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          location.href = process.env.URL_LIST.logout + location.origin
        })
        .catch(() => {})
    },
    tabClick () {
      let path = this.currentPath
      this.$router.push({
        path: path
      })
    },
    tabRemove (path) {
      this.$store.commit('tabRemove', {path, url: this.$route.query.url})
    },
    // 判断元素是否在可视区域内
    isElementInViewport (el, rt) {
      let rect = el.getBoundingClientRect()
      return (
        rect.left > 250 &&
        rect.right <=
          (window.innerWidth - rt || document.documentElement.clientWidth - rt)
      )
    }
  },
  mounted () {
    let sys = document.getElementById('sys')
    let sysIcon = sys.getElementsByClassName('el-tabs__nav-wrap')[0]
    let sysContent = sys.getElementsByClassName('el-tabs__nav')[0]
    sysIcon.addEventListener('click', e => {
      if (e.target.nodeName === 'SPAN' || e.target.nodeName === 'I') {
        setTimeout(() => {
          this.sysPrev = this.isElementInViewport(sysContent.childNodes[1], 30)
          this.sysNext = this.isElementInViewport(
            sysContent.childNodes[sysContent.childNodes.length - 1],
            30
          )
        }, 300)
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.right-wrapper {
  position: absolute;
  height: 43px;
  line-height: 43px;
  top: 50%;
  transform: translateY(-49%);
  right: 0;
  z-index: 2;
  font-size: 14px;
  background: #fff;
  color: #909399;
  border-top: 1px solid #efefef;
  border-bottom: solid 2px #2f4050;
  .logout {
    width: 64px;
    text-align: center;
    outline: 0;
    color: #909399;
    display: inline-block;
    height: 39px;
    border-left: solid 1px #eee;
  }
}
</style>
<style lang="scss">
.tab-system {
  height: 50px;
  line-height: 50px;
  padding: 0;
  background-color: #f3f3f4;
  position: relative;
  div {
    color: #666;
  }
  .el-tabs__active-bar {
    top: 0;
  }
  .el-tabs__nav-wrap::after {
    top: 0;
  }
  .el-tabs__content {
    display: none;
  }
  .el-tabs__item {
    color: #666;
  }
}
.el-tabs__nav-next, .el-tabs__nav-prev{
  font-size: 20px !important;
  padding: 0 5px;
}
.el-tabs__nav-wrap.is-scrollable{
  padding: 0 32px !important;
}
#sys.sysPrev{
  .el-tabs__nav-prev{
    color: #f3f3f4;
  }
}
#sys.sysNext{
  .el-tabs__nav-next{
    color: #f3f3f4;
  }
}
.tab-item {
  position: relative;
  padding-right: 60px;
  z-index: 2;
  .el-tabs__nav-wrap {
    border-bottom: solid 2px #2f4050;
  }
  .el-tabs__nav{
    div:first-child{
      span{
        display: none;
      }
    }
  }
  .el-tabs--card,
  .el-tabs--border-card {
    box-shadow: none;
    border: 1px solid #EFEFEF;
    height: 40px;
    .el-tabs__header {
      background-color: #fafafa;
    }
  }
  .el-tabs--card>.el-tabs__header .el-tabs__item,
  .el-tabs--border-card>.el-tabs__header .el-tabs__item {
    border: none;
    &:not(.is-disabled):hover {
      color: #777;
      background: #f2f2f2;
    }
  }
  .el-tabs--card>.el-tabs__header .el-tabs__item.is-active,
  .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
    color: #A7B1C1;
    background-color: #2f404f;
    &:hover {
      color: #fff;
      background-color: #2f404f;
    }
  }
  .el-tabs__content{
    display: none;
  }
}
</style>
