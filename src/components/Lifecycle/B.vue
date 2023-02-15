<template>
  <details open>
    <summary>LifecycleB</summary>
    <LifecycleC />
  </details>
</template>

<script lang="ts" setup>
import { onErrorCaptured } from "vue";
import LifecycleC from "@/components/Lifecycle/C.vue";

onErrorCaptured(function () {
  console.log();
});
</script>
