<template>
  <div class="title">
    <span></span>
    <span>{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: "Title",
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  margin: 20px 0;
  height: 30px;
  line-height: 30px;
  width: 100%;
  text-align: left;
  span:nth-child(1) {
    display: inline-block;
    width: 8px;
    height: 19px;
    background: #42b983;
    border-radius: 2px;
    margin-right: 10px;
    vertical-align: text-bottom;
  }
  span:nth-child(2) {
    font-size: 18px;
    font-weight: bold;
  }
}
</style>