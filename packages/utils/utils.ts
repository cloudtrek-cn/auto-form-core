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
    render: AutoConstruct.AnyObj,
    attr?: AutoConstruct.AnyObj
) => {
    const Profile = Vue.extend({
        name: "ItemRender",
        functional: true,
        render: (h) => {
            console.log(12341234, attr);
            return h(
                "div",
                {
                    attrs: {
                        class: "childen",
                    },
                },
                [h(render, attr)]
            );
        },
    });
    new Profile().$mount(`#${id} .childen`);
};
