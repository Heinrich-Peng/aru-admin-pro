<template>
  <div>
    <tabs-modal
      ref="tabsModal"
      :value="tabsParams"
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
import UserInfo from './form/user-info'
import UserRole from './form/user-role'

export default {
  name: 'UserModal',
  components: { UserRole, UserInfo, UpdatePassword, TabsModal },
  props: {},
  data () {
    return {
      modalTitle: '',
      tabsParams: {
        show: [],
        hidden: []
      },
      tabsPanes: [
        { key: 'userInfo',
          tab: '基础信息',
          render: <user-info ref="userInfo" paramFunc={this.getParamTemp}></user-info>
        },
        { key: 'userRole',
          tab: '角色授权',
          render: <a-tag color='red'>red</a-tag>
          // render: <user-role ref="userInfo" value={this.paramTemp}></user-role>
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
      this.paramTemp = param
      this.modalTitle = title
      this.tabsParams.show = refs
      this.$refs['tabsModal'].handleShow()
    },
    handleSubmit () {
      const tabs = this.$refs['tabsModal']
      const key = tabs.tabActiveKey
      this.$refs[key].handleSubmit(this.paramTemp)
    },
    handleClose () {
      this.tabsParams.show = []
      this.paramTemp = {}
      this.modalTitle = ''
    },
    getParamTemp () {
      return this.paramTemp
    }
  }
}
</script>
