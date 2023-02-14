<template>
  <h2>nextTick</h2>

  <button @click="handleIncrement">Increment</button>
  <pre>count: <span id="cntSpan">{{ count }}</span></pre>
</template>

<script lang="ts" setup>
import { ref, nextTick } from "vue";

const count = ref(0);

async function handleIncrement() {
  count.value++;

  // 此时 DOM 还未更新
  console.log(
    "before > count:",
    document.getElementById("cntSpan")?.textContent
  );

  await nextTick();

  // 此时 DOM 已更新
  console.log(
    "after > count:",
    document.getElementById("cntSpan")?.textContent
  );
}
</script>
