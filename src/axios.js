// 引入axios依赖
import axios from 'axios'
// 引入element-ui依赖
import Element from 'element-ui'
import store from './store'
// 引入路由
import router from './router/'

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
        return config;
    //     console.log(config)
    //     if (localStorage.getItem('token') !== '' && (config.url.includes('gxc') || config.url.includes('register'))) {
    //         console.log(localStorage.getItem('satoken'))
    //         config.headers.Authorization = localStorage.getItem('token')
    //         config.headers.satoken = localStorage.getItem('token')
    //     }
    //     return config
    // },
    // error => {
    //     return Promise.reject(error)
    }
)

// 配置后置拦截
axios.interceptors.response.use(
    (response) => {
        const res = response.data
        // console.log(res)
        if (res.code === 200) {
            return response
        } else if (res.code === 1000) {
            Element.Message.error('操作失败, 请联系管理员', {duration: 2 * 1000})
            return Promise.reject(response.data.msg)
        } else {
            Element.Message.error(res.msg, {duration: 2 * 1000})
            // 返回一个异常提示就不会继续往下走了 不+的话 res=>的里面 还是会继续走的
            return Promise.reject(response.data.msg)
        }
        // 捕获并处理后台异常信息
    },
    (error) => {
        // 使得异常信息更加友好
        if (error.request.responseURL.includes('login')) {
            Element.Message.error('手机号/邮箱有误')
            return
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
        Element.Message.error(error.message)

        return Promise.reject(error)
    }
)
