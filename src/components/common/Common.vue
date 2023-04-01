<template>
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
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Common"
}
</script>

<style lang="scss" scoped>
.common {
  width: 100%;
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