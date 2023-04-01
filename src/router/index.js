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
        component: () => import('@/views/Index.vue')
      },
      // auth
      {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/auth/Login.vue')
      },
      {
        path: "/register",
        name: "Register",
        component: () => import("@/views/auth/Register.vue")
      },
      {
        path: "/resetPassword",
        name: "ResetPassword",
        component: () => import("@/views/auth/ResetPassword.vue")
      },
      {
        path: "/questionLibrary",
        name: "QuestionLibrary",
        component: () => import("@/views/QuestionLibrary.vue")
      },
      {
        path: "/question/details/:questionId",
        name: "QuestionDetails",
        component: () => import("@/views/question/QuestionDetails.vue")
      },
      // admin
      {
        path: "/admin/center",
        name: "AdminCenter",
        component: () => import("../views/adminCenter/AdminCenter.vue"),
        children: [
          {
            path: "/admin/center",
            name: "AdminIndex",
            component: () => import("@/views/adminCenter/Index.vue")
          },
          {
            path: "/admin/center/problem",
            name: "AdminProblem",
            component: () => import("@/views/adminCenter/Problem.vue")
          },
          {
            path: "/admin/center/list",
            name: "AdminList",
            component: () => import("@/views/adminCenter/List.vue")
          },
          {
            path: "/admin/center/list-details/:id",
            name: "QuestionListDetail",
            component: () => import("@/views/adminCenter/QuestionListDetail.vue")
          },
          {
            path: "/admin/center/label",
            name: "AdminLabel",
            component: () => import("@/views/adminCenter/Label.vue")
          },
          {
            path: "/admin/center/user",
            name: "AdminUser",
            component: () => import("@/views/adminCenter/User.vue")
          },
          {
            path: "/admin/center/detail",
            name: "AdminQuestionDetail",
            component: () => import("@/views/adminCenter/Details.vue")
          },
          {
            path: "/admin/center/question-modify",
            name: "AdminQuestionModify",
            component: () => import("@/views/adminCenter/QuestionModify.vue")
          }
        ]
      },
      // user
      {
        path: "/user/center/:userId",
        name: "UserCenter",
        component: () => import("@/views/userCenter/Index.vue"),
        children: [
          {
            path: "/user/center/:userId",
            name: "UserCenterHome",
            component: () => import("@/views/userCenter/Home.vue")
          },
          {
            path: "/user/center/:userId/select",
            name: "UserCenterSelect",
            component: () => import("@/views/userCenter/Select.vue")
          },
          {
            path: "/user/center/:userId/select/detail/:id",
            name: "UserCenterSelectDetail",
            component: () => import("@/views/userCenter/SelectDetails.vue")
          },
          {
            path: "/user/center/:userId/progress",
            name: "UserCenterProgress",
            component: () => import("@/views/userCenter/Progress.vue")
          },
          {
            path: "/user/center/:userId/release",
            name: "UserCenterRelease",
            component: () => import("@/views/userCenter/Release.vue")
          },
          {
            path: "/user/center/:userId/follow",
            name: "UserCenterFollow",
            component: () => import("@/views/userCenter/Follow.vue")
          },
          {
            path: "/user/center/:userId/setting",
            name: "UserCenterSetting",
            component: () => import("@/views/userCenter/Setting.vue")
          }
        ]
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
