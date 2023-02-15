<template>
  <details open>
    <summary>ExposeA</summary>
    ExposeA -- {{ refVal }}
  </details>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const normalVal = 123;
const refVal = ref("abc");

function updateRefVal(val: string) {
  refVal.value = val;
}

defineExpose({
  normalVal,
  refVal,
  updateRefVal,
});
</script>
