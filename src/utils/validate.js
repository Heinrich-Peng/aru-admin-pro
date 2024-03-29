const validateMobile = (rule, value, callback) => {
  const reg = /^[1][3,4,5,6,7,8][0-9]{9}$/
  if (!reg.test(value)) {
    callback(new Error('请输入正确手机号'))
  } else {
    callback()
  }
}
const validateEn = (rule, value, callback) => {
  const reg = /^[_a-zA-Z0-9]+$/
  const reg2 = /^.{4,18}$/
  // 长度为6到18个字符
  if (value === '') {
    callback(new Error('不能为空'))
  } else if (value !== '' && !reg.test(value)) {
    callback(new Error('只允许字母、数字、下划线'))
  } else if (value !== '' && !reg2.test(value)) {
    callback(new Error('长度6到18个字符'))
  } else {
    callback()
  }
}
export const rules = {
  mobile: [{
    required: true,
    message: '请输入手机号',
    trigger: 'blur'
  }, { validator: validateMobile, trigger: 'blur' }],
  userName: [{
    required: true,
    message: '请输入用户名',
    trigger: 'blur'
  }, { validator: validateEn, trigger: 'blur' }],
  email: [
    { required: false, type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
  ],
  // 验证自然数
  naturalNumber: /^(([0-9]*[1-9][0-9]*)|(0+))$/,
  naturalNumberMsg: '请输入自然数',
  // 英文
  english: /^.[A-Za-z]+$/,
  englishMsg: '请输入英文字符',
  // 座机
  telephone: /^\d{3}-\d{7,8}|\d{4}-\d{7,8}$/,
  telephoneMsg: '请输入正确的座机号',
  // 银行卡号码
  bankCard: /^[1-9]\d{9,19}$/,
  bankCardMsg: '请输入正确的银行卡号码',
  // 证件号码
  IDNumber: /^[a-z0-9A-Z]{0,50}$/,
  IDNumberMsg: '请输入正确的证件号码',
  // 身份证号码,包括15位和18位的
  IDCard: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{7}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/,
  IDCardMsg: '请输入正确的身份证号码',
  // QQ号码
  qq: /^[1-9]\d{4,11}$/,
  qqMsg: '请输入正确的QQ号码',
  // 网址, 仅支持http和https开头的
  url: /^(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?$/,
  urlMsg: '请输入以http和https开头的网址',
  // 0到20位的英文字符和数字
  enNum0to20: /^[a-z0-9A-Z]{0,20}$/,
  enNum0to20Msg: '请输入20位以内的英文字符和数字',
  // 2到100位的中英文字符和空格
  cnEnSpace2to100: /^[a-zA-Z\u4E00-\u9FA5\s*]{2,100}$/,
  cnEnSpace2to100Msg: '请输入2到100位的中英文字符和空格',
  // 数字和换行符
  numLinefeed: /^[0-9\n*]+$/,
  numLinefeedMsg: '请输入数字和换行符',
  // 255位以内的字符
  char0to255: /^.{0,255}$/,
  char0to255Msg: '请输入255位以内的字符',
  required: function (message, min, max) {
    const rule = [{ required: true, message: message, trigger: 'blur' }]
    if (min) {
      const r = { min: min, message: '最小长度' + min + '位字符' }
      rule.push(r)
    }
    if (max) {
      const m = { max: max, message: '最大长度' + max + '位字符' }
      rule.push(m)
    }
    return rule
  },
  select: function (message) {
    const rule = { required: true, message: message, trigger: 'change' }
    return rule
  },
  selects: function (message, min, max) {
    const rule = [{ required: true, type: 'array', message: message, trigger: 'change' }]
    if (min) {
      const r = { type: 'array', min: min, message: '最少选择' + min + '项' }
      rule.push(r)
    }
    if (max) {
      const m = { type: 'array', max: max, message: '最多选择' + max + '项' }
      rule.push(m)
    }
    return rule
  }
}
/**
 * @description 排序值验证，排序值不可以大于255
 */
export const validateOrder = function (rule, value, callback) {
  if (parseInt(value) > 255) {
    return callback(new Error('排序值不可以大于255'))
  } else {
    callback()
  }
}
