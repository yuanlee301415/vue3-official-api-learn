<template>
  <details open>
    <summary>DependencyInjectionA</summary>
    <b>inject user - 无默认值:</b>
    <pre>{{ user }}</pre>
  </details>
</template>

<script lang="ts" setup>
import { inject } from "vue";

import { USER_KEY } from "@/constant/tokens";

const user = inject(USER_KEY);
console.log("DependencyInjectionA>id:", user?.id);
console.log("DependencyInjectionA>name:", user?.name);
console.log("DependencyInjectionA>age:", user?.age);
</script>
