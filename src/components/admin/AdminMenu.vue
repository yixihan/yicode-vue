<template>
  <div class="admin-menu">
    <div class="header">
      <div class="logo"/>
      <h1>Yicode</h1>
    </div>
    <div @mouseover="mouseover"
         @mouseleave="mouseleave">
      <el-menu default-active="0"
               class="el-menu-vertical-demo"
               @open="handleOpen"
               @close="handleClose"
               :router=true
               >
        <el-menu-item index="/admin/center">
          <i class="el-icon-s-home"></i>
          <span slot="title">主页</span>
        </el-menu-item>
        <el-menu-item index="/admin/center/problem">
          <i class="el-icon-s-platform"></i>
          <span slot="title">题目管理</span>
        </el-menu-item>
        <el-menu-item index="/admin/center/list">
          <i class="el-icon-notebook-2"></i>
          <span slot="title">题单管理</span>
        </el-menu-item>
        <el-menu-item index="/admin/center/label">
          <i class="el-icon-collection-tag"></i>
          <span slot="title">标签管理</span>
        </el-menu-item>
        <el-menu-item index="/admin/center/user">
          <i class="el-icon-s-custom"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminMenu",
  data() {
    return {
      // 导航栏展开折叠 flag
      isCollapse: false
    };
  },
  methods: {
    // 导航栏自动展开
    mouseover() {
      this.isCollapse = false
    },
    // 导航栏自动折叠
    mouseleave() {
      this.isCollapse = true
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style lang="scss" scoped>
.admin-menu {
  position: relative;
  overflow: hidden;
  padding-top: 107px;
  height: 100%;
  background: #f3f3f3;
  .header {
    width: 200px;
    height: 100px;
    position: absolute;
    box-sizing: border-box;
    top: 0;
    overflow: hidden;
    transition: all .4s;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  border: none !important;
  background: #f3f3f3 !important;
}
.header {
  .logo {
    margin: 0 auto;
    box-sizing: border-box;
    height: 70px;
    width: 70px;
    background: url("~@/assets/img/logo.png") no-repeat;
    background-size: contain;
    cursor: pointer;
  }
}
</style>