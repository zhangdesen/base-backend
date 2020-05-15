import TableWrapper from '@/components/tableWrapper'
import Form from '@/components/form'
import ComplexForm from '@/components/form/complexForm'
// 有个vuex的模块重用，是否可以使用可以后期看下
const registerModule = {
  components: {
    TableWrapper,
    Form,
    ComplexForm
  },
  data () {
    return {
      namespace: null // store命名空间
    }
  },
  methods: {
    setTableHeight () {
      this.$store.commit(`${this.namespace}/setTableHeight`)
    },
    async initSource () {
      await this.$store.dispatch(`${this.namespace}/initSource`)
    },
    async loadFirstPage () {
      await this.$store.dispatch(`${this.namespace}/loadFirstPage`)
    },
    querySearch (searchFields) {
      this.$store.commit(`${this.namespace}/querySearch`, searchFields)
    },
    setBreadcrumb (obj) {
      this.$store.commit(`${this.namespace}/setBreadcrumb`, obj)
    },
    setNamespace () {
      this.namespace = this.store.namespace ? this.store.namespace : this.$route.fullPath
    }
  },
  activated () {
    this.setTableHeight()
    // this.setBreadcrumb(this.$route)
  },
  created () {
    if (!this.store) return console.error('请先设置store')
    this.setNamespace()
    if (!Object.keys(this.$store.state).includes(this.namespace)) {
      this.$store.registerModule(this.namespace, this.$lodash.cloneDeep(this.store))
      window.store = this.$store
    }
    this.setTableHeight()
    // this.setBreadcrumb(this.$route)
  },
  destroyed () {
    // 页面离开删除store
    if (Object.keys(this.$store.state).includes(this.namespace)) {
      this.$store.unregisterModule(this.namespace)
      window.store = this.$store
    }
  }
}

export default registerModule
