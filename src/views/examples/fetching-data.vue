<template>
  <h1>Latest Vue Core Commits</h1>

  <span v-for="_ of branches" :key="_" style="margin-right: 1rem">
    <input v-model="currentBranch" :value="_" :id="_" type="radio" name="br" />
    <label :for="_">{{ _ }}</label>
  </span>

  <div>vuejs/vue@{{ currentBranch }}</div>

  <ol>
    <li
      v-for="{
        sha,
        html_url,
        commit: {
          author: { name: authorName, date },
          message,
        },
        author: { html_url: authorHtmlUrl },
      } of commits"
      :key="sha"
    >
      <p>
        <a :href="html_url" target="_blank">{{ sha.slice(-8) }}</a> -
        {{ truncate(message) }}
      </p>
      <p>
        By
        <a :href="authorHtmlUrl" target="_blank"
          ><b>{{ authorName }}</b></a
        >
        at <b>{{ formatDate(date) }}</b>
      </p>
    </li>
  </ol>
</template>

<script lang="ts" setup>
import { reactive, ref, watchEffect } from "vue";

const API_URL = `./mock-data/`;
const branches = ["main", "v2-compat"];
const currentBranch = ref(branches[1]);
const commits = ref();

watchEffect(async () => {
  const res = await (
    await fetch(`${API_URL}${currentBranch.value}-data.json`)
  ).json();
  console.log(res);
  commits.value = res;
});

function formatDate(v?: string) {
  return v?.replace(/T|Z/g, " ");
}

function truncate(v?: string) {
  if (!v) return v;
  const idx = v.indexOf("\n");
  return idx > 0 ? v.slice(0, idx) : v;
}
</script>

<style scoped>
li {
  margin: 1em;
}
a {
  color: #5a5;
}
</style>
