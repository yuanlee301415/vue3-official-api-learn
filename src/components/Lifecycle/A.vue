<template>
  <details open>
    <summary>LifecycleA</summary>
    <ul style="height: 10em; overflow: hidden">
      <li v-for="item of list" :key="item.id">
        id: {{ item.id }}, title: {{ item.title }}
      </li>
    </ul>
  </details>
</template>

<script lang="ts" setup>
const list = new Array(10000).fill({}).map((_, idx) => ({
  id: idx,
  title: `Title-${idx}`,
}));
</script>
