<template>
  <div class="con">
<!--    <div class="title">
      &lt;!&ndash; <h2>日历</h2> &ndash;&gt;
      <div class="day">
        {{ date }}
      </div>
      <div class="month">
        {{ month }}
      </div>
    </div>-->
<!--    <div class="ring ring-left"></div>-->
<!--    <div class="ring ring-right"></div>-->
    <Calendar
      v-on:choseDay="clickDay"
      v-on:changeMonth="changeDate"
      v-on:isToday="clickToday"
      :markDate="finishDate"
    ></Calendar>
  </div>
</template>

<script>
import Calendar from 'vue-calendar-component'

export default {
  components: { Calendar },
  props: {},
  data () {
    return {
      date: '',
      week: '',
      month: '',
      finishDate: [
        '2023/3/2',
        '2023/3/1'
      ],
      data: []
    }
  },
  watch: {},
  computed: {},
  methods: {
    clickDay (data) {
      // console.log(data) // 选中某天
    },
    changeDate (data) {
      // console.log(data) // 左右点击切换月份
    },
    clickToday (data) {
      // console.log(data) // 跳到了本月
    },
    // 展示完成打卡的日期
    showFinish (data) {
      // 修改日期格式
    }
  },
  created () {
    var now = new Date()
    this.date = now.getDate() // 得到日期
    var day = now.getDay() // 得到周几
    const m = now.getMonth()
    var arrWeek = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
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
    // console.log(this.month)
  },
  mounted () {}
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
