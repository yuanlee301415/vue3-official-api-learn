<template>
  <h2>onMounted()</h2>
  <h6>注册一个回调函数，在组件挂载完成后执行。</h6>
  <LifecycleA id="liA" />

  <h2>onUpdated()</h2>
  <h6>注册一个回调函数，在组件因为响应式状态变更而更新其 DOM 树之后调用。</h6>
  <pre id="st1">st1: {{ st1 }}</pre>

  <h2>onUnmounted()</h2>
  <h6>注册一个回调函数，在组件实例被卸载之后调用。</h6>

  <h2>onBeforeMount()</h2>
  <h6>注册一个钩子，在组件被挂载之前被调用。</h6>

  <h2>onBeforeUpdate()</h2>
  <h6>注册一个钩子，在组件即将因为响应式状态变更而更新其 DOM 树之前调用。</h6>

  <h2>onBeforeUnmount()</h2>
  <h6>注册一个钩子，在组件实例被卸载之前调用。</h6>

  <h2>onErrorCaptured()</h2>
  <h6>注册一个钩子，在捕获了后代组件传递的错误时调用。</h6>
  <!--  <LifecycleB/>-->

  <h2>onRenderTracked() <sup>Dev only</sup></h2>
  <h6>注册一个调试钩子，当组件渲染过程中追踪到响应式依赖时调用。</h6>

  <h2>onRenderTriggered() <sup>Dev only</sup></h2>
  <h6>注册一个调试钩子，当响应式依赖的变更触发了组件渲染时调用。</h6>
</template>

<script lang="ts" setup>
import {
  ref,
  onMounted,
  onUpdated,
  onUnmounted,
  onBeforeMount,
  onBeforeUpdate,
  onBeforeUnmount,
  onErrorCaptured,
  onRenderTracked,
  onRenderTriggered,
} from "vue";
import LifecycleA from "@/components/Lifecycle/A.vue";

/**
 * onMounted()
 */
onMounted(() => {
  console.log("onMounted:", document.getElementById("liA"));
});

/**
 * onUpdated()
 */
const st1 = ref(0);
onUpdated(() => {
  console.log(
    "onUpdated>st1.textContent:",
    document.getElementById("st1")!.textContent
  );
});

setTimeout(() => {
  st1.value = 1;
  setTimeout(() => {
    st1.value = 2;
    setTimeout(() => {
      st1.value = 3;
    });
  });
});

/**
 * onUnmounted()
 */
onUnmounted(() => {
  console.log("unmounted at:", new Date());
});

/**
 * onBeforeMount()
 */
onBeforeMount(() => {
  console.log("beforeUnmount at:", new Date());
});

/**
 * onBeforeUpdate()
 */
onBeforeUpdate(() => {
  console.log("beforeUpdate at:", new Date());
});

/**
 * onBeforeUnmount()
 */
onBeforeUnmount(() => {
  console.log("beforeUnmount at:", new Date());
});

/**
 * onErrorCaptured
 */
onErrorCaptured(function () {
  console.log("onErrorCaptured>args:", arguments);
});

/**
 * onRenderTracked
 */
onRenderTracked((event) => {
  console.log("onRenderTracked>event:", event);
});

/**
 * onRenderTriggered
 */
onRenderTriggered((event) => {
  console.log("onRenderTriggered>event:", event);
});
</script>
