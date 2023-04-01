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
          <span>{{ followCount }}</span>
        </div>
        <div>
          <span>关注者</span>
          <span>{{ fanCount }}</span>
        </div>
      </div>
      <div class="web">
        <h4>个人网站</h4>
        <a v-for="(item, index) in userWebsite"
           :key="index"
           :href="item"
        >{{ item }}</a>
      </div>
    </div>
    <nav>
      <router-link :to="'/userCenter/center/' + userId">首页</router-link>
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
      userId: this.$store.getters.getUserId,
      userName: this.$store.getters.getUser.userName,
      userAvatar: this.$store.getters.getUserInfo.userAvatar,
      userWebsite: this.$store.getters.getUserInfo.userWebsiteList,
      followCount: 0,
      fanCount: 0,
    }
  },
  mounted() {
    this.getFollowCount()
    this.getFanCount()
  },
  methods: {
    getFollowCount() {
      this.asyncGetFollowCount().then(({data}) => {
        this.followCount = data.data
      })
    },
    getFanCount() {
      this.asyncGetFanCount().then(({data}) => {
        this.fanCount = data.data
      })
    },
    // 异步方法 => 获取问题数量情况
    async asyncGetFollowCount() {
      return await this.$axios({
        url: "/yicode-user-openapi/open/user/follow/follow/count?userId=" + this.userId,
        method: "get",
      });
    },
    // 异步方法 => 获取用户做题进度
    async asyncGetFanCount() {
      return await this.$axios({
        url: "/yicode-user-openapi/open/user/follow/fan/count?userId=" + this.userId,
        method: "get",
      });
    }
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
    //height: 250px;
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
    .web {
      padding: 10px 0;
      h4 {
        margin-top: 10px;
        height: 40px;
        line-height: 40px;
      }
      a {
        display: inline-block;
        line-height: 26px;
        height: 26px;
        font-size: 12px;
        color: #7a7a7a;
        text-decoration: none;
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