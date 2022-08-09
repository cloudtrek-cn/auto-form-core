<template>
    <div id="app">
        <div class="nav-box">
            <div class="nav">
                <router-link class="link" to="/">编辑模板</router-link>
                <router-link class="link" to="/form">渲染表单</router-link>
                <router-link class="link" to="/table">渲染表格</router-link>
            </div>
        </div>
        <router-view />
    </div>
</template>

<style lang="scss">
// 全局引入icon
@import "@/assets/font.css";
* {
    padding: 0;
}
#app {
    display: flex;
    justify-content: flex-start;
    .nav-box {
        flex: 0 0 100px;
        height: 100vh;
        box-shadow: inset -1px 0px 0px 0px #dcdfe6;
        position: relative;
        .nav {
            width: 100px;
            position: absolute;
            top: 50%;
            margin-top: -146px;
            height: 146px;
            .link {
                display: block;
                padding: 10px;
                text-decoration: none;
                color: #333;
                margin-bottom: 10px;
                text-align: center;
                &:hover {
                    color: #fff;
                    background: #666;
                }
            }
        }
    }
}
</style>
