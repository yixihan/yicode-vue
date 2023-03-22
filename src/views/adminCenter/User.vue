<template>
  <div class="user">
    <div class="search">
      <el-input v-model="userIdInput" placeholder="用户id"></el-input>
      <el-input v-model="userNameInput" placeholder="用户名"></el-input>
      <el-input v-model="userPhoneInput" placeholder="用户手机号"></el-input>
      <el-input v-model="userEmailInput" placeholder="用户邮箱"></el-input>
      <el-button type="primary">搜索</el-button>
      <el-button>清空</el-button>
    </div>
    <el-table
        :data="tableData"
        border
        style="width: 100%">
      <el-table-column
          fixed
          prop="id"
          label="用户id">
      </el-table-column>
      <el-table-column
          prop="name"
          label="用户名">
      </el-table-column>
      <el-table-column
          prop="difficulty"
          label="注册时间"
      >
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
          layout="prev, pager, next"
          :total="1000">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminUser",
  data() {
    return {
      userIdInput: '',
      userNameInput: '',
      userPhoneInput: '',
      userEmailInput: '',
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
  &>div {
    padding: 0 10px;
  }
  .search {
    width: 100%;
    box-sizing: border-box;
    height: 40px;
    display: flex;
    padding: 0 10px;
    margin: 10px 0;
    &>div {
      flex: 1;
      margin-right: 10px;
    }
    .el-button {
      height: 40px !important;
    }
  }
}

</style>