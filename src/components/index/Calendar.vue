<template>
  <div class="con">
    <Calendar
        v-on:choseDay="clickDay"
        v-on:changeMonth="changeDate"
        v-on:isToday="clickToday"
        agoDayHide="1672502400"
        :futureDayHide="nowDay"
        :markDate="finishDate"
    ></Calendar>
  </div>
</template>

<script>
import Calendar from 'vue-calendar-component'
import {dashToUnderline, formatMonth, underlineToDash} from "@/util/dateFormatUtil";

export default {
  components: {Calendar},
  props: {},
  data() {
    return {
      date: '',
      week: '',
      month: '',
      chooseMonth: '',
      finishDate: [],
      nowDay: new Date().getTime().toString().slice(0, 10),
      dailyQuestion: {
        date: {
          "id": '',
          "questionId": '',
          "createTime": ''
        }
      }
    }
  },
  watch: {},
  computed: {},
  methods: {
    clickDay(data) {
      // 时间格式转换
      data = underlineToDash(data)
      if (new Date().getTime() < new Date(data).getTime()) {
        return
      }
      let item = this.dailyQuestion[data]
      this.toQuestionInfo(item.questionId)
    },
    changeDate(data) {
      // 时间格式转换
      data = underlineToDash(data)
      if (new Date().getTime() < new Date(data).getTime()) {
        return
      }
      this.chooseMonth = formatMonth(data)
      this.freshData()
    },
    clickToday(data) {
      // console.log(data) // 跳到了本月
    },
    // 跳转题目详情
    toQuestionInfo(questionId) {
      let url = this.$router.resolve('/question/details/' + questionId)
      window.open(url .href, '_blank')
    },
    // 数据刷新
    freshData() {
      this.getDailyQuestion(this.chooseMonth)
      if (this.$store.getters.isLogin) {
        this.getUserDailyQuestionDetail(this.chooseMonth)
      }
    },
    // 获取每日一题题目列表
    getDailyQuestion(month) {
      this.asyncGetDailyQuestion(month).then(({data}) => {
        this.dailyQuestion = data.data
      })
    },
    // 获取用户每日一题做题情况
    getUserDailyQuestionDetail(month) {
      this.asyncGetUserDailyQuestionDetail(month).then(({data}) => {
        data.data.forEach((item) => {
          this.finishDate.push(dashToUnderline(item.createTime))
        })
      })
    },
    // 异步方法 => 获取每日一题题目列表
    async asyncGetDailyQuestion(month) {
      return await this.$axios({
        url: "/yicode-question-openapi/open/question/daily/detail?month=" + month,
        method: "get",
      });
    },
    // 异步方法 => 获取用户每日一题做题情况
    async asyncGetUserDailyQuestionDetail(month) {
      return await this.$axios({
        url: "/yicode-question-openapi/open/question/daily/query",
        method: "post",
        data: {
          "startMonth": month,
          "endMonth": month
        }
      });
    },
  },
  created() {
    const now = new Date();
    this.date = now.getDate() // 得到日期
    const day = now.getDay(); // 得到周几
    const m = now.getMonth()
    const arrWeek = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    this.week = arrWeek[day]
    const arrMonth = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]
    this.month = arrMonth[m]
  },
  mounted() {
    this.freshData()

  }
}
</script>
<style lang="scss" scoped>
.con {
  width: 240px;
  margin-top: 20px;
  padding-bottom: 12px;
  border-radius: 1em;
  background: #fff;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  position: relative;
  margin-bottom: 20px;

  .title {
    border-radius: 1em 1em 0 0;
    background: #e66b6b;
    color: #fff;
    padding: 0.8rem 1.5rem 1.2rem;

    .day {
      font-size: 5rem;
      font-weight: 900;
      line-height: 1em;
    }

    .month {
      font-size: 2rem;
    }
  }

  .ring-left {
    left: 2em;
  }

  .ring-right {
    right: 2em;
  }

  .ring {
    position: absolute;
    top: 135px;
  }

  .ring::before, .ring::after {
    background: #fff;
    border-radius: 4px;
    -webkit-box-shadow: 0 3px 1px rgba(0, 0, 0, .3), 0 -1px 1px rgba(0, 0, 0, .2);
    box-shadow: 0 3px 1px rgba(0, 0, 0, .3), 0 -1px 1px rgba(0, 0, 0, .2);
    content: "";
    display: inline-block;
    margin: 8px;
    height: 32px;
    width: 8px;
  }

  .now-data-myself {
    position: absolute;
    left: 15px;
    width: 70px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-right: 2px solid #e2e3e7;

    .now-data-myself-time {
      font-size: 26px;
      color: #e66b6b;
    }

    .now-data-myself-week {
      font-size: 14px;
    }
  }

  ::v-deep .wh_container {
    padding-top: 23px;

    .wh_content_all {
      background: #fff;
      color: #000 !important;

      .wh_top_changge {
        height: 30px;
        display: flex;
        align-items: center;

        .wh_content_li {
          color: #e66b6b;
          font-size: 18px;
        }

        li {
          color: #000;

          .wh_jiantou1 {
            width: 8px;
            height: 8px;
            border-top: 2px solid #919499;
            border-left: 2px solid #919499;
          }

          .wh_jiantou2 {
            width: 8px;
            height: 8px;
            border-top: 2px solid #919499;
            border-right: 2px solid #919499;
          }
        }
      }

      .wh_content {
        .wh_content_item {
          color: #525354;

          .wh_top_tag {
            // color: #e66b6b;
            font-weight: bold;
          }

          .wh_item_date {
            &:hover {
              // border-radius: 100px;
              background: none;
            }
          }

          .wh_isToday {
            background: none;
            color: #e66b6b;
            font-weight: bolder;
          }

          .wh_chose_day {
            background: none;
          }

          .wh_item_date {
            width: 30px;
            height: 30px;
          }

          .wh_isMark {
            background: url("@/assets/img/index/正确.png") no-repeat;
            background-size: contain;
            line-height: 0;
            text-indent: -9999px;

            &:hover {
              text-indent: inherit;
            }
          }
        }
      }
    }
  }
}
</style>
