<template>
  <div class="content">
    <a-card type="inner" :bordered="false" :title="title">
      <search-form
        :value="pageParams"
        :searchColums="searchColums"
        @on-search="handleSearch"
      ></search-form>

      <div class="table-operator" v-show="showAction">
        <a-button type="primary" @click="handleSave()">添加</a-button>
        <a-dropdown>
          <a-menu slot="overlay" @click="handleDelete()">
            <a-menu-item key="1"><a-icon type="close"/>删除</a-menu-item>
          </a-menu>
          <a-button>批量操作<a-icon type="down"/></a-button>
        </a-dropdown>
      </div>

      <s-table
        ref="table"
        size="default"
        showPagination="auto"
        :rowKey="tableRowKey"
        :columns="tableColumns"
        :data="loadData"
        :alert="options.alert"
        :rowSelection="options.rowSelection"
      >
      </s-table>
    </a-card>

    <slot></slot>
  </div>
</template>

<script>
import { STable } from '@/components'
import { ProxySlot, SearchForm } from '../base'

export default {
  name: 'TableSearch',
  components: { SearchForm, STable, ProxySlot },
  props: {
    title: { type: String, required: true },

    searchColums: { type: Array, required: false, default: () => { return [] } },

    tableRowKey: { type: String, required: true },
    tableColumns: { type: Array, required: true },

    showAction: { type: Boolean, required: false, default: true },

    pageFunc: { type: Function, required: true },
    saveFunc: { type: Function, required: false, default: null },
    updateFunc: { type: Function, required: false, default: null },
    deleteFunc: { type: Function, required: false, default: null }
  },
  data () {
    return {
      // 查询字段
      pageParams: {},

      // 选择栏 showAction决定是否会出现操作按钮
      selectedRowKeys: [],
      selectedRows: [],
      options: {
        alert: this.showAction ? { show: true, clear: () => { this.selectedRowKeys = [] } } : false,
        rowSelection: this.showAction ? {
          selectedRowKeys: this.selectedRowKeys,
          onChange: (selectedRowKeys, selectedRows) => {
            this.selectedRowKeys = selectedRowKeys
            this.selectedRows = selectedRows
          }
        } : null
      }
    }
  },
  created () {
    // this.initParams()
  },
  methods: {
    // /**
    //  * 初始化参数
    //  */
    // initParams () {
    //   this.searchColums.forEach(item => {
    //     this.pageParams[item.dataIndex] = ''
    //   })
    // },
    /**
     * s-table 加载表格数据
     */
    loadData (param) {
      return this.pageFunc(Object.assign({}, param, this.pageParams))
    },
    /**
     * 查询按钮事件
     */
    handleSearch (param) {
      this.$refs.table.refresh(true)
      this.$emit('on-search', { param: param })
    },
    /**
     * 重置按钮事件
     */
    handleReset (param) {
      this.initParams()
      this.$emit('on-reset', { param: param })
    },
    /**
     * 保存按钮事件
     */
    handleSave (param) {
      this.$emit('on-save', { param: param })
    },
    /**
     * 删除按钮事件
     */
    handleDelete (param) {
      const _param = { key: this.selectedRowKeys, object: this.selectedRows }
      this.showDeleteModal(_param)
      this.$emit('on-delete', _param)
    },
    /**
     * 显示删除modal
     */
    showDeleteModal (param) {
      const that = this
      this.$confirm({
        content: '是否删除？',
        async onOk () {
          const result = await that.deleteFunc(param)
          return result
        }
      })
    }
  },
  mounted: function () {
  }
}
</script>
