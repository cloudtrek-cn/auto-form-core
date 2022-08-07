<template>
  <div class="form-page">
    <!-- <div class="nav">
      <div class="nav-item">表单设计</div>
      <div class="nav-item">预览表单</div>
      <div class="nav-item">预览表格</div>
    </div> -->
    <!-- <nav>
      <router-link to="/">生成配置</router-link> |
      <router-link to="/about">预览表单</router-link>
      <router-link to="/about">预览表格</router-link>
    </nav> -->
    <auto-form></auto-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
  },
})
export default class HomeView extends Vue {}
</script>
<style scoped>
.form-page {
  width: 100vw;
  height: 100vh;
  padding: 0;
  /* background: red; */
}
</style>
