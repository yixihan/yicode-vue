<template>
  <div class="admin-center-index">
    <div class="chart-box">
      <!-- 上面部分 -->
      <div class="chart-box-top">
        <!-- 上左部分 -->
        <div >
          <problem-data-echarts/>
        </div>
        <!-- 上右部分 -->
        <div>
          <code-data-echarts/>
        </div>
      </div>
      <!-- 下面部分 -->
      <div class="chart-box-bottom">
        <platform-data-echarts/>
      </div>
    </div>
  </div>
</template>

<script>
import ProblemDataEcharts from "@/components/admin/ProblemDataEcharts.vue";
import CodeDataEcharts from "@/components/admin/CodeDataEcharts.vue";
import PlatformDataEcharts from "@/components/admin/PlatformDataEcharts.vue";

export default {
  name: "AdminIndex",
  components: {
    ProblemDataEcharts,
    CodeDataEcharts,
    PlatformDataEcharts
  },
  data() {
    return {
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.admin-center-index {
  margin-top: 40px;
  .chart-box {
    min-width: 500px;
    .chart-box-top {
      display: flex;
      justify-content: space-around;
    }
    .chart-box-bottom {
      margin-top: 80px;
      padding-bottom: 80px;
      .platform {
        margin: auto;
      }
    }
  }
}
</style>