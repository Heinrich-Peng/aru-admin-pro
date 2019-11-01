<!--<template>-->
<!--  &lt;!&ndash;分配角色&ndash;&gt;-->
<!--  <div class="search">-->
<!--    <Form ref="form" :model="formItem" :label-width="100">-->
<!--      <FormItem label="拥有角色" prop="grantRoles">-->
<!--        <Select multiple v-model="formItem.grantRoles">-->
<!--          <Option v-for="item in selectRoles" :value="item.roleId" :key="item.roleId">{{ item.roleName }}</Option>-->
<!--        </Select>-->
<!--      </FormItem>-->
<!--    </Form>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->

<!--export default {-->
<!--  name: 'UserRole',-->
<!--  props: {},-->
<!--  data () {-->
<!--    return {-->
<!--      selectRoles: [],-->
<!--      formItem: this.getFormItem()-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    getFormItem () {-->
<!--      return {-->
<!--        userId: '',-->
<!--        grantRoles: []-->
<!--      }-->
<!--    },-->
<!--    setData (data) {-->
<!--      if (data && data.userId) {-->
<!--        this.formItem = Object.assign({}, this.formItem, data)-->
<!--        this.handleLoadRoles(data.userId)-->
<!--      }-->
<!--    },-->
<!--    handleReset () {-->
<!--      this.$refs['form'].resetFields()-->
<!--      this.formItem = this.getFormItem()-->
<!--    },-->
<!--    handleSubmit () {-->
<!--      this.$refs['form'].validate((valid) => {-->
<!--        if (valid) {-->
<!--          this.$http.post(this.$apis.user.setRole, {-->
<!--            userId: this.formItem.userId,-->
<!--            roleIds: this.formItem.grantRoles.join(',')-->
<!--          }, this).then(res => {-->
<!--            this.$bus.emit('closeModal')-->
<!--          })-->
<!--        }-->
<!--      })-->
<!--    },-->
<!--    handleLoadRoles (userId) {-->
<!--      if (!userId) {-->
<!--        return-->
<!--      }-->
<!--      const that = this-->
<!--      const p1 = this.$http.get(this.$apis.role.all, {}, this)-->

<!--      const p2 = this.$http.get(this.$apis.user.getUserRoles, { userId: userId }, this)-->

<!--      Promise.all([p1, p2]).then(function (values) {-->
<!--        const res1 = values[0]-->
<!--        const res2 = values[1]-->
<!--        if (res1.code === 0) {-->
<!--          that.selectRoles = res1.data-->
<!--        }-->
<!--        if (res2.code === 0) {-->
<!--          const result = []-->
<!--          res2.data.map(item => {-->
<!--            result.push(item.roleId)-->
<!--          })-->
<!--          that.formItem.grantRoles = result-->
<!--        }-->
<!--      })-->
<!--    }-->
<!--  },-->
<!--  created () {-->

<!--  },-->
<!--  components: {}-->
<!--}-->
<!--</script>-->

<!--<style scoped lang="less" rel="stylesheet/less">-->

<!--</style>-->
