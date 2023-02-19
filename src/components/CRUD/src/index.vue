<template>
  <div class="crud">
    <div>Filter: <input type="text" v-model="keyword" /></div>
    <select size="10" v-model="selected" style="width: 100%">
      <option v-for="(name, idx) of filteredNames" :key="idx" :value="name">
        {{ name }}
      </option>
    </select>
    <div>FirstName: <input type="text" v-model="firstName" /></div>
    <div>lastName: <input type="text" v-model="lastName" /></div>
    <div>
      <button @click="createName">Create</button>
      <button @click="updateName">Update</button>
      <button @click="deleteName">Delete</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue";

const SPLIT = ", ";
const keyword = ref("");
const names = reactive(["Emil, Hans", "Mustermann, Max", "Tisch, Roman"]);
const selected = ref("");
const firstName = ref("");
const lastName = ref("");

const filteredNames = computed(() => {
  return names.filter((_) =>
    _.toLowerCase().includes(keyword.value.trim().toLowerCase())
  );
});

watch(selected, (val) => {
  [lastName.value, firstName.value] = val.split(SPLIT);
});

function hasValidInput() {
  if (!firstName.value.trim()) {
    return "FirstName";
  }
  if (!lastName.value.trim()) {
    return "LastName";
  }
  return true;
}

function createName() {
  if (!selected.value) return;

  const valid = hasValidInput();
  if (valid !== true) {
    console.warn(`createName》${valid} 不为能空`);
    return;
  }

  const fullNameStr = [lastName.value.trim(), firstName.value.trim()].join(
    SPLIT
  );
  if (names.includes(fullNameStr)) {
    console.warn("createName》已存在：", fullNameStr);
    return;
  }

  names.push(fullNameStr);
  selected.value = "";
}

function updateName() {
  if (!selected.value) return;

  const valid = hasValidInput();
  if (valid !== true) {
    console.warn(`updateName》${valid} 不为能空`);
    return;
  }

  const idx = names.findIndex((_) => _ === selected.value);
  const fullNameStr = [lastName.value.trim(), firstName.value.trim()].join(
    SPLIT
  );
  names.splice(idx, 1, fullNameStr);
  selected.value = fullNameStr;
}

function deleteName() {
  if (!selected.value) return;
  const idx = names.findIndex((_) => _ === selected.value);
  names.splice(idx, 1);
}
</script>

<style scoped></style>
