// 按项目需求加载组件
import Vue from 'vue'

import quarkInput from '@/components/base/input'
import quarkSelect from '@/components/base/select'
import quarkCascader from '@/components/base/cascader'
import quarkDate from '@/components/base/date'
import quarkTxt from '@/components/base/txt'
import quarkDateRange from '@/components/base/dateRange'
import quarkSwitch from '@/components/base/switch'
import quarkRadio from '@/components/base/radio'
import quarkCheckBox from '@/components/base/checkbox'
import quarkTree from '@/components/base/tree'
import quarkUpload from '@/components/base/upload'
import quarkButton from '@/components/base/button'
import quarkBreadcrumb from '@/components/base/breadcrumb'

let components = {
  // 对elementui的部分组件在进行一层封装
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
  quarkButton,
  quarkBreadcrumb
}

Object.keys(components).forEach(key => {
  Vue.component(key, components[key])
})

export default Vue
