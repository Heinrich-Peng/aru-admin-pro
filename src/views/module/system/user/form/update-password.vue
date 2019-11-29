<template>
  <a-form :form="form">
    <a-form-item v-bind="formItemLayout" label="要修改的密码">
      <a-input
        type="password"
        autocomplete="false"
        placeholder="至少6位密码，区分大小写"
        v-decorator="['password', {rules: [{ required: true, message: '至少6位密码，区分大小写'}, { validator: this.validatePass }], validateTrigger: ['change', 'blur']}]"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="再次确认密码">
      <a-input
        type="password"
        autocomplete="false"
        placeholder="确认密码"
        v-decorator="['passwordConfirm', {rules: [{ required: true, message: '至少6位密码，区分大小写' }, { validator: this.validatePassConfirm }], validateTrigger: ['change', 'blur']}]"
      />
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  name: 'UpdatePassword',
  props: {},
  data () {
    return {
      formItemLayout: {
        labelCol: { xs: { span: 24 }, sm: { span: 6 } },
        wrapperCol: { xs: { span: 24 }, sm: { span: 18 } }
      },
      form: this.$form.createForm(this)
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
          this.$http.post(this.$apis.user.updatePassword, {
            userId: param.userId,
            password: values.password
          }).then(res => {
            this.$message.success('修改成功！')
            this.$bus.emit('closeModal')
          }).catch(() => {
            this.$message.error('修改失败！')
            this.$bus.emit('closeModal')
          })
        } else {
          this.$bus.emit('resetModal')
        }
      })
    },
    handleReset () {
      this.form.clearField()
    }
  },
  created () {
    this.$bus.on('closeModal', (name) => {
      this.handleReset()
    })
  },
  components: {}
}
</script>
