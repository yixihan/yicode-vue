<template>
  <div class="sunbmitted">
    <el-table
        :data="tableData"
        border
        style="width: 100%">
      <el-table-column
          label="提交结果">
        <template slot-scope="scope">
          <el-link type="success" @click="dialogVisible = scope.row.result">{{ scope.row.result }}</el-link>
        </template>
      </el-table-column>
      <el-table-column
          prop="time"
          label="执行时间">
      </el-table-column>
      <el-table-column
          prop="language"
          label="语言">
      </el-table-column>
      <el-table-column
          prop="date"
          label="提交时间">
      </el-table-column>
      <el-table-column
          label="备注">
        <template slot-scope="scope">
          <el-input v-model="scope.row.remarks" @blur="changeRemarks()" placeholder="输入备注"></el-input>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
        title="代码展示"
        :visible.sync="dialogVisible"
        width="50%">
      <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="dialogVisible">
      </el-input>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "SubmitRecords",
  data () {
    return {
      tableData: [
        {
          result: '通过',
          time: '1ms',
          language: 'js',
          date: '2023-04-02',
          remarks: '不会做'
        }
      ],
      dialogVisible: false
    }
  },
  methods: {
    // 修改备注
    changeRemarks () {}
  }
}
</script>

<style lang="scss" scoped>

</style>