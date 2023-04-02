<template>
<div class="message">
<!--  <div class="message_header">-->
<!--    <div>未读</div>-->
<!--    <div>已读</div>-->
<!--  </div>-->
  <div class="message_body">
    <div class="bar">
      <i class="el-icon-brush" @click="readMessageBatch(idList)"></i>
    </div>
    <div class="message-item"
         v-for="(item, index) in messageData"
         :key="index"
         @click="readMessage(item.id)"
    >
      <img src="@/assets/img/admin/test03.png/" alt="正在加载中"/>
      <div class="pot" v-if="!item.finish"></div>
      <div class="name">
        {{ item.sendUserName }}
      </div>
      <div class="text">
        {{ item.msg }}
      </div>
      <div class="time">2023-12-12 13:12:00</div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "Message",
  data() {
    return {
      page: 1,
      // 消息数据
      messageData: [
        {
          id: 0,
          sendUserId: 0,
          sendUserName: "",
          sendUserAvatar: '',
          receiveUseId: 0,
          msg: "",
          finish: false,
          createTime: "",
          updateTime: ""
        }
      ],
      idList: [],
    }
  },
  mounted() {
    this.getMessageDetail()
  },
  methods: {
    // 获取消息明细
    getMessageDetail() {
      this.asyncGetMessageDetail().then(({data}) => {
        this.messageData = data.data.records
        this.idList = []
        this.messageData.forEach(item => {
          this.idList.push(item.id)
        })
      })
    },
    // 批量阅读消息
    readMessageBatch(idList) {
      this.asyncReadMessage(idList).then(() => {
        this.getMessageDetail()
      })
    },
    // 阅读单个消息
    readMessage(id) {
      let idList = []
      idList.push(id)
      this.readMessageBatch(idList)
    },
    // 异步方法 => 绑定手机号
    async asyncGetMessageDetail() {
      return await this.$axios({
        url: "/yicode-user-openapi/open/msg/detail",
        method: "post",
        data: {
          "searchCount": false,
          "page": this.page,
          "pageSize": 10
        }
      });
    },
    // 异步方法 => 绑定手机号
    async asyncReadMessage(idList) {
      return await this.$axios({
        url: "/yicode-user-openapi/open/msg/read",
        method: "post",
        data: {
          "messageIdList": idList,
        }
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.message {
  width: 250px;
  height: 0;
  background: #f3f3f3;
  position: absolute;
  left: -100px;
  box-sizing: border-box;
  overflow: scroll;
  display: block;
  z-index: 4;
  &::-webkit-scrollbar {
    display: none;
  }
  .message_header {
    color: #000000;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid #d5d5d5;
    >div {
      width: 100%;
      height: 50px;
      line-height: 50px;
      box-sizing: border-box;
      transition: all .1s;
      &:hover {
        background: #e3e5e7;
        border-bottom: 3px solid #84c3ec;
      }
    }
  }
  .message_body {
    .bar {
      height: 30px;
      line-height: 30px;
      width: 100%;
      color: #2c3e50;
      position: relative;
      i {
        position: absolute;
        right: 12px;
        top: 8px;
        font-size: 20px;
        cursor: pointer;
        &:hover {
          color: #059fff;
        }
      }
    }
    .message-item {
      height: 100px;
      width: 100%;
      transition: all .3s;
      position: relative;
      padding: 5px 0 5px 56px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      color: #000000;
      overflow: hidden;
      align-items: flex-start;
      &:hover {
        background: #e3e5e7;
      }
      .pot {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 10px;
        height: 10px;
        border-radius: 5px;
        background: #e04255;
      }
      img {
        position: absolute;
        left: 10px;
        top: 10px;
        width: 36px;
        height: 36px;
        background: #2c3e50;
        border-radius: 25px;
      }
      .name {
        height: 20px;
        line-height: 20px;
      }
      .text {
        height: 40px;
        line-height: 20px;
        color: #4d4d4d;
        box-sizing: border-box;
        padding-right: 10px;
        word-break: break-all;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .time {
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        color: #7a7a7a;
      }
    }
  }
}
</style>