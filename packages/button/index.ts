import App from "vue";
import Button from "./src/button.vue";
// 定义 install 方法， App 作为参数
Button.install = (app: App): void => {
    console.log(app);
    //   app.component(Button.name, Button);
};

// const asda = Button
export default Button;
