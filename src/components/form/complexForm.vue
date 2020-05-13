<template>
  <div class="form-edit complex-form">
    <quarkBreadcrumb :data="breadcrumbList" v-if="showBcrumb"></quarkBreadcrumb>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="right" @submit.native.prevent :style="{width: width}">
      <template v-if="isChildren">
        <div v-for="itemParent in formFields" :key="itemParent.prop">
        <span class="title" :key="itemParent.title" :id="itemParent.id" v-if="itemParent.title">{{itemParent.title}}</span>
        <div class="item-container">
          <formItem
            :labelWidth="labelWidth"
            :namespace="namespace"
            :formNamespace="formNamespace"
            :formFields="itemParent.children">
            <template :slot="item.prop" v-for="item in formFields">
              <slot :name="item.prop"></slot>
            </template>
          </formItem>
        </div>
      </div>
      </template>
      <formItem
        v-else
        :labelWidth="labelWidth"
        :namespace="namespace"
        :formNamespace="formNamespace"
        :formFields="formFields">
        <template :slot="item.prop" v-for="item in formFields">
          <slot :name="item.prop"></slot>
        </template>
      </formItem>
    </el-form>
    <slot name="footer">
      <div class="complex-footer" v-if="editType !== 'see'">
        <el-button size="medium" @click="closeComplexForm" v-if="showCloseBtn">{{closeBtnText}}</el-button>
        <el-button size="medium" type="primary" @click="complexFormConfirm()" v-preventReClick>{{confirmBtnText}}</el-button>
      </div>
    </slot>
  </div>
</template>

<script>
import formItem from './formItem'

export default {
  name: 'complexForm',
  components: {
    formItem
  },
  props: {
    width: {
      type: String,
      default: '600px'
    },
    formFields: {
      type: Array,
      required: true
    },
    labelWidth: {
      type: String,
      default: '140px'
    },
    confirmBtnText: {
      type: String,
      default: '确定'
    },
    closeBtnText: {
      type: String,
      default: '取消'
    },
    showCloseBtn: {
      type: Boolean,
      default: true
    },
    namespace: {
      type: String,
      required: true
    },
    formNamespace: {
      type: String,
      default: 'complexForm'
    },
    formConfirmFun: {
      type: String,
      default: 'complexFormConfirm'
    },
    showBcrumb: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isChildren: true
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
    },
    breadcrumbList () {
      return this.$store.state[this.namespace].breadcrumbList
    }
  },
  methods: {

    getStoreData (key) {
      return this.$store.state[this.namespace][this.formNamespace][key]
    },

    complexFormConfirm () {
      this.$refs.ruleForm.validate((valid, errorArray) => {
        if (valid) {
          this.$store.dispatch(`${this.namespace}/${this.formConfirmFun}`, {formNamespace: this.formNamespace, fullPath: this.$route.fullPath, parentStore: this.$route.query.parentStore, parentId: this.$route.query.parentId, url: this.$route.query.url})
        } else {
          this.$nextTick(() => {
            const firstError = document.getElementsByClassName('el-form-item__error')[0].parentNode // 获取定位的节点
            document.getElementsByClassName('el-main')[0].scrollTo(0, firstError.offsetTop - 90)
          })
          return false
        }
      })
    },

    closeComplexForm () {
      this.$store.dispatch(`${this.namespace}/closeComplexForm`, {formNamespace: this.formNamespace, fullPath: this.$route.fullPath, parentStore: this.$route.query.parentStore, parentId: this.$route.query.parentId, url: this.$route.query.url})
    }
  },
  created () {
    this.$store.commit(`${this.namespace}/handleOpen`, {formFields: this.formFields, formNamespace: this.formNamespace, namespace: this.namespace})
    this.isChildren = this.formFields.some((item) => {
      return item && item.title && item.children.length
    })
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/element-variables.scss';
.complex-form {
    text-align: left;
    .title {
      display: block;
      font-size: 16px;
      font-weight: 400;
      border-bottom: 1px dashed $--disabled-border-base;
      margin-bottom: 22px;
      padding-top: 32px;
      color: $--color-text-primary;
      padding-bottom: 12px;
      margin-left: 20px;
      box-sizing: border-box;
    }
    .item-container {
      display: flex;
      flex-wrap: wrap;
    }
    .complex-footer {
      display: flex;
      justify-content: center;
      width: 100%;
      text-align: center;
    }
  }
</style>
