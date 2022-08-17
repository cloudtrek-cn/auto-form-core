/* eslint-disable @typescript-eslint/ban-types */
declare module "*.vue" {
    // import Vue from "vue";
    // export default Vue;
    import type { DefineComponent } from "vue";
    const component: DefineComponent<{}, {}, {}>;
    export default component;
}

declare namespace AutoConstruct {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type Any = any;
    interface AnyObj {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: any;
    }
    interface draggableObj {
        to: {
            className: string;
        };
        draggedContext: {
            element: elAttribute;
        };
    }

    interface elementItem {
        id: string;
        icon: string;
        title: string;
        source: string;
        name: string;
        isActive: boolean;
        components: string;
        placeholder: string;
        reg?: string[];
        isFilter?: boolean;
        maxPlaceholder?: number;
        maxTitle?: number;
        required?: boolean;
        defaultProps: {
            [key: string]: unknown;
        };
        defaultAttrs: {
            [key: string]: unknown;
        };
        props: {
            [key: string]: customizeAttr;
        };
        attrs: {
            [key: string]: customizeAttr;
        };
    }

    interface customizeAttr {
        name: string;
        value: unknown;
        required?: boolean;
        type: "input" | "select" | "switch" | "checkbox" | "radio" | "render";
        render: string;
        isAttr?: boolean;
        help?: string;
        attrs?: {
            [key: string]: unknown;
        };
        props?: {
            [key: string]: unknown;
        };
    }
    interface elAttribute {
        id: string;
        title: string;
        placeholder: string;
        isFilter: boolean;
        required: boolean;
        maximum?: number;
        maxTitle?: number;
        maxPlaceholder?: number;
        name?: string;
        reg?: string;
        props: {
            [key: string]: customizeAttr;
        };
        elTemplate?: elementItem;
        elTemplateName: string;
    }
}

declare namespace AutoForm {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type Any = any;
    interface AnyObj {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: any;
    }
    interface draggableObj {
        to: {
            className: string;
        };
    }

    interface elementItem {
        id: string;
        icon: string;
        title: string;
        source: string;
        name: string;
        isActive: boolean;
        components: string;
        placeholder: string;
        isFilter?: boolean;
        required?: boolean;
        defaultProps: {
            [key: string]: unknown;
        };
        props: {
            [key: string]: customizeAttr;
        };
    }

    interface customizeAttr {
        name: string;
        value: unknown;
        required?: boolean;
        type: "input" | "select" | "switch" | "checkbox" | "radio" | "render";
        render: string;
        isAttr?: boolean;
        props?: {
            [key: string]: unknown;
        };
    }
    interface elAttribute {
        id: string;
        title: string;
        placeholder: string;
        isFilter: boolean;
        reg?: string[];
        required: boolean;
        requiredMsg?: string;
        props: {
            [key: string]: customizeAttr;
        };
        attrs: {
            [key: string]: customizeAttr;
        };
        elTemplate?: elementItem;
        elTemplateName: string;
    }
}
