<template>
  <div class="language-skill">
    <div class="language">
      <div v-for="(item, index) in data" :key="index">
        <span class="name">{{ item.name }}</span>
        <span>通过数: </span>
        <span class="num">{{ item.num }}</span>
      </div>
    </div>
    <div class="skill">
      <span v-for="(item, index) in labelList" :key="index">{{ item.text }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "languageAndSkill",
  data () {
    return {
      data: [
        {
          name: 'Java',
          num: 962,
        },
        {
          name: 'JavaScript',
          num: 962,
        },
        {
          name: 'C',
          num: 962,
        },
        {
          name: 'C++',
          num: 962,
        },
        {
          name: 'Python',
          num: 962,
        },
        {
          name: 'Go',
          num: 962,
        }
      ],
      labelList: [
        {
          text: '数组',
        },
        {
          text: '二分查找',
        },
        {
          text: '二叉搜索树',
        },
        {
          text: '广度优先搜索',
        },
        {
          text: '深度优先搜索',
        },
        {
          text: '动态规划',
        },
        {
          text: '位运算',
        },
        {
          text: '数据库',
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.language-skill {
  width: 100%;
  display: flex;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.0392156863), 0 2px 8px rgba(0, 0, 0, 0.0784313725);
  box-sizing: border-box;
  .language {
    flex: 1;
    padding: 20px;
    border-right: 1px solid #cbcbcb;
    font-size: 14px;
    >div {
      display: flex;
      justify-content: space-between;
      height: 25px;
      padding: 5px 10px;
      line-height: 25px;
      border-radius: 4px;
      transition: all .3s;
      &:hover {
        background: #99a9bf;
      }
      .name {
        flex: 16;
        color: #274e79;
        font-weight: bold;
        text-align: left;
      }
      .num {
        color: #274e79;
        font-weight: bold;
      }
    }
  }
  .skill {
    flex: 1;
    padding: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    align-content: center;
    span {
      padding: 0 15px;
      margin: 10px 10px 10px 0;
      background: #99a9bf;
      border-radius: 20px;
      font-size: 14px;
    }
  }
}
</style>