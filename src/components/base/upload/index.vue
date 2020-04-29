<template>
  <div :style="{width: width}" class="images-container">
    <el-form-item v-for="item in currentChildren" :key="item.prop" :prop="item.prop">
      <el-upload
        class="images-upload"
        :with-credentials="withCredentials"
        :headers="headers"
        :drag="drag"
        :accept="accept"
        :action="uploadUrl"
        :multiple="multiple"
        :name="name"
        :show-file-list="showFileList"
        :file-list="fileList"
        :disabled="disabled"
        :limit="limit"
        :auto-upload="autoUpload"
        :data="{key:item.prop}"
        :http-request="picUpload"
        :on-exceed="onExceed">
        <template v-if="!$slots.trigger">
          <i class="el-icon-plus" v-if="!ruleForm[item.prop]"></i>
          <div class="el-upload__text" v-if="!ruleForm[item.prop]">{{item.label}}</div>
          <img :src="ruleForm[item.prop]">
        </template>
        <slot name="trigger"></slot>
      </el-upload>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: 'quarkUpload',
  props: {
    value: {
      type: String | Object
    },
    prop: {
      type: String
    },
    ruleForm: {
      type: Object
    },
    showFileList: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    accept: {
      type: String,
      default: 'image/jpeg,image/png,image/jpg'
    },
    uploadUrl: {
      type: String,
      default: process.env.API_HOST_LIST.base_url + '/common/fileUpload'
    },
    name: {
      type: String,
      default: 'file'
    },
    drag: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    children: {
      type: Array,
      default () {
        return []
      }
    },
    limit: {
      type: Number
    },
    withCredentials: {
      type: Boolean,
      default: true
    },
    headers: {
      type: Object,
      default () {
        return {
          'X-Requested-With': 'XMLHttpRequest'
        }
      }
    },
    autoUpload: {
      type: Boolean,
      default: true
    },
    width: {
      type: String
    },
    fileList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    currentChildren () {
      if (!this.children.length) {
        return [
          {
            prop: this.prop
          }
        ]
      }
      return this.children
    }
  },
  methods: {
    picUpload (item) {
      const key = item.data.key
      this.$emit('picUpload', {key, value: item.file})
    },
    onExceed () {
      this.$message.error(`最多上传${this.limit}张图片,请删除无用图片再重新上传`)
    }
  }
}
</script>

<style lang="scss" scoped>
  .images-container {
    display: flex;
    flex-wrap: wrap;
    .images-upload {
      width: 148px;
      height: 148px;
      margin-right: 10px;
      .el-icon-plus{
        font-size: 28px;
        color: #8c939d;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      img{
        height: 100%;
        object-fit: contain;
      }
    }
    .el-upload__text {
      position: absolute;
      top: 10%;
      left: 42%;
      transform: translate(-10%, -42%);
    }
  }

</style>
