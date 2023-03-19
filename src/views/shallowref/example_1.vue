<template>
  <b>用户列表：</b>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>UserName</th>
        <th>Age</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user of users">
        <td>{{ user.id }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.age }}</td>
      </tr>
    </tbody>
  </table>
  <button :disabled="page <= 1" @click="getUsers(page--)">上一页</button>
  <button :disabled="page >= 2" @click="getUsers(page++)">下一页</button>
</template>

<script lang="ts" setup>
import { ref, shallowRef, watchEffect } from "vue";

const page = ref(1);
const users = shallowRef([]);

async function getUsers(page: number) {
  users.value = await (
    await fetch(`/mock-data/users/page-${page}.json`)
  ).json();
}

watchEffect(() => {
  getUsers(page.value);
});
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid #ccc;
  padding: 0 5px;
  line-height: 30px;
}
</style>
