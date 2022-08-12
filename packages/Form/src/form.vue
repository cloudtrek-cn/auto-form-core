<template>
    <div class="container">
        <el-form :model="interfaceValue" :rules="rules" ref="form">
            <el-form-item
                :label="input.title"
                :prop="input.id"
                v-for="(input, key) in domList"
                :key="key"
                label-position="right"
                :class="inputClass"
                :label-width="labelWidth">
                <div class="input-box" :id="input.id">
                    <div class="childen" />
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import draggable from "vuedraggable";
import { Form, FormItem } from "element-ui";
@Component({
    components: {
        draggable,
        "el-form": Form,
        "el-form-item": FormItem
    }
})
export default class AutoForm extends Vue {
    @Prop({ type: Array, default: null })
    public componentsList!: Array<{
        title: string;
        list: AutoForm.elementItem[];
    }>;
    @Prop({ type: Object, default: null }) public componentsLibrary!: {
        [key: string]: Vue.VNode;
    };
    @Prop({ type: Object, default: null }) public initData!: {
        title: string;
        field: AutoForm.elAttribute[];
    };
    @Prop({ type: Object, default: null }) public value!: {
        [key: string]: unknown;
    };
    @Prop({ type: String, default: "" }) public lableClass!: "";
    @Prop({ type: String, default: "100px" }) public labelWidth!: "100px";
    @Prop({ type: String, default: "" }) public inputClass!: "";
    @Prop({ type: String, default: "" }) public formClass!: "";

    public rules: {
        [key: string]: Array<{
            required: boolean;
            message: string;
            trigger: string;
        }>;
    } = {};
    public interfaceValue: {
        [key: string]: unknown;
    } = {};
    public domList: {
        [key: string]: {
            id: string;
            placeholder: string;
            title: string;
            required: boolean;
            isFilter: boolean;
        };
    } = {};
    mounted() {
        this.initInterfaceValue(); // 初始化表单数据
        this.setComponentsListObj(); // 设置组件列表对象
        this.initDomList(); // 初始化渲染表单
    }
    initInterfaceValue() {
        const field = this.initData ? this.initData.field : [];
        const value = this.value || null;
        field.forEach((item) => {
            let defaultValue = null;
            if (item.props && item.props.value && item.props.value.value) {
                defaultValue = item.props.value.value;
            }
            this.interfaceValue[item.id] = value[item.id] ? value[item.id] : defaultValue;
        });
    }
    initDomList() {
        const domList: typeof this.domList = {};
        const field = this.initData ? this.initData.field : [];
        const rules = this.rules || {};
        field.forEach((item) => {
            domList[item.id] = {
                id: item.id,
                placeholder: item.placeholder,
                title: item.title,
                required: item.required,
                isFilter: item.isFilter
            };
            if (item.required) {
                rules[item.id] = [
                    {
                        required: true,
                        message: item.requiredMsg ? item.requiredMsg : "请输入" + item.title,
                        trigger: "blur"
                    }
                ];
            }
        });
        this.rules = rules;
        this.domList = domList;
        Vue.nextTick().then(() => {
            this.initRender();
        });
    }
    private componentsListObj: {
        [key: string]: AutoForm.elementItem;
    } = {};
    setComponentsListObj() {
        this.componentsList.forEach((list) => {
            list.list.forEach((item) => {
                this.componentsListObj = {
                    ...this.componentsListObj,
                    [item.name]: item
                };
            });
        });
    }
    initRender() {
        const field = this.initData ? this.initData.field : [];
        const self = this;
        field.forEach((item) => {
            const id = item.id;
            const elTemplateName = item.elTemplateName;
            const elTemplate = this.componentsListObj[elTemplateName];
            const render: AutoForm.AnyObj = this.componentsLibrary[elTemplate.components];
            const placeholder = item.placeholder;
            if (!render) {
                return;
            }
            const attrs: {
                [key: string]: unknown;
            } = placeholder ? { placeholder } : {};
            const props: {
                [key: string]: unknown;
            } = {};
            if (item.props) {
                for (const key in item.props) {
                    if (item.props[key].isAttr) {
                        attrs[key] = item.props[key].value;
                    }
                    if (key != "value") {
                        props[key] = item.props[key].value;
                    }
                }
            }

            const Profile = Vue.extend({
                name: "FormRender",
                functional: true,
                render: function (h) {
                    const that: AutoForm.Any = this;
                    return h(
                        "div",
                        {
                            attrs: {
                                class: "childen"
                            }
                        },
                        [
                            h(render, {
                                props: {
                                    ...props,
                                    value: self.interfaceValue[id]
                                },
                                attrs: {
                                    ...attrs
                                },
                                on: {
                                    input: function (event: string) {
                                        that.$emit("input", "that", event);
                                        self.interfaceValue = {
                                            ...self.interfaceValue,
                                            [id]: event
                                        };
                                    }
                                }
                            })
                        ]
                    );
                }
            });
            new Profile().$mount(`#${id} .childen`);
        });
    }
    save() {
        return new Promise((resolve, reject) => {
            (this.$refs["form"] as Form).validate((valid) => {
                if (valid) {
                    resolve(this.interfaceValue);
                } else {
                    reject(false);
                }
            });
        });
    }
}
</script>
<style lang="scss" scoped>
.container {
    .form {
        .item {
            display: flex;
            justify-content: flex-start;
            margin-bottom: 24px;
            &.required {
                .lable {
                    &::before {
                        content: "*";
                        color: red;
                    }
                }
            }
            .lable {
                flex: 0 0 100px;
                font-size: 14px;
                font-family: SourceHanSansCN-Normal, SourceHanSansCN;
                font-weight: 400;
                color: #626366;
                line-height: 36px;
                text-align: right;
                margin-right: 24px;
                position: relative;
            }
            .input-box {
                flex: 1;
                background: #ffffff;
                border-radius: 4px;
            }
        }
    }
}
</style>
