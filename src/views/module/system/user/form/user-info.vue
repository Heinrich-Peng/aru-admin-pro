<template>
  <a-form :form="form">
    <a-form-item v-bind="formItemLayout" label="用户类型">
      <a-radio-group
        buttonStyle="solid"
        v-decorator="['userType']"
      >
        <a-radio-button value="normal">普通管理员</a-radio-button>
        <a-radio-button value="super">超级管理员</a-radio-button>
      </a-radio-group>
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="昵称">
      <a-input
        placeholder="请输入内容"
        v-decorator="['nickName', {rules: [{ required: true, message: '昵称不能为空' }], validateTrigger: ['change', 'blur']}]"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="用户名">
      <a-input
        placeholder="请输入用户名"
        :disabled="isAdd"
        v-decorator="['userName', {rules: this.$rules.userName, validateTrigger: ['change', 'blur']}]"
      />
    </a-form-item>
    <a-form-item v-if="!isAdd" v-bind="formItemLayout" label="登录密码">
      <a-input
        type="password"
        placeholder="请输入密码"
        v-decorator="['password', {rules: [{ required: true, message: '至少6位密码，区分大小写'}, { validator: this.validatePass }], validateTrigger: ['change', 'blur']}]"
      />
    </a-form-item>
    <a-form-item v-if="!isAdd" v-bind="formItemLayout" label="确认密码">
      <a-input
        type="password"
        placeholder="请重复密码"
        v-decorator="['passwordConfirm', {rules: [{ required: true, message: '至少6位密码，区分大小写' }, { validator: this.validatePassConfirm }], validateTrigger: ['change', 'blur']}]"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="手机号">
      <a-input
        placeholder="请输入手机号"
        v-decorator="['mobile', {rules: this.$rules.mobile, validateTrigger: ['change', 'blur']}]"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="邮箱">
      <a-input
        placeholder="请输入邮箱(选填)"
        v-decorator="['email', {rules: this.$rules.email, validateTrigger: ['change', 'blur']}]"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="状态">
      <a-radio-group
        buttonStyle="solid"
        v-decorator="['status']"
      >
        <a-radio-button :value="0">禁用</a-radio-button>
        <a-radio-button :value="1">正常</a-radio-button>
        <a-radio-button :value="2">锁定</a-radio-button>
      </a-radio-group>
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="描述">
      <a-textarea
        placeholder="请输入描述"
        :autosize="{ minRows: 2, maxRows: 6 }"
        v-decorator="['userDesc']"
      />
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  name: 'UserInfo',
  props: {
    paramFunc: { type: Function, required: false, default: () => { return () => {} } }
  },
  data () {
    return {
      initObject: {
        userId: '',
        userName: '',
        nickName: '',
        password: '',
        passwordConfirm: '',
        status: 1,
        companyId: '',
        email: '',
        mobile: '',
        userType: 'normal',
        userDesc: '',
        avatar: '',
        expireTime: '',
        isExpired: false
      },
      initTemp: {},
      formItemLayout: {
        labelCol: { xs: { span: 24 }, sm: { span: 5 } },
        wrapperCol: { xs: { span: 24 }, sm: { span: 19 } }
      },
      form: this.$form.createForm(this),
      isAdd: false
    }
  },
  methods: {
    validatePass (rule, value, callback) {
      const reg2 = /^.{6,18}$/
      const passwordConfirm = this.form.getFieldValue('passwordConfirm')
      if (value === undefined || value === '') {
        callback(new Error('请输入密码'))
      } else if (value !== passwordConfirm && passwordConfirm.length !== 0) {
        callback(new Error('两次输入密码不一致'))
      } else if (value !== '' && !reg2.test(value)) {
        callback(new Error('长度6到18个字符'))
      } else {
        callback()
      }
    },
    validatePassConfirm (rule, value, callback) {
      const password = this.form.getFieldValue('password')
      if (value === undefined) {
        callback(new Error('请输入密码'))
      }
      if (value && password && value.trim() !== password.trim()) {
        callback(new Error('两次密码不一致'))
      }
      callback()
    },
    handleSubmit (param) {
      const { form: { validateFields } } = this
      validateFields({ force: true }, (err, values) => {
        if (!err) {
          const form = Object.assign({}, this.initTemp, values)
          this.$http.save(this.$apis.user, this.isAdd, form, this)
            .then(res => {
              this.$message.success('保存成功！')
            }).catch(() => {
              this.$message.error('保存失败！')
              this.$bus.emit('closeModal')
            })
        } else {
          this.$bus.emit('resetModal')
        }
      })
    },
    handleReset () {
      this.form.clearField()
    },
    initFields () {
      this.handleReset()
      const param = this.paramFunc()
      this.initTemp = Object.assign({}, param !== null ? param : this.initObject)
      const temp = {}
      Object.keys(this.form.fieldsStore.getAllValues()).forEach(key => { temp[key] = this.initTemp[key] })
      this.form.setFieldsValue(temp)
    }
  },
  created () {
    this.$bus.on('closeModal', (name) => { this.handleReset() })
    this.isAdd = this.paramFunc() !== null && this.paramFunc().userId.length > 0
    setTimeout(() => this.initFields(), 10)
  },
  components: {}
}
</script>
