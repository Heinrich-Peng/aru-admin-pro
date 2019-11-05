<template>
  <a-dropdown v-if="actionColumns.length !== 0" >
    <a-menu slot="overlay" @click="handleAction">
      <a-menu-item v-for="v in actionColumns" :key="v.dataIndex">
        <a-icon v-if="v.icon !== undefined || v.icon !== null || v.icon !== ''" :type="v.icon"/>
        <a-icon v-else type="star"/>
        {{ v.title }}
      </a-menu-item>
    </a-menu>
    <a-button :size="size" >更多<a-icon type="down"/></a-button>
  </a-dropdown>
</template>

<script>
/**
 * 自定义下拉窗
 *
 * 示例：
 * * import { SDropdown } from '@/custom/components/base'
 * * components: { SDropdown },
 * *
 * * <s-dropdown
 * * :actionColumns="[{ title: '批量', dataIndex: 'batch', icon: 'star',
 * *                    func: ({ param, key, object }) => { this.handleAction({ param, key, object }) }
 * *                  }]"
 * * :actionFunc="() => {}"
 * * ></s-dropdown>
 */
export default {
  name: 'SDropdown',
  components: { },
  props: {
    // 操作配置字段
    actionColumns: { type: Array, required: false, default: () => { return [] } },
    // 处理操作函数
    actionFunc: { type: Function, required: false, default: () => { return () => {} } },
    // 按键大小
    size: { type: String, required: false, default: () => { return 'default' } }
  },
  data () {
    return {
    }
  },
  created () {

  },
  methods: {
    /**
     * 更多操作事件
     */
    handleAction (param) {
      this.actionColumns.forEach(item => {
        if (item.dataIndex === param.key) {
          if (typeof item.func === 'function') {
            let paramTemp = {}
            this.actionColumns.forEach(item => {
              if (item.dataIndex === param.key) { paramTemp = item }
            })
            const _param = Object.assign({}, { actionParam: paramTemp }, this.actionFunc(paramTemp))
            item.func(_param)
          }
        }
      })
    }
  }
}
</script>
