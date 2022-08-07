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
    <auto-form
      :components-list="componentsList"
      :components-library="componentsLibrary"
    ></auto-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import * as element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

@Component({
  components: {
    HelloWorld,
  },
})
export default class HomeView extends Vue {
  public componentsLibrary = {
    ...element,
  };
  public componentsList = [
    {
      title: "基础字段",
      list: [
        {
          icon: "",
          title: "店号/门店",
          source: "internal",
          name: "店号/门店",
          components: "Input",
          defaultProps: {
            clearable: true,
          },
          props: {
            placeholder: {
              name: "提示文字",
              value: "请输入",
            },
            value: {
              name: "默认内容",
              value: "",
            },
            disabled: {
              name: "是否禁用",
              value: false,
            },
          },
        },
        {
          icon: "",
          title: "文本",
          name: "text",
          source: "internal",
          components: "Input",
          defaultProps: {
            clearable: true,
          },
          props: {
            placeholder: {
              name: "提示文字",
              value: "请输入",
            },
            value: {
              name: "默认内容",
              value: "",
            },
            disabled: {
              name: "是否禁用",
              value: false,
            },
          },
        },
        {
          icon: "",
          title: "数字",
          name: "number",
          source: "internal",
          components: "Input",
        },
        {
          icon: "",
          title: "日期",
          name: "date",
          source: "internal",
          components: "Input",
        },
        {
          icon: "",
          title: "活动",
          name: "活动",
          source: "internal",
          components: "Input",
        },
      ],
    },
  ];
  created() {
    // console.log(element);
  }
}
</script>
<style scoped>
.form-page {
  width: 100vw;
  height: 100vh;
  padding: 0;
  /* background: red; */
}
</style>
