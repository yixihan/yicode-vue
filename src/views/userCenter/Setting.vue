<template>
  <div class="setting">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="个人信息修改" name="first">
        <el-form label-position="right" label-width="150px" :model="userInfo">
          <el-form-item label="用户名">
            <el-input v-model="userInfo.username"></el-input>
          </el-form-item>
          <el-form-item label="用户邮箱">
            <el-input v-model="userInfo.email"></el-input>
          </el-form-item>
          <el-form-item label="用户手机号">
            <el-input v-model="userInfo.phone"></el-input>
          </el-form-item>
          <el-form-item label="用户头像">
            <el-upload
                action="https://yicode.oss-cn-chengdu.aliyuncs.com"
                :data="dataObj"
                class="avatar-uploader"
                list-type="picture"
                :multiple="false"
                :file-list="fileList"
                :show-file-list="false"
                :before-upload="beforeUpload"
                :on-success="handleUploadSuccess"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="用户省份">
            <el-input v-model="userInfo.province"></el-input>
          </el-form-item>
          <el-form-item label="用户城市">
            <el-input v-model="userInfo.city"></el-input>
          </el-form-item>
          <el-form-item label="用户性别">
            <el-radio v-model="userInfo.sex" label="1">男</el-radio>
            <el-radio v-model="userInfo.sex" label="2">女</el-radio>
          </el-form-item>
          <el-form-item label="用户签名">
            <el-input v-model="userInfo.sign"></el-input>
          </el-form-item>
          <el-form-item label="用户学校">
            <el-input v-model="userInfo.school"></el-input>
          </el-form-item>
          <el-form-item label="用户生日">
            <el-date-picker
                v-model="userInfo.birthday"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="用户真实姓名">
            <el-input v-model="userInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="用户个人网站">
            <el-input v-for="(item, index) in userInfo.websites"
                      :key="index"
                      v-model="item.path"></el-input>
            <el-button @click="addWeb()">添加</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit()">修改</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="邮箱修改" name="second">
        <el-form label-position="right" label-width="150px" :model="emailModify">
          <el-form-item label="用户邮箱">
            <el-input v-model="emailModify.email"></el-input>
          </el-form-item>
          <el-form-item label="邮箱验证码">
            <el-input v-model="emailModify.verificationCode"></el-input>
            <el-button @click="sendCode()">发送验证码</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit()">修改</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="手机号修改" name="third">
        <el-form label-position="right" label-width="150px" :model="phoneModify">
          <el-form-item label="用户手机号" width="300px">
            <el-input v-model="phoneModify.phone"></el-input>
          </el-form-item>
          <el-form-item label="手机验证码">
            <el-input v-model="phoneModify.verificationCode"></el-input>
            <el-button @click="sendCode()">发送验证码</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">修改</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="密码修改" name="fourth">
        <el-form label-position="right" label-width="150px" :model="formLabelAlign">
          <el-form-item label="手机号/邮箱">
            <el-input v-model="pwdModify.account"></el-input>
          </el-form-item>
          <el-form-item label="验证码">
            <el-input v-model="pwdModify.verificationCode"></el-input>
            <el-button @click="sendCode()">发送验证码</el-button>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input v-model="pwdModify.pwd"></el-input>
          </el-form-item>
          <el-form-item label="再次输入新密码">
            <el-input v-model="pwdModify.pwdSecond"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit()">修改</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {uuid} from "@/util/uuidUtil";

export default {
  name: "Setting",
  data () {
    return {
      activeName: 'first',
      userInfo: {
        username: '',
        email: '',
        phone: '',
        avatar: '',
        province: '',
        city: '',
        sex:'1',
        sign: '',
        school: '',
        birthday: '',
        name:  '',
        websites: [
          {
            name: '',
            path: '',
          }
        ],
      },
      emailModify: {
        email: '',
        verificationCode: '',
      },
      phoneModify: {
        phone: '',
        verificationCode: '',
      },
      pwdModify: {
        account: '',
        pwd: '',
        pwdSecond: '',
        verificationCode: '',
      },
      imageUrl: '',
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
  methods: {
    // 添加网站
    addWeb () {
      this.userInfo.websites.push({
        name: '',
        path: ''
      })
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 发送验证码
    sendCode () {
      // 根据activeName定位
    },
    onSubmit () {},
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
  }
}
</script>

<style lang="scss" scoped>
.setting {
  padding: 20px 50px;
  ::v-deep input {
    width: 300px !important;
    float: left;
  }
  .el-tabs {
    width: 600px !important;
  }
  ::v-deep .el-form-item__content {
    .el-radio {
      height: 40px;
      line-height: 40px;
      float: left;
    }
    .el-date-editor {
      float: left;
    }
    .el-input + .el-button {
      position: absolute;
      right: 0;
    }
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .el-upload {
      float: left;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }

}
</style>