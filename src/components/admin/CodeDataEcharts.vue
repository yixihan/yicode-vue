<template>
  <div>
    <div class="status" id="status"/>
  </div>
</template>

<script>
export default {
  name: "StatusEcharts",
  data() {
    return {
      // 年度数据
      yearData: [],
      // 月度数据
      monthData: [],
      // 周度数据
      weekData: [],
      maxSumData: 0,
      maxEasyData: 0,
      maxMediumData: 0,
      maxHardData: 0,
    }
  },
  mounted() {
    this.getCommitData();
  },
  methods: {
    // 初始化 echarts 图
    drawLine() {
      const lineStyle = {
        width: 1,
        opacity: 0.5
      };

      // 基于准备好的dom，初始化echarts实例
      let status = this.$echarts.init(document.getElementById('status'))
      // 绘制图表
      status.setOption({
        title: {
          text: '平台代码提交数据',
          left: 'center',
          textStyle: {
            color: '#000'
          }
        },
        legend: {
          bottom: 5,
          data: ['本周', '本月', '本年'],
          itemGap: 20,
          textStyle: {
            color: '#fff',
            fontSize: 14
          },
          selectedMode: 'single'
        },
        radar: {
          indicator: [
            {name: '合计', max: this.maxSumData * 1.25},
            {name: '简单题', max: this.maxEasyData * 1.25},
            {name: '中等题', max: this.maxMediumData * 1.25},
            {name: '复杂题', max: this.maxHardData * 1.25}
          ],
          shape: 'circle',
          splitNumber: 5,
          axisName: {
            color: 'rgb(238, 197, 102)'
          },
          splitLine: {
            lineStyle: {
              color: [
                'rgba(238, 197, 102, 0.1)',
                'rgba(238, 197, 102, 0.2)',
                'rgba(238, 197, 102, 0.4)',
                'rgba(238, 197, 102, 0.6)',
                'rgba(238, 197, 102, 0.8)',
                'rgba(238, 197, 102, 1)'
              ].reverse()
            }
          },
          splitArea: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(238, 197, 102, 0.5)'
            }
          }
        },
        series: [
          {
            name: '本周',
            type: 'radar',
            lineStyle: lineStyle,
            data: this.weekData,
            label: {
              show: true,
            },
            itemStyle: {
              color: '#F9713C'
            },
            areaStyle: {
              opacity: 0.1
            }
          },
          {
            name: '本月',
            type: 'radar',
            lineStyle: lineStyle,
            data: this.monthData,
            label: {
              show: true,
            },
            itemStyle: {
              color: '#B3E4A1'
            },
            areaStyle: {
              opacity: 0.05
            }
          },
          {
            name: '本年',
            type: 'radar',
            lineStyle: lineStyle,
            data: this.yearData,
            label: {
              show: true,
            },
            itemStyle: {
              color: 'rgb(238, 197, 102)'
            },
            areaStyle: {
              opacity: 0.05
            }
          }
        ]
      });
    },
    // 获取平台代码提交量
    getCommitData() {
      let promiseArr = [];

      // 年度数据获取
      promiseArr.push(new Promise((resolve) => {
        this.asyncGetCommitData('YEAR').then(({data}) => {
          this.yearData = this.dealData(data.data)
          this.getMaxData(this.yearData)
          resolve();
        })
      }))
      // 月度数据获取
      promiseArr.push(new Promise((resolve) => {
        this.asyncGetCommitData('MONTH').then(({data}) => {
          this.monthData = this.dealData(data.data)
          this.getMaxData(this.monthData)
          resolve();
        })
      }))
      // 周度数据获取
      promiseArr.push(new Promise((resolve) => {
        this.asyncGetCommitData('WEEK').then(({data}) => {
          this.weekData = this.dealData(data.data)
          this.getMaxData(this.weekData)
          resolve();
        })
      }))

      // 执行
      Promise.all(promiseArr).then(() => {
        // 渲染图表
        this.drawLine()
      })
    },
    // 获取数据最大值
    getMaxData(data) {
      data.forEach(item => {
        this.maxSumData = Math.max(this.maxSumData, item[0])
        this.maxEasyData = Math.max(this.maxEasyData, item[1])
        this.maxMediumData = Math.max(this.maxMediumData, item[2])
        this.maxHardData = Math.max(this.maxHardData, item[3])
      })
    },
    // 处理接口返回的数据
    dealData (data) {
      let targetData = [];
      let arr1 = [];
      let arr2 = [];
      for (let i in data) {
        // TODO 待删
        if (data[i] === 0) {
          data[i] = Math.round(Math.random() * 500)
        }
        if (i.includes('Success')) {
          arr1.push(data[i])
        } else {
          arr2.push(data[i])
        }
      }
      targetData.push(arr1)
      targetData.push(arr2)
      return targetData
    },
    // 异步方法 => 获取平台代码提交量
    async asyncGetCommitData(dateDimension) {
      return await this.$axios({
        url: "/yicode-question-openapi/open/admin/commit/data",
        method: "post",
        data: {
          "dateDimension": dateDimension
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.status {
  width: 400px;
  height: 450px !important;
}
</style>