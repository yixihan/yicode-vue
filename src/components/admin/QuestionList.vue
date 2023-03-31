<template>
  <div class="question-list">
    <i class="el-icon-plus" @click="isShowAdd = true"></i>
    <div class="question-form"
         v-for="(item, index) in favoriteList"
         :key="index"
         @click="goQuestionListDetail(item.favoriteId)"
    >
      <img :src="item.favoriteBg" alt=""/>
      <div class="mask"></div>
      <h2>{{ item.favoriteName }}</h2>
      <span class="time">修改时间: {{ item.updateTime }}</span>
    </div>
    <el-dialog title="新建题单" :visible.sync="isShowAdd" :width="'500px'">
      <el-form :model="questionListForm">
        <el-form-item label="题单名称" :label-width="'120px'">
          <el-input v-model="questionListForm.questionListName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="题单背景" :label-width="'120px'">
          <el-upload
              action="https://yicode.oss-cn-chengdu.aliyuncs.com"
              :data="dataObj"
              list-type="picture"
              :multiple="false"
              :file-list="fileList"
              :show-file-list="false"
              :before-upload="beforeUpload"
              :on-success="handleUploadSuccess"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowAdd = false">取 消</el-button>
        <el-button type="primary" @click="createQuestionList">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {uuid} from "@/util/uuidUtil";
import {errorMsg, successMsg} from "@/util/elementMsgUtil";

export default {
  name: "QuestionList",
  data() {
    return {
      // 展示新建题单
      isShowAdd: false,
      // 展示题单列表
      questionList: [],
      // 新增题单列表
      questionListForm: {
        questionListName: '',
        questionListBg: ''
      },
      // 题单信息
      favoriteList: [
        {
          favoriteId: '',
          favoriteBg: '',
          favoriteName: '',
          createTime: '',
          updateTime: ''
        }
      ],
      // 图片上传秘钥
      dataObj: {
        policy: "",
        signature: "",
        key: "",
        OSSAccessKeyId: "",
        dir: "",
        host: "",
      },
    }
  },
  computed: {
    // 图片 url
    imageUrl() {
      return this.value;
    },
    // 图片名
    imageName() {
      if (this.value != null && this.value !== "") {
        return this.value.substr(this.value.lastIndexOf("/") + 1);
      } else {
        return null;
      }
    },
    // 图片列表
    fileList() {
      return [
        {
          name: this.imageName,
          url: this.imageUrl,
        },
      ];
    },
  },
  mounted() {
    this.getQuestionList();
  },
  methods: {
    // 打开题单详情
    goQuestionListDetail(id) {
      this.$router.push({path: "/admin/center/list-details/" + id})
    },
    // 获取题单列表
    getQuestionList() {
      this.asyncGetQuestionList().then(({data}) => {
        this.favoriteList = data.data
      })
    },
    // 创建题单
    createQuestionList() {
      if (this.questionListForm.questionListName === null ||
          this.questionListForm.questionListName === '') {
        errorMsg("请输入题单名称")
        return
      }
      if (this.questionListForm.questionListBg === null ||
          this.questionListForm.questionListBg === '') {
        errorMsg("请上传题单封面")
        return;
      }
      this.asyncCreateQuestionList().then(({data}) => {
        successMsg("题单创建成功")
        this.favoriteList.unshift(data.data)
        this.isShowAdd = false
        this.questionListForm = {}
      })
    },
    // 上传前钩子 => 获取 oss 上传凭证
    beforeUpload() {
      return new Promise((resolve) => {
        new Promise((resolve, reject) => {
          console.log("reject : {}", reject);
          this.$axios({
            url: "/yicode-thirdpart-openapi/open/oss/upload/policy",
            method: "post",
          }).then(({data}) => {
            resolve(data);
          });
        }).then(({data}) => {
          console.log("response : ", data);
          this.dataObj.policy = data.policy;
          this.dataObj.signature = data.signature;
          this.dataObj.OSSAccessKeyId = data.accessKey;
          this.dataObj.key = data.dir + "/" + uuid() + "_${filename}";
          this.dataObj.dir = data.dir;
          this.dataObj.host = data.host;
          resolve(true);
        })
      });
    },
    // 上传成功后钩子 => 获取图片 url
    handleUploadSuccess(res, file) {
      this.fileList.pop();
      this.fileList.push({
        questionName: file.name,
        url:
            this.dataObj.host +
            "/" +
            this.dataObj.key.replace("${filename}", file.name),
      });
      this.questionListForm.questionListBg = this.fileList[0].url;
    },
    // 异步方法 => 获取题单列表
    async asyncGetQuestionList() {
      return await this.$axios({
        url: "/yicode-question-openapi/open/admin/question/list/list",
        method: "post",
      });
    },
    // 异步方法 => 创建题单
    async asyncCreateQuestionList() {
      return await this.$axios({
        url: "/yicode-question-openapi/open/admin/question/list/create",
        method: "post",
        data: this.questionListForm
      });
    },
  },
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