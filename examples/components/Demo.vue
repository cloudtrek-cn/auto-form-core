<template>
    <div class="container">
        <div class="box">这是一个双向绑定组件示例-{{ str }}</div>
        <div class="btn" @click="set('add')">+</div>
        <div class="btn" @click="set('del')">-</div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
@Component({
    components: {}
})
export default class Form extends Vue {
    @Prop({ type: String, default: "" })
    public value!: string;

    public str = "";
    mounted() {
        this.str = this.value;
    }
    set(type: "add" | "del") {
        this.str = type === "add" ? this.str + "++" : this.str + "--";
        this.$emit("input", this.str);
    }
    @Watch("value")
    onStrChange(val: string) {
        this.str = val;
    }
}
</script>
<style lang="scss" scoped>
.container {
    width: 500px;
    height: 100px;
    background: #eee;
    .btn {
        width: 30px;
        height: 20px;
        background: yellowgreen;
        text-align: center;
        cursor: pointer;
        margin: 8px;
    }
}
</style>
