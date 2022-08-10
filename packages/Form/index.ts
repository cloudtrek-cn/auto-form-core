/* eslint-disable @typescript-eslint/no-explicit-any */
import From from "./src/form.vue";
From.install = (app: any): void => {
    console.log(12341234);
    app.component(From.name, From);
};

export default From;
