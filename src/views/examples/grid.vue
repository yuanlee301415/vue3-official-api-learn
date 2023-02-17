<template>
  <p>Search: <input type="text" v-model="filterKey" /></p>

  <FilterGrid
    :columns="GRID_COLUMNS"
    :data="GRID_DATA"
    :filter-key="filterKey"
  />
</template>

<script lang="ts" setup>
import { ref } from "vue";

import FilterGrid from "@/components/FilterGrid/index.vue";

const GRID_COLUMNS = [
  { field: "date", title: "日期", sort: true },
  { field: "name", title: "姓名", sort: true },
  { field: "address", title: "地址" },
];
const GRID_DATA = [
  {
    date: "2016-05-02",
    name: "张三",
    address: "上海市普陀区金沙江路 1518 弄",
  },
  {
    date: "2016-05-04",
    name: "李四",
    address: "上海市普陀区金沙江路 1517 弄",
  },
  {
    date: "2016-05-01",
    name: "王五",
    address: "上海市普陀区金沙江路 1519 弄",
  },
  {
    date: "2016-05-03",
    name: "赵六",
    address: "上海市普陀区金沙江路 1516 弄",
  },
];

const filterKey = ref("");
</script>
