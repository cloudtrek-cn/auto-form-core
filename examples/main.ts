import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Element from "element-ui";
import AutoForm from "~/index";
import "element-ui/lib/theme-chalk/index.css";

import "@/styles/index.scss";

Vue.config.productionTip = false;
Vue.use(AutoForm);
Vue.use(Element, { size: "small", zIndex: 3000 });

new Vue({
    router,
    render: (h) => h(App)
}).$mount("#app");
