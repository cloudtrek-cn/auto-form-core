<template>
    <div class="construct-page">
        <ct-auto-construct
            ref="autoConstruct"
            :components-list="componentsList"
            :initData="initData"
            @click-item="clickItem"
            @changeValue="changeValue"
            :components-library="componentsLibrary"
            itemClass="item-class"
            propHelpClass="propHelpClass"
            containerClass="container-class"
            helpIcon="iconfont icon-ic_text"
            :title="title">
            <div class="navbar" slot="navbar">
                <div class="back">返回</div>
                <div class="title">
                    <el-input v-model="title"></el-input>
                </div>
                <div class="save">
                    <el-button @click="save">保存</el-button>
                </div>
            </div>
            <template v-slot:customize="el">
                <div class="customize" :id="el.element.id" @click="delItem(el.element.id)">del</div>
            </template>
        </ct-auto-construct>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import * as element from "element-ui";
import AutoForm from "~/index";
import Demo from "@/components/Demo.vue";

@Component({
    components: {
        "ct-demo": Demo,
        "el-input": element.Input,
        "el-button": element.Button
    }
})
export default class Construct extends Vue {
    public title = "title";
    public demo = "aaa";
    public visible = false;
    public componentsLibrary = {
        ...element,
        "ct-demo": Demo
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
                    maximum: 5,
                    maxTitle: 5,
                    maxPlaceholder: 5,
                    defaultProps: {
                        clearable: true
                    },
                    reg: [
                        `^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$`,
                        `^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$`
                    ],
                    props: {
                        value: {
                            type: "input",
                            name: "默认内容",
                            value: "",
                            required: true
                        },
                        maxlength: {
                            type: "input",
                            name: "最大长度",
                            props: {},
                            value: "",
                            isAttr: true,
                            required: true
                        },
                        test: {
                            type: "input",
                            name: "test属性",
                            value: "",
                            required: true,
                            props: {},
                            attrs: {
                                class: "test-attr",
                                id: "test-attr-id"
                            }
                        },
                        disabled: {
                            type: "switch",
                            name: "是否禁用",
                            value: false,
                            required: true,
                            help: `是否禁用是否禁用是否禁用是否禁用是否禁用是否禁用是否禁用是否禁用是否禁用是否禁用是否禁用是否禁用是否禁用是否禁用`
                        },
                        render: {
                            type: "render",
                            name: "自定义组件",
                            render: "Input",
                            value: "value",
                            required: true
                        }
                        // disabled: {
                        //     type: "render",
                        //     name: "Demo组件",
                        //     render: "ct-demo",
                        //     value: 100,
                        //     required: true,
                        // },
                    }
                },
                {
                    icon: "iconfont icon-ic_text",
                    title: "文本",
                    name: "text",
                    maximum: 3,
                    placeholder: "请输入",
                    source: "internal",
                    components: "Input",
                    defaultProps: {
                        clearable: true
                    },
                    props: {
                        value: {
                            type: "input",
                            name: "默认内容",
                            value: "",
                            required: true
                        },
                        disabled: {
                            type: "switch",
                            name: "是否禁用",
                            value: false,
                            required: true
                        }
                    }
                },
                {
                    icon: "iconfont icon-ic_text",
                    title: "数字",
                    name: "number",
                    maximum: 4,
                    source: "internal",
                    components: "Input"
                },
                {
                    icon: "iconfont icon-ic_text",
                    title: "日期",
                    name: "date",
                    maximum: 4,
                    source: "internal",
                    components: "Input"
                },
                {
                    icon: "iconfont icon-ic_text",
                    title: "活动",
                    name: "活动",
                    source: "internal",
                    components: "Input"
                }
            ]
        }
    ];
    public initData = {
        title: "title",
        field: [
            {
                id: "el-e44696e8-1a44-4738-891b-88138b918680",
                title: "店号/门店",
                placeholder: "请输入",
                isFilter: false,
                required: false,
                maxTitle: 5,
                maxPlaceholder: 5,
                props: {
                    value: { type: "input", name: "默认内容", value: "", required: true },
                    maxlength: { type: "input", name: "最大长度", props: {}, value: "", isAttr: true, required: true },
                    test: {
                        type: "input",
                        name: "test属性",
                        value: "",
                        required: true,
                        props: {},
                        attrs: { class: "test-attr", id: "test-attr-id" }
                    },
                    disabled: {
                        type: "switch",
                        name: "是否禁用",
                        value: false,
                        required: true,
                        help: "是否禁用是否禁用是否禁用是否禁用是否禁用是否禁用是否禁用是否禁用是否禁用是否禁用是否禁用是否禁用是否禁用是否禁用"
                    },
                    render: { type: "render", name: "自定义组件", render: "Input", value: "value", required: true }
                },
                reg: [
                    "^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$",
                    "^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$"
                ],
                elTemplateName: "店号/门店"
            },
            {
                id: "el-bb34609e-7ddf-498f-ba27-b52a44975815",
                title: "文本",
                placeholder: "请输入",
                isFilter: false,
                required: false,
                maxTitle: 100,
                maxPlaceholder: 100,
                props: {
                    value: { type: "input", name: "默认内容", value: "", required: true },
                    disabled: { type: "switch", name: "是否禁用", value: false, required: true }
                },
                reg: [],
                elTemplateName: "text"
            },
            {
                id: "el-db5009be-47e3-49c9-acba-67e3f13c0dc2",
                title: "店号/门店",
                placeholder: "请输入",
                isFilter: false,
                required: false,
                maxTitle: 5,
                maxPlaceholder: 5,
                props: {
                    value: { type: "input", name: "默认内容", value: "", required: true },
                    maxlength: { type: "input", name: "最大长度", props: {}, value: "", isAttr: true, required: true },
                    test: {
                        type: "input",
                        name: "test属性",
                        value: "",
                        required: true,
                        props: {},
                        attrs: { class: "test-attr", id: "test-attr-id" }
                    },
                    disabled: {
                        type: "switch",
                        name: "是否禁用",
                        value: false,
                        required: true,
                        help: "是否禁用是否禁用是否禁用是否禁用是否禁用是否禁用是否禁用是否禁用是否禁用是否禁用是否禁用是否禁用是否禁用是否禁用"
                    },
                    render: { type: "render", name: "自定义组件", render: "Input", value: "value", required: true }
                },
                reg: [
                    "^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$",
                    "^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$"
                ],
                elTemplateName: "店号/门店"
            }
        ]
    };
    save() {
        const data = (this.$refs["autoConstruct"] as typeof AutoForm.Construct.prototype).save();
        element.MessageBox.alert(JSON.stringify(data, null, 4), {
            confirmButtonText: "确定"
        });
    }
    delItem(id: string) {
        const ref = this.$refs["autoConstruct"] as typeof AutoForm.Construct.prototype;
        ref.delItem(id);
    }
    clickItem() {
        // console.log(id);
    }
    changeValue(changeValue: string) {
        console.log("changeValue------", changeValue);
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
<style lang="scss">
.customize {
    width: 30px;
    height: 30px;
    position: absolute;
    top: 20px;
    right: 10px;
    background: #fff;
    border-radius: 10px;
    z-index: 999;
    border: 1px solid #000;
    line-height: 30px;
    text-align: center;
}
.propHelpClass {
    color: red;
}
</style>
