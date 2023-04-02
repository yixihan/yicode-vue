<template>
<div class="problem-explanation">
  <div class="function">
    <el-input v-model="search" placeholder="搜索题解">
      <i slot="prefix" class="el-input__icon el-icon-search"></i>
    </el-input>
    <el-select v-model="sortMode" placeholder="排序方式"
               style="margin-left: 20px;">
      <el-option
          v-for="item in sortModeList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
      </el-option>
    </el-select>
    <el-select
        v-model="labelFocus"
        multiple
        collapse-tags
        style="margin-left: 20px;"
        placeholder="选择标签">
      <el-option
          v-for="item in labelOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
      </el-option>
    </el-select>
  </div>
  <div class="explanation-list">
    <div class="explanation"
         v-for="(item ,index) in explanationList"
         :key="index"
         @click="showExplanation(item)"
    >
      <div class="head">
        <img :src="item.avatar" alt=""/>
        <h2>{{ item.name }}</h2>
      </div>
      <div class="content">
        <p>{{ item.content }}</p>
      </div>
      <div class="func">
        <i class="el-icon-thumb">{{ item.zan }}</i>
        <i class="el-icon-chat-dot-square">{{ item.review }}</i>
        <i class="el-icon-delete"></i>
      </div>
    </div>
    <el-pagination
        layout="prev, pager, next"
        :total="50">
    </el-pagination>
  </div>
  <el-dialog
      :visible.sync="dialogVisible"
      width="70%"
      :before-close="handleClose">
    <div class="header">
      <div class="avatar-title">
        <img :src="dialogVal.avatar" alt="">
        <h2>{{ dialogVal.name }}</h2>
      </div>
      <div class="info">
        <span class="username">{{ dialogVal.username }}</span>
        <span>{{ dialogVal.time }}</span>
      </div>
      <mavon-editor
          v-model="dialogVal.content"
          :toolbarsFlag="false"
          :editable="false"
          :subfield="false"
          defaultOpen="edit"
      ></mavon-editor>
      <Common>
        <div class="show-details-common">
          <span v-show="!showCommonSon" @click="showCommonSon = true">查看回复<i class="el-icon-arrow-down"></i></span>
          <span v-show="showCommonSon" @click="showCommonSon = false">收起回复<i class="el-icon-arrow-up"></i></span>
        </div>
        <common-son v-show="showCommonSon"></common-son>
      </Common>
      <el-pagination
          layout="prev, pager, next"
          :total="50">
      </el-pagination>
    </div>
  </el-dialog>
</div>
</template>

<script>
import Common from "@/components/common/Common.vue";
import CommonSon from "@/components/common/CommonSon.vue";

export default {
  name: "ProblemExplanation",
  components: {CommonSon, Common},
  data () {
    return {
      search: '',
      sortMode: '1',
      sortModeList: [
        {
          label: '默认排序',
          value: '1'
        },
        {
          label: '点赞最多',
          value: '2'
        },
        {
          label: '最新发布',
          value: '3'
        },
        {
          label: '最早发布',
          value: '4'
        }
      ],
      labelFocus: '',
      labelOptions: [],
      explanationList: [
        {
          avatar: require('@/assets/img/admin/test02.jpg'),
          name: 'YYYO',
          content: `题目：给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

          你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。`,
          zan: '123',
          review: '456',
          username: '李白',
          time: '2049-09-12'
        }
      ],
      dialogVisible: false,
      dialogVal: {},
      showCommonSon: false
    }
  },
  methods: {
    // 展示题解
    showExplanation (val) {
      this.dialogVisible = true
      this.dialogVal = val
    },
    // 关闭弹窗后
    handleClose () {
      this.dialogVisible = false
      this.dialogVal = {}
    }
  }
}
</script>

<style lang="scss" scoped>
.problem-explanation {
  width: 100%;
  .function {
    display: flex;
    padding: 0 20px;
  }
  .explanation-list {
    width: 100%;
    .explanation {
      width: 100%;
      padding: 0 20px;
      box-sizing: border-box;
      cursor: default;
      transition: all .3s;
      &:hover {
        background: #efefef;
      }
      .head {
        width: 100%;
        height: 50px;
        line-height: 50px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        img {
          display: inline-block;
          width: 36px;
          height: 36px;
          border-radius: 25px;
        }
        h2 {
          padding-left: 20px;
        }
      }
      .content {
        width: 100%;
        padding: 10px 0;
        p {
          line-height: 22px;
          word-break: break-all;
          overflow: hidden;
          font-size: 14px;
          color: #7a7a7a;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
      .func {
        height: 30px;
        line-height: 30px;
        text-align: left;
        i {
          margin-right: 10px;
          cursor: pointer;
          &:hover {
            color: #059fff;
          }
        }
        .el-icon-delete {
          &:hover {
            color: #e04255;
          }
        }
      }
    }
  }
  .el-dialog__wrapper {
    .header {
      border-bottom: 1px solid #7a7a7a;
      .avatar-title {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        img {
          width: 36px;
          height: 36px;
          border-radius: 25px;
        }
        h2 {
          padding-left: 20px;
        }
      }
      .info {
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        text-align: left;
        span {
          margin-right: 20px;
        }
      }
    }
  }
}
</style>