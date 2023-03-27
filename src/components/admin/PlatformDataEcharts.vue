<template>
  <div>
    <div class="platform" id="platform"/>
  </div>
</template>

<script>
export default {
  name: "PlatformDataEcharts",
  data () {
    return {
      data: [
        {
          "month": "",
          "commitCount": 0,
          "commitSuccessCount": 0,
          "noteCount": 0,
          "commentCount": 0,
          "userCount": 0
        }
      ],
      monthData: [],
      commitCountData: [],
      commitSuccessCountData: [],
      noteCountData: [],
      commentCountData: [],
      userCountData: [],
    }
  },
  mounted() {
    this.getPlatformData();
  },
  methods: {
    // 渲染折线图
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let problem = this.$echarts.init(document.getElementById('platform'))
      // 绘制图表
      problem.setOption({
        title: {
          text: '平台数据分析'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: [
            '代码提交数',
            '提交通过数',
            '新增题解数',
            '新增评论数',
            '新增用户数'
          ]
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.monthData
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '代码提交数',
            type: 'line',
            stack: 'Total',
            data: this.commitCountData
          },
          {
            name: '提交通过数',
            type: 'line',
            stack: 'Total',
            data: this.commitSuccessCountData
          },
          {
            name: '新增题解数',
            type: 'line',
            stack: 'Total',
            data: this.noteCountData
          },
          {
            name: '新增评论数',
            type: 'line',
            stack: 'Total',
            data: this.commentCountData
          },
          {
            name: '新增用户数',
            type: 'line',
            stack: 'Total',
            data: this.userCountData
          }
        ]
      });
    },
    // 获取平台活跃数据
    getPlatformData() {
      this.asyncGetPlatformData().then(({data}) => {
        this.data = data.data
        this.dealData(data.data)
        this.drawLine();
      })
    },
    // 数据处理
    dealData(data) {
      data.forEach(item => {
        this.monthData.push(item.month)
        this.commitCountData.push(item.commitCount)
        this.commitSuccessCountData.push(item.commitSuccessCount)
        this.noteCountData.push(item.noteCount)
        this.commentCountData.push(item.commentCount)
        this.userCountData.push(item.userCount)
      })
    },
    // 异步方法 => 获取平台活跃数据
    async asyncGetPlatformData() {
      return await this.$axios({
        url: "/yicode-question-openapi/open/admin/broken/data",
        method: "post",
        data: {
          "dateDimension": 'YEAR'
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.platform {
  margin: 0 auto;
  width: 800px;
  height: 400px;
}
</style>