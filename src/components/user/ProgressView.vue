<template>
  <div class="progress-view">
    <div class="date">
      <span class="pre">
        <i class="el-icon-arrow-left"></i>
      </span>
      <span class="month">
        {{ year }} - {{ month }}
      </span>
      <span class="next">
        <i class="el-icon-arrow-right"></i>
      </span>
    </div>
    <echarts :config="progressConfig"></echarts>
  </div>
</template>

<script>
import Echarts from "@/components/user/Echarts.vue";

export default {
  name: "ProgressView",
  components: {Echarts},
  data () {
    return  {
      year: 2023,
      month: 3,
      progressConfig: {
        xAxis: {
          name: "日期",
          data: ['A', 'B', 'C', 'D', 'E']
        },
        yAxis: {
          name: "解题数"
        },
        series: [
          {
            data: [10, 22, 28, 23, 19],
            type: 'line',
            smooth: true
          }
        ]
      }
    }
  }
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