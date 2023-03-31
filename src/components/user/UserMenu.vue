<template>
  <div class="user-menu">
    <div class="user-info">
      <div class="avatar">
        <img :src="userAvatar" alt=""/>
      </div>
      <div class="user-name">
        {{ userName }}
      </div>
      <div class="follow">
        <div>
          <span>关注</span>
          <span>{{ followNum }}</span>
        </div>
        <div>
          <span>关注者</span>
          <span>{{ beFollowNum }}</span>
        </div>
      </div>
    </div>
    <nav>
      <router-link :to="'/userCenter/center/' + $store.getters.getUserId">首页</router-link>
      <router-link to="/userCenter/select">收藏</router-link>
      <router-link to="/userCenter/progress">进度</router-link>
<!--      <router-link to="/userCenter/release">发布</router-link>-->
      <router-link to="/userCenter/follow">关注</router-link>
      <router-link to="/userCenter/setting">设置</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: "UserMenu",
  data () {
    return {
      userName: '彤彤',
      userAvatar: require('@/assets/img/login_back.png'),
      followNum: 123,
      beFollowNum: 456,
    }
  },
  mounted() {
    this.userName = this.$store.getters.getUser.userName
    this.userAvatar = this.$store.getters.getUserInfo.userAvatar

  }
}
</script>

<style lang="scss" scoped>
.user-menu {
  width: 250px;
  height: 100%;
  background: #efefef;
  border-right: 1px solid #d0d0d0;
  .user-info {
    width: 100%;
    background: #fefefe;
    height: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: default;
    &:hover {
      .avatar {
        img {
          transform: scale(1.2);
        }
      }
    }
    .avatar {
      width: 100%;
      height: 100px;
      img {
        width: 100px;
        height: 100px;
        border-radius: 50px;
        cursor: pointer;
        object-fit: cover;
        transition: all .5s;
      }
    }
    .user-name {
      width: 100%;
      height: 50px;
      line-height: 50px;
      font-size: 20px;
      font-weight: bold;
    }
    .follow {
      width: 100%;
      display: flex;
      justify-content: space-around;
      >div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        span:nth-child(1) {
          font-size: 14px;
          font-weight: bold;
        }
        span:nth-child(2) {
          font-size: 14px;
          color: #57aefc;
        }
      }
    }
  }
  nav {
    display: flex;
    flex-direction: column;
    a {
      height: 50px;
      line-height: 50px;
      text-decoration: none;
    }
    a.router-link-exact-active {
      background: #e1e1e1;
    }
  }
}
</style>