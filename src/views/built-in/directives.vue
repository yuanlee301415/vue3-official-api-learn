<template>
  <h2>v-text</h2>
  <h6>更新元素的文本内容。</h6>
  <div v-text="text"></div>

  <h2>v-pre</h2>
  <h6>跳过该元素及其所有子元素的编译。</h6>
  <div v-pre>count: {{ count }}</div>
  <div>count: {{ count }}</div>

  <h2>v-once</h2>
  <h6>仅渲染元素和组件一次，并跳过之后的更新。</h6>
  <pre v-once>count: {{ count2 }}</pre>

  <h2>v-memo</h2>
  <h6>
    缓存一个模板的子树。在元素和组件上都可以使用。为了实现缓存，该指令需要传入一个固定长度的依赖值数组进行比较。如果数组里的每个值都与最后一次的渲染相同，那么整个子树的更新将被跳过。
  </h6>

  userName: <input type="text" v-model="userName" /><br />
  userAge: <input type="number" v-model="userAge" /><br />
  <User v-memo="[userName]" :user-name="userName" :user-age="userAge" />

  <h4>与 v-for 一起使用</h4>
  选择列表项 ID：<select v-model="selected">
    <option v-for="id of items.map((_) => _.id)" :value="id" :key="id">
      {{ id }}
    </option>
  </select>
  <h6>只有列表项的选中状态发生变化时，才会更新该列表项。</h6>
  <ul>
    <li
      v-for="item of items"
      v-memo="[item.id === selected]"
      :key="item.id"
      :style="{ color: selected === item.id ? 'red' : 'unset' }"
    >
      {{ item }} - Test: {{ Math.random() }}
    </li>
  </ul>

  <h2>v-cloak</h2>
  <h6>用于隐藏尚未完成编译的 DOM 模板。</h6>
  <h6>该指令只在没有构建步骤的环境下需要使用。</h6>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import User from "@/components/User.vue";

/**
 * v-text
 */
const text = ref("<a>Vue3</a>");

/**
 * v-pre
 */
const count = ref(0);

/**
 * v-once
 */
const count2 = ref(0);
setTimeout(() => {
  count2.value = 1;
});

/**
 * v-memo
 */
const userName = ref("Tom");
const userAge = ref(20);

// 与 v-for 一起使用
const items = reactive(
  new Array(10).fill({}).map((_, idx) => ({
    id: idx,
    title: `Item-${idx}`,
    text: `Content-${idx}`,
  }))
);
const selected = ref();
</script>
