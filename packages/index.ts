/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "./button/index";
import Form from "./Form/index";
import Table from "./Table/index";

// 全局注册组件
const install = (Vue: any) => {
    Vue.component(Button.name, Button);
    Vue.component(Form.name, Form);
    Vue.component(Table.name, Form);
};

export default {
    install,
};
