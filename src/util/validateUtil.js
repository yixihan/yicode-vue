const REG_NUMBER = /.*\d+.*/
const REG_UPPERCASE = /.*[A-Z]+.*/
const REG_LOWERCASE = /.*[a-z]+.*/
const REG_SYMBOL = /.*[-。，￥！·=；：‘“、~!@#$%^&*()_+|<>,.?\/:;'\[\]{}"]+.*/
const REG_EMAIL = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
const REG_MOBILE = /((13[0-9])|(14[5-9])|(15([0-3]|[5-9]))|(16[6-7])|(17[1-8])|(18[0-9])|(19[1|3])|(19[5|6])|(19[8|9]))\d{8}/g;
const REG_ID_CARD = /[1-9][0-9]{5}(18|19|20)[0-9]{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)[0-9]{3}([0-9]|([Xx]))/g;
const PASSWORD_MIN_LENGTH = 8
const PASSWORD_MAX_LENGTH = 20
const USERNAME_MIN_LENGTH = 2
const USERNAME_MAX_LENGTH = 10

// 校验邮箱
export function validateEmail(email) {
  return REG_EMAIL.test(email)
}

// 校验手机号
export function validateMobile(mobile) {
  return REG_MOBILE.test(mobile)
}

// 校验身份证号
export function validateIdCard(idCard) {
  return REG_ID_CARD.test(idCard)
}

// 校验密码
export function validatePassword(password) {
  if (password === null
    || password === ""
    || password === undefined
    || password.length < PASSWORD_MIN_LENGTH
    || password.length > PASSWORD_MAX_LENGTH) {
    return false
  }
  let count = 0;
  REG_NUMBER.test(password) ? count += 1 : count += 0
  REG_UPPERCASE.test(password) ? count += 1 : count += 0
  REG_LOWERCASE.test(password) ? count += 1 : count += 0
  REG_SYMBOL.test(password) ? count += 1 : count += 0
  // console.log("password, count: ", password, count)
  return count >= 4
}

// 校验用户名
export function validateUserName(userName) {
  return userName !== null
    && userName !== ""
    && userName !== undefined
    && userName.length >= USERNAME_MIN_LENGTH
    && userName.length <= USERNAME_MAX_LENGTH
}

// 校验验证码
export function validateCode(code) {
  return code !== null
    && code !== ""
    && code !== undefined
}