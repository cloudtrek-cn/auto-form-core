<template>
    <div id="app">
        <div class="nav">
            <router-link class="link" to="/">编辑模板</router-link>
            <router-link class="link" to="/form">渲染表单</router-link>
            <router-link class="link" to="/table">渲染表格</router-link>
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
    .nav {
        flex: 100px;
        height: 100vh;
        .link {
            display: block;
            padding: 10px;
            text-decoration: none;
            color: #333;
            margin-bottom: 10px;
            &:hover {
                color: #000;
                background: #666;
            }
        }
    }
}
</style>
