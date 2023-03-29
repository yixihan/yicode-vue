<template>
  <div>
    <!--　内容展示 -->
    <div>

    </div>
    <!-- 分页插件 -->
    <div>
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :hide-on-single-page="hide"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  data() {
    return {
      hide: false,
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4
    }
  },
  methods: {
    // 分页插件 => 切换每页展示数量
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    // 分页插件 => 切换页数
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
}
</script>

<style lang="scss" scoped>

</style>