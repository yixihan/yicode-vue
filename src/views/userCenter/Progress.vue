<template>
  <div class="progress">
    <div class="progress-left">
      <div class="progress-function">
        <el-select v-model="stateValue"
                   clearable
                   placeholder="请选择状态">
          <el-option
              v-for="item in stateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="difficultyValue" clearable placeholder="请选择难度">
          <el-option
              v-for="item in difficultyOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
        <el-input v-model="search"
                  suffix-icon="el-icon-search"
                  placeholder="题目"></el-input>
      </div>
      <div class="progress-list">
        <el-table
            :data="tableData"
            style="width: 100%"
            :default-sort = "{prop: 'date', order: 'descending'}"
        >
          <el-table-column
              prop="date"
              label="最近提交时间"
              align="center"
              sortable>
          </el-table-column>
          <el-table-column
              prop="name"
              label="题目"
              align="center"
              sortable>
          </el-table-column>
          <el-table-column
              prop="address"
              label="难度"
              align="center"
              :formatter="formatter">
          </el-table-column>
        </el-table>
        <el-pagination
            layout="prev, pager, next"
            :total="50">
        </el-pagination>
      </div>
    </div>
    <div class="progress-right">
      <speed-progress></speed-progress>
    </div>
  </div>
</template>

<script>
import SpeedProgress from "@/components/index/SpeedProgress.vue";

export default {
  name: "Progress",
  components: {SpeedProgress},
  data () {
    return {
      stateOptions: [
        {
          value: 1,
          label: '已通过题目'
        },
        {
          value: 2,
          label: '未通过题目'
        }
      ],
      stateValue: 1,
      difficultyValue: null,
      difficultyOptions: [
        {
          value: 1,
          label: '简单'
        },
        {
          value: 2,
          label: '中等'
        },
        {
          value: 3,
          label: '困难'
        },
      ],
      search: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.progress {
  display: flex;
  align-items: flex-start;
  .progress-left {
    flex: 1;
    .progress-function {
      display: flex;
      >div {
        margin: 0 10px;
      }
      .el-select {
        ::v-deep input {
          width: 120px !important;
        }
      }
    }
    .progress-list {

    }
  }
  .progress-right {
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>