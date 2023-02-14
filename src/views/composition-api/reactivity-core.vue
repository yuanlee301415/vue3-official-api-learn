<template>
  <h2>computed()</h2>
  <h6>
    <pre>
接受一个 getter 函数，返回一个只读的响应式 ref 对象。该 ref 通过 .value 暴露 getter 函数的返回值。
它也可以接受一个带有 get 和 set 函数的对象来创建一个可写的 ref 对象。
    </pre>
  </h6>

  <h2>reactive()</h2>
  <h6><pre>返回一个对象的响应式代理。</pre></h6>

  <h2>readonly()</h2>
  <h6>
    接受一个对象 (不论是响应式还是普通的) 或是一个 ref，返回一个原值的只读代理。
  </h6>
  <h6>
    只读代理是深层的：对任何嵌套属性的访问都将是只读的。它的 ref 解包行为与
    reactive() 相同，但解包得到的值是只读的。
  </h6>

  <h2>watchEffect()</h2>
  <h6>立即运行一个函数，同时响应式地追踪其依赖，并在依赖更改时重新执行。</h6>
  <h6>
    <pre>
默认情况下，侦听器将在组件渲染之前执行。
设置 flush: 'post' 将会使侦听器延迟到组件渲染之后再执行。
设置 flush: 'sync' 将在响应式依赖发生改变时立即触发侦听器。
  </pre
    >
  </h6>

  <h2>watchPostEffect()</h2>
  <h6>watchEffect() 使用 flush: 'post' 选项时的别名</h6>

  <h2>watchSyncEffect()</h2>
  <h6>watchEffect() 使用 flush: 'sync' 选项时的别名。</h6>

  <h2>watch()</h2>
  <h6>侦听一个或多个响应式数据源，并在数据源变化时调用所给的回调函数。</h6>
</template>

<script lang="ts" setup>
import { computed, reactive, readonly, ref, watch, watchEffect } from "vue";

/**
 * 创建一个只读的计算属性 ref
 */
console.warn("创建一个只读的计算属性 ref");
const count = ref(0);
const plusCount = computed(() => count.value + 1);
console.log("plusCount:", plusCount.value);
// warning
// plusCount.value++ // Write operation failed: computed value is readonly

/**
 * 创建一个可写的计算属性 ref
 */
console.warn("创建一个可写的计算属性 ref");
const plusTwo = computed({
  get() {
    return count.value;
  },
  set() {
    count.value += 2;
  },
});
plusTwo.value++;
console.log("plusTwo:", plusTwo.value);
console.log("count:", count.value);

/**
 * reactive()
 */
// ref 的解包
console.warn("ref 的解包");
const count2 = ref(1);
const obj2 = reactive({ count2 });
console.log("count2.value === obj2.count2:", count2.value === obj2.count2); // true

// 会更新 `obj2.count2`
count2.value++;
console.log("count2.value:", count2.value); // 2
console.log("obj2.count2:", obj2.count2); // 2

// 也会更新 `count2` ref
obj2.count2++;
console.log("obj2.count2:", obj2.count2); // 3
console.log("count2.value:", count2.value); // 3

// 当访问到某个响应式数组或 Map 这样的原生集合类型中的 ref 元素时，不会执行 ref 的解包
console.warn(
  "当访问到某个响应式数组或 Map 这样的原生集合类型中的 ref 元素时，不会执行 ref 的解包"
);
const books = reactive([ref("Vue3")]);
console.log("books[0].value:", books[0].value); // 需要 .value

const map = new Map([["count", ref(1)]]);
console.log("map.get('count').value:", map.get("count")!.value); // 需要 .value

/**
 * readonly
 */
console.warn("readonly");
const original = reactive({ count: 0 });
const copy = readonly(original);
watchEffect(() => {
  console.log("copy.count:", copy.count);
});
original.count++;
// copy.count++ // Warning

/**
 * watch()
 */
console.warn("watch()");
// 侦听一个 getter 函数
const st1 = reactive({ count: 0 });
watch(
  () => st1.count,
  (val, preVal) => {
    console.log(
      "侦听一个 getter 函数 > `st1.count` > val/preVal:",
      val,
      preVal
    );
  }
);
st1.count++;

// 侦听一个 ref
const count3 = ref(0);
watch(count3, (val, preVal) => {
  console.log("侦听一个 ref > `count3` > val/preVal:", val, preVal);
});
count3.value++;

// 当侦听多个来源时，回调函数接受两个数组，分别对应来源数组中的新值和旧值
const m1 = ref(1);
const m2 = ref(2);
watch([m1, m2], ([m1Val, m2Val], [m1PreVal, m2PreVal]) => {
  console.log("侦听多个来源:", { m1Val, m2Val, m1PreVal, m2PreVal });
});
m1.value++;
m2.value++;

// 当使用 getter 函数作为源时，回调只在此函数的返回值变化时才会触发。如果你想让回调在深层级变更时也能触发，你需要使用 { deep: true } 强制侦听器进入深层级模式。
const st2 = reactive({ count: 1 });
watch(
  () => st2,
  (val, preVal) => {
    console.log("getter 函数作为源 > st2:", {
      val: val.count,
      preVal: preVal.count,
    });
  },
  { deep: true }
);
st2.count++;

// 当直接侦听一个响应式对象时，侦听器会自动启用深层模式
watch(st2, (val, preVal) => {
  console.log("直接侦听一个响应式对象 > st2:", {
    val: val.count,
    preVal: preVal.count,
  });
});
st2.count++;
</script>
