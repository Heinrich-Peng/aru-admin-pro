<template>
  <div>
    <tabs-modal
      ref="userModal"
      :modalTitle="modalTitle"
      :tabsPanes="tabsPanes"
      @on-submit="handleSubmit"
      @on-close="handleClose"
    ></tabs-modal>
  </div>
</template>

<script>
import { TabsModal } from '@/custom/components/base'

export default {
  name: 'UserModal',
  components: { TabsModal },
  props: {},
  data () {
    return {
      modalTitle: '',
      tabsPanes: [
        { key: 'tab1', tab: '标签1', render: <a-tag color='green'>green</a-tag> },
        { key: 'tab2', tab: '标签2', render: <a-tag color='red'>red</a-tag> },
        { key: 'tab3', tab: '标签3' }
      ]
    }
  },
  methods: {
    handleShow (data) {
      this.$refs['userModal'].handleShow(data)
    },
    handleSubmit () {

    },
    handleClose () {

    }
  }
}
</script>
