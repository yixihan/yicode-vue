<template>
  <div class="select-details">
    <header>
      <el-button type="primary" @click="showAdd = true" icon="el-icon-plus" circle></el-button>
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
      showAdd: false,
      selectList: [],
      formAdd: {
        name: ''
      }
    }
  },
  methods: {
    // 查看详情
    detail () {

    },
    // 修改
    modify () {}
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