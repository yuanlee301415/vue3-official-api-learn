<template>
  <details open>
    <summary>HasSetup</summary>
    <b>&lt;script setup&gt; 中的代码会在每次组件实例被创建的时候执行</b>
    <pre>{{ new Date() }}</pre>
  </details>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

console.log("HasSetup>rerender", new Date());

onMounted(() => {
  console.log("HasSetup>mounted", new Date());
});
</script>
