<template>
  <div class="container">
    <div class="nav-bar"></div>
    <div class="main">
      <div class="left"></div>
      <div class="center"></div>
      <div class="right"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "auto-form",
});
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
    }
    .center {
      flex: 1;
      background: #ffffff;
      box-shadow: 0px 1px 6px 0px rgba(196, 199, 204, 0.5);
      margin: 0 20px;
    }
    .right {
      width: 300px;
      flex: 0 0 300px;
      background: #ffffff;
      box-shadow: inset 1px 0px 0px 0px #dcdfe6;
    }
  }
}
.containerc {
  height: 100%;
  display: flex;
  width: 100%;
  background: #f9fafc;
  flex-direction: columns;
  .nav-bar {
    // width: 100%;
    height: 60px;
    background: #ffffff;
    box-shadow: inset 0px -1px 0px 0px #dcdfe6;
    border-radius: 12px 12px 0px 0px;
    // display: flex;
    align-items: center;
    justify-content: center;
  }
  .main {
    width: 100%;
    flex: 1;
    overflow: auto;
    background: #f9fafc;
    // .left {
    //   width: 275px;
    //   overflow: auto;
    //   background: #ffffff;
    // }
    // .center {
    //   display: flex;
    //   flex: 1;
    //   justify-content: center;
    //   height: 100%;
    //   padding: 20px 20px 0;
    //   overflow: auto;
    //   transition: all ease 0.2s;
    // }
    // .right {
    //   width: 265px;
    //   overflow: auto;
    //   background: #ffffff;
    //   transition: all ease 0.2s;
    //   animation-duration: 0.2s;
    // }
  }
}
</style>
