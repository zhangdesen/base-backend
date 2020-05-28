<template>
  <div class="form-item" :style="{maxHeight: maxHeight}">
    <template v-for="item in formFields">
      <el-form-item
        size="medium"
        :key="item.prop"
        v-if="item.show !== false ? (editType === 'edit' ? item.editShow !== false : editType === 'see' ? item.seeShow !== false : editType === 'create' ? item.createShow !== false : true) : false"
        :prop="item.prop"
        :label-width="item.label ? labelWidth : '0px'"
       >
      <template slot="label">
         <component v-if="item.labelRender" v-bind:is="item.labelRender"></component>
         <span class="mr8" v-else>{{item.label ? item.label + '：' : ''}}</span>
      </template>
      <slot :name="item.prop">
        <!--输入框-->
        <quarkInput
          v-if="item.type === 'text' || item.type === 'number' || item.type === 'int' || item.type === 'money' || item.type === 'positive' || item.type === 'textarea'"
          :type="item.type"
          :prop="item.prop"
          :value="ruleForm[item.prop]"
          :placeholder="item.placeholder"
          :append="item.append"
          :width="item.width"
          :showWordLimit="item.showWordLimit"
          :maxlength="item.maxlength"
          :autosize="item.autosize"
          :disabled="item.disabled ? true : editType === 'see' ? true : editType === 'edit' ? item.editDisabled : item.createDisabled"
          @changeInput="changeInput"
        ></quarkInput>
        <!--展示内容-->
        <quarkTxt
          v-else-if="item.type === 'txt'"
          :color="item.color"
          :width="item.width"
          :prop="item.prop"
          :value="ruleForm[item.prop]"
        ></quarkTxt>
        <!--下拉框-->
        <quarkSelect
          v-else-if="item.type === 'select'"
          :prop="item.prop"
          :field="item.field"
          :value="ruleForm[item.prop]"
          :source="selectSource[item.source]"
          :multiple="item.multiple"
          :width="item.width"
          :defaultProps="item.defaultProps"
          :disabled="item.disabled ? true : editType === 'see' ? true : editType === 'edit' ? item.editDisabled : item.createDisabled"
          @changeSelect="changeSelect"
        ></quarkSelect>
        <!--日期-->
        <quarkDate
          v-else-if="item.type === 'date'"
          :prop="item.prop"
          :firstDate="item.firstDate"
          :lastDate="item.lastDate"
          :value="ruleForm[item.prop]"
          :width="item.width"
          :dateType="item.dateType"
          :pickerOptions="item.pickerOptions"
          :disabled="item.disabled ? true : editType === 'see' ? true : editType === 'edit' ? item.editDisabled : item.createDisabled"
          @changeDate="changeDate"
        ></quarkDate>
        <!--日期区间分开-->
        <quarkDateRange
          v-else-if="item.type === 'dateRange'"
          :firstDate="item.firstDate"
          :firstDateValue="ruleForm[item.firstDate.prop]"
          :lastDate="item.lastDate"
          :lastDateValue="ruleForm[item.lastDate.prop]"
          :splitName="item.splitName"
        ></quarkDateRange>
        <!--Tree 树形控件-->
        <quarkTree
          v-else-if="item.type === 'tree'"
          :prop="item.prop"
          :value="ruleForm[item.prop]"
          :source="selectSource[item.source]"
          :nodeKey="item.nodeKey"
          :defaultProps="item.defaultProps"
          :childrenText="item.childrenText"
          :defaultCheckedKeys="defaultCheckedKeys"
          :disabled="item.disabled ? true : editType === 'see' ? true : editType === 'edit' ? item.editDisabled : item.createDisabled"
          @changeTree="changeTree">
        </quarkTree>
        <!--级联框-->
        <quarkCascader
          v-else-if="item.type === 'cascader'"
          :prop="item.prop"
          :field="item.field"
          :value="ruleForm[item.prop]"
          :options="selectSource[item.source]"
          :defaultProps="item.defaultProps"
          :disabled="item.disabled ? true : editType === 'see' ? true : editType === 'edit' ? item.editDisabled : item.createDisabled"
          @changeCascader="changeCascader"
        ></quarkCascader>
        <!--Switch 开关-->
        <quarkSwitch
          v-else-if="item.type === 'switch'"
          :prop="item.prop"
          :value="ruleForm[item.prop]"
          :activeText="item.activeText"
          :inactiveText="item.inactiveText"
          :disabled="item.disabled ? true : editType === 'see' ? true : editType === 'edit' ? item.editDisabled : item.createDisabled"
          @changeSwitch="changeSwitch"
        ></quarkSwitch>
        <!--Radio 单选框-->
        <quarkRadio
          v-else-if="item.type === 'radio'"
          :width="item.width"
          :prop="item.prop"
          :value="ruleForm[item.prop]"
          :source="selectSource[item.source]"
          :disabled="item.disabled ? true : editType === 'see' ? true : editType === 'edit' ? item.editDisabled : item.createDisabled"
          @changeRadio="changeRadio"
        ></quarkRadio>
        <!--Checkbox 多选框-->
        <quarkCheckBox
          v-else-if="item.type === 'checkbox'"
          :prop="item.prop"
          :value="ruleForm[item.prop]"
          :source="selectSource[item.source]"
          :disabled="item.disabled ? true : editType === 'see' ? true : editType === 'edit' ? item.editDisabled : item.createDisabled"
          @changeCheckbox="changeCheckbox"
        ></quarkCheckBox>
        <!--Upload 上传-->
        <quarkUpload
          v-else-if="item.type === 'upload'"
          width="350px"
          :prop="item.prop"
          :children="item.children"
          :limit="item.limit"
          :accept="item.accept"
          :multiple="item.multiple"
          :uploadUrl="item.uploadUrl"
          :drag="item.drag"
          :ruleForm="ruleForm"
          :disabled="item.disabled ? true : editType === 'see' ? true : editType === 'edit' ? item.editDisabled : item.createDisabled"
          @picUpload="picUpload"
        ></quarkUpload>
        <!-- table-->
        <quarkTable
          v-else-if="item.type === 'table'"
          :width="item.width"
          :dataFields="item.dataFields"
          :showIndex="item.showIndex"
          :showRadio="item.showRadio"
          :showCheckBox="item.showCheckBox"
          :height="item.height"
          :namespace="namespace"
          :formNamespace="formNamespace"
        ></quarkTable>
        <!--表格带搜索分页功能-->
        <table-wrapper
          v-else-if="item.type === 'tableWrapper'"
          :width="item.width"
          :dataFields="item.dataFields"
          :searchFields="item.searchFields"
          :showIndex="item.showIndex"
          :showRadio="item.showRadio"
          :showCheckBox="item.showCheckBox"
          ::defaultSort="item.defaultSort"
          :showPagination="item.showPagination"
          :showAction="item.showAction"
          :showSearch="item.showSearch"
          :height="item.height"
          :small="small"
          :namespace="namespace"
          :formNamespace="formNamespace"
          :showBcrumb="false"
        ></table-wrapper>
        <!--自定义渲染-->
        <div v-else-if="item.type === 'render'">
          <component
            v-bind:is="item.render"
            :selectSource="selectSource"
            :editType="editType"
            :ruleForm="ruleForm"
            :prop="item.prop"
            @action="tableAction"
            @changeInput="changeInput"
          ></component>
        </div>
      </slot>
    </el-form-item>
  </template>
</div>
</template>

<script>
import quarkInput from '../../base/input/index'
import quarkSelect from '../../base/select/index'
import quarkCascader from '../../base/cascader/index'
import quarkDate from '../../base/date/index'
import quarkTxt from '../../base/txt/index'
import quarkDateRange from '../../base/dateRange/index'
import quarkSwitch from '../../base/switch/index'
import quarkRadio from '../../base/radio/index'
import quarkCheckBox from '../../base/checkbox/index'
import quarkTree from '../../base/tree/index'
import quarkUpload from '../../base/upload/index'
import quarkTable from '../../tableWrapper/table'
import tableWrapper from '../../tableWrapper'
export default {
  name: 'index',
  components: {
    quarkInput,
    quarkSelect,
    quarkCascader,
    quarkDate,
    quarkTxt,
    quarkDateRange,
    quarkSwitch,
    quarkRadio,
    quarkCheckBox,
    quarkTree,
    quarkUpload,
    quarkTable,
    tableWrapper
  },
  props: {
    labelWidth: {
      type: String,
      default: '114px'
    },
    maxHeight: {
      type: String
    },
    formFields: {
      type: Array
    },
    small: {
      type: Boolean,
      default: true
    },
    defaultCheckedKeys: {
      type: Array,
      default () {
        return []
      }
    },
    namespace: {
      type: String,
      required: true
    },
    formNamespace: {
      type: String
    }
  },
  computed: {
    selectSource () {
      return this.$store.state[this.namespace].selectSource
    },
    ruleForm () {
      return this.$store.state[this.namespace][this.formNamespace].ruleForm
    },
    editType () {
      return this.$store.state[this.namespace][this.formNamespace].editType
    }
  },
  methods: {
    setType (obj) {
      Object.assign(obj, {
        type: 'ruleForm',
        formNamespace: this.formNamespace
      })
    },

    changeInput (obj) {
      this.setType(obj)
      this.$store.commit(`${this.namespace}/changeInput`, obj)
    },
    changeCascader (obj) {
      this.setType(obj)
      this.$store.commit(`${this.namespace}/changeCascader`, obj)
    },
    changeDate (obj) {
      this.setType(obj)
      this.$store.commit(`${this.namespace}/changeDate`, obj)
    },
    changeSelect (obj) {
      this.setType(obj)
      this.$store.commit(`${this.namespace}/changeSelect`, obj)
    },

    changeSwitch (obj) {
      this.setType(obj)
      this.$store.commit(`${this.namespace}/changeSwitch`, obj)
    },

    changeRadio (obj) {
      this.setType(obj)
      this.$store.commit(`${this.namespace}/changeRadio`, obj)
    },

    changeCheckbox (obj) {
      this.setType(obj)
      this.$store.commit(`${this.namespace}/changeCheckbox`, obj)
    },

    changeTree (obj) {
      this.setType(obj)
      this.$store.commit(`${this.namespace}/changeTree`, obj)
    },

    picUpload (obj) {
      this.setType(obj)
      this.$store.dispatch(`${this.namespace}/picUpload`, obj)
    },

    tableAction (obj) {
      this.setType(obj)
      this.$store.dispatch(`${this.namespace}/tableAction`, obj)
    }
  }
}
</script>

<style lang="scss" scoped>
.form-item {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  overflow: auto;
}
.mr8{
  margin-right: 8px;
  line-height: 20px;
  display: inline-block;
  word-break: keep-all;
  width: min-content;
}
</style>
