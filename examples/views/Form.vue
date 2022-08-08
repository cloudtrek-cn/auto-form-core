<template>
    <div class="form-page">
        <auto-form
            :components-list="componentsList"
            :components-library="componentsLibrary"
        ></auto-form>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import * as element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

@Component({
    components: {
        HelloWorld,
    },
})
export default class HomeView extends Vue {
    public componentsLibrary = {
        ...element,
    };
    public componentsList = [
        {
            title: "基础字段",
            list: [
                {
                    icon: "iconfont icon-ic_text",
                    title: "店号/门店",
                    source: "internal",
                    name: "店号/门店",
                    components: "Input",
                    placeholder: "请输入",
                    defaultProps: {
                        clearable: true,
                    },
                    props: {
                        value: {
                            type: "input",
                            name: "默认内容",
                            value: "默认内容",
                            required: true,
                        },
                        // disabled: {
                        //     type: "switch",
                        //     name: "是否禁用",
                        //     value: false,
                        //     required: true,
                        // },
                        // checkbox: {
                        //     type: "checkbox",
                        //     name: "checkbox",
                        //     checkbox: ["选项一", "选项二"],
                        // },
                        // select: {
                        //     type: "select",
                        //     name: "select",
                        //     select: ["选项一", "选项二"],
                        // },
                        // radio: {
                        //     type: "radio",
                        //     name: "radio",
                        //     radio: ["选项一", "选项二"],
                        // },
                        // render: {
                        //     type: "render",
                        //     name: "自定义组件",
                        // },
                    },
                },
                {
                    icon: "iconfont icon-ic_text",
                    title: "文本",
                    name: "text",
                    source: "internal",
                    components: "Input",
                    defaultProps: {
                        clearable: true,
                    },
                    props: {
                        value: {
                            name: "默认内容",
                            value: "",
                        },
                        disabled: {
                            name: "是否禁用",
                            value: false,
                        },
                    },
                },
                {
                    icon: "iconfont icon-ic_text",
                    title: "数字",
                    name: "number",
                    source: "internal",
                    components: "Input",
                },
                {
                    icon: "iconfont icon-ic_text",
                    title: "日期",
                    name: "date",
                    source: "internal",
                    components: "Input",
                },
                {
                    icon: "iconfont icon-ic_text",
                    title: "活动",
                    name: "活动",
                    source: "internal",
                    components: "Input",
                },
            ],
        },
    ];
    created() {
        // console.log(element);
    }
    icon() {
        //
    }
}
</script>
<style scoped>
.form-page {
    width: 100vw;
    height: 100vh;
    padding: 0;
    /* background: red; */
}
</style>
