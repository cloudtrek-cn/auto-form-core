/* eslint-disable @typescript-eslint/ban-types */
declare module "*.vue" {
  // import Vue from "vue";
  // export default Vue;
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, {}>;
  export default component;
}
