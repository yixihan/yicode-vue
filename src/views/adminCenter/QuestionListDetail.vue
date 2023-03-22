<template>
  <div class="question-list-detail">
    <div class="func">
      <h2>题目名称</h2>
      <div class="back" @click="goBack()">
        <i class="el-icon-arrow-left"></i>
        <span>返回</span>
      </div>
      <i class="el-icon-edit" @click="isShowChange = true"></i>
      <i class="el-icon-plus" @click="isShowAddQues = true"></i>
    </div>
    <el-table
        :data="tableData"
        border
        style="width: 100%">
      <el-table-column
          fixed
          prop="id"
          label="题目id">
      </el-table-column>
      <el-table-column
          prop="name"
          label="题目名称">
      </el-table-column>
      <el-table-column
          prop="difficulty"
          label="难度"
         >
      </el-table-column>
      <el-table-column
          prop="time"
          label="加入时间">
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
    <el-dialog title="修改题单信息" :visible.sync="isShowChange" :width="'500px'">
      <el-form :model="questionListForm">
        <el-form-item label="题单名称" :label-width="'120px'">
          <el-input v-model="questionListForm.questionListName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="题单背景" :label-width="'120px'">
          <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              :limit="1"
              :on-exceed="handleExceed"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <!--            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowChange = false">取 消</el-button>
        <el-button type="primary" @click="isShowChange = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="新增题目" :visible.sync="isShowAddQues" :width="'500px'">
      <el-form :model="newQuestion">
        <el-form-item label="新增题目id" :label-width="'120px'">
          <el-input v-model="newQuestion.newQuestionId" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowAddQues = false">取 消</el-button>
        <el-button type="primary" @click="isShowAddQues = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "QuestionListDetail",
  data() {
    return {
      isShow: false,
      questionListName: '题单名称',
      tableData: [
        {
          id: '11',
          name: '题目名称',
          difficulty: '难度',
          time: '2016-05-02'
        }
      ],
      // 修改题单
      isShowChange: false,
      questionListForm: {
        questionListName: '',
        questionListBg: ''
      },
      // 新增题目
      isShowAddQues: false,
      newQuestion: {
        newQuestionId: '',
      }
    }
  },
  methods: {
    // 返回
    goBack () {
      this.$router.push({path: "/admin/center/list"})
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
.question-list-detail {
  width: 100%;
  .func {
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
    &>i {
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
    .el-icon-edit {
      right: 60px;
    }
  }
}
</style>