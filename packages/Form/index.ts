/* eslint-disable @typescript-eslint/no-explicit-any */
import Form from "./src/form.vue";
Form.install = (app: any): void => {
    console.log(app);
    app.component(Form.name, Form);
};

export default Form;
