import { Vue } from "vue-property-decorator";

export const getUUID = function () {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
            const r = (Math.random() * 16) | 0,
                v = c == "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        }
    );
};

export const sleep = function (ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

export const domRender = (
    id: string,
    render: AutoForm.AnyObj,
    attr?: AutoForm.AnyObj
) => {
    const Profile = Vue.extend({
        name: "ItemRender",
        functional: true,
        render: (h) => {
            return h(render, attr);
        },
    });
    new Profile().$mount(`#${id}`);
};
