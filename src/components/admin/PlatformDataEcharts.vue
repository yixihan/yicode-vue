<template>
  <div>
    <div class="platform" id="platform"/>
  </div>
</template>

<script>
export default {
  name: "PlatformDataEcharts",
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 三种统计维度 : 天(14天), 周(12周), 月(12月)
      // 保存为图片,去掉
      // 悬停出现的内容顺序最好和图上的顺序一致,能弄就弄
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
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '代码提交数',
            type: 'line',
            stack: 'Total',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '提交通过数',
            type: 'line',
            stack: 'Total',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '新增题解数',
            type: 'line',
            stack: 'Total',
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: '新增评论数',
            type: 'line',
            stack: 'Total',
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: '新增用户数',
            type: 'line',
            stack: 'Total',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
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