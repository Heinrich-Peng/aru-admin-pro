<template>
  <div class="table-page-search-wrapper" v-if="searchColums.length !== 0">
    <!--横排-->
    <a-form layout="inline" v-if="rowEnable">
      <a-row :gutter="48">
        <a-col
          v-for="v in searchColums"
          :key="v.dataIndex"
          :md="6"
          :sm="24"
        >
          <a-form-item :label="v.title" :prop="v.dataIndex">
            <a-input v-if="v.type === 'text'" v-model="value[v.dataIndex]" placeholder="请输入关键值"/>
            <a-input-number v-else-if="v.type === 'num'" v-model="value[v.dataIndex]" placeholder="请输入关键值" style="width: 100%"/>
            <proxy-slot v-else-if="v.type === 'render'" :customRender="v.render"></proxy-slot>
          </a-form-item>
        </a-col>
        <span
          class="table-page-search-submitButtons"
          :style="{ float: 'right', overflow: 'hidden', paddingLeft: '24px', paddingRight: '24px' } || {} ">
          <a-button type="primary" @click="handleSearch()">查询</a-button>&nbsp;
          <a-button @click="handleReset()">重置</a-button>
        </span>
      </a-row>
    </a-form>
    <a-form layout="horizontal" v-else>
      <!--竖排-->
      <a-row>
        <a-form-item
          v-for="v in searchColums"
          :key="v.dataIndex"
          :label="v.title"
          :prop="v.dataIndex"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 16 }"
        >
          <a-input v-if="v.type === 'text'" v-model="value[v.dataIndex]" placeholder="请输入关键值"/>
          <a-input-number v-else-if="v.type === 'num'" v-model="value[v.dataIndex]" style="width: 100%"/>
          <proxy-slot v-else-if="v.type === 'render'" :customRender="v.render"></proxy-slot>
        </a-form-item>
        <span class="table-page-search-submitButtons" :style="{ float: 'right', overflow: 'hidden' } || {} ">
          <a-button type="primary" @click="handleSearch()">查询</a-button>&nbsp;
          <a-button @click="handleReset()">重置</a-button>
        </span>
      </a-row>
    </a-form>
  </div>
</template>

<script>
/**
 * 查询模块
 * 根据字段参数自动生成
 *
 * bus事件：
 *   注册：this.$bus.on('resetSearch', () => {}}
 *   触发：this.$bus.emit('resetSearch')
 * 组件事件：
 *   点击查询按钮：this.$emit('on-search', { tabKey: tabActiveKey })
 *   点击重置按钮：this.$emit('on-reset', { tabKey: tabActiveKey })
 *
 * 示例：
 * * import { SearchForm } from '@/custom/components/base'
 * * components: { SearchForm },
 * *
 * * <search-form
 * *   ref="searchForm"
 * *   :value='{}'
 * *   :searchColums='[[
 * *     { title: '文本', dataIndex: 'text', type: 'text' },
 * *     { title: '数字', dataIndex: 'num', type: 'num' }
 * *     { title: '自定义', dataIndex: 'render', type: 'render',
 * *       render: <a-select placeholder="请选择" default-value="0">}
 * *   ]'
 * *   :rowEnable="true"
 * *   @on-search='(data) => console.log(data)'
 * *   @on-reset='(data) => console.log(data)'
 * * ></search-form>
 */
import ProxySlot from '../proxy-slot'
export default {
  name: 'SearchForm',
  components: { ProxySlot },
  props: {
    // value一般传进来为空对象{},对象里是自动生成查询字段的 键,值
    value: { type: Object, required: true },
    // 模版会根据该字段自动生成
    searchColums: { type: Array, required: false, default: () => { return [] } },
    // 配置成 横排(false) / 竖排(true)
    rowEnable: { type: Boolean, required: false, default: () => { return true } }
  },
  data () {
    return {
    }
  },
  created () {
    // 监听重置事件
    this.$bus.on('resetSearch', (name) => {
      this.handleReset()
    })
  },
  methods: {
    /**
     * 查询按钮事件
     */
    handleSearch (param) {
      this.$emit('on-search', { param: param })
    },
    /**
     * 重置按钮事件
     */
    handleReset (param) {
      // 先设置null是为了清空输入窗，删除value里面全部字段
      Object.keys(this.value).forEach(key => {
        this.value[key] = null
        delete this.value[key]
      })
      this.$emit('on-reset', { param: param })
    }
  }
}
</script>
