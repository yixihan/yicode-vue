import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken"),
    userId: localStorage.getItem("userId"),
    user: JSON.parse(sessionStorage.getItem("user")),
    userInfo: JSON.parse(sessionStorage.getItem("userInfo")),
    userRoleList: JSON.parse(sessionStorage.getItem("userRoleList")),
  },
  getters: {
    getUserInfo: state => {
      return state.userInfo
    },
    getUserId: state => {
      return state.userId
    },
    getAccessToken: state => {
      return state.accessToken
    },
    getRefreshToken: state => {
      return state.refreshToken
    }
  },
  mutations: {
    // 设置 accessToken 和 refreshToken
    setToken: (state, data) => {
      state.accessToken = data.access_token
      state.refreshToken = data.refresh_token
      localStorage.setItem("accessToken", data.access_token)
      localStorage.setItem("refreshToken", data.refresh_token)
    },
    // 设置用户信息
    setUserInfo: (state, data) => {
      state.userId = data.user.userId;
      state.user = data.user
      state.userRoleList = data.userRoleList
      state.userInfo = data.userInfo
      localStorage.setItem("userId", data.user.userId)
      localStorage.setItem("user", JSON.stringify(data.user))
      localStorage.setItem("userRoleList", JSON.stringify(data.userRoleList))
      localStorage.setItem("userInfo", JSON.stringify(data.userInfo))
    },
    // 登出
    removeInfo: (state) => {
      state.accessToken = ""
      state.refreshToken = ""
      state.userId = ""
      state.user = {}
      state.userInfo = {}
      state.userRoleList = {}
      localStorage.setItem("accessToken", "")
      localStorage.setItem("refreshToken", "")
      localStorage.setItem("userId", "")
      localStorage.setItem("user", JSON.stringify(""))
      localStorage.setItem("userRoleList", JSON.stringify(""))
      localStorage.setItem("userInfo", JSON.stringify(""))
    }
  },
  actions: {
  },
  modules: {
  }
})
