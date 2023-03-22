// 引入axios依赖
import axios from 'axios'
import store from './store'
// 引入路由
import router from './router/'
import {errorMsg} from "@/util/elementMsgUtil";

let s = window.location.toString();
const s1 = s.substring(7, s.length);
const s2 = s1.indexOf('/');
s = s.substring(0, 8 + s2)
const a = 'http://192.168.101.30:11000/api/';

// 配置默认前缀
axios.defaults.baseURL = a
axios.defaults.headers.post['Content-Type'] = 'application/json'

// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('accessToken') !== ''
      && config.url.includes('open')) {
      // console.log(localStorage.getItem('accessToken'))
      config.headers.Authorization = "Bearer " + localStorage.getItem('accessToken')
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

const photoCodeUrl = "/open/code/create"
const qrUrl = "/open/qr/create"
const authUrl = "/oauth/token"

// 配置后置拦截
axios.interceptors.response.use(
  (response) => {
    const res = response.data
    // 如果是图片验证码或者二维码接口,直接放行
    if (response.config.url.includes(photoCodeUrl)
      || response.config.url.includes(qrUrl)) {
      return response
    }
    // console.log(res)
    if (res.code === 200 || res === '') {
      return response
    } else {
      errorMsg(res.message)
      // 返回一个异常提示就不会继续往下走了 不+的话 res=>的里面 还是会继续走的
      return Promise.reject(response.data.msg)
    }
    // 捕获并处理后台异常信息
  },
  (error) => {
    // 使得异常信息更加友好
    if (error.request.responseURL.includes(authUrl)) {
      errorMsg("账户或密码错误")
      return Promise.reject(error)
    }
    console.log('error : ', error)
    if (error.response.msg) {
      // data不为空时
      error.message = error.response.data.msg
      console.log('-------------------------')
      console.log(error.message)
      console.log('-------------------------')
    }
    if (error.response.status === 401) {
      // 清空token userinfo
      store.commit('$_removeStorage')
      // 跳转登录页面
      router.push('/login')
    }
    errorMsg(error.message)

    return Promise.reject(error)
  }
)
