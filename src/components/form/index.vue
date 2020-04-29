<!-- 弹出框部分 -->
<template>
  <div class="form-edit">
    <el-dialog
      v-dialogDrag
      :title="dialogTitle"
      :visible="dialogVisible"
      :show-close="showClose"
      @closed="afterClose"
      :width="dialogWidth"
      @open="handleOpen"
      :before-close="beforeClose"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false">
      <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="right" @submit.native.prevent>
          <el-tabs v-if="tabForm" v-model="activeName" type="card" @tab-click="tabFormClick">
            <el-tab-pane class="tab-content" :label="item.title" :name="String(index)" :key="item.title" v-for="(item, index) in formFields">
              <formItem
                :formFields="item.children"
                :namespace="namespace"
                :formNamespace="formNamespace"
                :maxHeight="maxHeight">
                <template :slot="child.prop" v-for="child in item.children">
                  <slot :name="child.prop"></slot>
                </template>
              </formItem>
            </el-tab-pane>
          </el-tabs>
          <formItem
            v-else
            :namespace="namespace"
            :formNamespace="formNamespace"
            :formFields="formFields"
            :maxHeight="maxHeight">
            <template :slot="item.prop" v-for="item in formFields">
              <slot :name="item.prop"></slot>
            </template>
          </formItem>
        </el-form>
        <slot name="footer">
          <div class="dialog-footer" v-if="editType !== 'see'">
            <el-button size="small" @click="closeDialog">{{cancelBtnText}}</el-button>
            <el-button size="small" type="primary" @click="formConfirm()" v-preventReClick>{{confirmBtnText}}</el-button>
          </div>
        </slot>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import formItem from './formItem'

export default {
  name: 'formEdit',
  components: {
    formItem
  },
  props: {
    formFields: {
      type: Array,
      required: true
    },
    dialogWidth: {
      type: String,
      default: '680px'
    },
    maxHeight: {
      type: String,
      default: '600px'
    },
    showClose: {
      type: Boolean,
      default: true
    },
    confirmBtnText: {
      type: String,
      default: '确定'
    },
    cancelBtnText: {
      type: String,
      default: '取消'
    },
    // 是否是tab表单的形式
    tabForm: {
      type: Boolean,
      default: false
    },
    namespace: {
      type: String,
      required: true
    },
    formNamespace: {
      type: String,
      default: 'form'
    },
    formConfirmFun: {
      type: String,
      default: 'formConfirm'
    }
  },
  data () {
    return {
      activeName: '0'
    }
  },
  computed: {
    selectSource () {
      return this.$store.state[this.namespace].selectSource
    },
    dialogVisible () {
      return this.getStoreData('dialogVisible')
    },
    dialogTitle () {
      return this.getStoreData('dialogTitle')
    },
    ruleForm () {
      return this.getStoreData('ruleForm')
    },
    rules () {
      return this.getStoreData('rules')
    },
    editType () {
      return this.getStoreData('editType')
    }
  },
  methods: {

    getStoreData (key) {
      return this.$store.state[this.namespace][this.formNamespace][key]
    },

    tabFormClick (target) {
      this.$emit('tabFormClick', target)
    },

    formConfirm () {
      this.$refs.ruleForm.validate((valid, errorArray) => {
        if (valid) {
          this.$store.dispatch(`${this.namespace}/${this.formConfirmFun}`, this.formNamespace)
        } else {
          // tab跳转到没验证的部分
          if (this.tabForm) {
            this.formFields.forEach((item, index) => {
              if (item.children) {
                item.children.forEach((child) => {
                  if (child.prop === Object.keys(errorArray)[0]) {
                    this.activeName = String(index)
                  }
                })
              }
            })
          }
          return false
        }
      })
    },

    handleOpen () {
      this.$store.commit(`${this.namespace}/handleOpen`, {formFields: this.formFields, formNamespace: this.formNamespace})
      if (this.tabForm) {
        this.activeName = '0'
      }
    },

    beforeClose () {
      this.$store.commit(`${this.namespace}/beforeClose`, this.formNamespace)
    },

    closeDialog () {
      this.$store.commit(`${this.namespace}/closeDialog`, this.formNamespace)
    },

    afterClose () {
      // 关闭验证，防止在进入验证还存在
      this.$refs.ruleForm.clearValidate()
      this.$refs.ruleForm.resetFields()
      this.$store.commit(`${this.namespace}/afterClose`, this.formNamespace)
    }
  }
}
</script>

<style lang="scss" scoped>
  .form-edit {
    text-align: left;
    .dialog-footer {
      text-align: right;
    }
  }
</style>
