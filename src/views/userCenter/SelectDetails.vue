<template>
  <div class="select-details">
    <!-- 功能区 -->
    <header>
      <div class="back" @click="goBack()">
        <i class="el-icon-arrow-left"></i>
        <span>返回</span>
      </div>
    </header>
    <!-- 数据展示 -->
    <el-table
        :data="collectionData.records"
        border>
      <el-table-column
          fixed
          align="center"
          prop="collectionName"
          label="收藏内容">
      </el-table-column>
      <el-table-column
          prop="createTime"
          align="center"
          label="收藏时间">
      </el-table-column>
      <el-table-column
          fixed="right"
          align="center"
          label="操作">
        <template slot-scope="scope">
          <el-button type="text"
                     size="small"
                     @click="toQuestionInfo(scope.row.collectionId)"
          >查看</el-button>
          <el-button type="text"
                     size="small"
                     style="color: red"
                     @click="delCollection(scope.row.collectionId)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页插件 -->
    <el-pagination
        @current-change="handleCurrentChange"
        :current-page="collectionData.current"
        :page-size="collectionData.size"
        layout="prev, pager, next"
        :total="collectionData.total">
    </el-pagination>
  </div>
</template>

<script>
import {successMsg} from "@/util/elementMsgUtil";

export default {
  name: "SelectDetails",
  data() {
    return {
      userId: this.$route.params.userId,
      favoriteId: this.$route.params.id,
      // 收藏内容
      collectionData: {
        current: 1,
        pages: 0,
        size: 10,
        total: 10,
        records: [
          {
            collectionId: 0,
            collectionName: '',
            createTime: ''
          }
        ]
      }
    }
  },
  mounted() {
    this.getUserFavoriteDetail()
  },
  methods: {
    // 返回
    goBack() {
      this.$router.push("/user/center/" + this.userId + "/select/")
    },
    // 获取收藏内容
    getUserFavoriteDetail() {
      this.asyncGetUserFavoriteDetail().then(({data}) => {
        this.collectionData = data.data
      })
    },
    // 取消收藏
    delCollection(collectionId) {
      this.asyncDelCollection(collectionId).then(() => {
        successMsg("取消收藏成功")
        this.getUserFavoriteDetail()
      })
    },
    // 跳转题目详情
    toQuestionInfo(questionId) {
      let url = this.$router.resolve('/question/details/' + questionId)
      window.open(url .href, '_blank')
    },
    // 分页插件 => 切换页数
    handleCurrentChange(val) {
      this.collectionData.current = val
      this.getUserFavoriteDetail()
    },
    // 异步方法 => 修改收藏夹
    async asyncGetUserFavoriteDetail() {
      return await this.$axios({
        url: "/yicode-user-openapi/open/user/favorite/collection/detail",
        method: "post",
        data: {
          "favoriteId": this.favoriteId,
          "page": this.collectionData.current,
          "pageSize": this.collectionData.size,
        }
      });
    },
    // 异步方法 => 删除收藏夹
    async asyncDelCollection(collectionId) {
      return await this.$axios({
        url: "/yicode-user-openapi/open/user/favorite/collection/cancel",
        method: "delete",
        data: {
          "favoriteId": this.favoriteId,
          "collectionId": collectionId
        }
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.select-details {
  header {
    height: 50px;
    line-height: 50px;
    width: 100%;
    background: #99a9bf;
    position: relative;

    .back {
      position: absolute;
      left: 5px;
      top: 0;
      cursor: pointer;
      text-align: left;
    }

    & > i {
      position: absolute;
      right: 20px;
      top: 13px;
      font-size: 24px;
      font-weight: bolder;
      transition: all 0.3s;
      cursor: pointer;

      &:hover {
        color: #FFFFFF;
      }
    }
  }

  .el-table {

  }
}
</style>