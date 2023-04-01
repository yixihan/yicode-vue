<template>
  <div class="select">
    <!-- 功能区 -->
    <header>
      <el-button type="primary" @click="showAdd = true" icon="el-icon-plus" circle></el-button>
    </header>
    <!-- 数据展示 -->
    <el-table
        :data="favoriteData.records"
        :stripe="true"
        :border="true"
        border>
      <el-table-column
          fixed
          align="center"
          prop="favoriteName"
          label="收藏夹名">
      </el-table-column>
      <el-table-column
          prop="favoriteType"
          align="center"
          :formatter="favoriteTypeFormatter"
          label="收藏夹类型">
      </el-table-column>
      <el-table-column
          prop="createTime"
          align="center"
          label="创建时间">
      </el-table-column>
      <el-table-column
          fixed="right"
          align="center"
          label="操作">
        <template slot-scope="scope">
          <el-button @click="detail(scope.row.favoriteId)" type="text" size="small">查看</el-button>
          <el-button @click="modify(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="delUserFavorite(scope.row.favoriteId)" type="text" size="small" style="color: red">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination
        @current-change="handleCurrentChange"
        :current-page="favoriteData.current"
        :page-size="favoriteData.size"
        layout="prev, pager, next"
        :total="favoriteData.total">
    </el-pagination>

    <!-- 添加收藏夹 -->
    <el-dialog
        title="添加收藏夹"
        :visible.sync="showAdd"
        width="50%">
      <el-form :model="formAdd">
        <el-form-item label="收藏夹名称" label-width="120px">
          <el-input v-model="formAdd.favoriteName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="收藏夹类型" label-width="120px">
          <el-radio-group v-model="formAdd.favoriteType" size="small">
            <el-radio label="QUESTION" border>问题</el-radio>
            <el-radio label="NOTE" border>题解</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showAdd = false">取 消</el-button>
        <el-button type="primary" @click="addUserFavorite">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改收藏夹 -->
    <el-dialog
        title="修改收藏夹"
        :visible.sync="showModify"
        width="50%">
      <el-form :model="formModify">
        <el-form-item label="收藏夹名称" label-width="120px">
          <el-input v-model="formModify.favoriteName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showModify = false">取 消</el-button>
        <el-button type="primary" @click="modifyUserFavorite">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {errorMsg, successMsg} from "@/util/elementMsgUtil";

export default {
  name: "Select",
  data() {
    return {
      userId: this.$route.params.userId,
      showAdd: false,
      showModify: false,
      // 收藏夹数据
      favoriteData: {
        current: 1,
        pages: 1,
        size: 10,
        total: 0,
        records: [
          {
            favoriteId: 0,
            favoriteName: '',
            favoriteType: '',
            createTime: ''
          }
        ]
      },
      selectList: [
        {
          date: '2023-01-23',
          name: 'test',
          type: '题目'
        }
      ],
      formAdd: {
        favoriteName: '',
        favoriteType: ''
      },
      formModify: {
        favoriteId: 0,
        favoriteName: '',
      }
    }
  },
  mounted() {
    this.getUserFavorite()
  },
  methods: {
    // 查看详情
    detail(favoriteId) {
      this.$router.push('/user/center/' + this.userId + '/select/detail/' + favoriteId)
    },
    // 修改收藏夹
    modify(val) {
      this.showModify = true
      this.formModify = {
        favoriteId: val.favoriteId,
        favoriteName: val.favoriteName,
      }
    },
    // 获取用户收藏夹
    getUserFavorite() {
      this.asyncGetUserFavorite().then(({data}) => {
        this.favoriteData = data.data
      })
    },
    // 添加收藏夹
    addUserFavorite() {
      if (this.formAdd.favoriteName === '') {
        errorMsg("收藏夹名称不能为空")
        return
      }
      if (this.formAdd.favoriteType === '') {
        errorMsg("收藏夹类型不能为空")
        return;
      }
      this.asyncAddUserFavorite().then(() => {
        this.getUserFavorite()
        this.formAdd = {
          favoriteName: '',
          favoriteType: ''
        }
        this.showAdd = false
      })
    },
    // 修改收藏夹
    modifyUserFavorite() {
      this.asyncModifyUserFavorite().then(() => {
        successMsg("修改成功")
        this.getUserFavorite()
        this.showModify = false
      })
    },
    // 删除收藏夹
    delUserFavorite(favoriteId) {
      this.asyncDelUserFavorite(favoriteId).then(() => {
        successMsg("删除成功")
        this.getUserFavorite()
      })
    },
    // 分页插件 => 切换页数
    handleCurrentChange(val) {
      console.log(val)
      this.favoriteData.current = val
      this.getUserFavorite()
    },
    // formatter => 收藏夹类型格式化
    favoriteTypeFormatter(row) {
      switch (row.favoriteType) {
        case 'QUESTION':
          return '题目'
        case 'NOTE':
          return '题解'
      }
    },
    // 异步方法 => 获取用户收藏夹
    async asyncGetUserFavorite() {
      return await this.$axios({
        url: "/yicode-user-openapi/open/user/favorite/detail",
        method: "post",
        data: {
          "pageSize": this.favoriteData.size,
          "userId": this.userId,
          "page": this.favoriteData.current,
        }
      });
    },
    // 异步方法 => 新增收藏夹
    async asyncAddUserFavorite() {
      return await this.$axios({
        url: "/yicode-user-openapi/open/user/favorite/add",
        method: "post",
        data: this.formAdd
      });
    },
    // 异步方法 => 修改收藏夹
    async asyncModifyUserFavorite() {
      return await this.$axios({
        url: "/yicode-user-openapi/open/user/favorite/modify",
        method: "post",
        data: this.formModify
      });
    },
    // 异步方法 => 删除收藏夹
    async asyncDelUserFavorite(favoriteId) {
      return await this.$axios({
        url: "/yicode-user-openapi/open/user/favorite/del?favoriteId=" + favoriteId,
        method: "delete",
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.select {
  header {
    height: 50px;
    line-height: 50px;
    width: 100%;
    position: relative;

    button {
      position: absolute;
      right: 20px;
    }
  }

  .el-table {

  }
}
</style>