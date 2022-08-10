<template>
    <div class="container">
        <div class="form" id="form" :class="formClass">
            <div
                class="item"
                :class="input.required ? 'required' : ''"
                v-for="(input, key) in domList"
                :key="key"
                :id="input.id"
            >
                <div class="lable" :class="lableClass">
                    {{ input.title }}
                </div>
                <div class="input-box" :class="inputClass">
                    <div class="childen" />
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import draggable from "vuedraggable";
@Component({
    components: {
        draggable,
    },
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
    @Prop({ type: String, default: "" }) public inputClass!: "";
    @Prop({ type: String, default: "" }) public formClass!: "";

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
        const value = this.value || {};
        field.forEach((item) => {
            console.log(item);
            this.interfaceValue[item.id] = value[item.id]
                ? value[item.id]
                : null;
        });
    }
    initDomList() {
        const domList: typeof this.domList = {};
        const field = this.initData ? this.initData.field : [];
        field.forEach((item) => {
            domList[item.id] = {
                id: item.id,
                placeholder: item.placeholder,
                title: item.title,
                required: item.required,
                isFilter: item.isFilter,
            };
        });
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
                    [item.name]: item,
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
            const render: AutoForm.AnyObj =
                this.componentsLibrary[elTemplate.components];
            if (!render) {
                return;
            }
            const props: {
                [key: string]: unknown;
            } = {};
            for (const key in item.props) {
                if (key !== "value") {
                    props[key] = item.props[key].value;
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
                                class: "childen",
                            },
                        },
                        [
                            h(render, {
                                props: {
                                    ...props,
                                    value: self.interfaceValue[id],
                                },
                                on: {
                                    input: function (event: string) {
                                        that.$emit("input", "that", event);
                                        self.interfaceValue = {
                                            ...self.interfaceValue,
                                            [id]: event,
                                        };
                                    },
                                },
                            }),
                        ]
                    );
                },
            });
            new Profile().$mount(`#${id} .childen`);
        });
    }
    save() {
        return this.interfaceValue;
    }
}
</script>
<style lang="scss" scoped>
.container {
    //   asdf
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
