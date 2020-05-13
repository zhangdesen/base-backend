<template>
  <div class="table-wrapper" id="tableWrapper">
    <quarkBreadcrumb :data="breadcrumbList" v-if="showBcrumb"></quarkBreadcrumb>
    <Search :searchFields="searchFields" :namespace="namespace" :formNamespace="formNamespace" :showSearch="showSearch"></Search>
    <Action
      :showAction="showAction"
      :createPermission="createPermission"
      :namespace="namespace"
      :formNamespace="formNamespace">
      <template slot="actionslot">
        <slot name="actionslot"></slot>
      </template>
    </Action>
    <Table
    :dataFields="dataFields"
    :showIndex="showIndex"
    :showRadio="showRadio"
    :expand="expand"
    :showCheckBox="showCheckBox"
    :defaultSort="defaultSort"
    :height="height"
    :width="width"
    :namespace="namespace"
    :formNamespace="formNamespace">
      <slot name="empty"></slot>
      <template slot="expandTable" slot-scope="{ scope }">
        <slot name="expandTable" :scope="scope"></slot>
      </template>
    </Table>
    <Pagination :namespace="namespace" :showPagination="showPagination" :small="small" :formNamespace="formNamespace"></Pagination>
  </div>
</template>

<script>
import Action from './action'
import Pagination from './pagination'
import Table from './table'
import Search from './search'

export default {
  components: {
    Table,
    Action,
    Pagination,
    Search
  },
  props: {
    showIndex: {
      type: Boolean,
      default: true
    },
    showRadio: {
      type: Boolean,
      default: false
    },
    expand: {
      type: Boolean,
      default: false
    },
    showCheckBox: {
      type: Boolean,
      default: false
    },
    defaultSort: {
      type: Object
    },
    showPagination: {
      type: Boolean,
      default: true
    },
    showAction: {
      type: Boolean,
      default: true
    },
    showSearch: {
      type: Boolean,
      default: true
    },
    height: {
      type: String,
      default: '74px'
    },
    width: {
      type: String
    },
    small: {
      type: Boolean,
      default: false
    },
    dataFields: {
      type: Array,
      default () {
        return []
      },
      required: true
    },
    createPermission: {
      type: Array
    },
    searchFields: {
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
    },
    showBcrumb: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    breadcrumbList () {
      return this.$store.state[this.namespace].breadcrumbList
    }
  }
}
</script>

<style scoped lang="scss"></style>
