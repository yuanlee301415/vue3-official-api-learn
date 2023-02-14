<template>
  <h2>isRef()</h2>
  <h6>检查某个值是否为 ref</h6>
  <h6>
    请注意，返回值是一个类型判定 (type predicate)，这意味着 isRef
    可以被用作类型守卫
  </h6>

  <h2>unref()</h2>
  <h6>如果参数是 ref，则返回内部值，否则返回参数本身</h6>

  <h2>toRef()</h2>
  <h6>
    基于响应式对象上的一个属性，创建一个对应的 ref。这样创建的 ref
    与其源属性保持同步：改变源属性的值将更新 ref 的值，反之亦然。
  </h6>

  <h2>toRefs()</h2>
  <h6>
    将一个响应式对象转换为一个普通对象，这个普通对象的每个属性都是指向源对象相应属性的
    ref。每个单独的 ref 都是使用 toRef() 创建的。
  </h6>
  <pre>Mouse position at: [{{ x }}, {{ y }}]</pre>

  <h2>isProxy()</h2>
  <h6>
    检查一个对象是否是由 reactive()、readonly()、shallowReactive() 或
    shallowReadonly() 创建的代理。
  </h6>

  <h2>isReactive()</h2>
  <h6>检查一个对象是否是由 reactive() 或 shallowReactive() 创建的代理。</h6>

  <h2>sReadonly()</h2>
  <h6>
    检查传入的值是否为只读对象。只读对象的属性可以更改，但他们不能通过传入的对象直接赋值。
  </h6>
</template>

<script lang="ts" setup>
import {
  isRef,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  toRef,
  toRefs,
  unref,
} from "vue";

/**
 * isRef()
 */
console.warn("isRef()");
let a: unknown;
// console.log(a.value) // 类型错误
if (isRef(a)) {
  // a 的类型被收窄为了 Ref<unknown>
  console.log(a.value);
}

const a2 = reactive({ id: 1 });
console.log("isRef(a2):", isRef(a2));

/**
 * unref()
 */
console.warn("unref()");
const b = ref("b");
const b2 = "b2";
console.log("unref > b:", unref(b));
console.log("unref > b2:", unref(b2));

/**
 * toRef()
 */
console.warn("toRef()");
const st1 = reactive({
  foo: 1,
  bar: 2,
});
const fooRef = toRef(st1, "foo");
// 更改该 ref 会更新源属性
fooRef.value++;
console.log("st1.foo:", st1.foo);

// 更改源属性也会更新该 ref
st1.foo++;
console.log("fooRef.value:", fooRef.value);

// toRef 复杂结构数据
const st2 = reactive({
  frs: [{ name: "Tom" }],
});
const frs0Ref = toRef(st2, "frs");
st2.frs[0].name = "Tom2";
console.log("frs0Ref[0].name:", frs0Ref.value[0].name); // Tom2

/**
 * toRefs()
 */
console.warn("toRefs()");
const st3 = reactive({
  foo: 1,
  bar: 2,
});
const st3Refs = toRefs(st3);
st3Refs.foo.value++;
console.log("st3.foo:", st3.foo);

st3.foo++;
console.log("st3Refs.foo.value:", st3Refs.foo.value);

// 当从组合式函数中返回响应式对象时，toRefs 相当有用。使用它，消费者组件可以解构/展开返回的对象而不会失去响应性
function useMouse() {
  const mouse = reactive({
    x: 0,
    y: 0,
  });

  function update(e: MouseEvent) {
    mouse.x = e.pageX;
    mouse.y = e.pageY;
  }
  onMounted(() => {
    window.addEventListener("mousemove", update);
  });
  onUnmounted(() => {
    window.removeEventListener("mousemove", update);
  });
  return toRefs(mouse);
}
const { x, y } = useMouse();
</script>
