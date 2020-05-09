// 必填
export function mustRequired (message) {
  // return {required: true, message, trigger: ['blur', 'change']};
  // 把change只能丢失焦点才判断是否必填
  return {required: true, message, trigger: 'blur'}
}

// 必须数字
export const mustNumber = {type: 'integer', message: '必须为数字值', transform: value => value ? +(value) : void 0}

// 限制邮箱
export const requiredEmail = {type: 'email', message: '邮箱格式不正确', trigger: ['blur', 'change']}

// 限制日期
export const requiredDate = {type: 'date', message: '日期格式不正确', trigger: ['blur', 'change']}

// 限制链接
export const requiredUrl = {type: 'url', message: '链接格式不正确', trigger: ['blur', 'change']}

// 手机号码验证
export const mobileTest = {validator: phoneNumber, trigger: 'blur'}

// 电话号码验证
export const telephoneTest = {validator: telephoneNumber, trigger: 'blur'}

// 身份证号码验证
export const idCardTest = {validator: idCard, trigger: 'blur'}

// money验证
export const moneyValidate = {validator: money, type: 'integer', transform: value => value ? +(value) : void 0, trigger: ['blur', 'change']}

// 密码校验
export const passwordValidate = {validator: password, trigger: 'blur'}

// 字符串限制长度函数
export function stringLength (min, max, message) {
  return {min, max, message: message || `最多输入${max}位字符`, trigger: ['blur', 'change']}
}

// 限制数字且长度多少函数
export function NumberLength (min, max) {
  return {type: 'number', min, max, message: `最多输入${String(max).length}位数字`, transform: value => value ? +(value) : void 0, trigger: ['blur', 'change']}
}

/******
 *
 *  以下是方法
 *
 *   */

// 手机号码校验
function phoneNumber (rule, value, callback) {
  if (value && (!(/^[1]\d{10}$/).test(value) || !(/^[1-9]\d*$/).test(value) || value.length !== 11)) {
    callback(new Error('手机号码不符合规范'))
  } else {
    callback()
  }
}

// 电话号码校验
function telephoneNumber (rule, value, callback) {
  if (value && (!(/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/).test(value))) {
    callback(new Error('电话号码不符合规范'))
  } else {
    callback()
  }
}

// 身份证号码校验
function idCard (rule, value, callback) {
  if (value && (!(/\d{17}[\d|x|X]|\d{15}/).test(value) || (value.length !== 15 && value.length !== 18))) {
    callback(new Error('身份证号码不符合规范'))
  } else {
    callback()
  }
}

// 两位小数  /^([1-9]+\d*)(\.\d{1,2}){0,1}$|^0\.\d{0,1}[1-9]$
function money (rule, value, callback) {
  if (value && (!(/^[0-9]+(.[0-9]{0,2})?$/).test(value))) {
    callback(new Error('请输入最多两位小数的数值'))
  } else {
    callback()
  }
}

// 验证密码
function password (rule, value, callback) {
  if (value.length < 8) {
    callback(new Error('密码格式错误，密码长度至少8位'))
  }
  if (value && (!(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*.,;'()])[\da-zA-Z~!@#$%^&*]{8,}$/g.test(value)))) {
    callback(new Error('密码格式错误，密码需要含有数字&字母&特殊字符'))
  } else {
    callback()
  }
}

// 5个字符限制
export const stringLength5 = stringLength(1, 5)

// 10个字符限制
export const stringLength10 = stringLength(1, 10)

// 20个字符限制
export const stringLength20 = stringLength(1, 20)

// 30个字符限制
export const stringLength30 = stringLength(1, 30)

// 50个字符限制
export const stringLength50 = stringLength(1, 50)

// 100个字符限制
export const stringLength100 = stringLength(1, 100)

// 4个数字限制
export const NumberLength4 = NumberLength(0, 9999)

// 5个数字限制
export const NumberLength5 = NumberLength(0, 99999)

// 10个数字限制
export const NumberLength10 = NumberLength(0, 9999999999)

// 15个数字限制
export const NumberLength15 = NumberLength(0, 999999999999999)
