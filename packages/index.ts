/* eslint-disable @typescript-eslint/no-explicit-any */
import Form from "./Form/index";
import Table from "./Table/index";
import Construct from "./Construct/index";
const components = [Construct, Form, Table];

// 全局注册组件
const install = (Vue: any) => {
    components.map((component) => {
        Vue.component(`ct${component.name}`, component);
    });
};

export default {
    version: "0.4.24",
    install,
    Form,
    Construct,
    Table
};
