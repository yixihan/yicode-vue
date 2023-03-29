<template>
  <div class="user">
    <div class="search">
      <el-input v-model="userIdInput" placeholder="用户id"></el-input>
      <el-input v-model="userNameInput" placeholder="用户名"></el-input>
      <el-input v-model="userMobileInput" placeholder="用户手机号"></el-input>
      <el-input v-model="userEmailInput" placeholder="用户邮箱"></el-input>
      <el-button type="primary" @click="getUserList">搜索</el-button>
      <el-button @click="resetSearchReq">清空</el-button>
    </div>
    <el-table
        :data="userData.records"
        :stripe="true"
        border
        style="width: 99.6%">
      <el-table-column
          prop="userId"
          width="120"
          align="center"
          label="用户id">
      </el-table-column>
      <el-table-column
          prop="userName"
          width="120"
          align="center"
          label="用户名">
      </el-table-column>
      <el-table-column
          prop="userMobile"
          label="用户手机号"
          align="center"
      >
      </el-table-column>
      <el-table-column
          prop="userEmail"
          label="用户邮箱"
          align="center"
      >
      </el-table-column>
      <el-table-column
          prop="createTime"
          label="注册时间"
          align="center"
      >
      </el-table-column>
      <el-table-column
          fixed="right"
          align="center"
          width="150"
          label="操作">
        <template slot-scope="scope">
          <el-button type="text"
                     size="small"
                     @click="toUserCenter(scope.row.userId)"
          >查看</el-button>
          <el-button type="text"
                     size="small"
                     style="color: red"
                     @click="cancellation(scope.row)"
          >注销</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :hide-on-single-page="hide"
          :current-page="userData.current"
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="userData.size"
          :total="userData.total"
          layout="total, sizes, prev, pager, next, jumper"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {successMsg} from "@/util/elementMsgUtil";

export default {
  name: "AdminUser",
  data() {
    return {
      hide: false,
      userIdInput: '',
      userNameInput: '',
      userMobileInput: '',
      userEmailInput: '',
      userData: {
        "current": 1,
        "pages": 1,
        "records": [
          {
            "userId": 0,
            "userEmail": "",
            "userMobile": "",
            "userName": "",
            "createTime": ""
          }
        ],
        "size": 10,
        "total": 0
      }
    }
  },
  mounted() {
    this.getUserList();
  },
  methods: {
    // 重置搜索条件
    resetSearchReq() {
      this.userIdInput = ''
      this.userNameInput = ''
      this.userMobileInput = ''
      this.userEmailInput = ''
      this.getUserList()
    },
    // 分页插件 => 切换每页展示数量
    handleSizeChange(val) {
      this.userData.size = val
      this.getUserList()
    },
    // 分页插件 => 切换页数
    handleCurrentChange(val) {
      this.userData.current = val
      this.getUserList()
    },
    // 获取用户列表
    getUserList() {
      this.asyncGetUserList().then(({data}) => {
        this.userData = data.data;
      })
    },
    // 注销用户
    cancellation(user) {
      this.asyncCancellation(user.userId).then(() => {
        successMsg("注销" + user.userName + "成功")
        this.getUserList()
      })
    },
    toUserCenter(userId) {
      this.$router.push("/userCenter/center/" + userId);
    },
    // 异步方法 => 获取用户列表
    async asyncGetUserList() {
      return await this.$axios({
        url: "/yicode-user-openapi/open/user/detail/list",
        method: "post",
        data: {
          "userId": this.userIdInput,
          "userName": this.userNameInput,
          "userMobile": this.userMobileInput,
          "userEmail": this.userEmailInput,
          "page": this.userData.current,
          "pageSize": this.userData.size,
        }
      });
    },
    // 异步方法 => 注销用户
    async asyncCancellation(userId) {
      return await this.$axios({
        url: "/yicode-user-openapi/open/user/cancellation?userId=" + userId,
        method: "delete",
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.user {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > div {
    padding: 0 10px;
  }

  .search {
    width: 100%;
    box-sizing: border-box;
    height: 40px;
    display: flex;
    padding: 0 10px;
    margin: 10px 0;

    & > div {
      flex: 1;
      margin-right: 10px;
    }

    .el-button {
      height: 40px !important;
    }
  }
}
::v-deep .el-table__row{
  td:not(.is-hidden):last-child{
    border-left:1px solid #b7b8bb;
  }
}
::v-deep .el-table__fixed-header-wrapper {
  .el-table__header {
    thead {
      tr {
        th:not(.is-hidden):last-child {
          border-left:1px solid #b7b8bb;
        }
      }
    }
  }
}
</style>