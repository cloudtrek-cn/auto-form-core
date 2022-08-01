/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "./button/index";

// 全局注册组件
const install = (Vue: any) => {
  Vue.component(Button.name, Button);
};

export default {
  install,
};
