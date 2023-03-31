<template>
  <div class="language-skill">
    <div class="language">
      <div v-for="(item, index) in websiteList" :key="index">
        <span class="name">{{ item.language }}</span>
        <span>通过数: </span>
        <span class="num">{{ item.dealCount }}</span>
      </div>
    </div>
    <div class="skill">
      <span v-for="(item, index) in labelList" :key="index">{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "languageAndSkill",
  data () {
    return {
      userId: this.$store.getters.getUserId,
      websiteList: [
        {
          language: '',
          dealCount: 0,
        },
      ],
      labelList: []
    }
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      this.asyncGetUserInfo().then(({data}) => {
        this.websiteList = data.data.userInfo.userLanguageList
        this.labelList = data.data.userInfo.userLabel
      })
    },
    // 异步方法 => 获取用户信息
    async asyncGetUserInfo() {
      return await this.$axios({
        url: "/yicode-user-openapi/open/user/detail?userId=" + this.userId,
        method: "get",
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.language-skill {
  width: 100%;
  display: flex;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.0392156863), 0 2px 8px rgba(0, 0, 0, 0.0784313725);
  box-sizing: border-box;
  .language {
    flex: 1;
    padding: 20px;
    border-right: 1px solid #cbcbcb;
    font-size: 14px;
    >div {
      display: flex;
      justify-content: space-between;
      height: 25px;
      padding: 5px 10px;
      line-height: 25px;
      border-radius: 4px;
      transition: all .3s;
      &:hover {
        background: #99a9bf;
      }
      .name {
        flex: 16;
        color: #274e79;
        font-weight: bold;
        text-align: left;
      }
      .num {
        color: #274e79;
        font-weight: bold;
      }
    }
  }
  .skill {
    flex: 1;
    padding: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    align-content: center;
    span {
      padding: 0 15px;
      margin: 10px 10px 10px 0;
      background: #99a9bf;
      border-radius: 20px;
      font-size: 14px;
    }
  }
}
</style>