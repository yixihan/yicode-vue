<template>
  <div class="carousel">
    <el-carousel height="350px">
      <el-carousel-item v-for="(item, index) in favoriteList"
                        :key="index"
                        :style="'background: url(' +  item.favoriteBg + ')'"
                        @click.native="goQuestion(item.id)"
      >
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "Carousel",
  data () {
    return {
      // 轮播图信息
      favoriteList: [
        {
          favoriteId: '',
          favoriteBg: '',
          favoriteName: ''
        }
      ]
    }
  },
  mounted() {
    this.getQuestionList()
  },
  methods: {
    // 获取题单列表
    getQuestionList () {
      this.asyncGetQuestionList().then(({data}) => {
        this.favoriteList = data.data.records
      })
    },
    goQuestion(val) {
      // 向组件页面传递题单id值
      this.$emit('listId', val)
      this.$router.push({path: '/questionLibrary'})
    },
    // 异步方法 => 获取题单列表
    async asyncGetQuestionList () {
      return await this.$axios({
        url: "/yicode-question-openapi/open/admin/question/list/page",
        method: "post",
        data: {
          "page": 1,
          "pageSize": 8,
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.el-carousel__item {
  background-size: cover !important;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>