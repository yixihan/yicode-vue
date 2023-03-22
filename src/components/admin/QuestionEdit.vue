<template>
  <div class="question-edit">
    <h2>测试用例</h2>
    <div class="info">
      <div class="code">
        用例id
      </div>
      <div class="state">
        是否启用
      </div>
      <div class="add">
        <el-button type="primary"
                   icon="el-icon-plus"
        @click="isShowAdd = true">添加</el-button>
      </div>
    </div>
    <div class="info" v-for="(item, index) in tableData" :key="index">
      <div class="code">
        {{ item.id }}
      </div>
      <div class="state">
        <el-switch
            v-model="item.state"
            active-color="#13ce66"
            inactive-color="#ff4949">
        </el-switch>
      </div>
      <div class="see">
        <span @click="seeUseCase(item)">查看</span>
      </div>
    </div>
    <el-pagination
        layout="prev, pager, next"
        :total="50">
    </el-pagination>
    <el-dialog :title="'用例详情:' + useCasesInfo.id"
               :visible.sync="isShowUseCase"
               :width="'500px'"
               center>
      <el-form :model="useCasesInfo">
        <el-form-item label="输入用例" :label-width="'120px'">
          <el-input v-model="useCasesInfo.inputInfo" autocomplete="off" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="输入用例" :label-width="'120px'">
          <el-input v-model="useCasesInfo.outputInfo" autocomplete="off" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowUseCase = false">取 消</el-button>
        <el-button type="primary" @click="isShowUseCase = false">更新</el-button>
      </div>
    </el-dialog>
    <el-dialog title="新增用例"
               :visible.sync="isShowAdd"
               :width="'500px'"
               center>
      <el-form :model="addUseCase">
        <el-form-item label="输入用例" :label-width="'120px'">
          <el-input v-model="addUseCase.inputInfo" autocomplete="off" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="输入用例" :label-width="'120px'">
          <el-input v-model="addUseCase.outputInfo" autocomplete="off" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowAdd = false">取 消</el-button>
        <el-button type="primary" @click="isShowAdd = false">更新</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "QuestionEdit",
  data () {
    return {
      tableData: [
        {
          id: '12',
          state: false,
          inputInfo: '测一',
          outputInfo: '输一',
        },
        {
          id: '12',
          state: false,
          inputInfo: '测二',
          outputInfo: '输二',
        },
        {
          id: '12',
          state: false,
          inputInfo: '测三',
          outputInfo: '输三',
        }
      ],
      // 新增用例
      isShowAdd: false,
      addUseCase: {
        id: '',
        state: false,
        inputInfo: '',
        outputInfo: '',
      },
      // 查看用例
      isShowUseCase: false,
      useCasesInfo: {
      },
    }
  },
  methods: {
    seeUseCase (val) {
      this.isShowUseCase = true
      this.useCasesInfo = val
    }
  }
}
</script>

<style lang="scss" scoped>
  .question-edit {
    flex: 1;
    width: 100%;
    .info {
      width: 100%;
      height: 48px;
      line-height: 48px;
      display: flex;
      transition: all .2s;
      font-size: 14px;
      border-bottom: 1px solid #eeeeee;
      &:hover {
        background: #eeeeee;
      }
      &>div {
        flex: 1;
      }
      .see {
        cursor: pointer;
        &:hover {
          color: #42b983;
        }
      }
    }
  }
</style>