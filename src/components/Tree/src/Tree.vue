<template>
  <ul class="tree">
    <li v-for="(item, idx) of modelValue" :key="idx">
      <template v-if="item.children && item.children.length">
        <div @click="handleToggleVisible(item)">
          <b>{{ item.name }}</b>
          <b v-if="item.children && item.children.length" class="toggle"
            >[{{ item.__visible ? "-" : "+" }}]</b
          >
        </div>
        <Tree
          :modelValue="item.children"
          :style="{ display: item.__visible ? 'block' : 'none' }"
        />
      </template>
      <div v-else>{{ item.name }}</div>
    </li>
    <li @click="handleAdd(modelValue)">
      <div class="add">+</div>
    </li>
  </ul>
</template>

<script lang="ts">
export default {
  name: "Tree",
};
</script>
<script setup lang="ts">
import type { TreeData } from "@/components/Tree";
import { TreeItem } from "@/components/Tree";

defineProps<{
  modelValue: TreeData;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: TreeData): void;
}>();

function handleAdd(model: TreeData) {
  model.push(
    new TreeItem({ name: "New item - " + ((Math.random() * 10000) | 0) })
  );
  emit("update:modelValue", model);
}

function handleToggleVisible(item: TreeItem) {
  if (!item.children || !item.children.length) return;

  item.__visible = !item.__visible;
}
</script>

<style scoped lang="less">
.tree {
  margin-left: 2em;

  li {
    cursor: pointer;

    .toggle {
      padding-left: 0.5em;
      font-weight: bold;
      cursor: pointer;
    }

    .add {
      font-weight: bold;
    }
  }
}
</style>
