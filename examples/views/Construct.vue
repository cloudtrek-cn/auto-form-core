<template>
    <div class="construct-page">
        <auto-construct
            ref="autoConstruct"
            :components-list="componentsList"
            :components-library="componentsLibrary"
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
        </auto-construct>
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
    save() {
        const data = (
            this.$refs["autoConstruct"] as typeof AutoForm.Construct.prototype
        ).save();
        console.log(data);
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
