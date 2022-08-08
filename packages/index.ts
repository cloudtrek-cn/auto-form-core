/* eslint-disable @typescript-eslint/no-explicit-any */
import Form from "./Form/index";
import Table from "./Table/index";

// 全局注册组件
const install = (Vue: any) => {
    // console.log(Form);
    Vue.component(Form.name, Form);
    Vue.component(Table.name, Table);
};

export default {
    install,
};
