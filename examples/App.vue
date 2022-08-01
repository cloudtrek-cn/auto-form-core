<template>
  <div id="app">
    <nav>
      <router-link to="/">生成配置</router-link> |
      <router-link to="/about">预览表单</router-link>
      <router-link to="/about">预览表格</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style lang="scss">
nav {
  padding: 0;
}
</style>
