<template>
    <div class="container" :class="containerClass">
        <div class="nav-bar">
            <slot name="navbar"></slot>
        </div>
        <div class="main">
            <div class="left">
                <div class="field-group" v-for="(group, i) in componentsList" :key="i">
                    <div class="title">基础字段</div>
                    <draggable
                        class="components-list"
                        :list="group.list"
                        :move="onMove"
                        :clone="cloneElement"
                        :group="{
                            name: 'form-group',
                            pull: 'clone',
                            put: false
                        }">
                        <div class="list-item" v-for="(element, index) in group.list" :key="index">
                            <i v-if="element.icon" :class="`icon ${element.icon}`"></i>
                            {{ element.title }}
                        </div>
                    </draggable>
                </div>
            </div>
            <div class="center">
                <div class="elements-nodata" v-if="!elements.length">从左侧拖拽来添加字段</div>
                <draggable
                    :list="elements"
                    class="element-list"
                    ghostClass="ghost-item"
                    @add="addItem"
                    @sort="sort"
                    :group="{
                        name: 'form-group',
                        pull: false,
                        put: true
                    }">
                    <div
                        :class="`element-item ${itemClass} ${element.isActive ? 'active' : ''}`"
                        v-for="(element, index) in elements"
                        @click.self.stop="selectComponent(element, index)"
                        :key="index">
                        <div class="title" :class="interfaceObj[element.id].required ? 'required' : ''">
                            {{ interfaceObj[element.id].title || element.title }}
                        </div>
                        <div class="element" :id="element.id">
                            <div class="childen"></div>
                        </div>
                        <div :class="customizeClass" @click.stop.self="clickCustomize(element.id)">
                            <slot name="customize" v-bind:element="element"></slot>
                        </div>
                    </div>
                </draggable>
            </div>
            <div class="right">
                <template v-if="activeElId">
                    <div class="right-title">字段属性</div>
                    <div class="attribute default-attribute">
                        <div class="item">
                            <div class="name required">标题</div>
                            <div class="input-box">
                                <el-input
                                    class="attribute-input"
                                    @input="changeValue(activeElId, 'title', interfaceObj[activeElId].title)"
                                    :maxlength="interfaceObj[activeElId].maxTitle"
                                    v-model="interfaceObj[activeElId].title" />
                            </div>
                        </div>
                        <div class="item">
                            <div class="input-box">
                                <el-checkbox
                                    @change="changeValue(activeElId, 'isFilter', interfaceObj[activeElId].isFilter)"
                                    v-model="interfaceObj[activeElId].isFilter">
                                    设置为筛选项
                                </el-checkbox>
                            </div>
                        </div>
                        <div class="item">
                            <div class="name">
                                提示文字
                                <el-popover
                                    placement="bottom-start"
                                    width="244"
                                    trigger="click"
                                    v-if="interfaceObj[activeElId].maxPlaceholder"
                                    :content="`最多输入${interfaceObj[activeElId].maxPlaceholder}个字符；如果不需要提示，清空即可。`">
                                    <span slot="reference">
                                        <i :class="`help-icon ${helpIcon}`"></i>
                                    </span>
                                </el-popover>
                            </div>
                            <div class="input-box">
                                <el-input
                                    class="attribute-input"
                                    @input="changePlaceholder(activeElId)"
                                    :maxlength="interfaceObj[activeElId].maxPlaceholder || 0"
                                    v-model="interfaceObj[activeElId].placeholder" />
                            </div>
                        </div>
                        <div class="item">
                            <div class="name">校验</div>
                            <div class="input-box">
                                <el-checkbox v-model="interfaceObj[activeElId].required">必填</el-checkbox>
                            </div>
                        </div>
                        <div class="item" v-for="(prop, index) in interfaceObj[activeElId].props" :key="index">
                            <div class="name" :class="prop.required ? 'required' : ''">
                                {{ prop.name }}
                                <el-popover v-if="prop.help" placement="bottom" width="410" trigger="click">
                                    <div class="prop-popover" :class="propHelpClass">{{ prop.help }}</div>
                                    <span slot="reference">
                                        <i :class="`help-icon ${helpIcon}`"></i>
                                    </span>
                                </el-popover>
                            </div>
                            <div class="input-box" :id="`${activeElId}_prop_${index}`">
                                <div class="childen"></div>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div class="elements-nodata" v-if="!elements.length">请先添加字段</div>
                    <div class="elements-nodata" v-else>点击选择字段后可编辑字段</div>
                </template>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import draggable from "vuedraggable";
import { getUUID, domRender } from "~/utils/utils";
import Switch from "../../../ui/switch/switch.vue";
import RadioGroup from "../../../ui/radio-group/radio-group.vue";
import Select from "../../../ui/select/select.vue";
import Input from "../../../ui/input/input.vue";
import Checkbox from "../../../ui/checkbox/checkbox.vue";

@Component({
    components: {
        draggable,
        "el-input": Input,
        "el-checkbox": Checkbox
    }
})
export default class AutoConstruct extends Vue {
    @Prop({ type: Array, default: null })
    public componentsList!: Array<{
        title: string;
        list: AutoConstruct.elementItem[];
    }>;
    @Prop({ type: String, default: "未命名" }) public title!: string;
    @Prop({ type: String, default: "" }) public customizeClass!: string;
    @Prop({ type: String, default: "" }) public helpIcon!: string;
    @Prop({ type: String, default: "" }) public itemClass!: string;
    @Prop({ type: String, default: "" }) public propHelpClass!: string;
    @Prop({ type: String, default: "" }) public containerClass!: string;
    @Prop({ type: Object, default: null }) public componentsLibrary!: {
        [key: string]: Vue.VNode;
    };
    @Prop({ type: Object, default: null }) public initData!: {
        title: string;
        field: AutoConstruct.elAttribute[];
    };
    mounted() {
        this.setComponentsListObj();
        this.setValue();
    }
    setValue() {
        if (!this.initData) {
            return;
        }
        const field = this.initData.field;
        for (const index in field) {
            const item = field[index];
            const { props, placeholder, title, isFilter, required, id } = item;
            const elTemplateName = item.elTemplateName;
            if (this.componentsListObj[elTemplateName]) {
                let el = this.cloneElement({
                    ...JSON.parse(JSON.stringify(this.componentsListObj[elTemplateName])),
                    id,
                    isClickActive: Number(index) === 0,
                    isSetValue: true
                });
                el.placeholder = placeholder;
                el.props = props;
                el.title = title;
                el.required = required;
                el.isFilter = isFilter;
                this.elements.push(el);
                this.interfaceObj[id].props = props;
                this.interfaceObj[id].title = title;
                this.interfaceObj[id].isFilter = isFilter;
                this.interfaceObj[id].required = required;
                this.interfaceObj[id].placeholder = placeholder;
            }
        }
        if (this.elements.length) {
            this.selectComponent(this.elements[0], 0);
        }
    }
    private componentsListObj: {
        [key: string]: AutoConstruct.elementItem;
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
        const element = this.elements[index];
        const isActive = element.isActive;
        this.elements = this.elements.map((item) => {
            item.isActive = false;
            return item;
        });
        element.isActive = !isActive;
        this.activeElId = element.isActive ? element.id : "";
        if (!isActive) {
            Vue.nextTick().then(() => {
                this.setProp(element.id);
            });
        }
        this.$emit("click-item", element.id);
    }
    // 判断当前组件是否可以拖动
    public onMove(e: AutoConstruct.draggableObj) {
        if (e.to.className == "components-list") {
            return false;
        }
        const copyEl = e.draggedContext.element;
        const elName = copyEl.name;
        const maximum = copyEl.maximum || 0;
        if (maximum <= 0) {
            return true;
        }
        const elNum = this.elements.filter((item) => item.name == elName).length;
        if (elNum >= maximum) {
            return false;
        }
        return true;
    }
    // 复制组件, 增加组件id，增加属性
    public cloneElement(e: AutoConstruct.elementItem) {
        const id = e.id ? e.id : `el-${getUUID()}`;
        const attr: AutoConstruct.elAttribute = {
            id,
            title: e.title,
            placeholder: e.placeholder,
            isFilter: e.isFilter ? e.isFilter : false,
            required: e.required ? e.required : false,
            maxTitle: e.maxTitle ? e.maxTitle : 100,
            maxPlaceholder: e.maxPlaceholder ? e.maxPlaceholder : 100,
            props: JSON.parse(JSON.stringify(e.props || {})),
            reg: JSON.parse(JSON.stringify(e.reg || [])),
            elTemplateName: e.name
        };
        this.interfaceObj = {
            ...this.interfaceObj,
            [id]: attr
        };
        return {
            ...e,
            id
        };
    }
    @Watch("elements")
    private watchForms(elements: AutoConstruct.elementItem[]) {
        Vue.nextTick().then(() => {
            elements.forEach((element) => {
                this.setRender(element.id, element);
            });
        });
    }
    // 根据自定义属性的更新重新渲染组件
    private uploadInterfaceObj(id: string) {
        const elTemplateName = this.interfaceObj[id].elTemplateName;
        let el = JSON.parse(JSON.stringify(this.componentsListObj[elTemplateName]));
        if (!el) {
            return;
        }
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
        const render: AutoConstruct.AnyObj = this.componentsLibrary[el.components];
        let props = {
            ...(el.defaultProps ? el.defaultProps : {})
        };
        for (const key in el.props) {
            props[key] = this.interfaceObj[id].props[key].value || el.props[key].value;
        }

        domRender(id, render, {
            props,
            attrs: {
                placeholder:
                    this.interfaceObj[id].placeholder === "" || this.interfaceObj[id].placeholder
                        ? this.interfaceObj[id].placeholder
                        : el.placeholder
            }
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
        radio: RadioGroup
    };
    private setProp(id: string) {
        const props = this.interfaceObj[id].props;
        for (const propKey in props) {
            const prop = props[propKey];
            let render: AutoConstruct.AnyObj = this.propsMap["Input"];
            if (this.propsMap[prop.type]) {
                render = this.propsMap[prop.type];
            }
            if (prop.type === "render") {
                render = this.componentsLibrary[prop.render];
            }
            Vue.nextTick().then(() => {
                this.setPropRender(id, render, propKey);
            });
        }
    }
    public changePlaceholder(id: string) {
        this.uploadInterfaceObj(id);
        this.changeValue(id, "placeholder", this.interfaceObj[id].placeholder);
    }
    private setPropRender(id: string, render: AutoConstruct.AnyObj, propKey: string, children?: Vue.VNodeChildren) {
        const self = this;
        const item = self.interfaceObj[id].props[propKey];
        const attrs = item.attrs || {};
        const props = item.props || {};
        const Profile = Vue.extend({
            name: "FormRender",
            functional: true,
            render: function (h) {
                const that: AutoConstruct.Any = this;
                return h(
                    "div",
                    {
                        attrs: {
                            class: "childen"
                        }
                    },
                    [
                        h(
                            render,
                            {
                                attrs,
                                props: {
                                    ...props,
                                    value: item.value
                                },
                                on: {
                                    input: function (event: string) {
                                        that.$emit("input", "that", event);
                                        self.interfaceObj[id].props[propKey].value = event;
                                        self.uploadInterfaceObj(id);
                                        self.changeValue(id, propKey, self.interfaceObj[id].props[propKey].value);
                                    }
                                }
                            },
                            children
                        )
                    ]
                );
            }
        });
        new Profile().$mount(`#${id}_prop_${propKey} .childen`);
    }
    public save() {
        let data: {
            title: string;
            field: AutoConstruct.elAttribute[];
        } = {
            title: this.title,
            field: []
        };
        this.elements.forEach((element) => {
            data.field.push({
                ...this.interfaceObj[element.id],
                id: element.id
            });
        });
        return data;
    }
    public async delItem(id: string) {
        let index = -1;
        this.elements.map((element, i) => {
            if (element.id === id) {
                index = i;
            }
        });
        if (index < 0) {
            return;
        }
        const e = this.elements[index];
        if (e.isActive) {
            this.selectComponent(e, index);
        }
        Vue.nextTick().then(() => {
            this.elements.splice(index, 1);
            delete this.interfaceObj[e.id];
        });
    }
    public clickCustomize(id: string) {
        this.$emit("clickCustomize", id);
    }
    public addItem(e: AutoConstruct.draggableObj) {
        this.selectComponent(this.elements[e.newIndex], e.newIndex);
    }
    /**
     * 右侧内容变更通知
     */
    public changeValue(id: string, name: string, value: unknown) {
        this.$emit("changeValue", {
            id,
            name,
            value
        });
    }
    public sort(e: AutoConstruct.draggableObj) {
        if (!this.elements[e.newIndex].isActive) {
            this.selectComponent(this.elements[e.newIndex], e.newIndex);
        }
    }
}
</script>
<style lang="scss" scoped>
@import "../../../ui/css/input.css";
@import "../../../ui/css/checkbox.css";
@import "../../../ui/css/switch.css";
@import "../../../ui/css/select.css";
@import "../../../ui/css/radio-group.css";
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
                        cursor: move;
                    }
                }
            }
        }
        .center {
            position: relative;
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
                    cursor: move;
                    position: relative;
                    &.active {
                        background: #f5f9ff;
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
            position: relative;
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
        .elements-nodata {
            position: absolute;
            text-align: center;
            font-size: 16px;
            width: 300px;
            font-family: SourceHanSansCN-Regular, SourceHanSansCN;
            font-weight: 400;
            color: #939599;
            top: 50%;
            left: 50%;
            margin-top: -8px;
            margin-left: -150px;
        }
    }
}
</style>
