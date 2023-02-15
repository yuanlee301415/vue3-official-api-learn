<template>
  <details open>
    <summary>DependencyInjectionB</summary>
    <b>inject user - 有默认值:</b>
    <pre>{{ user }}</pre>
  </details>
</template>

<script lang="ts" setup>
import { inject } from "vue";

import { USER_KEY2 } from "@/constant/tokens";

const user = inject(
  USER_KEY2,
  () => ({
    id2: "000",
    name2: "root",
    age2: 0,
  }),
  true
);

console.log("DependencyInjectionB>id2:", user?.id2);
console.log("DependencyInjectionB>name2:", user?.name2);
console.log("DependencyInjectionB>age2:", user?.age2);
</script>
