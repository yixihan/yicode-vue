<template>
  <div class="question-list">
    <i class="el-icon-plus" @click="isShowAdd = true"></i>
    <div class="question-form" @click="goQuestionListDetail()">
      <img src="@/assets/img/admin/test02.jpg" alt=""/>
      <div class="mask"></div>
      <h2>题单名称哈哈哈</h2>
      <h3>999+</h3>
      <span class="time">修改时间: 2023-12-09 14:52</span>
    </div>
    <div class="question-form">
      <img src="@/assets/img/admin/test03.png" alt=""/>
      <div class="mask"></div>
      <h2>题单名称哈哈哈</h2>
      <h3>999+</h3>
      <span class="time">修改时间: 2023-12-09 14:52</span>
    </div>
    <div class="question-form">
      <img src="@/assets/img/admin/test04.jpg" alt=""/>
      <div class="mask"></div>
      <h2>题单名称哈哈哈</h2>
      <h3>999+</h3>
      <span class="time">修改时间: 2023-12-09 14:52</span>
    </div>
    <el-dialog title="新建题单" :visible.sync="isShowAdd" :width="'500px'">
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
        <el-button @click="isShowAdd = false">取 消</el-button>
        <el-button type="primary" @click="isShowAdd = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "QuestionList",
  data() {
    return {
      // 展示新建题单
      isShowAdd: false,
      // 题单列表
      questionListForm: {
        questionListName: '',
        questionListBg: ''
      }
    }
  },
  methods: {
    // 打开题单详情
    goQuestionListDetail() {
      this.$router.push({path: "/admin/center/list-details"})
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
.question-list {
  position: relative;
  padding: 40px 20px;
  i {
    position: absolute;
    font-size: 22px;
    cursor: pointer;
    right: 20px;
    top: 5px;
    font-weight: bolder;
    transition: all .3s;
    &:hover {
      transform: scale(1.2);
    }
  }
  .question-form {
    height: 260px;
    width: 100%;
    overflow: hidden;
    border-radius: 15px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all .3s;
    position: relative;
    margin-bottom: 20px;
    &:hover {
      img {
        transform: scale(1.2);
        background: rgba(#000000, .9);
      }
      .mask {
        background: none;
      }
      h2 {
        color: #fafafa;
      }
    }
    img {
      position: absolute;
      left: 0;
      top: 0;
      transition: all .3s;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: 1;
    }
    .mask {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      transition: all .3s;
      background: rgba(#000000, .5);
      z-index: 2;
    }
    h2, h3, span {
      z-index: 3;
    }
    h2 {
      font-size: 64px;
      color: #cbcbcb;
      margin-right: 20px;
      transition: all .3s;
    }
    h3 {
      font-size: 56px;
      color: #42b983;
    }
    span {
      position: absolute;
      right: 15px;
      bottom: 15px;
      font-size: 12px;
      color: #8d8d8d;
    }
  }
}
</style>