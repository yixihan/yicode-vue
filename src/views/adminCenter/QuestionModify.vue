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
          @imgAdd="$imgAdd"
          @imgDel="$imgDel"
      />
    </div>
    <el-button type="primary" @click="modifyQuestion">确认修改</el-button>
  </div>
</template>

<script>
import {uuid} from "@/util/uuidUtil";

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
      // 问题标签
      labelValues: [],
      link: "",
      img_file: {}, // 一次上次多张图片时使用
      /* 新建类型 */
      // 文件列表
      activeName: "",
      // 添加文件
      showEditModal: false,
      // 菜单栏
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true, // 预览
      },
      difficultyMap: new Map()
    }
  },
  mounted() {
    this.getQuestionDetail();
    this.getQuestionLabel();
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
      })
    },
    // md => 删除图片
    //
    $imgDel(pos) {
      delete this.img_file[pos];
    },
    // md => 添加图片
    // 绑定@imgAdd event
    $imgAdd(pos, $file) {
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
    modifyQuestion() {
      this.asyncModifyQuestionDetail().then(({data}) => {
        this.questionData = data.data
      })
    },
    // 异步方法 => 获取题目详情
    async asyncGetQuestionDetail() {
      return await this.$axios({
        url: "/yicode-question-openapi/open/question/detail?questionId=" + this.questionData.questionId,
        method: "get",
      });
    },
    // 异步方法 => 修改该问题的标签
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
        url: "/yicode-question-openapi/open/question/detail",
        method: "post",
      });
    },
    // 异步方法 => 获取所有题目标签
    async asyncGetQuestionLabel() {
      return await this.$axios({
        url: "/yicode-question-openapi/open/label/all/question?labelName=",
        method: "get",
      });
    },
    async asyncUploadImg(data) {
      return await this.$axios({
        url: "https://yicode.oss-cn-chengdu.aliyuncs.com",
        method: 'post',
        headers: {
          "Content-Type": "multipart/form-data"
        },
        data: data
      }).catch((res) => {
        console.log(res)
      })
    },
    exportRaw(name, data) {
      const urlObject = window.URL || window.webkitURL || window;
      const exportBlob = new Blob([data]);
      const saveLink = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
      this.link = saveLink
      console.log(this.link)
      saveLink.href = urlObject.createObjectURL(exportBlob)
      saveLink.download = name
      this.fakeClick(saveLink)
    },
    fakeClick(obj) {
      const ev = document.createEvent('MouseEvents');
      ev.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
      obj.dispatchEvent(ev)
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