<template>
  <details open>
    <summary>User</summary>
    <b>只有更新了 `userName` 属性，组件才会更新。</b>
    <pre>userName: {{ userName }}, userAge: {{ userAge }}</pre>
  </details>
</template>

<script lang="ts" setup>
defineProps(["userName", "userAge"]);
</script>
