<template>
  <details open>
    <summary>NormalScriptB</summary>
    <b>普通 &lt;script&gt;</b>
    <pre>{{ new Date() }}</pre>
  </details>
</template>

<script lang="ts">
import runSideEffectOnce from "./runSideEffectOnce";

// 普通 <script>, 在模块作用域下执行 (仅一次)
runSideEffectOnce();

export default {
  name: "NormalScriptB",
};
</script>
