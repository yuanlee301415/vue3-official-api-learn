<template>
  <details open>
    <summary>CSSScopedB</summary>
    <h6><i>CSSScopedB > slot</i></h6>
    <p>
      <slot name="header"><i>子组件 header slot 缺省内容</i></slot>
    </p>
    <p><slot /></p>
  </details>
</template>

<style scoped>
:slotted(i) {
  color: #00c !important;
}
</style>
