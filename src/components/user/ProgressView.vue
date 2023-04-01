<template>
  <div class="progress-view">
    <div class="date">
      <span class="pre">
        <i class="el-icon-arrow-left" @click="lastMonth"></i>
      </span>
      <span class="month">
        {{ year }} - {{ month }}
      </span>
      <span class="next">
        <i class="el-icon-arrow-right" @click="nextMonth"></i>
      </span>
    </div>
    <echarts v-if="progressConfig.series[0].data.length" :flag="freshFlag" :config="progressConfig"></echarts>
  </div>
</template>

<script>
import Echarts from "@/components/user/Echarts.vue";
import {successMsg} from "@/util/elementMsgUtil";

export default {
  name: "ProgressView",
  components: {Echarts},
  data () {
    return  {
      minYear: 2023,
      minMonth: 1,
      maxYear: 0,
      maxMonth: 0,
      year: 0,
      month: 0,
      date: '',
      freshFlag: true,
      progressConfig: {
        label: {
          show: true,
        },
        xAxis: {
          name: "日期",
          data: []
        },
        yAxis: {
          name: "解题数"
        },
        series: [
          {
            data: [],
            type: 'line',
            smooth: true
          }
        ]
      }
    }
  },
  mounted() {
    const now = new Date();
    this.month = now.getMonth() + 1
    this.year = now.getFullYear()
    this.maxMonth = now.getMonth() + 1
    this.maxYear = now.getFullYear()
    this.date = this.year + '-' + this.month
    this.getUserCommitRecords()
  },
  methods: {
    // 上个月
    lastMonth() {
      if (this.year === this.minYear && this.month === this.minMonth) {
        successMsg("前面没有数据捏")
        return
      }
      if (this.month === 1) {
        this.month = 12;
        this.year--
      } else {
        this.month--;
      }
      this.date = this.year + '-' + this.month
      this.getUserCommitRecords()
    },
    // 下个月
    nextMonth() {
      if (this.year === this.maxYear && this.month === this.maxMonth) {
        successMsg("后面没有数据捏")
        return
      }
      if (this.month === 12) {
        this.month = 1;
        this.year++
      } else {
        this.month++;
      }
      this.date = this.year + '-' + this.month
      this.getUserCommitRecords()
    },
    // 获取用户提交次数记录
    getUserCommitRecords(){
      this.asyncGetUserCommitRecords().then(({data}) => {
        this.progressConfig.xAxis.data = []
        this.progressConfig.series[0].data = []
        data.data.forEach(item => {
          this.progressConfig.xAxis.data.push(item.date)
          this.progressConfig.series[0].data.push(item.count)
        })
        this.freshFlag = !this.freshFlag
      })
    },
    // 异步方法 => 获取用户提交次数记录
    async asyncGetUserCommitRecords() {
      return await this.$axios({
        url: "/yicode-question-openapi/open/question/commit/result/count?month=" + this.date,
        method: "get",
      });
    },
  },
}
</script>

<style lang="scss" scoped>
.progress-view {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.0392156863), 0 2px 8px rgba(0, 0, 0, 0.0784313725);
  box-sizing: border-box;
  position: relative;
  .date {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 150px;
    height: 30px;
    line-height: 30px;
    background: #fafafa;
    cursor: pointer;
    z-index: 2;
    border-radius: 8px;
    padding: 5px 0;
    box-sizing: border-box;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.0392156863), 0 2px 8px rgba(0, 0, 0, 0.0784313725);
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-weight: bolder;
    overflow: hidden;
    .month {
      flex: 2;
      border-right: 1px solid #ececec;
      border-left: 1px solid #ececec;
      padding: 0 10px;
      font-size: 14px;
    }
    .pre, .next {
      flex: 1;
      transition: all .3s;
      &:hover {
        color: #FFFFFF;
        background: #99a9bf;
      }
      i {
        font-weight: bolder;
      }
    }
  }
}
</style>