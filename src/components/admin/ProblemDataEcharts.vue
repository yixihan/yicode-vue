<template>
  <div>
    <div class="problem" id="problem"/>
  </div>
</template>

<script>
export default {
  name: "ProblemDataEcharts",
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let problem = this.$echarts.init(document.getElementById('problem'))
      // 绘制图表
      problem.setOption({
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            type: 'pie',
            name: '题集',
            radius: ['40%', '70%'],
            avoidLabelOverlap: true,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: true,
              position: 'center',
              formatter: "题集"
            },
            labelLine: {
              show: true
            },
            data: [
              {value: 735, name: '简单题'},
              {value: 580, name: '中等题'},
              {value: 1048, name: '困难题'}
            ]
          }
        ]
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.problem {
  width: 400px;
  height: 400px;
}
</style>