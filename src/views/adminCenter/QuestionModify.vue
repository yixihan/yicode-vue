<template>
  <div class="question-modify">
    <div class="back" @click="goBack()">
      <i class="el-icon-arrow-left"></i>
      <span>返回</span>
    </div>
    <div class="modify">
      <el-form :label-position="'right'" label-width="80px" :model="formLabelAlign">
        <el-form-item label="题目名称: ">
          <el-input v-model="questionInfo.name" :width="'120px'"></el-input>
        </el-form-item>
        <el-form-item label="难度: ">
          <el-radio-group v-model="questionInfo.difficulty">
            <el-radio :label="'简单'">简单</el-radio>
            <el-radio :label="'中等'">中等</el-radio>
            <el-radio :label="'困难'">困难</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="标签: ">
          <el-select
              v-model="questionInfo.label"
              multiple
              collapse-tags
              placeholder="请选择">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <mavon-editor
          v-model="content"
          :toolbarsFlag="false"
      ></mavon-editor>
    </div>
    <el-button type="primary">确认修改</el-button>
  </div>
</template>

<script>
export default {
  name: "QuestionModify",
  data() {
    return {
      questionInfo: {
        name: '',
        difficulty: '简单',
        label: ''
      },
      options: [
        {
          label: '数据结构',
          value: 1,
        },
        {
          label: '链表',
          value: 2,
        },
      ],
      content: '# hahahaha'
    }
  },
  methods: {
    goBack () {
      this.$router.push({path: "/admin/center/problem"})
    }
  }
}
</script>

<style lang="scss" scoped>
.question-modify {
  width: 100%;
  height: auto;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  background: #FFFFFF;
  .back {
    cursor: pointer;
    width: 100%;
    padding: 10px;
    text-align: left;
    transition: all .1s;
    &:hover {
      color: #fbb957;
    }
  }
  .modify {
    width: 100%;
    padding: 10px 50px;
    .el-form {
      width: 350px;
      .el-select {
        width: 270px !important;
      }
    }
    .v-note-wrapper {
      width: 80%;
      z-index: 1;
    }
  }
  .el-button {
    margin: 20px auto;
    width: 120px;
  }
}
</style>