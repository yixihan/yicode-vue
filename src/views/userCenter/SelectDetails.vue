<template>
  <div class="select-details">
    <header>
      <div class="back" @click="goBack()">
        <i class="el-icon-arrow-left"></i>
        <span>返回</span>
      </div>
    </header>
    <el-table
        :data="selectList"
        border>
      <el-table-column
          fixed
          align="center"
          prop="date"
          label="收藏夹名">
      </el-table-column>
      <el-table-column
          prop="name"
          align="center"
          label="收藏夹类型">
      </el-table-column>
      <el-table-column
          prop="province"
          align="center"
          label="创建时间">
      </el-table-column>
      <el-table-column
          fixed="right"
          align="center"
          label="操作">
        <template slot-scope="scope">
          <el-button @click="detail()" type="text" size="small">查看</el-button>
          <el-button @click="modify()" type="text" size="small">编辑</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        layout="prev, pager, next"
        :total="50">
    </el-pagination>
    <el-dialog
        title="提示"
        :visible.sync="showAdd"
        width="50%">
      <el-form :model="formAdd">
        <el-form-item label="收藏夹名称" label-width="120px">
          <el-input v-model="formAdd.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showAdd = false">取 消</el-button>
        <el-button type="primary" @click="showAdd = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "SelectDetails",
  data () {
    return {
      userId: this.$route.params.userId,
    }
  },
  methods: {
    // 返回
    goBack() {
      this.$router.push("/user/center/" + this.userId + "/select/")
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
    background: #99a9bf;
    position: relative;

    .back {
      position: absolute;
      left: 5px;
      top: 0;
      cursor: pointer;
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