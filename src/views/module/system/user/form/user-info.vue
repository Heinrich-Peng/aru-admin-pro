<!--<template>-->

<!--  <div class="search">-->
<!--    <Form ref="form" :model="formItem" :rules="formItemRules" :label-width="100">-->
<!--      <FormItem label="用户类型" prop="userType">-->
<!--        <RadioGroup type="button" v-model="formItem.userType">-->
<!--          <Radio label="normal">普通管理员</Radio>-->
<!--          <Radio label="super">超级管理员</Radio>-->
<!--        </RadioGroup>-->
<!--      </FormItem>-->
<!--      <FormItem label="昵称" prop="nickName" :rules="$rules.required('昵称不能为空')">-->
<!--        <Input v-model="formItem.nickName" placeholder="请输入内容"></Input>-->
<!--      </FormItem>-->
<!--      <FormItem label="用户名" prop="userName" :rules="$rules.userName">-->
<!--        <Input :disabled="!isAdd" v-model="formItem.userName" placeholder="请输入用户名"></Input>-->
<!--      </FormItem>-->
<!--      <FormItem v-if="isAdd" label="登录密码" prop="password">-->
<!--        <Input type="password" v-model="formItem.password" placeholder="请输入密码"></Input>-->
<!--      </FormItem>-->
<!--      <FormItem v-if="isAdd" label="再次确认密码" prop="passwordConfirm">-->
<!--        <Input type="password" v-model="formItem.passwordConfirm" placeholder="请重复密码"></Input>-->
<!--      </FormItem>-->
<!--      <FormItem label="手机号" prop="mobile" :rules="$rules.mobile">-->
<!--        <Input v-model="formItem.mobile" placeholder="请输入手机号"></Input>-->
<!--      </FormItem>-->
<!--      <FormItem label="邮箱" prop="email" :rules="$rules.email">-->
<!--        <Input v-model="formItem.email" placeholder="请输入邮箱(选填)"></Input>-->
<!--      </FormItem>-->
<!--      <FormItem label="状态">-->
<!--        <RadioGroup v-model="formItem.status" type="button">-->
<!--          <Radio :label="0">禁用</Radio>-->
<!--          <Radio :label="1">正常</Radio>-->
<!--          <Radio :label="2">锁定</Radio>-->
<!--        </RadioGroup>-->
<!--      </FormItem>-->
<!--      <FormItem label="描述">-->
<!--        <Input v-model="formItem.userDesc" type="textarea" placeholder="请输入内容"></Input>-->
<!--      </FormItem>-->
<!--    </Form>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: 'UserInfo',-->
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
<!--      isAdd: true,-->
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
<!--        userName: '',-->
<!--        nickName: '',-->
<!--        password: '',-->
<!--        passwordConfirm: '',-->
<!--        status: 1,-->
<!--        companyId: '',-->
<!--        email: '',-->
<!--        mobile: '',-->
<!--        userType: 'normal',-->
<!--        userDesc: '',-->
<!--        avatar: '',-->
<!--        expireTime: '',-->
<!--        isExpired: false-->
<!--      }-->
<!--    },-->
<!--    setData (data) {-->
<!--      this.isAdd = true-->
<!--      if (data && data.userId) {-->
<!--        this.formItem = Object.assign({}, this.formItem, data)-->
<!--        this.isAdd = false-->
<!--      } else {-->
<!--        this.handleReset()-->
<!--      }-->
<!--    },-->
<!--    handleReset () {-->
<!--      this.$refs['form'].resetFields()-->
<!--      this.formItem = this.getFormItem()-->
<!--    },-->
<!--    handleSubmit () {-->
<!--      this.$refs['form'].validate((valid) => {-->
<!--        if (valid) {-->
<!--          this.$http.save(this.$apis.user, this.formItem.userId, this.formItem, this)-->
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
