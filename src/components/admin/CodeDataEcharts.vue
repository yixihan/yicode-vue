<template>
  <div>
    <div class="status" id="status"/>
  </div>
</template>

<script>
export default {
  name: "StatusEcharts",
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 最好点击雷达图能展示有多少数据,换个颜色,切合其他图
      const weekData = [
        [1300, 450, 450, 450],
      ];
      const monthData = [
        [1200, 120, 450, 341],
      ];
      const yearData = [
        [1800, 411, 123, 247],
      ];
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
            {name: '合计', max: 2000},
            {name: '简单题', max: 500},
            {name: '中等题', max: 500},
            {name: '复杂题', max: 500}
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
            data: weekData,
            symbol: 'none',
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
            data: monthData,
            symbol: 'none',
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
            data: yearData,
            symbol: 'none',
            itemStyle: {
              color: 'rgb(238, 197, 102)'
            },
            areaStyle: {
              opacity: 0.05
            }
          }
        ]
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.status {
  width: 400px;
  height: 400px;
}
</style>