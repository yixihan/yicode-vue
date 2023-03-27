<template>
  <div>
    <div class="problem" id="problem"/>
  </div>
</template>

<script>
export default {
  name: "ProblemDataEcharts",
  data() {
    return {
      questionCount: {
        easyQuestion: 0,
        hardQuestion: 0,
        mediumQuestion: 0,
        question: 0
      }
    }
  },
  mounted() {
    this.getQuestionCount();
  },
  methods: {
    // 初始化 echarts 图
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let problem = this.$echarts.init(document.getElementById('problem'))
      // 绘制图表
      problem.setOption({
        title: {
          text: '平台题目数量',
          left: 'center',
          textStyle: {
            color: '#000'
          }
        },
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
              {value: this.questionCount.easyQuestion, name: '简单题'},
              {value: this.questionCount.mediumQuestion, name: '中等题'},
              {value: this.questionCount.hardQuestion, name: '困难题'}
            ]
          }
        ]
      });
    },
    // 获取问题数量情况
    getQuestionCount() {
      this.asyncGetQuestionCount().then(({data}) => {
        this.questionCount = data.data
        // 初始化 echarts 图
        this.drawLine();
      })
    },
    // 异步方法 => 获取问题数量情况
    async asyncGetQuestionCount() {
      return await this.$axios({
        url: "/yicode-question-openapi/open/question/all/count",
        method: "get",
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.problem {
  width: 400px;
  height: 450px !important;
  >div {
    height: 450px !important;
  }
}
</style>