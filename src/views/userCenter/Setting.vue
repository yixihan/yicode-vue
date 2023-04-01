<template>
  <div class="setting">
    <el-tabs v-model="activeName">
      <!-- 用户个人信息设置 -->
      <el-tab-pane label="个人信息修改" name="info">
        <el-form label-position="right" label-width="150px" :model="userInfo">
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
              <img v-if="userInfo.userAvatar"
                   :src="userInfo.userAvatar"
                   alt="正在加载中"
                   class="avatar"
              >
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="用户所在地">
            <el-cascader
                size="large"
                :options="options"
                v-model="selectedOptions"
                @change="changeCity">
            </el-cascader>
          </el-form-item>
          <el-form-item label="用户性别">
            <el-radio v-model="userInfo.userSex" label="MAN">男</el-radio>
            <el-radio v-model="userInfo.userSex" label="WOMAN">女</el-radio>
            <el-radio v-model="userInfo.userSex" label="SECRECY">保密</el-radio>
          </el-form-item>
          <el-form-item label="用户签名">
            <el-input v-model="userInfo.userSign"></el-input>
          </el-form-item>
          <el-form-item label="用户学校">
            <el-input v-model="userInfo.userSchool"></el-input>
          </el-form-item>
          <el-form-item label="用户生日">
            <el-date-picker
                v-model="userInfo.userBirth"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="用户真实姓名">
            <el-input v-model="userInfo.userRealName"></el-input>
          </el-form-item>
          <el-form-item label="用户个人网站">
              <el-input v-for="(item, index) in websiteList"
                        :key="index"
                        v-model="item.value"></el-input>
            <el-button @click="modifyWebsite()">添加</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="modifyUserInfo()">修改</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <!-- 用户邮箱设置 -->
      <el-tab-pane label="邮箱修改" name="email">
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
      <!-- 用户手机号设置 -->
      <el-tab-pane label="手机号修改" name="mobile">
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
      <!-- 用户密码设置 -->
      <el-tab-pane label="密码修改" name="password">
        <el-form label-position="right" label-width="150px" :model="pwdModify">
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
      <!-- 用户用户名设置 -->
      <el-tab-pane label="用户名修改" name="username">
        <el-form label-position="right" label-width="150px" :model="nameModify">
          <el-form-item label="用户名">
            <el-input v-model="nameModify.userName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="modifyUserName()">修改</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {uuid} from "@/util/uuidUtil";
import {successMsg} from "@/util/elementMsgUtil";
import { provinceAndCityData } from 'element-china-area-data'

export default {
  name: "Setting",
  inject: ['reload'],
  data () {
    return {
      activeName: 'info',
      // 用户信息
      userInfo: {
        userId: 0,
        userAvatar: '',
        userBirth: '',
        userCity: '',
        userProvince: '',
        userRealName: '',
        userSchool: '',
        userSex:'1',
        userSign: '',
        userWebsiteList: [],
      },
      // 用户网站
      websiteList: [
        {
          name: '',
          value: ''
        }
      ],
      // 邮箱修改
      emailModify: {
        email: '',
        verificationCode: '',
      },
      // 手机号修改
      phoneModify: {
        phone: '',
        verificationCode: '',
      },
      // 密码修改
      pwdModify: {
        account: '',
        pwd: '',
        pwdSecond: '',
        verificationCode: '',
      },
      // 用户名修改
      nameModify: {
        userId: this.$store.getters.getUserId,
        userName: this.$store.getters.getUser.userName
      },
      // 图片上传秘钥
      dataObj: {
        policy: "",
        signature: "",
        key: "",
        OSSAccessKeyId: "",
        dir: "",
        host: "",
      },
      // 地图 options
      options: provinceAndCityData,
      selectedOptions: []
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
  created() {
    this.userInfo = this.$store.getters.getUserInfo
    this.selectedOptions.push(this.userInfo.userProvince)
    this.selectedOptions.push(this.userInfo.userCity)
    this.initUserWebsite()
  },
  methods: {
    // 添加网站
    modifyWebsite () {
      this.websiteList.push({
        name: '',
        value: ''
      })
    },
    // 获取用户信息
    getUserInfo() {
      this.asyncGetLoginUserInfo().then(({data}) => {
        this.$store.commit("setUserInfo", data.data)
        this.reload()
      })
    },
    // 修改用户信息
    modifyUserInfo() {
      // 同步用户网站
      this.dealUserWebsite()
      this.asyncModifyUserInfo().then(() => {
        successMsg("用户信息修改成功")
        this.getUserInfo()
      })

    },
    // 绑定邮箱
    bindUserEmail() {

    },
    // 解绑邮箱
    unbindUserEmail() {

    },
    // 绑定手机号
    bindUserMobile() {

    },
    // 解绑手机号
    unbindUserMobile() {

    },
    // 修改密码
    modifyUserPassword() {

    },
    // 修改用户名
    modifyUserName() {
      this.asyncModifyUserName().then(() => {
        successMsg("用户名修改成功")
        this.getUserInfo()
      })
    },
    // 发送验证码
    sendCode () {
      // 根据activeName定位
    },
    onSubmit () {},
    // 更新 => 更改用户所在地
    changeCity (value) {
      this.userInfo.userProvince = value[0]
      this.userInfo.userCity = value[1]
    },
    // 初始化 => 同步用户网站
    initUserWebsite() {
      this.websiteList = []
      this.userInfo.userWebsiteList.forEach((item) => {
        this.websiteList.push({
          name: '',
          value: item
        })
      })
    },
    // 更新 => 同步用户网站
    dealUserWebsite() {
      this.userInfo.userWebsiteList = []
      this.websiteList.forEach((item) => {
        this.userInfo.userWebsiteList.push(item.value)
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
        name: file.name,
        url:
            this.dataObj.host +
            "/" +
            this.dataObj.key.replace("${filename}", file.name),
      });
      this.userInfo.userAvatar = this.fileList[0].url;
    },
    // 异步方法 => 获取登录用户信息
    async asyncGetLoginUserInfo() {
      return await this.$axios({
        url: "/yicode-user-openapi/open/user/now",
        method: "get",
      });
    },
    // 异步方法 => 绑定邮箱
    async asyncBindUserEmail() {
      return await this.$axios({
        url: "/yicode-user-openapi/open/user/bind/email",
        method: "post",
        data: {
          "email": "a.ecpwol@qq.com",
          "code": "21"
        }
      });
    },
    // 异步方法 => 解绑邮箱
    async asyncUnbindUserEmail() {
      return await this.$axios({
        url: "/yicode-user-openapi/open/user/info/modify",
        method: "post",
        data: {
          "email": "a.ecpwol@qq.com",
          "code": "21"
        }
      });
    },
    // 异步方法 => 绑定手机号
    async asyncBindUserMobile() {
      return await this.$axios({
        url: "/yicode-user-openapi/open/user/bind/mobile",
        method: "post",
        data: {
          "mobile": "18133820517",
          "code": "44"
        }
      });
    },
    // 异步方法 => 解绑手机号
    async asyncUnbindUserMobile() {
      return await this.$axios({
        url: "/yicode-user-openapi/open/user/info/modify",
        method: "post",
        data: {
          "mobile": "18133820517",
          "code": "44"
        }
      });
    },
    // 异步方法 => 修改用户密码
    async asyncModifyUserPassword() {
      return await this.$axios({
        url: "/yicode-user-openapi/open/user/info/modify",
        method: "post",
        data: {
          "email": "r.lkmnxi@qq.com",
          "userId": 42,
          "mobile": "18651714424",
          "newPassword": "quis dolore do",
          "type": "laborum"
        }
      });
    },
    // 异步方法 => 修改用户用户名
    async asyncModifyUserInfo() {
      return await this.$axios({
        url: "/yicode-user-openapi/open/user/info/modify",
        method: "post",
        data: this.userInfo
      });
    },
    // 异步方法 => 修改用户用户名
    async asyncModifyUserName() {
      return await this.$axios({
        url: "/yicode-user-openapi/open/user/reset/username",
        method: "post",
        data: this.nameModify
      });
    },
    // 异步方法 => 发送邮件
    async asyncSendCommonEmail() {
      return await this.$axios({
        url: "/yicode-thirdpart-openapi/open/email/send/email/common",
        method: "post",
        data: {
          "email": ''
        }
      });
    },
    // 异步方法 => 校验邮箱验证码
    async asyncValidateCommonEmailCode() {
      return await this.$axios({
        url: "/yicode-thirdpart-openapi/open/email/validate/common",
        method: "post",
        data: {
          "email": '',
          "code": ''
        }
      });
    },
    // 异步方法 => 发送短信
    async asyncSendCommonMobile() {
      return await this.$axios({
        url: "/yicode-thirdpart-openapi/open/sms/send/mobile/common",
        method: "post",
        data: {
          "mobile": ''
        }
      });
    },
    // 异步方法 => 校验短信验证码
    async asyncValidateCommonMobileCode() {
      return await this.$axios({
        url: "/yicode-thirdpart-openapi/open/sms/validate/common",
        method: "post",
        data: {
          "mobile": '',
          "code": ''
        }
      });
    },
    // 异步方法 => 发送邮件
    async asyncSendResetEmail() {
      return await this.$axios({
        url: "/yicode-thirdpart-openapi/open/email/send/email/reset",
        method: "post",
        data: {
          "email": ''
        }
      });
    },
    // 异步方法 => 校验邮箱验证码
    async asyncValidateResetEmailCode() {
      return await this.$axios({
        url: "/yicode-thirdpart-openapi/open/email/validate/reset",
        method: "post",
        data: {
          "email": '',
          "code": ''
        }
      });
    },
    // 异步方法 => 发送短信
    async asyncSendResetMobile() {
      return await this.$axios({
        url: "/yicode-thirdpart-openapi/open/sms/send/mobile/reset",
        method: "post",
        data: {
          "mobile": ''
        }
      });
    },
    // 异步方法 => 校验短信验证码
    async asyncValidateResetMobileCode() {
      return await this.$axios({
        url: "/yicode-thirdpart-openapi/open/sms/validate/reset",
        method: "post",
        data: {
          "mobile": '',
          "code": ''
        }
      });
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
    .el-cascader {
      display: flex;
    }
  }

}
</style>