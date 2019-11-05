<template>
  <div>
    <tabs-modal
      ref="tabsModal"
      :modalTitle="modalTitle"
      :tabsPanes="tabsPanes"
      @on-submit="handleSubmit"
      @on-close="handleClose"
    ></tabs-modal>
  </div>
</template>

<script>
import { TabsModal } from '@/custom/components/base'
import UpdatePassword from './form/update-password'

export default {
  name: 'UserModal',
  components: { UpdatePassword, TabsModal },
  props: {},
  data () {
    return {
      modalTitle: '',
      tabsPanes: [
        { key: 'userInfo',
          tab: '基础信息',
          render: <a-tag color='green'>green</a-tag>
        },
        { key: 'userRole',
          tab: '角色授权',
          render: <a-tag color='red'>red</a-tag>
        },
        { key: 'userAuth',
          tab: '功能授权',
          render: <a-tag color='red'>red</a-tag>
        },
        { key: 'updatePasswd',
          tab: '修改密码',
          render: <update-password ref="updatePasswd"></update-password>
        }
      ],
      paramTemp: {}
    }
  },
  methods: {
    handleShow (param, title, refs = ['userInfo', 'userRole', 'userAuth', 'updatePasswd']) {
      // return this.$http.post(this.$apis.user.add, {
      //
      // }).then(res => {
      //
      // })

      // return this.$http.post(this.$apis.user.update, {
      //
      // }).then(res => {
      //
      // })
      this.$refs['tabsModal'].handleShow(param)
      this.paramTemp = param
      this.modalTitle = title
      // console.warn(param)
    },
    handleSubmit () {
      const tabs = this.$refs['tabsModal']
      const key = tabs.tabActiveKey
      this.$refs[key].handleSubmit(this.paramTemp)
    },
    handleClose () {
      this.paramTemp = {}
      this.modalTitle = ''
    }
  }
}
</script>
