import Vue from "vue";
import App from "./App.vue";
import AutoForm from "../packages/index";

Vue.config.productionTip = false;

Vue.use(AutoForm);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
