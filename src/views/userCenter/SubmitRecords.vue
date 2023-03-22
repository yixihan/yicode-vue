<template>
  <div class="submit-records">
    <header>
      <span>所有提交记录</span>
      <i class="el-icon-arrow-right"></i>
    </header>
    <div class="list">
      <div class="list-item">
        <div class="question">12. 哈哈哈哈哈</div>
        <div class="time">三个月前</div>
      </div>
      <div class="list-item">
        <div class="question">12. 哈哈哈哈哈</div>
        <div class="time">三个月前</div>
      </div>
      <div class="list-item">
        <div class="question">12. 哈哈哈哈哈</div>
        <div class="time">三个月前</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SubmitRecords"
}
</script>

<style lang="scss" scoped>
.submit-records {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.0392156863), 0 2px 8px rgba(0, 0, 0, 0.0784313725);
  box-sizing: border-box;
  padding: 20px;
  header {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    text-align: right;
    span, i {
      cursor: pointer;
    }
  }
  .list {
    .list-item {
      height: 56px;
      line-height: 56px;
      display: flex;
      font-size: 14px;
      padding: 0 15px;
      border-radius: 8px;
      cursor: pointer;
      &:nth-child(odd) {
        background: #f7f7f8;
      }
      .question {
        flex: 1;
        text-align: left;
      }
      .date {
        flex: 1;
        text-align: right;
      }
    }
  }
}
</style>