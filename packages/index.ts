/* eslint-disable @typescript-eslint/no-explicit-any */
import Form from "./Form/index";
import Table from "./Table/index";

const components = [Form, Table];

// 全局注册组件
const install = (Vue: any) => {
    components.map((component) => {
        Vue.component(component.name, component);
    });
};

export default {
    install,
    Form,
};
