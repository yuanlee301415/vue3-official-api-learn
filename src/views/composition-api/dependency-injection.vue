<template>
  <h2>provide()</h2>
  <h6>提供一个值，可以被后代组件注入。</h6>
  <DependencyInjectionA />
  <DependencyInjectionB />
</template>

<script lang="ts" setup>
import { provide } from "vue";

import DependencyInjectionA from "@/components/DependencyInjection/A.vue";
import DependencyInjectionB from "@/components/DependencyInjection/B.vue";

import { USER_KEY } from "@/constant/tokens";

provide(USER_KEY, {
  id: "001",
  name: "Admin",
  age: 0,
});
</script>
