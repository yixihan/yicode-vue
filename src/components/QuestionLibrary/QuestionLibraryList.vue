<template>
  <div class="question-library-list">
    <el-carousel :autoplay="false"
                 type="card" height="250px"
    :arrow="'never'">
      <el-carousel-item v-for="(item, index) in favoriteList"
                        :key="index"
                        :style="'background: url(' +  item.favoriteBg + ')'"
                        @click="clickQuestionList(item.favoriteId)"
      >
        <h3 class="medium"/>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "QuestionLibraryList",
  data () {
    return {
      // 题单信息
      favoriteList: [
        {
          favoriteId: '',
          favoriteBg: '',
          favoriteName: ''
        }
      ],
    }
  },
  mounted() {
    this.getQuestionList()
  },
  methods: {
    // 点击题单
    clickQuestionList (id) {
      // 父传子
      this.$emit('id', id)
    },
    // 获取题单列表
    getQuestionList () {
      this.asyncGetQuestionList().then(({data}) => {
        this.favoriteList = data.data
      })
    },
    // 异步方法 => 获取题单列表
    async asyncGetQuestionList () {
      return await this.$axios({
        url: "/yicode-question-openapi/open/admin/question/list/list",
        method: "post",
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.el-carousel__item {
  background-size: cover !important;
}

.question-library-list {
  width: 100%;
  padding-top: 70px;
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
}
</style>