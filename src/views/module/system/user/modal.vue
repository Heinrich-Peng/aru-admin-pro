<!--<template>-->

<!--  <div class="search" >-->
<!--    <Drawer v-model="modalVisible" :title="modalTitle" width="40" @on-cancel="handleClose">-->
<!--      <Tabs @on-click="handleTabClick" :value="current">-->
<!--        <TabPane label="基本信息" name="form1">-->
<!--          <user-info ref="form1" :parent-visable.sync="modalVisible"></user-info>-->
<!--        </TabPane>-->
<!--        <TabPane v-if="isEdit" label="角色授权" name="form2">-->
<!--          <user-role ref="form2"></user-role>-->
<!--        </TabPane>-->
<!--        <TabPane v-if="isEdit" label="功能授权" name="form3">-->
<!--          <user-auth ref="form3"></user-auth>-->
<!--        </TabPane>-->
<!--        <TabPane v-if="isEdit" label="修改密码" name="form4">-->
<!--          <update-password ref="form4"></update-password>-->
<!--        </TabPane>-->
<!--      </Tabs>-->
<!--      <div class="drawer-footer">-->
<!--        <Button type="default" @click="handleClose">取消</Button>&nbsp;-->
<!--        <Button type="primary" @click="handleSubmit" :loading="saving">保存</Button>-->
<!--      </div>-->
<!--    </Drawer>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import UserInfo from './form/user-info'-->
<!--import UserRole from './form/user-role'-->
<!--import UserAuth from './form/user-auth'-->
<!--import UpdatePassword from './form/update-password'-->

<!--export default {-->
<!--  name: 'UserModal',-->
<!--  components: { UpdatePassword, UserRole, UserAuth, UserInfo },-->
<!--  props: {},-->
<!--  data () {-->
<!--    return {-->
<!--      saving: false,-->
<!--      modalVisible: false,-->
<!--      isEdit: false,-->
<!--      modalTitle: '',-->
<!--      current: 'form1',-->
<!--      userName: '',-->
<!--      formData: {},-->
<!--      forms: [-->
<!--        'form1',-->
<!--        'form2',-->
<!--        'form3',-->
<!--        'form4'-->
<!--      ]-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    handleShow (data) {-->
<!--      this.isEdit = false-->
<!--      this.userName = ''-->
<!--      if (data && data.userId) {-->
<!--        this.isEdit = true-->
<!--        this.userName = data.userName-->
<!--        this.formData = data-->
<!--      } else {-->
<!--        this.formData = {}-->
<!--      }-->
<!--      this.handleTabClick('form1')-->
<!--      this.modalVisible = true-->
<!--    },-->
<!--    handleClose () {-->
<!--      this.$refs[this.current].handleReset()-->
<!--      this.modalVisible = false-->
<!--    },-->
<!--    handleSubmit () {-->
<!--      this.$refs[this.current].handleSubmit()-->
<!--    },-->
<!--    handleTabClick (name) {-->
<!--      this.current = name-->
<!--      this.modalTitle = this.isEdit ? `编辑用户 - ${this.userName}` : '新增用户'-->
<!--      this.$refs[this.current].setData(this.formData)-->
<!--    }-->
<!--  },-->
<!--  created () {-->
<!--    // 监听modal关闭事件-->
<!--    this.$bus.on('closeModal', (name) => {-->
<!--      this.modalVisible = false-->
<!--    })-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped lang="less" rel="stylesheet/less">-->

<!--</style>-->
