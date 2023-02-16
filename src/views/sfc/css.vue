<template>
  <h2>组件作用域 CSS</h2>
  <b
    ><i
      >CSSScopedA style - 普通 scoped 样式 > 红色，不影响下方的子组件(`color:
      #c00`)。</i
    ></b
  >
  <CSSScopedA />

  <h4>深度选择器</h4>
  <b
    >处于 scoped
    样式中的选择器如果想要做更“深度”的选择，也即：影响到子组件(`color:
    #0c0`)，可以使用 :deep() 这个伪类</b
  >
  <div class="boxA"><CSSScopedA /></div>

  <h4>插槽选择器</h4>
  <h6>
    默认情况下，作用域样式不会影响到 &lt;slot/&gt;
    渲染出来的内容，因为它们被认为是父组件所持有并传递进来的。使用 :slotted
    伪类以明确地将插槽内容作为选择器的目标
  </h6>
  <pre></pre>
  <CSSScopedB>
    <i>CSSScopedB slot content.</i>
  </CSSScopedB>

  <h4>全局选择器</h4>
  <h6>
    如果想让其中一个样式规则应用到全局，比起另外创建一个 &lt;style&gt;，可以使用
    :global 伪类来实现
  </h6>
  <GlobalA />

  <h2>CSS Modules</h2>
  <h6>
    一个 &lt;style module&gt; 标签会被编译为 CSS Modules 并且将生成的 CSS class
    作为 $style 对象暴露给组件
  </h6>
  <div :class="$style.red">red</div>
  <div :class="$style.green">green</div>

  <h4>自定义注入名称</h4>
  <h6>你可以通过给 module attribute 一个值来自定义注入 class 对象的属性名</h6>
  <div :class="$boldColor.red">red</div>
  <div :class="$boldColor.green">green</div>

  <h4>与组合式 API 一同使用</h4>
  <h6>
    可以通过 useCssModule API 在 setup() 和 &lt;script setup&gt; 中访问注入的
    class
  </h6>
  <div :class="cssDefaultModule.red">red</div>
  <div :class="cssDefaultModule.green">green</div>
  <div :class="cssNamedModule.red">red</div>
  <div :class="cssNamedModule.green">green</div>

  <h4>CSS 中的 v-bind()</h4>
  <h6>
    单文件组件的 &lt;style&gt; 标签支持使用 v-bind CSS 函数将 CSS
    的值链接到动态的组件状态
  </h6>
  <select v-model="theme.color">
    <option value="red">Red</option>
    <option value="green">Green</option>
    <option value="blue">Blue</option>
  </select>
  <div id="themeBox">主题颜色</div>
</template>

<script lang="ts" setup>
import { reactive, useCssModule } from "vue";

import CSSScopedA from "@/components/CSSScoped/A.vue";
import CSSScopedB from "@/components/CSSScoped/B.vue";
import GlobalA from "@/components/Global/A.vue";

/**
 * CSS Modules
 */
// 与组合式 API 一同使用
const cssDefaultModule = useCssModule();
const cssNamedModule = useCssModule("$boldColor");

/**
 * CSS 中的 v-bind()
 */
// const themeColor = ref('red')
const theme = reactive({
  color: "red",
});
</script>

<style scoped>
i {
  color: #c00;
}

.boxA :deep(i) {
  color: #0c0;
}

:global(.global-a-content) {
  color: #cc0;
}

#themeBox {
  color: v-bind("theme.color");
}
</style>

<style module>
.red {
  color: red;
}
.green {
  color: green;
}
</style>

<style module="$boldColor">
.red {
  font-weight: bold;
  color: red;
}
.green {
  font-weight: bold;
  color: green;
}
</style>
