/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "./button/index";
import Form from "./Form/index";

// 全局注册组件
const install = (Vue: any) => {
  Vue.component(Button.name, Button);
  Vue.component(Form.name, Form);
};

export default {
  install,
};
