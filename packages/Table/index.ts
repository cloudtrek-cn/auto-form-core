/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from "./src/table.vue";
Table.install = (app: any): void => {
    app.component(Table.name, Table);
};

export default Table;
