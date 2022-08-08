import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const AutoForm = require("../lib/index.umd.min.js");
// import AutoForm from "../lib/index.umd.min.js";
// import "../lib/index.css";

import AutoForm from "~/index";

import "@/styles/index.scss";

Vue.config.productionTip = false;
Vue.use(AutoForm);
new Vue({
    router,
    render: (h) => h(App),
}).$mount("#app");
