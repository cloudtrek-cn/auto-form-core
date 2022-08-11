<template>
    <div class="construct-page">
        <auto-construct
            ref="autoConstruct"
            :components-list="componentsList"
            :initData="initData"
            :components-library="componentsLibrary"
            :async-del="asyncDel"
            :title="title"
        >
            <div class="navbar" slot="navbar">
                <div class="back">返回</div>
                <div class="title">
                    <el-input v-model="title"></el-input>
                </div>
                <div class="save">
                    <el-button @click="save">保存</el-button>
                </div>
            </div>
            <div slot="del-icon">del</div>
        </auto-construct>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import * as element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import AutoForm from "~/index";
import Demo from "@/components/Demo.vue";

@Component({
    components: {
        "el-input": element.Input,
        "el-button": element.Button,
        "ct-demo": Demo,
    },
})
export default class Construct extends Vue {
    public title = "title";
    public demo = "aaa";
    public componentsLibrary = {
        ...element,
        "ct-demo": Demo,
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
                        maxlength: {
                            type: "input",
                            name: "最大长度",
                            props: {},
                            value: "",
                            isAttr: true,
                            required: true,
                        },
                        test: {
                            type: "input",
                            name: "test属性",
                            value: "",
                            required: true,
                            props: {},
                            attrs: {
                                class: "test-attr",
                                id: "test-attr-id",
                            },
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
                        // disabled: {
                        //     type: "render",
                        //     name: "Demo组件",
                        //     render: "ct-demo",
                        //     value: 100,
                        //     required: true,
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
                id: "el-a65f067f-a9af-41b2-936e-df9eb4c047e9",
                title: "阿斯蒂芬",
                placeholder: "阿斯蒂芬",
                isFilter: false,
                required: false,
                props: {
                    value: {
                        type: "input",
                        name: "默认内容",
                        value: "阿斯蒂芬",
                        required: true,
                    },
                    disabled: {
                        type: "switch",
                        name: "是否禁用",
                        value: false,
                        required: true,
                    },
                },
                elTemplateName: "text",
            },
            {
                id: "el-0b6fb673-91c2-4990-8b3f-8870c4ca86b2",
                title: "日期",
                isFilter: false,
                required: false,
                elTemplateName: "date",
            },
            {
                id: "el-abcbdc54-e3e5-4201-ac08-6cabf12c043c",
                title: "店号/门店",
                placeholder: "请输入3222222",
                isFilter: false,
                required: true,
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
                elTemplateName: "店号/门店",
            },
        ],
    };
    save() {
        const data = (
            this.$refs["autoConstruct"] as typeof AutoForm.Construct.prototype
        ).save();
        element.MessageBox.alert(JSON.stringify(data, null, 4), {
            confirmButtonText: "确定",
            callback: (action) => {
                this.$message({
                    type: "info",
                    message: `action: ${action}`,
                });
            },
        });
    }
    asyncDel() {
        return new Promise((resolve) => {
            alert("3秒钟后删除");
            setTimeout(() => {
                resolve(true);
            }, 3000);
        });
    }
}
</script>
<style lang="scss" scoped>
.construct-page {
    width: 100vw;
    height: 100vh;
    padding: 0;
    .navbar {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
}
</style>
