<template>
  <div class="label">
    <h1>标签管理页</h1>
    <div class="search">
      <el-input v-model="labelNameInput" placeholder="标签名"></el-input>
      <el-button type="primary" @click="getLabelList">搜索</el-button>
      <el-button @click="resetSearchReq">清空</el-button>
    </div>
    <el-table
        :data="labelData.records"
        stripe
        style="width: 100%">
<!--      <el-table-column-->
<!--          type="selection"-->
<!--          width="55">-->
<!--      </el-table-column>-->
      <el-table-column
          prop="labelName"
          align="center"
          label="标签名">
      </el-table-column>
      <el-table-column
          prop="createTime"
          align="center"
          label="创建时间">
      </el-table-column>
      <el-table-column
          prop="address"
          align="center"
          label="操作">
        <template slot-scope="scope">
          <el-button type="text"
                     size="small"
                     style="color: red"
                     @click="delLabel(scope.row)"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :hide-on-single-page="hide"
        :current-page="labelData.current"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="labelData.size"
        :total="labelData.total"
        layout="total, sizes, prev, pager, next, jumper"
    >
    </el-pagination>
  </div>
</template>

<script>

import {successMsg} from "@/util/elementMsgUtil";

export default {
  name: "AdminLabel",
  data() {
    return {
      hide: false,
      labelNameInput: '',
      labelData: {
        "current": 1,
        "pages": 1,
        "records": [
          {
            "labelId": 0,
            "labelName": "",
            "createTime": ""
          },
        ],
        "size": 10,
        "total": 0
      },
    }
  },
  mounted() {
    this.getLabelList()
  },
  methods: {
    // 重置搜索条件
    resetSearchReq() {
      this.labelNameInput = ''
      this.getLabelList()
    },
    // 切换页码
    handleSizeChange(val) {
      this.labelData.size = val
      this.getLabelList()
    },
    // 切换页数
    handleCurrentChange(val) {
      this.labelData.current = val
      this.getLabelList()
    },
    // 获取标签列表
    getLabelList() {
      this.asyncGetLabelList().then(({data}) => {
        this.labelData = data.data;
      })
    },
    // 删除标签
    delLabel(label) {
      this.asyncDelLabel(label.labelId).then(() => {
        successMsg("删除" + label.labelName + "成功")
        this.getLabelList()
      })
    },
    // 异步方法 => 获取标签列表
    async asyncGetLabelList() {
      return await this.$axios({
        url: "/yicode-question-openapi/open/label/all",
        method: "post",
        data: {
          "labelName": this.labelNameInput,
          "page": this.labelData.current,
          "pageSize": this.labelData.size,
        }
      });
    },
    // 异步方法 => 注销用户
    async asyncDelLabel(labelId) {
      return await this.$axios({
        url: "/yicode-user-openapi/open/label/del",
        method: "delete",
        data: [labelId]
      });
    }

  }
}
</script>

<style lang="scss" scoped>
.label {
  padding: 0 20px;

  .search {
    width: 100%;
    box-sizing: border-box;
    height: 40px;
    display: flex;
    padding: 0 10px;
    margin: 10px 0;

    & > div {
      flex: 1;
      margin-right: 10px;
    }

    .el-button {
      height: 40px !important;
    }
  }
}
</style>