<template>
  <a-form :form="form">
    <a-form-item v-bind="formItemLayout" label="拥有角色">
      <a-select
        mode="tags"
        placeholder="角色选择"
        :value="selectData"
        @change="handleChange"
      >
        <a-select-option v-for="v in allData" :key="v">
          {{ v }}
        </a-select-option>
      </a-select>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  name: 'UserRole',
  props: {
    value: { type: Object, required: false, default: () => { return {} } }
  },
  data () {
    return {
      formItemLayout: {
        labelCol: { xs: { span: 24 }, sm: { span: 5 } },
        wrapperCol: { xs: { span: 24 }, sm: { span: 19 } }
      },
      allData: [],
      selectData: []
    }
  },
  methods: {
    handleSubmit (param) {
      const { form: { validateFields } } = this
      validateFields({ force: true }, (err, values) => {
        if (!err) {
          // this.$http.post(this.$apis.user.updatePassword, {
          //   userId: param.record.userId,
          //   password: values.password
          // }).then(res => {
          //   this.$message.success('修改成功！')
          //   this.$bus.emit('closeModal')
          // }).catch(() => {
          //   this.$message.error('修改失败！')
          //   this.$bus.emit('closeModal')
          // })
        } else {
          this.$bus.emit('resetModal')
        }
      })
    },
    handleReset () {
      this.form = this.$form.createForm(this)
    },
    loadDate () {
      const that = this
      const p1 = this.$http.get(this.$apis.role.all, {}, this)
      const p2 = this.$http.get(this.$apis.user.getUserRoles, { userId: this.value.userId }, this)

      Promise.all([p1, p2]).then(function (values) {
        console.log(values)
        const res1 = values[0]
        const res2 = values[1]
        if (res1.code === 0) {
          that.selectData = res1.data
        }
        if (res2.code === 0) {
          const result = []
          res2.data.map(item => {
            result.push(item.roleId)
          })
          that.allData = result
        }
      })
    },
    handleChange (value) {

    }
  },
  created () {
    this.$bus.on('closeModal', (name) => {
      this.handleReset()
    })
    this.loadDate()
  },
  components: {}
}
</script>
