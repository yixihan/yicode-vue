<template>
  <div class="activity">
    <div class="row">
      <div class="col">
        <span>总评论数</span>
        <span>123</span>
      </div>
      <div class="col">
        <span>总题解数</span>
        <span>123</span>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <span>总提交数</span>
        <span>123</span>
      </div>
      <div class="col">
        <span>总通过数</span>
        <span>123</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Activity"
}
</script>

<style lang="scss" scoped>
.activity {
  flex: 1;
  height: 150px;
  margin-top: 8px;
  margin-left: 26px;
  border-radius: 8px;
  display: flex;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.0392156863), 0 2px 8px rgba(0, 0, 0, 0.0784313725);
  background: url("@/assets/img/index/active-bg.jpg") no-repeat;
  background-size: cover;
  .row {
    flex: 1;
    display: flex;
    flex-direction: column;
    .col {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 15px 0;
      span {
        flex: 1;
      }
      span:nth-child(1) {
        font-size: 20px;
        font-weight: bolder;
        color: #FFFFFF;
      }
      span:nth-child(2) {
        font-size: 18px;
        font-weight: bolder;
        color: #ff8e48;
      }
    }
  }
}
</style>