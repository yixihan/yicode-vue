<template>
  <div class="question-bank">
    <!-- 功能区 -->
    <div class="function-area">
      <!-- 难度 -->
      <div class="question-select">
        <el-select v-model="difficultyValue" placeholder="难度" @change="chooseDifficulty">
          <el-option
              v-for="item in difficultyOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            <span style="float: left; color: #00af9b;" v-if="item.value === 'EASY'">{{ item.label }}</span>
            <span style="float: left; color: #ffb800;" v-if="item.value === 'MEDIUM'">{{ item.label }}</span>
            <span style="float: left; color: #ff2d55;" v-if="item.value === 'HARD'">{{ item.label }}</span>
          </el-option>
        </el-select>
      </div>
      <!-- 状态 -->
      <div class="question-select">
        <el-select placeholder="状态" v-model="stateValue" @change="chooseStatus">
          <el-option
              v-for="item in stateOptions"
              :key="item.value"
              :label="item.label"
              @click="getQuestionDetails"
              :value="item.value">
          </el-option>
        </el-select>
      </div>
      <!-- 标签 -->
      <div class="question-select">
        <el-select value-key="Set"
                   value="标签"
                   placeholder="标签"
                   @click.native="changeTypeShow()">
          <div slot="empty"></div>
        </el-select>
        <transition name="fade">
          <div class="select-type" v-show="isType">
            <div class="question-search">
              <i class="el-icon-search"></i>
              <input v-model="labelName" type="text"/>
            </div>
            <div class="select-type-singles">
              <div v-show="refreshLabel">
                <span v-for="(item, index) in labelOptions.filter((item) => item.labelName.includes(labelName))"
                      :key="index"
                      :style="item.flag ? chooseLabelStyle : unChooseLabelStyle"
                      @click="chooseLabel(item)">{{ item.labelName }}
                </span>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <!-- 搜索框 -->
      <div class="question-search">
        <i class="el-icon-search"></i>
        <input type="text" v-model="nameValue" @keyup.enter="getQuestionDetails"/>
      </div>
      <!-- 重置 -->
      <div class="question-refresh" @click="resetReq">
        <i class="el-icon-refresh-right">重置</i>
      </div>
      <!-- 随机一题 -->
      <div class="question-random" @click="randomQuestion">
        <svg t="1677667359052" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             p-id="5622" width="30" height="30">
          <path
              d="M228.6 295c2-3.2 2.2-7.2 0.5-10.6-3.8-7.5-5.8-15.9-5.8-24.3 0-19.6 10.6-37.6 27.8-47.4 17.2-9.8 38.4-9.8 55.6 0 17.2 9.8 27.8 27.9 27.8 47.4 0 8.4-2 16.8-5.8 24.3-1.7 3.4-1.5 7.4 0.5 10.6 2 3.2 5.6 5.2 9.5 5.2h97.9V381c-31.4-7.6-64.3 4.7-82.7 30.9a75.617 75.617 0 0 0 0 87.1c18.4 26.2 51.3 38.5 82.7 30.9v80.6H121.3V300.2h97.8c3.9 0 7.5-2 9.5-5.2z"
              fill="#059FFF" p-id="5623"></path>
          <path
              d="M477.3 858.4c30.4-0.4 54.8-24.8 54.8-54.8 0-29.9-24.4-54.3-54.8-54.8-8.6 0-17 1.9-24.7 5.7-3.5 1.7-7.6 1.5-10.8-0.5-3.3-2-5.3-5.6-5.2-9.4v-96.3h-82c1.5 6 2.3 12.1 2.2 18.3 0 29.6-17.3 56.5-44.5 69.2-27.2 12.7-59.3 8.9-82.6-9.8-23.3-18.7-33.6-48.9-26.5-77.7h-82v310.3h315.2v-96.3c0-3.8 2-7.3 5.2-9.4 3.3-2 7.4-2.2 10.8-0.5 7.9 4.1 16.3 6 24.9 6z"
              fill="#059FFF" p-id="5624"></path>
          <path
              d="M666.7 643.3c-2-3.2-2.2-7.2-0.5-10.6 3.8-7.5 5.8-15.9 5.8-24.3-0.5-29.9-25.2-53.9-55.6-53.9-30.4 0-55.2 24-55.6 53.9 0 8.4 2 16.8 5.8 24.3 1.7 3.4 1.5 7.4-0.5 10.6-2 3.2-5.6 5.2-9.5 5.2h-97.8v80.7c6.1-1.5 12.3-2.2 18.5-2.2 42.6 0.5 76.9 34.7 76.9 76.7s-34.3 76.1-76.9 76.7c-6.2 0-12.5-0.7-18.5-2.2v80.7H774V648.5h-97.8c-3.9 0-7.5-1.9-9.5-5.2z"
              fill="#059FFF" p-id="5625"></path>
          <path
              d="M537.2 374.5c-0.6 3.8-3 7-6.6 8.5-7.9 3.3-14.9 8.4-20.4 14.9-19.8 23.1-16.8 57.7 6.7 77.2s58.6 16.5 78.4-6.6c5.5-6.4 9.5-14.1 11.5-22.3 0.9-3.7 3.7-6.6 7.4-7.8 3.7-1.2 7.7-0.4 10.6 2l74.8 62.1 52.8-61.7c-26.9-13.1-43.8-40.4-43.3-70s18.3-56.3 45.6-68.5c27.4-12.3 59.5-7.9 82.5 11.2 4.8 4 9.1 8.5 12.7 13.4l52.8-61.7-241-200-203.2 237.2 74.8 62.1c3 2.4 4.4 6.2 3.9 10z"
              fill="#E6F5FF" p-id="5626"></path>
        </svg>
        <span>随机一题</span>
      </div>
    </div>
    <!--  题目展示区-->
    <div class="question-list">
      <div class="question-list-header--bar" v-if="id">
        <span  @click="id = null">
          <i class="el-icon-arrow-left">展示题库</i>
        </span>
        <h2>题单题目</h2>
      </div>
      <!-- 表头 -->
      <div class="question-list-header question-list-flex">
        <div>状态</div>
        <div @click="sort(0)">
          题目
          <span>
            <i class="el-icon-caret-top" :style="{'color': order[0].value === 1 ? '#059fff' : '#7a7a7a' }"></i>
            <i class="el-icon-caret-bottom" :style="{'color': order[0].value === 2 ? '#059fff' : '#7a7a7a' }"></i>
          </span>
        </div>
        <div>点赞数</div>
        <div>提交数</div>
        <div>通过数</div>
        <div @click="sort(1)">
          题解
          <span>
            <i class="el-icon-caret-top" :style="{'color': order[1].value === 1 ? '#059fff' : '#7a7a7a' }"></i>
            <i class="el-icon-caret-bottom" :style="{'color': order[1].value === 2 ? '#059fff' : '#7a7a7a' }"></i>
          </span>
        </div>
        <div @click="sort(2)">
          通过率
          <span>
            <i class="el-icon-caret-top" :style="{'color': order[2].value === 1 ? '#059fff' : '#7a7a7a' }"></i>
            <i class="el-icon-caret-bottom" :style="{'color': order[2].value === 2 ? '#059fff' : '#7a7a7a' }"></i>
          </span>
        </div>
        <div @click="sort(3)">
          难度
          <span>
            <i class="el-icon-caret-top" :style="{'color': order[3].value === 1 ? '#059fff' : '#7a7a7a' }"></i>
            <i class="el-icon-caret-bottom" :style="{'color': order[3].value === 2 ? '#059fff' : '#7a7a7a' }"></i>
          </span>
        </div>
      </div>
      <!-- 内容 -->
      <div class="question-list-main question-list-flex"
           v-for="(item, index) in data.records"
           :key="index">
        <div>
          <svg v-if="item.status" t="1679325374512" class="icon" viewBox="0 0 1024 1024" version="1.1"
               xmlns="http://www.w3.org/2000/svg" p-id="2778" width="16" height="16">
            <path
                d="M823.04 823.04A439.893333 439.893333 0 1 1 341.333333 106.666667a439.893333 439.893333 0 0 1 481.706667 716.373333zM512 0a512 512 0 1 0 512 512A512 512 0 0 0 512 0z m209.493333 305.493333l-327.68 328.533334-85.333333-149.333334a35.84 35.84 0 0 0-62.293333 35.84l108.8 190.293334a36.266667 36.266667 0 0 0 31.146666 18.346666 35.84 35.84 0 0 0 17.493334-3.84 37.546667 37.546667 0 0 0 8.533333-6.826666l360.106667-361.813334a35.84 35.84 0 0 0-50.773334-51.2z"
                fill="#1afa29" p-id="2779"></path>
          </svg>
        </div>
        <div>{{ item.questionName }}</div>
        <div>{{ item.likeCount }}</div>
        <div>{{ item.commitCount }}</div>
        <div>{{ item.successCount }}</div>
        <div>{{ item.noteCount }}</div>
        <div>{{ item.passRate }}%</div>
        <div :style="'color: ' + getDifficultyColor(item.questionDifficulty)">
          {{ item.questionDifficulty }}
        </div>
      </div>
    </div>
    <!-- 分页组件 -->
    <div class="paging" v-if="type !== 'MAIN'">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :hide-on-single-page="hide"
          :current-page="data.current"
          :page-sizes="optionalPageSize"
          :page-size="data.pageSize"
          :total="data.total"
          layout="total, sizes, prev, pager, next, jumper"
      />
    </div>

  </div>
</template>

<script>
export default {
  name: "QuestionBank",
  props: {
    type: {
      type: String,
      default: 'MAIN',
    },
    // 需要监视page是否发生变化
    page: {
      type: Number,
      default: 1,
    },
    id: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      // 分页插件是否隐藏
      hide: false,
      // 标签展开
      isType: false,
      // 刷新标签
      refreshLabel: true,
      // 难度选择
      difficultyValue: '',
      // 难度选项
      difficultyOptions: [
        {
          value: 'EASY',
          label: '简单'
        },
        {
          value: 'MEDIUM',
          label: '中等'
        },
        {
          value: 'HARD',
          label: '困难'
        }
      ],
      // 状态选择
      stateValue: '',
      // 状态选项
      stateOptions: [
        {
          value: 'UN_DO',
          label: '未开始'
        },
        {
          value: 'ACCESS',
          label: '已通过'
        },
        {
          value: 'UN_ACCESS',
          label: '未通过'
        }
      ],
      // 输入标签
      labelName: '',
      // 标签选择
      labelValue: new Set(),
      // 可选标签
      labelOptions: [
        {
          "flag": false,
          "labelId": '',
          "labelName": ""
        }
      ],
      // 选择标签时展示的 style
      chooseLabelStyle: {
        background: '#007aff',
        userSelect: 'none'
      },
      // 未选择标签时展示的 style
      unChooseLabelStyle:{
        background: '#e5e6e8',
        userSelect: 'none'
      },
      // 题目选择
      nameValue: '',
      // 排序方式
      order: [
        {
          type: "NAME",
          value: 0,  // 0为默认, 1为升序, 2为降序
        },
        {
          type: "NOTE",
          value: 0,  // 0为默认, 1为升序, 2为降序
        },
        {
          type: "PASS",
          value: 0,  // 0为默认, 1为升序, 2为降序
        },
        {
          type: "DIFFICULTY",
          value: 0,  // 0为默认, 1为升序, 2为降序
        }
      ],
      // 题解排序
      noteSort: null,
      // 难度排序
      difficultySort: null,
      // 名字排序
      nameSort : null,
      // 通过率排序
      passSort: null,
      // 可选的
      pageSize: 10,
      // 可选的每页展示数据量
      optionalPageSize: [10, 20, 30, 40, 50],
      // 问题列表
      "data": {
        "current": 1,
        "total": 0,
        "size": 10,
        "pages": 0,
        "records": [
          {
            "questionId": '',
            "questionName": "",
            "questionDifficulty": "",
            "likeCount": 0,
            "commitCount": 0,
            "successCount": 0,
            "noteCount": 0,
            "commentCount": 0,
            "passRate": '0',
            "createTime": ""
          },
        ]
      },
    }
  },
  mounted() {
    this.getQuestionDetails()
    this.getQuestionLabel()
  },
  watch: {
    // 监听id变化,更新列表
    id: {
      handler(newVal) {
        // 调用接口
        this.getQuestionDetails()
      }
    }
  },
  methods: {
    // 切换标签展示类型
    changeTypeShow() {
      this.isType = !this.isType
    },
    // 设置题目难度颜色
    getDifficultyColor(questionDifficulty) {
      if (questionDifficulty === '困难') {
        return '#ff2d55'
      } else if (questionDifficulty === '中等') {
        return "#ffb800"
      } else {
        return "#00af9b"
      }
    },
    // 题目数据获取
    getQuestionDetails() {
      // 分页参数
      let pagingReq;
      if (this.type === 'MAIN') {
        // 主页
        pagingReq = {
          page: this.page,
          pageSize: 15,
          searchCount: false
        }
        this.asyncGetQuestion(pagingReq).then(({data}) => {
          if (this.page === 1) {
            // 页数为一, 覆盖
            this.data.records = data.data.records
          } else {
            // 追加
            this.data.records = this.data.records.concat(data.data.records)
          }
        })
      } else if (this.type === 'QUESTION') {
        // 题库
        pagingReq = {
          page: this.data.current,
          pageSize: this.data.size,
          searchCount: true
        }
        this.asyncGetQuestion(pagingReq).then(({data}) => {
          this.data = data.data
          if (this.data.total <= this.data.size) {
            this.hide = true;
          }
        })
      } else if (this.type === 'QUESTION_LIST') {
        // 题单
        pagingReq = {
          page: this.data.current,
          pageSize: this.data.size,
          searchCount: true
        }
        this.asyncGetQuestionList(pagingReq).then(({data}) => {
          this.data = data.data
          if (this.data.total <= this.data.size) {
            this.hide = true;
          }
        })
      }
    },
    // 重置搜索选项
    resetReq() {
      this.difficultyValue = '';
      this.labelValue = new Set();
      this.stateValue = '';
      this.nameValue = '';
      this.getQuestionLabel();
      this.getQuestionDetails();
    },
    // 选择难度
    chooseDifficulty(val) {
      this.difficultyValue = val;
      this.getQuestionDetails()
    },
    // 选择状态
    chooseStatus(val) {
      this.stateValue = val;
      this.getQuestionDetails()
    },
    // 选择标签
    chooseLabel(item) {
      if (this.labelValue.has(item.labelId)) {
        this.labelValue.delete(item.labelId)
        item.flag = false
      } else {
        this.labelValue.add(item.labelId)
        item.flag = true
      }
      this.refreshLabel = false
      this.refreshLabel = true
      this.getQuestionDetails()
    },
    // 排序
    sort(index) {
      this.order[index].value = this.order[index].value === 2 ? 0 : this.order[index].value + 1
      // 处理数据
      if (this.order[index].type === 'DIFFICULTY') {
        this.difficultySort = this.order[index].value === 0 ? null : this.order[index].value !== 1
      } else if (this.order[index].type === 'NAME') {
        this.nameSort = this.order[index].value === 0 ? null : this.order[index].value !== 1
      } else if (this.order[index].type === 'PASS') {
        this.passSort = this.order[index].value === 0 ? null : this.order[index].value !== 1
      } else if (this.order[index].type === 'NOTE') {
        this.noteSort = this.order[index].value === 0 ? null : this.order[index].value !== 1
      }
      // 按要求进行排序
      this.getQuestionDetails()
    },
    // 切换每页展示数量
    handleSizeChange(val) {
      this.data.size = val
      this.getQuestionDetails()
    },
    // 切页
    handleCurrentChange(val) {
      this.data.current = val
      this.getQuestionDetails()
    },
    // 随机一题
    randomQuestion() {
      this.asyncRandomQuestion().then(({data}) => {
        this.toQuestionInfo(data.data.questionId)
      })
    },
    // 获取问题标签
    getQuestionLabel() {
      this.asyncGetQuestionLabel(this.labelName).then(({data}) => {
        this.labelOptions = data.data
        this.labelOptions.forEach((item) => {
          item.flag = false
        })
      })
    },

    // 跳转题目详情
    toQuestionInfo(index) {
      console.log(index)
      // TODO 跳转题目详情
      // this.$router.push({path: '/admin/center/detail', query: {id: this.data.records[index].questionId}})
    },
    // 异步方法 => 获取题目列表
    async asyncGetQuestion(paging) {
      return await this.$axios({
        url: "/yicode-question-openapi/open/question/query",
        method: "post",
        data: {
          "pageSize": paging.pageSize,
          "searchCount": paging.searchCount,
          "page": paging.page,
          "questionName": this.nameValue,
          "difficulty": this.difficultyValue,
          "status": this.stateValue,
          "label": Array.from(this.labelValue.values()),
          "noteSort": this.noteSort,
          "difficultySort": this.difficultySort,
          "nameSort" : this.nameSort,
          "passSort": this.passSort
        }
      });
    },
    // 异步方法 => 获取题单题目列表
    async asyncGetQuestionList(paging) {
      return await this.$axios({
        url: "/yicode-question-openapi/open/admin/question/list/question/page",
        method: "post",
        data: {
          "id": this.id,
          "pageSize": paging.pageSize,
          "searchCount": paging.searchCount,
          "page": paging.page
        }
      });
    },
    // 异步方法 => 获取所有题目标签
    async asyncGetQuestionLabel(labelName) {
      return await this.$axios({
        url: "/yicode-question-openapi/open/label/all/question?labelName=" + labelName,
        method: "get",
      });
    },
    // 异步方法 => 随机一题
    async asyncRandomQuestion() {
      return await this.$axios({
        url: "/yicode-question-openapi/open/question/detail/random",
        method: "get",
      });
    }

  }
}
</script>

<style lang="scss" scoped>
.question-bank {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 46px 16px 26px;
  padding: 16px 0 0 0;
  border-top: 1px solid #e8e8e8;

  .function-area {
    height: 30px;
    width: 100%;
    display: flex;
    justify-content: center;

    & > div {
      margin-right: 8px;
    }

    .question-select {
      position: relative;

      .select-type {
        z-index: 9999;
        position: absolute;
        width: 300px;
        top: 41px;
        left: -102px;
        height: 300px;
        transition: all .3s;
        border: 1px solid #E4E7ED;
        border-radius: 4px;
        background-color: #FFF;
        box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
        overflow-y: auto;
        &::-webkit-scrollbar {
          display: none;
        }
        .question-search {
          margin-top: 16px;

          input {
            width: 250px;
          }

          i {
            left: 35px !important;
          }
        }

        .select-type-singles {
          padding: 20px;
          display: flex;
          flex-wrap: wrap;

          span {
            display: inline-block;
            background: #e8e8e8;
            padding: 6px 14px;
            font-size: 14px;
            border-radius: 15px;
            cursor: pointer;
            margin: 5px 5px 0 0;
            //height: 28px;
            //line-height: 28px;
            word-break:keep-all;
            white-space: pre;
          }
        }
      }

      .fade-enter-active, .fade-leave-active {
        transition: all .1s ease-out;
      }

      .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */
      {
        opacity: 0
      }

      ::v-deep input::-webkit-input-placeholder {
        color: #595959 !important;
      }

      ::v-deep .el-input__inner {
        height: 30px !important;
        width: 70px !important;
        padding: 0 !important;
        padding-left: 10px !important;
        border: none !important;
        background: #e8e8e8;
      }

      ::v-deep .el-input__suffix {
        top: 5px !important;
      }

      ::v-deep .is-focus {
        .el-input__suffix {
          top: -5px !important;
        }
      }
    }

    .question-search {
      position: relative;
      flex: 1;

      i {
        left: 12px;
        top: 5px;
        font-size: 18px;
        color: #696969;
        font-weight: bold;
        position: absolute;
      }

      input {
        box-sizing: border-box;
        width: 100%;
        height: 30px;
        border-radius: 5px;
        border: none;
        outline-style: none;
        background: #e8e8e8;
        padding: 0 10px 0 36px;
      }
    }

    .question-refresh {
      text-align: center;
      line-height: 30px;

      &:hover {
        color: #3d9eff;
        cursor: pointer;
      }
    }

    .question-random {
      cursor: pointer;
      display: flex;
      margin-left: 15px;
      justify-content: center;
      align-items: center;
      padding: 5px;
      border-radius: 5px;
      transition: all .2s;

      &:hover {
        background: #e8e8e8;
        color: #059fff;
      }

      span {
        margin-left: 8px;
        font-size: 14px;
      }
    }
  }

  .question-list {
    width: 100%;
    margin-top: 10px;
    //border-top: 1px solid #e8e8e8;
    padding: 10px 0 0 0;
    .question-list-header--bar {
      display: block;
      height: 30px;
      line-height: 30px;
      width: 100%;
      span  {
        position: absolute;
        left: 15px;
        cursor: default;
      }

    }
    .question-list-flex {
      width: 100%;
      height: 45px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      &:nth-child(odd) {
        background: #f8f8f8;
      }

      // 状态
      & > div:nth-child(1) {
        width: 40px;
      }

      // 题目
      & > div:nth-child(2) {
        flex: 1;
      }

      // 点赞数
      & > div:nth-child(3) {
        width: 80px;
      }

      // 提交数
      & > div:nth-child(4) {
        width: 80px;
      }

      // 通过数
      & > div:nth-child(5) {
        width: 80px;
      }

      // 题解
      & > div:nth-child(6) {
        width: 80px;
      }

      // 通过率
      & > div:nth-child(7) {
        width: 80px;
      }

      // 难度
      & > div:nth-child(8) {
        width: 80px;
      }
    }

    .question-list-header {
      border-bottom: 1px solid #e8e8e8;
      color: #7a7a7a;
      font-size: 14px;
      padding-top: 30px;

      & > div {
        position: relative;

        span {
          position: absolute;
          right: 10px;
          top: 0;
          display: flex;
          flex-direction: column;
          i {
            display: inline-block;
            text-align: center;
            width: 10px;
            height: 10px;
            line-height: 10px;
          }
        }

        &:hover {
          svg {
            color: #3b3b3b !important;
          }
        }
      }
      // 题目
      & > div:nth-child(2) {
        cursor: pointer;

        &:hover {
          color: #3b3b3b;
        }
      }

      // 点赞数
      & > div:nth-child(3) {
        cursor: pointer;

        &:hover {
          color: #3b3b3b;
        }
      }

      // 提交数
      & > div:nth-child(4) {
        cursor: pointer;

        &:hover {
          color: #3b3b3b;
        }
      }

      // 通过数
      & > div:nth-child(5) {
        cursor: pointer;

        &:hover {
          color: #3b3b3b;
        }
      }

      // 通过率
      & > div:nth-child(6) {
        cursor: pointer;

        &:hover {
          color: #3b3b3b;
        }
      }

      // 题解
      & > div:nth-child(7) {
        cursor: pointer;

        &:hover {
          color: #3b3b3b;
        }
      }

      // 难度
      & > div:nth-child(8) {
        cursor: pointer;

        &:hover {
          color: #3b3b3b;
        }
      }
    }
  }
}
</style>