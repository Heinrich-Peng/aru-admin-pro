<template>
  <div class="content">
    <a-card type="inner" :bordered="false" :title="title">
      <search-form
        ref="searchForm"
        :value="pageParams"
        :searchColums="searchColums"
        @on-search="handleSearch"
        @on-reset="handleReset"
      ></search-form>

      <div class="table-operator" v-show="actionShow">
        <a-button type="primary" v-if="typeof saveFunc === 'function'" @click="handleSave()">添加</a-button>
        <a-button type="danger" v-if="typeof deleteFunc === 'function'" @click="handleDelete()">删除</a-button>
        <s-dropdown
          :actionColumns="actionColumns"
          :actionFunc="handleAction"
        ></s-dropdown>
      </div>

      <s-table
        ref="table"
        size="default"
        showPagination="auto"
        bordered
        :rowKey="tableRowKey"
        :columns="tableColumns"
        :data="loadData"
        :alert="options.alert"
        :rowSelection="options.rowSelection"
      ></s-table>
    </a-card>

    <slot></slot>
  </div>
</template>

<script>
/**
 * 查询-表格
 * 上面查询条，下面表格显示
 *
 * bus事件：
 *   关闭modal：this.$bus.emit('closeModal')
 *   重置form：this.$bus.emit('resetSearch')
 * 组件事件：
 *   点击查询按钮：this.$emit('on-search', {  })
 *   点击重置按钮：this.$emit('on-reset', {  })
 *
 * ref：
 *   searchForm：'searchForm'
 *   table：'table'
 *
 * 示例：
 * * import { TabsModal } from '@/custom/components/base'
 * * components: { TabsModal },
 * *
 * * <search-table
 * *   ref="searchTable"
 * *   title="标题"
 * *   :searchColums="[[
 * *     { title: '文本', dataIndex: 'text', type: 'text' },
 * *     { title: '数字', dataIndex: 'num', type: 'num' }
 * *     { title: '自定义', dataIndex: 'render', type: 'render',
 * *       render: <a-select placeholder="请选择" default-value="0">}
 * *   ]"
 * *   :actionShow="$auth('systemUserEdit')"
 * *   :actionColumns="[[
 * *     { title: '批量', dataIndex: 'batch', icon: 'star', func: (that) => { console.log(that) } }
 * *   ]"
 * *   tableRowKey="id"
 * *   :tableColumns="[
 * *     { title: '序号', dataIndex: 'serial',
 * *        customRender: (text, record, index) => {
 * *        return index + 1
 * *       }
 * *     }
 * *   ]"
 * *   :pageFunc="pageFunc"
 * *   :saveFunc="saveFunc"
 * *   :deleteFunc="deleteFunc"
 * *   @on-search="() => {}"
 * *   @on-reset="() => {}"
 * *   >
 * *     <solt></solt>
 * * </search-table>
 */
import { STable } from '@/components'
import { ProxySlot, SearchForm, SDropdown } from '../base'
export default {
  name: 'TableSearch',
  components: { STable, ProxySlot, SearchForm, SDropdown },
  props: {
    title: { type: String, required: true },

    searchColums: { type: Array, required: false, default: () => { return [] } },

    actionShow: { type: Boolean, required: false, default: true },
    actionColumns: { type: Array, required: false, default: () => { return [] } },

    tableRowKey: { type: String, required: true },
    tableColumns: { type: Array, required: true },

    pageFunc: { type: Function, required: true },
    saveFunc: { type: Function, required: false, default: null },
    deleteFunc: { type: Function, required: false, default: null }
  },
  data () {
    return {
      // 查询字段
      pageParams: {},

      // 选择栏 actionShow决定是否会出现操作按钮
      selectedRowKeys: [],
      selectedRows: [],
      options: this.alertShow()
    }
  },
  created () {
    this.$bus.on('reloadTable', (name) => {
      this.handleSearch()
    })
  },
  methods: {
    /**
     * 判断表格的选择栏是否出现
     */
    alertShow () {
      const enable = this.actionShow && (this.actionColumns.length !== 0 || typeof this.deleteFunc === 'function')
      if (enable) {
        return {
          alert: { show: true, clear: () => { this.selectedRowKeys = [] } },
          rowSelection: {
            selectedRowKeys: this.selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
              this.selectedRowKeys = selectedRowKeys
              this.selectedRows = selectedRows
            }
          }
        }
      } else {
        return { alert: false, rowSelection: null }
      }
    },
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
      this.$emit('on-reset', { param: param })
    },
    /**
     * 保存按钮事件
     */
    handleSave (param) {
      this.saveFunc()
    },
    /**
     * 删除按钮事件
     */
    handleDelete (param) {
      const _param = { key: this.selectedRowKeys, object: this.selectedRows }
      this.showDeleteModal(_param)
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
    },
    /**
     * 更多操作事件
     */
    handleAction (param) {
      return {
        key: this.selectedRowKeys,
        object: this.selectedRows
      }
    }
  },
  mounted: function () {
  }
}
</script>
