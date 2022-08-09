<template>
    <div class="container">
        <!--  -->
    </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// Radio
@Component({
    components: {},
})
export default class Form extends Vue {
    //
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
