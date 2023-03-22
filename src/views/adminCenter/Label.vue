<template>
  <div class="label">
    <h1>标签管理页</h1>
    <el-table
        :data="tableData"
        stripe
        style="width: 100%">
      <el-table-column
          prop="name"
          label="标签名"
          width="180">
      </el-table-column>
      <el-table-column
          prop="date"
          label="创建时间"
          width="180">
      </el-table-column>
      <el-table-column
          prop="address"
          label="操作">
      </el-table-column>
    </el-table>
    <el-pagination
        layout="prev, pager, next"
        :total="1000">
    </el-pagination>
  </div>
</template>

<script>

export default {
  name: "AdminLabel",
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.label {
  padding: 0 20px;
}
</style>