<template>
  <div class="follow">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="关注" name="first">
        <div class="info">
          <div class="item">
            <el-avatar :size="size" :src="circleUrl"></el-avatar>
            <div class="name">我是曾思彤</div>
            <el-button type="primary">取消关注</el-button>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="被关注" name="second">
        <div class="info">
          <div class="item">
            <el-avatar :size="size" :src="circleUrl"></el-avatar>
            <div class="name">我不是曾思彤</div>
            <el-button type="primary">回关</el-button>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "Follow",
  data() {
    return {
      followData: {
        current: 1,
        total: 0,
        size: 10,
        pages: 0,
        records: [
          {
            userId: 1,
            userName: "",
            userAvatar: "",
            followUserId: 0,
            followUserName: '',
            followUserAvatar: '',
            createTime: ""
          }
        ]
      },
      fanData: {
        current: 1,
        total: 0,
        size: 10,
        pages: 0,
        records: []
      },
    }
  },
  mounted() {
  },
  methods: {
    // 异步方法 => 获取问题数量情况
    async asyncGetQuestionCount() {
      return await this.$axios({
        url: "/yicode-question-openapi/open/question/all/count",
        method: "get",
      });
    },
    // 异步方法 => 获取用户做题进度
    async asyncGetUserQuestionRate() {
      return await this.$axios({
        url: "/yicode-question-openapi/open/question/commit/rate",
        method: "get",
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.follow {
  .info {
    display: flex;
    flex-direction: column;

    .item {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 0 20px;
      width: 100%;
      height: 50px;
      border-bottom: 1px solid #f0f0f0;
      box-sizing: border-box;

      .name {
        height: 50px;
        line-height: 50px;
        padding-left: 20px;
        box-sizing: border-box;
        flex: 1;
        text-align: left;
      }

      button {

      }
    }
  }
}
</style>