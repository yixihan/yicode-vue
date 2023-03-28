<template>
  <div class="question-detail">
    <header>
      <div class="name">
        <span>题目名称</span>
        <div class="function">
          <i class="el-icon-edit-outline" @click="goModify()"></i>
        </div>
      </div>
      <div class="function">
        <div class="difficulty">
          <span>难度:  </span>
          <span>简单</span>
        </div>
        <div class="dianzan">
          <span><svg t="1679058778119" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2802" width="18" height="18"><path d="M411.904 153.728c19.797333-63.232 54.186667-90.24 122.026667-70.656l1.706666 0.554667c19.84 6.101333 42.666667 17.706667 64.085334 37.162666 33.706667 30.72 53.76 73.301333 53.76 126.805334 0 47.786667-2.773333 77.312-10.88 110.805333l-0.256 0.938667h175.488c107.264 0 149.888 72.362667 122.922666 192.682666l-2.304 9.856-5.461333 18.005334-20.608 67.114666-9.642667 30.677334-9.173333 28.672-17.066667 51.626666-11.648 33.621334-7.210666 20.053333-9.984 26.368-6.101334 15.232c-29.525333 71.253333-90.453333 103.978667-170.112 94.592l-387.114666-28.8a587.690667 587.690667 0 0 0-7.381334-0.341333l-15.36-0.341334H218.026667l-12.501334-0.213333-9.984-0.426667-8.32-0.768-3.712-0.554666-7.125333-1.408-11.52-3.029334c-59.349333-17.621333-90.24-67.925333-90.24-139.605333v-283.52c0-90.538667 54.954667-142.208 148.565333-142.208l75.776-0.042667 5.205334-3.968a293.632 293.632 0 0 0 72.234666-88.32l6.101334-11.946666c6.101333-12.544 11.093333-25.685333 15.829333-41.002667l0.768-2.602667z m88.661333 8.064c-1.834667-0.426667-2.645333 0.170667-3.541333 2.773333l-3.882667 14.933334-10.666666 38.442666-2.56 8.533334a366.933333 366.933333 0 0 1-20.565334 53.162666 387.754667 387.754667 0 0 1-72.618666 102.442667 333.141333 333.141333 0 0 1-49.28 42.026667l5.504-3.925334v417.408l336.682666 25.344c41.898667 4.906667 65.621333-6.101333 80.213334-36.096l2.858666-6.229333 5.76-14.378667 9.514667-25.173333 6.912-19.285333 11.221333-32.469334 8.064-24.064 17.365334-53.76 19.2-61.354666 15.445333-50.858667c18.986667-76.074667 7.808-94.592-38.357333-94.592h-217.685334a53.632 53.632 0 0 1-50.730666-71.125333l2.176-6.4 3.328-10.922667c10.282667-35.754667 13.226667-59.136 13.226666-108.629333 0-48.426667-26.88-72.96-57.045333-82.261334l-3.712-1.152z m-242.944 270.122667h-34.389333c-47.616 0-63.232 14.72-63.232 56.917333v283.52c0 38.016 9.941333 53.333333 33.792 59.008l1.493333 0.341333 3.754667 0.554667 5.12 0.426667 11.562667 0.256h28.586666l13.312 0.085333v-401.066667z" :fill="color" p-id="2803"></path></svg></span>
          <span class="num">12</span>
        </div>
        <div class="select">
          <i class="el-icon-star-off" @click="isShowSelect = !isShowSelect"></i>
          <div class="select-list" v-show="isShowSelect">
            <div class="list">
              <div>收藏夹名称1</div>
              <div>收藏夹名称2</div>
              <div>收藏夹名称3</div>
              <div>收藏夹名称4</div>
            </div>
            <div class="create" v-show="isCreateSelect">
              <input type="text" v-model="createSelectValue"/>
              <button>创建</button>
            </div>
            <button v-show="!isCreateSelect" @click="isCreateSelect = true">新建</button>
            <button>添加</button>
          </div>
        </div>
        <div class="share">
          <i class="el-icon-share" @click="isShowShare = !isShowShare"></i>
          <div class="erweima" v-show="isShowShare">
            <img src="">
          </div>
        </div>
      </div>
    </header>
    <div class="question-info">
      <div class="text">
        <mavon-editor
            v-model="content"
            :toolbarsFlag="false"
            :editable="false"
        ></mavon-editor>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuestionDetail",
  props: {
    questionId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      color: '#000000',
      createSelectValue: '',
      isCreateSelect: false,
      isShowSelect: false,
      isShowShare: false,
      content: '# HAHAHA\n\n\n\n\n\n\n\n\n\n## hahah'
    }
  },
  methods: {
    // 去修改题目页面
    goModify () {
      this.$router.push({path: "/admin/center/question-modify", query: {id: this.questionId}})
    }
  }
}
</script>

<style lang="scss" scoped>
.question-detail {
  flex: 2;
  display: flex;
  flex-direction: column;
  padding: 20px;
  header {
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #e5e5e5;
    text-align: left;
    cursor: default;
    .name {
      height: 30px;
      line-height: 30px;
      width: 100%;
      font-weight: bolder;
      position: relative;
      .function {
        position: absolute;
        top: 0;
        right: 0;
        display: flex;
        justify-content: right;
        align-items: center;
        i {
          margin-left: 5px;
          right: 0;
          font-size: 22px;
          cursor: pointer;
          transition: all .1s;
          &:hover {
            color: #fbb957;
          }
        }
      }
    }
    .function {
      height: 30px;
      line-height: 30px;
      font-size: 12px;
      width: 100%;
      display: flex;
      .difficulty {
        width: 70px;
      }
      .dianzan {
        width: 50px;
        position: relative;
        cursor: pointer;
        span:nth-child(1) {
          position: absolute;
          top: 4px;
        }
        .num {
          position: absolute;
          left: 18px;
        }
      }
      .select{
        margin: 0 15px 0 0;
        width: 20px;
        font-size: 16px;
        font-weight: bolder;
        cursor: pointer;
        position: relative;
        .select-list {
          z-index: 10;
          position: absolute;
          width: 175px;
          //height: 230px;
          left: -78px;
          background: #f0f0f0;
          cursor: default;
          padding: 10px;
          .list {
            height: 110px;
            overflow: auto;
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
            &::-webkit-scrollbar {
              display: none;
            }
            &>div {
              font-size: 14px;
              background: #d2d6e3;
              border-radius: 3px;
              padding-left: 10px;
              margin-bottom: 8px;
              cursor: pointer;
              &:hover {
                background: #99a9bf;
              }
            }
          }
          .create {
            margin-top: 10px;
            input {
              height: 30px;
              width: 100%;
              outline-style: none;
              border: 1px solid #42b983;
              border-radius: 3px;
              padding: 0 10px;
              box-sizing: border-box;
            }
            button {
              margin-top: 5px;
              width: 100%;
              border: none;
              height: 30px;
              border-radius: 3px;
              background: #42b983;
              color: #FFFFFF;
              cursor: pointer;
            }
          }
          &>button {
            width: 100%;
            height: 30px;
            margin-top: 10px;
            background: #059fff;
            color: #FFFFFF;
            border: none;
            border-radius: 3px;
            cursor: pointer;
          }
        }
      }
      .share {
        width: 20px;
        font-size: 16px;
        cursor: pointer;
        position: relative;
        .erweima {
          position: absolute;
          z-index: 10;
          width: 80px;
          height: 80px;
          background: #ffffff;
          left: -30px;
          box-sizing: border-box;
          padding: 5px;
          border: 1px solid #cccccc;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
    }
  }
  .question-info {
    width: 100%;
    text-align: left;
    padding: 10px 0;
    font-size: 14px;
    z-index: 1;
    .text {
      ::v-deep .v-note-wrapper {
        box-shadow: none !important;
        .v-note-panel {
          display: block !important;
          .v-note-edit {
            display: none !important;
          }
          .v-note-show {
            width: 100% !important;
          }
        }
      }
    }
  }
}
</style>