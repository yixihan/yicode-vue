<template>
  <div id="charts" class="echarts"></div>
</template>

<script>
export default {
  name: "Echarts",
  props: {
    config: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  mounted () {
    this.echartsInit()
  },
  methods: {
    //初始化echarts
    echartsInit() {
      //柱形图
      //因为初始化echarts 的时候，需要指定的容器 id='main'
      this.$echarts.init(document.getElementById('charts')).setOption(this.config)
    }
  }
}
</script>

<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 300px;
}
</style>