<template>
  <codemirror
      :value="code"
      :options="cmOptions"
  >
  </codemirror>
</template>

<script>
import { codemirror } from "vue-codemirror";
require("codemirror/mode/clike/clike.js");
require("codemirror/addon/edit/closebrackets.js");
import "codemirror/lib/codemirror.css"
import "codemirror/mode/javascript/javascript"
import "codemirror/mode/go/go"
import "codemirror/mode/python/python"
import "codemirror/theme/idea.css"

export default {
  name: "CodeEditor",
  props: {
    mode: {
      type: String,
      default: 'text/x-java'
    },
  },
  components: {
    codemirror
  },
  data() {
    return {
      code: '',
      cmOptions:{
        mode: this.mode,  //语言模式
        theme: "idea", // 默认主题
        autofocus: true,
        lineNumbers: true,   //显示行号
        indentUnit: 4, // 缩进单位，默认2
        smartIndent: true, // 自动缩进
        autoCloseBrackets: true// 自动补全括号
      }
    }
  },
  watch: {
    mode(newVal) {
      this.cmOptions.mode = newVal
    }
  },
  mounted() {
  },
  methods: {

    changeMode(val) {
      this.mode = this.modeOptions.get(val)
    },
    onChange() {

    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
}
</script>

<style lang="scss" scoped>

</style>