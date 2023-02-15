<template>
  <h2>基本语法</h2>
  <h6>
    里面的代码会被编译成组件 setup() 函数的内容。这意味着与普通的 &lt;script&gt;
    只在组件被首次引入的时候执行一次不同，&lt;script setup&gt;
    中的代码会在每次组件实例被创建的时候执行。
  </h6>

  切换显示(`v-if`) NoSetup 组件：
  <input type="checkbox" v-model="visibleA" /><br />
  <NoSetup v-if="visibleA" />

  <hr />

  <button @click="handleNoSetupKey">更新 NoSetup Key</button><br />
  <NoSetup :key="noSetupKey" />

  <hr />

  切换显示(`v-if`) HasSetup 组件：
  <input type="checkbox" v-model="visibleB" /><br />
  <HasSetup v-if="visibleB" />

  <hr />

  <button @click="handleHasSetupKey">更新 HasSetup Key</button><br />
  <HasSetup :key="hasSetupKey" />

  <h2>顶层的绑定会被暴露给模板</h2>
  <h6>
    当使用 &lt;script setup&gt; 的时候，任何在 &lt;script setup&gt;
    声明的顶层的绑定 (包括变量，函数声明，以及 import 导入的内容)
    都能在模板中直接使用
  </h6>

  <h4>顶层声明的变量</h4>
  <table width="100%" border="1" cellspacing="0" cellpadding="0">
    <tr>
      <th v-for="field of COLUMNS" :key="field.name">
        {{ field.title }} <a v-if="field.sort">SORT</a>
      </th>
    </tr>
  </table>

  <h4>顶层声明的函数</h4>
  <button @click="handlePrintTime">Print time</button>

  <h4>顶层导入的内容</h4>
  <pre>常量 》 USER_KEY: {{ USER_KEY }}</pre>
  <pre>函数 》 capitalize: {{ capitalize(COLUMNS[0].name) }}</pre>

  <h2>动态组件</h2>
  <h6>
    由于组件是通过变量引用而不是基于字符串组件名注册的，在 &lt;script setup&gt;
    中要使用动态组件的时候，应该使用动态的 :is 来绑定
  </h6>
  <component :is="EmptyA" />
  <component :is="Math.random() < 0.5 ? EmptyA : EmptyB" />

  <h2>defineProps() 和 defineEmits()</h2>
  <h6>
    传入到 defineProps 和 defineEmits 的选项会从 setup
    中提升到模块的作用域。因此，传入的选项不能引用在 setup
    作用域中声明的局部变量。这样做会引起编译错误。但是，它可以引用导入的绑定，因为它们也在模块作用域内。
  </h6>

  <h2>defineExpose()</h2>
  <h6>
    使用 &lt;script setup&gt; 的组件是默认关闭的——即通过模板引用或者 $parent
    链获取到的组件的公开实例，不会暴露任何在 &lt;script setup&gt; 中声明的绑定。
    可以通过 defineExpose 编译器宏来显式指定在 &lt;script setup&gt;
    组件中要暴露出去的属性
  </h6>
  <button @click="handleCallChildMethod">调用子组件暴露的方法</button>
  <ExposeA ref="exposeA" />

  <h2>useSlots() 和 useAttrs()</h2>
  <pre>slots: {{ slots }}</pre>
  <pre>attrs: {{ attrs }}</pre>
  <slot name="footer" />

  <h2>与普通的 &lt;script&gt; 一起使用</h2>
  <h6>
    <pre>
&lt;script setup&gt; 可以和普通的 &lt;script&gt; 一起使用。普通的 &lt;script&gt; 在有这些需要的情况下或许会被使用到：
  声明无法在 &lt;script setup&gt; 中声明的选项，例如 inheritAttrs 或插件的自定义选项。
  声明模块的具名导出 (named exports)。
  运行只需要在模块作用域执行一次的副作用，或是创建单例对象。
  </pre
    >
  </h6>
  <NormalScriptA />
  <NormalScriptB />

  <h2>顶层 await</h2>
  <h6>
    <pre>
注意
async setup() 必须与 Suspense 内置组件组合使用，Suspense 目前还是处于实验阶段的特性，会在将来的版本中稳定。
  </pre
    >
  </h6>
</template>

<script lang="ts" setup>
import { onMounted, ref, useAttrs, useSlots } from "vue";

import { USER_KEY } from "@/constant/tokens";
import { capitalize } from "@/helpers";

import NoSetup from "@/components/ScriptSetup/NoSetup.vue";
import HasSetup from "@/components/ScriptSetup/HasSetup.vue";
import EmptyA from "@/components/EmptyA.vue";
import EmptyB from "@/components/EmptyB.vue";
import ExposeA from "@/components/Expose/A.vue";

import NormalScriptA from "@/components/ScriptSetup/NormalScriptA.vue";
import NormalScriptB from "@/components/ScriptSetup/NormalScriptB.vue";

/**
 * 基本语法
 */
const visibleA = ref(true);
const visibleB = ref(true);

const noSetupKey = ref(0);
function handleNoSetupKey() {
  noSetupKey.value = Math.random();
}

const hasSetupKey = ref(0);
function handleHasSetupKey() {
  hasSetupKey.value = Math.random();
}

/**
 * 顶层的绑定会被暴露给模板
 */
const COLUMNS = [
  { name: "id", title: "ID" },
  { name: "name", title: "用户名称", sort: true },
  { name: "age", title: "年龄", sort: true },
];
function handlePrintTime() {
  console.log(new Date());
}

/**
 * defineProps() 和 defineEmits()
 */
/*
function validate(form: any) {
  console.log(form)
}
*/
defineEmits({
  // submit: validate // Error: cannot reference locally declared variables because it will be hoisted outside of the setup() function
});

/**
 * defineExpose()
 */
defineExpose({
  visibleA,
  visibleB,
  COLUMNS,
  handlePrintTime,
});

const exposeA = ref<InstanceType<typeof ExposeA> | null>(null);

function handleCallChildMethod() {
  // 调用子组件暴露的方法
  exposeA.value?.updateRefVal(new Date().toISOString());
}

onMounted(() => {
  // 获取子组件暴露的属性
  console.warn("获取子组件暴露的属性");
  // console.log('exposeA.xx:', exposeA.value!.xx) // 构建时类型错误
  console.log("exposeA.normalVal:", exposeA.value!.normalVal);
  console.log("exposeA.refVal:", exposeA.value!.refVal);

  // 子组件的 $parent
  console.log("子组件的 $parent:", exposeA.value!.$parent);
});

/**
 * useSlots() 和 useAttrs()
 */
console.warn("useSlots() 和 useAttrs()");
const slots = useSlots();
const attrs = useAttrs();
console.log("slots:", slots);
console.log("attrs:", attrs);

// const data = await new Promise(resolve => setTimeout(() => resolve({code: 0,data: 'success'})) )
</script>
