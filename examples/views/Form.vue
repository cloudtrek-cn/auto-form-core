<template>
    <div class="construct-page">
        <auto-form
            ref="autoForm"
            :initData="initData"
            :value="value"
            :components-list="componentsList"
            :components-library="componentsLibrary"
        ></auto-form>
        <el-button @click="save">保存</el-button>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import * as element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import AutoForm from "~/index";

@Component({
    components: {
        "el-input": element.Input,
        "el-button": element.Button,
    },
})
export default class Construct extends Vue {
    public title = "title";
    public demo = "aaa";
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
                            value: "",
                            required: true,
                        },
                        disabled: {
                            type: "switch",
                            name: "是否禁用",
                            value: false,
                            required: true,
                        },
                        render: {
                            type: "render",
                            name: "自定义组件",
                            render: "Input",
                            value: "value",
                            required: true,
                        },
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
                            type: "input",
                            name: "默认内容",
                            value: "",
                            required: true,
                        },
                        disabled: {
                            type: "switch",
                            name: "是否禁用",
                            value: false,
                            required: true,
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
    public initData = {
        title: "title",
        field: [
            {
                id: "el-5ed90781-0f46-434d-bee5-3acf54a81625",
                title: "店号/门店",
                placeholder: "请输入",
                isFilter: false,
                required: false,
                props: {
                    value: {
                        type: "input",
                        name: "默认内容",
                        value: "",
                        required: true,
                    },
                    test: {
                        type: "input",
                        name: "test属性",
                        value: "",
                        required: true,
                        props: {},
                        attrs: { class: "test-attr", id: "test-attr-id" },
                    },
                    disabled: {
                        type: "switch",
                        name: "是否禁用",
                        value: false,
                        required: true,
                    },
                    render: {
                        type: "render",
                        name: "自定义组件",
                        render: "Input",
                        value: "value",
                        required: true,
                    },
                    maxlength: {
                        type: "input",
                        name: "最大长度",
                        props: {},
                        value: "5",
                        isAttr: true,
                        required: true,
                    },
                },
                elTemplateName: "店号/门店",
            },
        ],
    };
    public value = {
        "el-19572d6a-05af-4b59-b08e-9c32b16fdb29": "阿斯顿发斯蒂芬",
        "el-a65f067f-a9af-41b2-936e-df9eb4c047e9": "是超大上发大水",
        "el-0b6fb673-91c2-4990-8b3f-8870c4ca86b2": "测试日期",
        "el-abcbdc54-e3e5-4201-ac08-6cabf12c043c": null,
    };
    public save() {
        const data = (
            this.$refs["autoForm"] as typeof AutoForm.Form.prototype
        ).save();
        console.log(JSON.stringify(data, null, 2));
    }
}
</script>
<style lang="scss" scoped>
.construct-page {
    width: 100vw;
    height: 100vh;
    padding: 0;
}
</style>
