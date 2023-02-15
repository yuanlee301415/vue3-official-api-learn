<template>
  <details open>
    <summary>NormalScriptA</summary>
    <b>普通 &lt;script&gt;</b>
    <pre>{{ new Date() }}</pre>
    <pre>{{ $options }}</pre>
  </details>
</template>

<script lang="ts">
import runSideEffectOnce from "./runSideEffectOnce";

// 普通 <script>, 在模块作用域下执行 (仅一次)
runSideEffectOnce();

export default {
  name: "NormalScriptA",
  inheritAttrs: false,
  customOptions: {
    opA1: "OptA1",
    opA2: "OptA2",
  },
  setup(props: any, ctx: any) {
    console.log("NormalScriptA>ctx:", ctx);
    console.log("NormalScriptA>ctx>$options:", ctx.$options);
  },
};
</script>
