<template>
  <div class="follow">
    <el-tabs type="card" v-model="activeName">
      <el-tab-pane label="关注" name="follow">
        <div class="info">
          <div class="item"
               v-for="(item, index) in followData.records"
               :key="index"
          >
            <el-avatar :size="12" :src="item.followUserAvatar"></el-avatar>
            <div class="name">{{ item.followUserName }}</div>
            <el-button type="primary" @click="unFollowUser(item.followUserId)">取消关注</el-button>
          </div>
        </div>
        <!-- 分页组件 -->
        <el-pagination
            @current-change="followDataChangePage"
            :current-page="followData.current"
            :page-size="followData.size"
            layout="prev, pager, next"
            :total="followData.total">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="被关注" name="fan">
        <div class="info">
          <div class="item"
               v-for="(item, index) in fanData.records"
               :key="index"
          >
            <el-avatar :size="12" :src="item.userAvatar"></el-avatar>
            <div class="name">{{ item.userName }}</div>
            <el-button type="primary">回关</el-button>
          </div>
        </div>
        <!-- 分页组件 -->
        <el-pagination
            @current-change="fanDataChangePage"
            :current-page="fanData.current"
            :page-size="fanData.size"
            layout="prev, pager, next"
            :total="fanData.total">
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {successMsg} from "@/util/elementMsgUtil";

export default {
  name: "Follow",
  data() {
    return {
      userId: this.$route.params.userId,
      activeName: 'follow',
      // 关注列表
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
      // 粉丝列表
      fanData: {
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
    }
  },
  mounted() {
    this.getFollowList()
    this.getFanList()
  },
  methods: {
    // 获取关注列表
    getFollowList() {
      this.asyncGetFollowList().then(({data}) => {
        this.followData = data.data
      })
    },
    // 获取粉丝列表
    getFanList() {
      this.asyncGetFanList().then(({data}) => {
        this.fanData = data.data
      })
    },
    // 分页插件 => 关注列表切换页数
    followDataChangePage(val) {
      this.followData.current = val
      this.getFollowList()
    },
    // 分页插件 => 粉丝列表切换页数
    fanDataChangePage(val) {
      this.fanData.current = val
      this.getFanList()
    },
    followUser(followUserId) {
      this.asyncFollowUser(followUserId).then(() => {
        successMsg("关注成功")
        this.getFollowList()
      })
    },
    unFollowUser(followUserId) {
      this.asyncUnFollowUser(followUserId).then(() => {
        successMsg("取关成功")
        this.getFollowList()
      })
    },
    // 异步方法 => 获取关注列表
    async asyncGetFollowList() {
      return await this.$axios({
        url: "/yicode-user-openapi/open/user/follow/follow/detail",
        method: "post",
        data: {
          "userId": this.userId,
          "page": this.followData.current,
          "pageSize": this.followData.size
        }
      });
    },
    // 异步方法 => 获取粉丝列表
    async asyncGetFanList() {
      return await this.$axios({
        url: "/yicode-user-openapi/open/user/follow/fan/detail",
        method: "post",
        data: {
          "userId": this.userId,
          "page": this.fanData.current,
          "pageSize": this.fanData.size
        }
      });
    },
    // 异步方法 => 关注用户
    async asyncFollowUser(followUserId) {
      return await this.$axios({
        url: "/yicode-user-openapi/open/user/follow/follow-user",
        method: "post",
        data: {
          "followUserId": followUserId
        }
      });
    },
    // 异步方法 => 取关用户
    async asyncUnFollowUser(followUserId) {
      return await this.$axios({
        url: "/yicode-user-openapi/open/user/follow/unfollow-user",
        method: "post",
        data: {
          "followUserId": followUserId
        }
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