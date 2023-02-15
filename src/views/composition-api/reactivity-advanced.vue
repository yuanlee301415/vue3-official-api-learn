<template>
  <h2>shallowRef()</h2>
  <h6>ref() 的浅层作用形式。</h6>
  <h6>
    <pre>
和 ref() 不同，浅层 ref 的内部值将会原样存储和暴露，并且不会被深层递归地转为响应式。只有对 .value 的访问是响应式的。
shallowRef() 常常用于对大型数据结构的性能优化或是与外部的状态管理系统集成。
</pre
    >
  </h6>

  <h2>triggerRef()</h2>
  <h6>
    强制触发依赖于一个浅层 ref
    的副作用，这通常在对浅引用的内部值进行深度变更后使用。
  </h6>

  <h2>customRef()</h2>
  <h6>创建一个自定义的 ref，显式声明对其依赖追踪和更新触发的控制方式</h6>
  <input type="text" v-model="txt" />
  <pre>txt: {{ txt }}</pre>

  <h2>shallowReactive()</h2>
  <h6>reactive() 的浅层作用形式。</h6>

  <h2>shallowReadonly()</h2>
  <h6>readonly() 的浅层作用形式</h6>

  <h2>toRaw()</h2>
  <h6>根据一个 Vue 创建的代理返回其原始对象。</h6>

  <h2>markRaw()</h2>
  <h6>将一个对象标记为不可被转为代理。返回该对象本身。</h6>
  <pre>fooRaw: {{ fooRaw }}</pre>
</template>

<script lang="ts" setup>
import {
  reactive,
  shallowRef,
  watchEffect,
  triggerRef,
  customRef,
  shallowReactive,
  shallowReadonly,
  toRaw,
  markRaw,
} from "vue";

/**
 * shallowRef()
 */
const st1 = shallowRef({ count: 0 });
watchEffect(() => {
  console.log("st1:", st1.value);
});
st1.value.count = 1; // !! 不触发 `watchEffect` 回调
st1.value = { count: 2 }; // ！！触发 `watchEffect` 回调

/**
 * triggerRef()
 */
const st2 = shallowRef({ count: 0 });
watchEffect(() => {
  console.log("st2:", st2.value);
});
st2.value.count = 1; // 不触发 `watchEffect` 回调
st2.value.count = 2;
triggerRef(st2); // 触发 `watchEffect` 回调

/**
 * customRef()
 */
// 创建一个防抖 ref，即只在最近一次 set 调用后的一段固定间隔后再调用
function useDebouncedRef(value: any, delay = 1000) {
  let timeout: number;
  return customRef((track, trigger) => {
    return {
      get() {
        track();
        return value;
      },

      set(newVal) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          value = newVal;
          trigger();
        }, delay);
      },
    };
  });
}
const txt = useDebouncedRef("");

/**
 * shallowReactive
 */
const st3 = shallowReactive({ foo: 0, nested: { bar: 0 } });
watchEffect(() => {
  console.log("st3.foo:", st3.foo);
});
st3.nested.bar = 1;
st3.foo = 1;

/**
 * shallowReadonly()
 */
const st4 = shallowReadonly({ foo: 0, nested: { bar: 0 } });
watchEffect(() => {
  console.log("st4:", st4);
});
// st4.count++ // 更新失败
st4.nested.bar++; // 更新成功

/**
 * toRaw()
 */
const raw = { count: 0 };
const st5 = reactive(raw);
console.log("st5 === raw:", st5 === raw); // false
console.log("toRaw(st5) === raw:", toRaw(st5) === raw); // true

/**
 * markRaw()
 */
const fooRaw = markRaw({ foo: 0, nested: { bar: 0 } });
watchEffect(() => {
  console.log("fooRaw:", JSON.stringify(fooRaw));
});
setTimeout(() => {
  fooRaw.foo = 1;
  setTimeout(() => {
    fooRaw.nested.bar = 2;
    setTimeout(() => {
      fooRaw.nested = { bar: 3 };
    });
  });
});
</script>
