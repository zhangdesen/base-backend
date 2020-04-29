<template>
  <el-popover placement="top" width="180" trigger="hover">
    <div class="createBy-wrapper">
      <div class="item">
        <span class="title">名字：</span>
        <span>{{name}}</span>
      </div>
      <div class="item">
        <span class="title">类型：</span>
        <span>{{type}}</span>
      </div>
      <div class="item">
        <span class="title">ID：</span>
        <span>{{id}}</span>
      </div>
      <div class="item">
        <span class="title">原值：</span>
        <span>{{userName}}</span>
      </div>
    </div>
    <a href="javascript:;" slot="reference">{{name}}</a>
  </el-popover>
</template>

<script>
export default {
  name: 'quarkUser',
  props: {
    userName: {
      type: String
    }
  },
  methods: {
    splitName () {
      let data = this.userName // 'S_5999_超级_管理员_管理员'
      if (data) {
        if (data.indexOf('_') !== -1) {
          data = data.split('_')
          let len = data.length
          let data2 = []
          if (data.length > 3) {
            for (let i = 2; i < len; i++) {
              data2.push(data[i])
            }
            data[2] = data2.join('_')
          }
        } else {
          data = [null, null, data]
        }
      } else {
        data = null
      }
      return data
    }
  },
  computed: {
    name () {
      const data = this.splitName()
      return data && data.length && data[2]
    },
    id () {
      const data = this.splitName()
      return data && data.length && data[1]
    },
    type () {
      const data = this.splitName()
      const type = data && data.length && data[0]
      switch (type) {
        case 'M':
          return '成员'
        case 'U':
          return '用户'
        case 'S':
          return '员工'
        case 'A':
          return '系统'
        default:
          return type
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.createBy-wrapper {
  overflow: auto;
  display: block;
  border: 1px solid #EBEBEB;
  font-size: 12px;
  .item{
    border-bottom: 1px solid #EBEBEB;
    height: 32px;
    line-height: 32px;
    padding: 0 4px;
    .title{
      border-right: 1px solid #EBEBEB;
      min-width: 40px;
      display: inline-block;
    }
    &:last-child{
      border-bottom: none;
    }
  }
}
</style>
