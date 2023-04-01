<template>
  <div class="common-son-main">
    <div class="common">
      <div class="head">
        <img src="@/assets/img/admin/test01.jpg" alt="" class="avatar"/>
        <div class="name">hahah</div>
        <div class="time">2023-01-02 14:56</div>
      </div>
      <div class="text">
        Vasiliy likes to rest after a hard work, so you may often meet him in some bar nearby. As all programmers do, he loves the famous drink “Beecola”, which can be bought in n different shops in the city. It’s known that the price of one bottle in the shop
        �
        i is equal to
        �
        �
        x
        i
        ​
        coins.
      </div>
      <div class="func">
        <i class="el-icon-thumb">13</i>
        <i class="el-icon-chat-dot-square"></i>
        <i class="el-icon-delete"></i>
      </div>
    </div>
    <el-pagination
        layout="prev, pager, next"
        :total="50">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "CommonSon"
}
</script>

<style lang="scss" scoped>
.common-son-main {
  width: 80%;
  margin: 10px 30px 20px;
  padding: 5px 20px;
  ::v-deep *{
    background: #fafafa;
  }
}
.common {
  width: 100%;
  box-shadow: inset 0 1px 6px rgba(#f0f0f0, 0.1);
  box-sizing: border-box;
  border-radius: 3px;
  .head {
    height: 50px;
    line-height: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    img {
      margin: 0 20px;
      width: 36px;
      height: 36px;
      border-radius: 25px;
    }
    .name {
      font-weight: bolder;
      margin-right: 20px;
    }
    .time {
      font-size: 12px;
      color: #5b5b5b;
    }
  }
  .text {
    width: 100%;
    padding: 10px 20px 30px;
    box-sizing: border-box;
    text-align: left;
  }
  .func {
    width: 100%;
    text-align: left;
    padding: 0 26px;
    box-sizing: border-box;
    i {
      width: 26px;
      height: 30px;
      line-height: 30px;
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        color: #059fff;
      }
    }
    .el-icon-thumb {
      margin-right: 20px;
    }
  }
}
</style>