/* eslint-disable @typescript-eslint/no-explicit-any */
import Construct from "./src/construct.vue";
Construct.install = (app: any): void => {
    app.component(Construct.name, Construct);
};

export default Construct;
