import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Construct from "../views/Construct.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: "/",
        name: "construct",
        component: Construct,
    },
    {
        path: "/table",
        name: "table",
        component: () =>
            import(/* webpackChunkName: "Table" */ "../views/Table.vue"),
    },
    {
        path: "/form",
        name: "form",
        component: () =>
            import(/* webpackChunkName: "Form" */ "../views/Form.vue"),
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
