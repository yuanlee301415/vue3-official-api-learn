<template>
  <ul class="tree">
    <li v-for="(item, idx) of treeData" :key="idx">
      <template v-if="item.children && item.children.length">
        <div @click="handleToggleVisible(item)">
          <b>{{ item.name }}</b>
          <b v-if="item.children && item.children.length" class="toggle"
            >[{{ item.__visible ? "-" : "+" }}]</b
          >
        </div>
        <Tree
          v-model="item.children"
          :style="{ display: item.__visible ? 'block' : 'none' }"
        />
      </template>
      <div v-else>{{ item.name }}</div>
    </li>
    <li @click="handleAdd(treeData)">
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
import { computed } from "vue";
import { TreeItem } from "@/components/Tree";

const props = defineProps<{
  modelValue: TreeData;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: TreeData): void;
}>();

const treeData = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    console.log("set>treeData:", val);
    emit("update:modelValue", val);
  },
});

function handleAdd(tree: TreeData) {
  tree.push(
    new TreeItem({ name: "New item - " + ((Math.random() * 10000) | 0) })
  );
  treeData.value = [...treeData.value];
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
