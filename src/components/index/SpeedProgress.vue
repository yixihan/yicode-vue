<template>
  <div class="speed-progress">
    <header>当前进度</header>
    <div class="speed-progress-main">
      <div class="main-left">
        <div class="main-left-chart" id="main">
        </div>
        <div class="main-left-text" @mouseenter="isPercentage = true" @mouseleave="isPercentage = false">
          <div class="now" v-show="!isPercentage">{{ userRate.acceptedQuestion }}</div>
          <div class="total" v-show="!isPercentage">{{ questionCount.question }}</div>
          <div class="now" v-show="isPercentage">{{ userRate.acceptedQuestionRate }}%</div>
          <div class="total" v-show="isPercentage">通过率</div>
        </div>
      </div>
      <div class="main-right">
        <div class="main-right-col">
          <h4 class="easy">简单</h4>
          <span class="now">{{ userRate.acceptedEasyQuestion }}</span>
          <span class="total">{{ questionCount.easyQuestion }}</span>
        </div>
        <div class="main-right-col">
          <h4 class="middle">中等</h4>
          <span class="now">{{ userRate.acceptedMediumQuestion }}</span>
          <span class="total">{{ questionCount.mediumQuestion }}</span>
        </div>
        <div class="main-right-col">
          <h4 class="difficulty">困难</h4>
          <span class="now">{{ userRate.acceptedHardQuestion }}</span>
          <span class="total">{{ questionCount.hardQuestion }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SpeedProgress",
  props: {
    userId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isPercentage: false,
      // 问题数量情况
      questionCount: {
        "question": 0,
        "hardQuestion": 0,
        "mediumQuestion": 0,
        "easyQuestion": 0
      },
      // 用户做题进度
      userRate: {
        "acceptedQuestion": 0,
        "acceptedHardQuestion": 0,
        "acceptedMediumQuestion": 0,
        "unAcceptedQuestion": 0,
        "unDoQuestion": 0,
        "acceptedEasyQuestion": 0,
        "acceptedQuestionRate": 0,
      }
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    // 初始化 echarts
    initCharts() {
      // 初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("main"))
      let option = {
        title: {
          text: '全部',
          left: 'center',
          top: 'center',
          show: false,
          textStyle: {
            fontSize: 12
          }
        },
        color: [
          '#00af9b',
          '#ffb800',
          '#ff2d55',
          '#dfdfdf'
        ],
        series: [
          {
            type: 'pie',
            data: [
              {
                value: this.userRate.acceptedHardQuestion,
                name: '简单'
              },
              {
                value: this.userRate.acceptedMediumQuestion,
                name: '中等'
              },
              {
                value: this.userRate.acceptedHardQuestion,
                name: '困难'
              },
              {
                value: this.$store.getters.isLogin ?
                    this.userRate.unAcceptedQuestion +
                    this.userRate.unDoQuestion :
                    this.questionCount.question,
                name: '剩余'
              }
            ],
            radius: ['80%', '90%'],
            label: {
              show: false,
              position: 'center'
            }
          }
        ]
      };
      // 绘制图表
      myChart.setOption(option)
    },
    // 初始化数据
    initData () {
      let promiseArr = [];
      promiseArr.push(new Promise((resolve) => {
        this.asyncGetQuestionCount().then(({data}) => {
          this.questionCount = data.data
          resolve()
        })
      }))
      if (this.$store.getters.isLogin) {
        promiseArr.push(new Promise((resolve) => {
          this.asyncGetUserQuestionRate().then(({data}) => {
            this.userRate = data.data
            resolve()
          })
        }))
      }

      Promise.all(promiseArr).then(() => {
        this.initCharts()
      })
    },
    // 异步方法 => 获取问题数量情况
    async asyncGetQuestionCount() {
      return await this.$axios({
        url: "/yicode-question-openapi/open/question/all/count",
        method: "get",
      });
    },
    // 异步方法 => 获取用户做题进度
    async asyncGetUserQuestionRate() {
      return await this.$axios({
        url: "/yicode-question-openapi/open/question/commit/rate?userId=" + this.userId,
        method: "get",
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.speed-progress {
  width: 240px;
  height: 150px;
  margin-top: 8px;
  border-radius: 8px;
  box-shadow: 0 1px 3px #0000000a, 0 2px 8px #00000014;

  header {
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    cursor: pointer;
  }

  .speed-progress-main {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;

    .main-left {
      width: 100px;
      height: 100px;
      position: relative;

      .main-left-chart {
        width: 100%;
        height: 100%;
      }

      .main-left-text {
        position: absolute;
        top: 32px;
        left: 22px;
        cursor: default;

        .now {
          font-size: 18px;
        }

        .total {
          border-top: 1px solid #7a7a7a;
          padding-top: 3px;
          font-size: 14px;
          color: #7a7a7a;
          width: 56px;
        }
      }
    }

    .main-right {
      width: 120px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;

      .main-right-col {
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: default;

        .easy {
          color: #00af9b;
        }

        .middle {
          color: #ffb800;
        }

        .difficulty {
          color: #ff2d55;
        }

        h4 {
          font-size: 14px;
          height: 30px;
          line-height: 30px;
        }

        .now {
          font-size: 14px;
        }

        .total {
          font-size: 12px;
          color: #7a7a7a;
          width: 26px;
          padding-top: 3px;
          border-top: 1px solid #7a7a7a;
        }
      }
    }
  }
}
</style>