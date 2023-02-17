<template>
  <Tree v-model="treeData" />
</template>

<script lang="ts" setup>
import type { TreeData } from "@/components/Tree";
import { reactive, watch } from "vue";
import Tree from "@/components/Tree";

const treeData: TreeData = reactive([
  {
    name: "Root",
    children: [
      { name: "一级节点-1" },
      { name: "一级节点-2" },
      {
        name: "一级节点-3",
        children: [
          {
            name: "二级节点-1",
            children: [{ name: "三级节点-1" }, { name: "三级节点-2" }],
          },
          { name: "二级节点-2" },
          { name: "二级节点-3" },
          {
            name: "二级节点-4",
            children: [{ name: "三级节点-3" }, { name: "三级节点-4" }],
          },
        ],
      },
    ],
  },
]);

watch(treeData, () => console.log("watch>treeData", treeData));
</script>
