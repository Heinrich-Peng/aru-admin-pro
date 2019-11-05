<template>
  <a-modal
    ref="modal"
    :title="modalTitle"
    :visible="modalVisible"
    :confirmLoading="modalSaving"
    @ok="handleSubmit"
    @cancel="handleClose"
  >
    <a-tabs
      ref="tabs"
      tabPosition="top"
      type="line"
      :activeKey="tabActiveKey"
      @change="activeKey => tabActiveKey = activeKey">
      <a-tab-pane v-for="value in tabsPanes" :key="value.key" :tab="value.tab">
        <proxy-slot :ref="value.key" :customRender="value.render"></proxy-slot>
      </a-tab-pane>
    </a-tabs>
  </a-modal>
</template>

<script>
/**
 * 多标签窗口
 * modal中嵌入多个tab
 *
 * bus事件：
 *   注册：this.$bus.on('closeModal', () => {}}
 *   触发：this.$bus.emit('closeModal')
 * 组件事件：
 *   点击确认按钮：this.$emit('on-submit', { tabKey: tabActiveKey })
 *   关闭窗口事件：this.$emit('on-close', { tabKey: tabActiveKey })
 *
 * ref：
 *   modal：'modal'
 *   tabs：'tabs'
 *   proxy-slot：tabsPanes[?].key
 *
 * 示例：
 * * import { TabsModal } from '@/custom/components/base'
 * * components: { TabsModal },
 * *
 * * <tabs-modal
 * *   ref="tabsModal"
 * *   :modalTitle='modal标题'
 * *   :tabsPanes='[{ key: 'tab', tab: 'tab', render: <a-tag color='green'>tab</a-tag> }]'
 * *   @on-submit='(data) => console.log(data)'
 * *   @on-reset='(data) => console.log(data)'
 * * ></tabs-modal>
 */
import ProxySlot from '../proxy-slot'
export default {
  name: 'TabsModal',
  components: { ProxySlot },
  props: {
    // modal标题
    modalTitle: { type: String, required: true },
    // 多个标签列参数
    tabsPanes: { type: Array, required: true }
  },
  data () {
    return {
      // modal参数
      modalVisible: false,
      modalSaving: false,

      // 标签当前索引
      tabActiveKey: ''
    }
  },
  created () {
    // 监听modal关闭事件
    this.$bus.on('closeModal', (name) => {
      this.handleReset()
    })
    // 进入页面操作
    this.handleReset()
  },
  methods: {
    /**
     * 重置
     */
    handleReset () {
      this.modalVisible = false
      this.modalSaving = false
      this.tabActiveKey = this.tabsPanes[0].key
    },
    /**
     * modal显示
     */
    handleShow (param) {
      this.modalVisible = true
    },
    /**
     * 取消按钮事件
     */
    handleClose (param) {
      // this.handleReset()
      this.$bus.emit('closeModal')
      this.$emit('on-close', { tabKey: this.tabActiveKey })
    },
    /**
     * 确认按钮事件
     */
    handleSubmit (param) {
      this.modalSaving = true
      this.$emit('on-submit', { tabKey: this.tabActiveKey })
    }
  }
}
</script>
