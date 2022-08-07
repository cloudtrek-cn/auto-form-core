import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import AutoForm from "../packages/index";

import "@/styles/index.scss";

Vue.config.productionTip = false;
Vue.use(AutoForm);
new Vue({
    router,
    render: (h) => h(App),
}).$mount("#app");
