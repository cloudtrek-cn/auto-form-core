<template>
    <div class="container">
        <div class="nav-bar"></div>
        <div class="main">
            <div class="left">
                <div
                    class="field-group"
                    v-for="(group, i) in componentsList"
                    :key="i"
                >
                    <div class="title">基础字段</div>
                    <!-- @end="checkMove" -->

                    <draggable
                        class="components-list"
                        :list="group.list"
                        :move="onMove"
                        :clone="cloneElement"
                        :group="{
                            name: 'form-group',
                            pull: 'clone',
                            put: false,
                        }"
                    >
                        <div
                            class="list-item"
                            v-for="(element, index) in group.list"
                            :key="index"
                        >
                            {{ element.title }}
                        </div>
                    </draggable>
                </div>
            </div>
            <div class="center">
                <draggable
                    class="element-list"
                    :list="elements"
                    :group="{ name: 'form-group', pull: false, put: true }"
                >
                    <div
                        :class="`element-item ${
                            element.isActive ? 'active' : ''
                        }`"
                        v-for="(element, index) in elements"
                        :key="index"
                        @click="selectComponent(element, index)"
                    >
                        <div class="del-btn">del</div>
                        <div
                            class="title"
                            :class="
                                elementsAttribute[element.id].required
                                    ? 'required'
                                    : ''
                            "
                        >
                            {{
                                elementsAttribute[element.id].title ||
                                element.title
                            }}
                        </div>
                        <div class="element" :id="element.id" />
                    </div>
                </draggable>
            </div>
            <div class="right" v-if="activeElId">
                <div class="right-title">字段属性</div>
                <div class="attribute default-attribute">
                    <div class="item">
                        <div class="name required">标题</div>
                        <div class="input-box">
                            <el-input
                                class="attribute-input"
                                v-model="elementsAttribute[activeElId].title"
                            />
                        </div>
                    </div>
                    <div class="item">
                        <div class="input-box">
                            <el-checkbox
                                v-model="elementsAttribute[activeElId].isFilter"
                                >设置为筛选项</el-checkbox
                            >
                        </div>
                    </div>
                    <div class="item">
                        <div class="name">提示文字</div>
                        <div class="input-box">
                            <el-input
                                class="attribute-input"
                                v-model="
                                    elementsAttribute[activeElId].placeholder
                                "
                            />
                        </div>
                    </div>
                    <div class="item">
                        <div class="name">校验</div>
                        <div class="input-box">
                            <el-checkbox
                                v-model="elementsAttribute[activeElId].required"
                                >必填</el-checkbox
                            >
                        </div>
                    </div>
                </div>
                <div class="attribute customize-attribute">
                    {{ elementsAttribute[activeElId] }}
                </div>
                <div class="customize-attribute">
                    {{ activeElId }}
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import draggable from "vuedraggable";
import { getUUID } from "~/utils/utils";
import { Input, Checkbox } from "element-ui";

interface draggableObj {
    to: {
        className: string;
    };
}

interface elementItem {
    id: string;
    icon: string;
    title: string;
    source: string;
    name: string;
    isActive: boolean;
    components: string;
    placeholder: string;
    defaultProps: {
        [key: string]: unknown;
    };
    props: {
        [key: string]: {
            name: string;
            value: unknown;
        };
    };
}

@Component({
    components: {
        draggable,
        "el-input": Input,
        "el-checkbox": Checkbox,
    },
})
export default class AutoForm extends Vue {
    @Prop({ type: Array, default: null })
    public componentsList!: Array<{
        title: string;
        list: elementItem[];
    }>;
    @Prop({ type: Object, default: null }) public componentsLibrary!: {
        [key: string]: Vue.VNode;
    };
    mounted() {
        // console.log(this.componentsLibrary);
    }
    // 组件列表
    public elements: elementItem[] = [];
    // 选中组件操作
    public elementsAttribute: {
        [key: string]: {
            [key: string]: unknown;
        };
    } = {};
    public activeElId = "";
    public selectComponent(e: elementItem, index: number) {
        const isActive = this.elements[index].isActive;
        this.elements = this.elements.map((item) => {
            item.isActive = false;
            return item;
        });
        this.elements[index].isActive = !isActive;
        this.activeElId = this.elements[index].isActive
            ? this.elements[index].id
            : "";
    }
    // 判断当前组件是否可以拖动
    public onMove(e: draggableObj) {
        return e.to.className != "components-list";
    }
    // 复制组件, 增加组件id
    public cloneElement(e: elementItem) {
        const id = `el-${getUUID()}`;
        this.elementsAttribute = {
            ...this.elementsAttribute,
            [id]: {
                title: e.title,
                placeholder: e.placeholder,
                isFilter: false,
                required: false,
            },
        };
        return {
            ...e,
            id,
        };
    }
    @Watch("elements")
    private watchForms(elements: elementItem[]) {
        console.log("Watch-elements");
        setTimeout(() => {
            elements.forEach((element) => {
                const id = element.id;
                this.setRender(id, element);
            });
        }, 0);
    }
    private setRender(id: string, el: elementItem) {
        if (!document.getElementById(id)) {
            return;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const render: any = this.componentsLibrary[el.components];
        let props = {
            ...(el.defaultProps ? el.defaultProps : {}),
        };
        for (const key in el.props) {
            props[key] = el.props[key].value;
        }
        props["placeholder"] = el.placeholder;
        const Profile = Vue.extend({
            name: "ItemRender",
            functional: true,
            render: (h) => {
                return h(render, {
                    props,
                });
            },
        });
        new Profile().$mount(`#${id}`);
    }
}
</script>
<style lang="scss" scoped>
.container {
    min-width: 1200px;
    height: 100%;
    display: flex;
    width: 100%;
    background: #eaeaec;
    flex-direction: column;
    .nav-bar {
        width: 100%;
        height: 60px;
        background: #ffffff;
        box-shadow: inset 0px -1px 0px 0px #dcdfe6;
        border-radius: 12px 12px 0px 0px;
    }
    .main {
        width: 100%;
        min-width: 1200px;
        height: calc(100% - 60px);
        display: flex;
        .left {
            width: 260px;
            flex: 0 0 260px;
            background: #ffffff;
            box-shadow: inset -1px 0px 0px 0px #dcdfe6;
            padding-top: 24px;
            .field-group {
                width: 100%;
                padding: 0 16px;
                .title {
                    width: 100%;
                    font-size: 14px;
                    font-family: SourceHanSansCN-Medium, SourceHanSansCN;
                    font-weight: 500;
                    color: #000;
                    line-height: 14px;
                    position: relative;
                    margin-bottom: 16px;
                    &::before {
                        content: "";
                        position: absolute;
                        top: 0;
                        left: -16px;
                        width: 3px;
                        height: 14px;
                        background: #5169e5;
                    }
                }
                .components-list {
                    .list-item {
                        width: 228px;
                        height: 32px;
                        background: #ffffff;
                        border-radius: 4px;
                        border: 1px solid #dcdfe6;
                        margin-bottom: 12px;
                        font-size: 12px;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        color: #313233;
                        line-height: 32px;
                        padding-left: 8px;
                        cursor: pointer;
                    }
                }
            }
        }
        .center {
            flex: 1;
            background: #ffffff;
            box-shadow: 0px 1px 6px 0px rgba(196, 199, 204, 0.5);
            margin: 0 20px;
            .element-list {
                width: 100%;
                min-height: 100%;
                padding: 16px;
                .element-item {
                    width: 100%;
                    padding: 10px 12px;
                    cursor: pointer;
                    position: relative;
                    .del-btn {
                        display: none;
                    }
                    &.active {
                        background: #f5f9ff;
                    }
                    &:hover {
                        background: #f5f9ff;
                        .del-btn {
                            position: absolute;
                            display: inline-block;
                            width: 24px;
                            height: 24px;
                            background: #ffffff;
                            box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.15);
                            border-radius: 4px;
                            top: 0;
                            right: 0;
                        }
                    }
                    .title {
                        font-size: 14px;
                        font-family: PingFangSC-Medium, PingFang SC;
                        font-weight: 500;
                        color: #313233;
                        line-height: 20px;
                        margin-bottom: 8px;
                        &.required {
                            &::after {
                                content: "*";
                                color: red;
                                margin-left: 5px;
                            }
                        }
                    }
                    .element {
                        width: 240px;
                        height: 32px;
                        background: #ffffff;
                        border-radius: 4px;
                        border: 1px solid #dcdfe6;
                    }
                }
            }
        }
        .right {
            width: 300px;
            flex: 0 0 300px;
            background: #ffffff;
            box-shadow: inset 1px 0px 0px 0px #dcdfe6;
            padding: 24px 16px;
            .right-title {
                font-size: 14px;
                font-family: SourceHanSansCN-Medium, SourceHanSansCN;
                font-weight: 500;
                color: #313233;
                line-height: 14px;
                position: relative;
                margin-bottom: 24px;
                &::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: -16px;
                    width: 3px;
                    height: 14px;
                    background: #626366;
                }
            }
            .attribute {
                .item {
                    .name {
                        font-size: 14px;
                        font-family: SourceHanSansCN-Medium, SourceHanSansCN;
                        font-weight: 500;
                        color: #313233;
                        line-height: 21px;
                        margin-bottom: 12px;
                        &.required {
                            &::after {
                                content: "*";
                                color: red;
                                margin-left: 5px;
                            }
                        }
                    }
                    .input-box {
                        margin-bottom: 16px;
                        .attribute-input {
                            font-size: 14px;
                            font-family: SourceHanSansCN-Normal, SourceHanSansCN;
                            font-weight: 400;
                            color: #313233;
                            line-height: 21px;
                            color: red;
                        }
                    }
                }
            }
        }
    }
}
</style>
