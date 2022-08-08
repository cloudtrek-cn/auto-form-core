<template>
    <div class="container">
        <div class="nav-bar">
            <div class="back-box">
                <i class="icon iconfont icon-ic_text"></i>
            </div>
            <div class="title-box">
                {{ title }}
            </div>
            <div class="save-box" @click="save">
                <slot name="save"></slot>
            </div>
        </div>
        <div class="main">
            <div class="left">
                <div
                    class="field-group"
                    v-for="(group, i) in componentsList"
                    :key="i"
                >
                    <div class="title">基础字段</div>
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
                            <i
                                v-if="element.icon"
                                :class="`icon ${element.icon}`"
                            ></i>
                            {{ element.title }}
                        </div>
                    </draggable>
                </div>
            </div>
            <div class="center">
                <draggable
                    class="element-list"
                    :list="elements"
                    ghostClass="ghost-item"
                    :group="{
                        name: 'form-group',
                        pull: false,
                        put: true,
                    }"
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
                                interfaceObj[element.id].required
                                    ? 'required'
                                    : ''
                            "
                        >
                            {{
                                interfaceObj[element.id].title || element.title
                            }}
                        </div>
                        <div class="element" :id="element.id">
                            <div class="childen"></div>
                        </div>
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
                                v-model="interfaceObj[activeElId].title"
                            />
                        </div>
                    </div>
                    <div class="item">
                        <div class="input-box">
                            <el-checkbox
                                v-model="interfaceObj[activeElId].isFilter"
                                >设置为筛选项</el-checkbox
                            >
                        </div>
                    </div>
                    <div class="item">
                        <div class="name">提示文字</div>
                        <div class="input-box">
                            <el-input
                                class="attribute-input"
                                @input="changePlaceholder(activeElId)"
                                v-model="interfaceObj[activeElId].placeholder"
                            />
                        </div>
                    </div>
                    <div class="item">
                        <div class="name">校验</div>
                        <div class="input-box">
                            <el-checkbox
                                v-model="interfaceObj[activeElId].required"
                                >必填</el-checkbox
                            >
                        </div>
                    </div>
                    <div
                        class="item"
                        v-for="(prop, index) in interfaceObj[activeElId].props"
                        :key="index"
                    >
                        <div
                            class="name"
                            :class="prop.required ? 'required' : ''"
                        >
                            {{ prop.name }}
                        </div>
                        <div
                            class="input-box"
                            :id="`${activeElId}_prop_${index}`"
                        >
                            <div class="childen"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import draggable from "vuedraggable";
import { getUUID, domRender } from "~/utils/utils";
import { Input, Checkbox, Switch, Select, RadioGroup } from "element-ui";
// Radio
@Component({
    components: {
        draggable,
        "el-input": Input,
        "el-checkbox": Checkbox,
    },
})
export default class AutoConstruct extends Vue {
    @Prop({ type: Array, default: null })
    public componentsList!: Array<{
        title: string;
        list: AutoConstruct.elementItem[];
    }>;
    @Prop({ type: Object, default: null }) public componentsLibrary!: {
        [key: string]: Vue.VNode;
    };
    public title = "未命名模板";
    mounted() {
        // console.log(this.componentsLibrary);
    }
    /**
     * 组件列表
     * 作用：
     * 1、拖拽组件只能使用数组，所以clone的elements组件列表是一个数组
     * 2、通过监听elements的变化来创建更新配置库
     */
    public elements: AutoConstruct.elementItem[] = [];
    // 选中组件操作
    public interfaceObj: {
        [key: string]: AutoConstruct.elAttribute;
    } = {};
    public activeElId = "";
    public selectComponent(e: AutoConstruct.elementItem, index: number) {
        const isActive = this.elements[index].isActive;
        this.elements = this.elements.map((item) => {
            item.isActive = false;
            return item;
        });
        this.elements[index].isActive = !isActive;
        this.activeElId = this.elements[index].isActive
            ? this.elements[index].id
            : "";
        if (!isActive) {
            Vue.nextTick().then(() => {
                this.setProp(this.elements[index].id);
            });
        }
    }
    // 判断当前组件是否可以拖动
    public onMove(e: AutoConstruct.draggableObj) {
        return e.to.className != "components-list";
    }
    // 复制组件, 增加组件id，增加属性
    public cloneElement(e: AutoConstruct.elementItem) {
        const id = `el-${getUUID()}`;
        const attr: AutoConstruct.elAttribute = {
            title: e.title,
            placeholder: e.placeholder,
            isFilter: false,
            required: false,
            props: e.props,
            elTemplate: e,
        };
        this.interfaceObj = {
            ...this.interfaceObj,
            [id]: attr,
        };
        return {
            ...e,
            id,
        };
    }
    @Watch("elements")
    private watchForms(elements: AutoConstruct.elementItem[]) {
        Vue.nextTick().then(() => {
            elements.forEach((element) => {
                const id = element.id;
                this.setRender(id, element);
            });
        });
    }
    // 根据自定义属性的更新重新渲染组件
    private uploadInterfaceObj(id: string) {
        let el = this.interfaceObj[id].elTemplate;
        for (const key in this.interfaceObj[id].props) {
            el.props[key].value = this.interfaceObj[id].props[key].value;
        }
        el.placeholder = this.interfaceObj[id].placeholder;
        this.setRender(id, el);
    }
    private setRender(id: string, el: AutoConstruct.elementItem) {
        if (!document.getElementById(id)) {
            return;
        }
        const render: AutoConstruct.AnyObj =
            this.componentsLibrary[el.components];
        let props = {
            ...(el.defaultProps ? el.defaultProps : {}),
        };
        for (const key in el.props) {
            props[key] = el.props[key].value;
        }
        domRender(id, render, {
            props,
            attrs: {
                placeholder: el.placeholder,
            },
        });
        // 渲染自定义属性
    }
    public propsMap: {
        [key: string]: AutoConstruct.AnyObj;
    } = {
        input: Input,
        select: Select,
        switch: Switch,
        checkbox: Checkbox,
        radio: RadioGroup,
    };
    private setProp(id: string) {
        const props = this.interfaceObj[id].props;
        for (const propKey in props) {
            const prop = props[propKey];
            const render = this.propsMap[prop.type]
                ? this.propsMap[prop.type]
                : this.propsMap["input"];
            Vue.nextTick().then(() => {
                this.setPropRender(id, render, propKey);
            });
        }
    }
    public changePlaceholder(id: string) {
        this.uploadInterfaceObj(id);
    }
    private setPropRender(
        id: string,
        render: AutoConstruct.AnyObj,
        propKey: string,
        children?: Vue.VNodeChildren
    ) {
        const self = this;
        const Profile = Vue.extend({
            name: "FormRender",
            functional: true,
            render: function (h) {
                const that: AutoConstruct.Any = this;
                return h(
                    "div",
                    {
                        attrs: {
                            class: "childen",
                        },
                    },
                    [
                        h(
                            render,
                            {
                                props: {
                                    value: self.interfaceObj[id].props[propKey]
                                        .value,
                                },
                                on: {
                                    input: function (event: string) {
                                        that.$emit("input", "that", event);
                                        self.interfaceObj[id].props[
                                            propKey
                                        ].value = event;
                                        self.uploadInterfaceObj(id);
                                    },
                                },
                            },
                            children
                        ),
                    ]
                );
            },
        });
        new Profile().$mount(`#${id}_prop_${propKey} .childen`);
    }
    public async save() {
        let data: {
            title: string;
            field: AutoConstruct.elAttribute[];
        } = {
            title: this.title,
            field: [],
        };
        this.elements.forEach((element) => {
            data.field.push({
                ...this.interfaceObj[element.id],
            });
        });
        console.log(JSON.stringify(data));
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
        display: flex;
        justify-content: space-between;
        padding: 12px 16px;
        .back-box {
            width: 24px;
            height: 24px;
            padding-top: 6px;
            .icon {
                font-size: 24px;
            }
        }
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
            overflow: scroll;
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
            overflow: scroll;
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
                    &::before {
                        content: "";
                        display: inline-block;
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        z-index: 99;
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
                        width: 100%;
                        background: #ffffff;
                        border-radius: 4px;
                    }
                }
                .ghost-item {
                    // background: red;
                    width: 568px;
                    height: 32px;
                    border: 1px dashed #5169e5;
                    font-size: 0;
                }
            }
        }
        .right {
            width: 300px;
            flex: 0 0 300px;
            background: #ffffff;
            box-shadow: inset 1px 0px 0px 0px #dcdfe6;
            padding: 24px 16px;
            overflow: scroll;
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
