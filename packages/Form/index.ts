/* eslint-disable @typescript-eslint/no-explicit-any */
import From from "./src/form.vue";
From.install = (app: any): void => {
    app.component(From.name, From);
};

export default From;
