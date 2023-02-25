import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 新增修改方法：获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
// 新增修改方法：修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Main.vue'),
    children: [
      {
        path: '/',
        name: 'Index',
        component: () => import('../views/Index.vue')
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import('../views/auth/Login.vue')
      },
      {
        path: "/register",
        name: "Register",
        component: () => import("../views/auth/Register.vue")
      },

      // admin
      {
        path: "/admin/center",
        name: "AdminCenter",
        component: () => import("../views/adminCenter/AdminCenter.vue")
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
