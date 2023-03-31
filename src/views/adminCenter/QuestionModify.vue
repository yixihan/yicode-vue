<template>
  <div class="question-modify">
    <div class="back" @click="goBack()">
      <i class="el-icon-arrow-left"></i>
      <span>返回</span>
    </div>
    <div class="modify">
      <el-form label-position="right" label-width="80px" :model="questionData">
        <el-form-item label="题目名称: ">
          <el-input v-model="questionData.questionName" :width="'120px'"></el-input>
        </el-form-item>
        <el-form-item label="难度: ">
          <el-radio-group v-model="questionData.questionDifficulty">
            <el-radio :label="'简单'">简单</el-radio>
            <el-radio :label="'中等'">中等</el-radio>
            <el-radio :label="'困难'">困难</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="标签: ">
          <el-select
              v-model="labelValues"
              multiple
              filterable
              allow-create
              default-first-option
              collapse-tags
              placeholder="请选择">
            <el-option
                v-for="(item, index) in labelOptions"
                :key="index"
                :label="item.labelName"
                :value="item.labelId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="使用: ">
          <el-switch
              v-model="questionData.enable"
              style="display: table !important;line-height: 40px !important;"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <mavon-editor
          v-model="questionData.questionDesc"
          ref="md"
          @save="modifyQuestion"
          @imgAdd="imgAdd"
          @imgDel="imgDel"
      />
    </div>
    <el-button type="primary" @click="modifyQuestion">确认修改</el-button>
  </div>
</template>

<script>
import {uuid} from "@/util/uuidUtil";
import {successMsg} from "@/util/elementMsgUtil";

export default {
  name: "QuestionModify",
  data() {
    return {
      // 问题数据
      questionData: {
        questionId: this.$route.query.id,
        questionName: '',
        questionDifficulty: '',
        label: '',
        questionDesc: '',
        enable: true
      },
      // 可选标签
      labelOptions: [
        {
          labelId: '',
          labelName: '',
        }
      ],
      // 可选标签 id list
      labelIdList: [],
      // 问题标签
      labelValues: [
      ],
      // 新标签列表
      newLabelList: [],
      // 一次上次多张图片时使用
      img_file: {},
      difficultyMap: new Map()
    }
  },
  mounted() {
    this.getQuestionDetail();
    this.getQuestionLabel();
    this.getQuestionDetailLabel()
    // 如果原始md字符串中存在曾上传的图片， 则需要将对应<img>中的src替换为base64
    this.$nextTick(() => {
      // $vm.$imgUpdateByUrl 详情见本页末尾
      this.$refs.md.$imgUpdateByUrl(0, "base64内容");
    });
    this.difficultyMap.set("简单", "EASY")
    this.difficultyMap.set("中等", "MEDIUM")
    this.difficultyMap.set("困难", "HARD")
    this.difficultyMap.set("EASY", "EASY")
    this.difficultyMap.set("MEDIUM", "MEDIUM")
    this.difficultyMap.set("HARD", "HARD")
  },
  methods: {
    // 返回
    goBack() {
      this.$router.push({
        path: '/admin/center/detail',
        query: {id: this.questionData.questionId}
      })
    },
    // 获取题目详情
    getQuestionDetail() {
      this.asyncGetQuestionDetail().then(({data}) => {
        this.questionData = data.data
      })
    },
    // 获取问题标签
    getQuestionLabel() {
      this.asyncGetQuestionLabel().then(({data}) => {
        this.labelOptions = data.data
        data.data.forEach(item => {
          this.labelIdList.push(item.labelId)
        })
      })
    },
    // md => 删除图片
    imgDel(pos) {
      delete this.img_file[pos];
    },
    // md => 添加图片
    imgAdd(pos, $file) {
      const formData = new FormData();
      // 第一步, 获取上传凭证.
      this.$axios({
        url: "/yicode-thirdpart-openapi/open/oss/upload/policy",
        method: "post",
      }).then(({data}) => {
        // 第二步, 填充凭证
        data = data.data
        formData.append("policy", data.policy)
        formData.append("signature", data.signature)
        formData.append("key", data.dir + "/" + uuid() + "_${filename}")
        formData.append("OSSAccessKeyId", data.accessKey)
        formData.append("host", data.host)
        formData.append("dir", data.dir)
        formData.append("file", $file);

        // 第三步, 上传文件
        this.asyncUploadImg(formData).then(() => {
          // 第四步, 拼装 url, 替换到文本原位置
          let url = formData.get("host") + "/" + formData.get("key").replace("${filename}", $file.name);
          this.$refs.md.$img2Url(
              pos,
              url
          );
        })
      });
    },
    // 修改题目
    modifyQuestion() {
      // 分割新标签与老标签
      for (let i = 0; i < this.labelValues.length; i++){
        const item = this.labelValues[i];
        if (!this.labelIdList.includes(item)) {
          this.labelValues.splice(i, 1)
          this.newLabelList.push(item)
        }
      }
      this.asyncModifyQuestionDetail().then(({data}) => {
        this.asyncModifyQuestionDetailLabel().then(({labelList}) => {
          labelList.data.forEach(item => {
            this.labelValues.push(item.labelId)
            this.questionData = data.data
            // 获取新的问题标签
            this.getQuestionLabel()
            successMsg("修改题目成功")
          })
        })
      })
    },
    // 获取该问题的标签
    getQuestionDetailLabel() {
      this.asyncGetQuestionDetailLabel().then(({data}) => {
        data.data.forEach(item => {
          this.labelValues.push(item.labelId)
        })
      })
    },
    // 异步方法 => 获取题目详情
    async asyncGetQuestionDetail() {
      return await this.$axios({
        url: "/yicode-question-openapi/open/question/detail?questionId=" + this.questionData.questionId,
        method: "get",
      });
    },
    // 异步方法 => 修改题目
    async asyncModifyQuestionDetail() {
      return await this.$axios({
        url: "/yicode-question-openapi/open/question/modify",
        method: "post",
        data: {
          "questionId": this.questionData.questionId,
          "questionName": this.questionData.questionName,
          "questionDifficulty": this.difficultyMap.get(this.questionData.questionDifficulty),
          "questionDesc": this.questionData.questionDesc,
          "enable": this.questionData.enable
        }
      });
    },
    // 异步方法 => 获取该问题的标签
    async asyncGetQuestionDetailLabel() {
      return await this.$axios({
        url: "/yicode-question-openapi/open/label/detail/question?questionId=" + this.questionData.questionId,
        method: "get",
      });
    },
    // 异步方法 => 修改该问题的标签
    async asyncModifyQuestionDetailLabel() {
      return await this.$axios({
        url: "/yicode-question-openapi/open/question/label/modify",
        method: "post",
        data: {
          "questionId": this.questionData.questionId,
          "labelIdList": this.labelValues,
          "labelNameList": this.newLabelList
        }
      });
    },
    // 异步方法 => 获取所有题目标签
    async asyncGetQuestionLabel() {
      return await this.$axios({
        url: "/yicode-question-openapi/open/label/all/question?labelName=",
        method: "get",
      });
    },
    // 异步方法 => 上传图片至 OSS
    async asyncUploadImg(data) {
      return await this.$axios({
        url: "https://yicode.oss-cn-chengdu.aliyuncs.com",
        method: 'post',
        headers: {
          "Content-Type": "multipart/form-data"
        },
        data: data
      })
    },
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