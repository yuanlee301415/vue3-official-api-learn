<template>
  <details open>
    <summary>NoSetup</summary>
    <b>&lt;script&gt; 只在组件被首次引入的时候执行一次</b>
    <pre>{{ new Date() }}</pre>
  </details>
</template>

<script lang="ts">
console.log("NoSetup>rerender", new Date());

export default {
  name: "NoSetup",
};
</script>
