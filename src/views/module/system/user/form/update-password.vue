<!--<template>-->
<!--  &lt;!&ndash;修改密码&ndash;&gt;-->
<!--  <div class="search">-->
<!--    <Form ref="form" :model="formItem" :rules="formItemRules" :label-width="100">-->
<!--      <FormItem label="登录密码" prop="password">-->
<!--        <Input type="password" v-model="formItem.password" placeholder="请输入内容"></Input>-->
<!--      </FormItem>-->
<!--      <FormItem label="再次确认密码" prop="passwordConfirm">-->
<!--        <Input type="password" v-model="formItem.passwordConfirm" placeholder="请输入内容"></Input>-->
<!--      </FormItem>-->
<!--    </Form>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: 'UpdatePassword',-->
<!--  props: {},-->
<!--  data () {-->
<!--    const validatePass = (rule, value, callback) => {-->
<!--      const reg2 = /^.{6,18}$/-->
<!--      if (value === '') {-->
<!--        callback(new Error('请输入密码'))-->
<!--      } else if (value !== this.formItem.password) {-->
<!--        callback(new Error('两次输入密码不一致'))-->
<!--      } else if (value !== '' && !reg2.test(value)) {-->
<!--        callback(new Error('长度6到18个字符'))-->
<!--      } else {-->
<!--        callback()-->
<!--      }-->
<!--    }-->

<!--    const validatePassConfirm = (rule, value, callback) => {-->
<!--      if (value === '') {-->
<!--        callback(new Error('请再次输入密码'))-->
<!--      } else if (value !== this.formItem.password) {-->
<!--        callback(new Error('两次输入密码不一致'))-->
<!--      } else {-->
<!--        callback()-->
<!--      }-->
<!--    }-->

<!--    return {-->
<!--      isEdit: false,-->
<!--      formItemRules: {-->
<!--        password: [-->
<!--          { required: true, validator: validatePass, trigger: 'blur' }-->
<!--        ],-->
<!--        passwordConfirm: [-->
<!--          { required: true, validator: validatePassConfirm, trigger: 'blur' }-->
<!--        ]-->
<!--      },-->
<!--      formItem: this.getFormItem()-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    getFormItem () {-->
<!--      return {-->
<!--        userId: '',-->
<!--        password: '',-->
<!--        passwordConfirm: ''-->
<!--      }-->
<!--    },-->
<!--    setData (data) {-->
<!--      if (data && data.userId) {-->
<!--        this.formItem = Object.assign({}, this.formItem, data)-->
<!--      }-->
<!--    },-->
<!--    handleResetForm () {-->
<!--      this.$refs['form'].resetFields()-->
<!--    },-->
<!--    handleReset () {-->
<!--      this.formItem = this.getFormItem()-->
<!--      this.handleResetForm()-->
<!--    },-->
<!--    handleSubmit () {-->
<!--      this.$refs['form'].validate((valid) => {-->
<!--        if (valid) {-->
<!--          this.$http.post(this.$apis.user.updatePassword, {-->
<!--            userId: this.formItem.userId,-->
<!--            password: this.formItem.password-->
<!--          }).then(res => {-->
<!--            this.$bus.emit('closeModal')-->
<!--          })-->
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
