<script>
/**
 * 代理插槽组件
 * 用于组件放置render
 *
 * 示例：
 * * import { ProxySlot } from '@/custom/components/base'
 * * components: { ProxySlot },
 * *
 * * value.render = <a-tag color='green'>tab</a-tag>
 * *
 * * <proxy-slot :customRender="value.render"></proxy-slot>
 */
export default {
  name: 'ProxySlot',
  // 转换成html
  render: function (h) { return this.customRender },
  props: {
    // 自动移render参数
    customRender: { type: Object, required: false, default: null }
  }
}
</script>
