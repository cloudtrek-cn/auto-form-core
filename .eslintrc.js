module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        "plugin:vue/essential",
        "eslint:recommended",
        "@vue/typescript/recommended",
        "plugin:prettier/recommended",
    ],
    parserOptions: {
        ecmaVersion: 2020,
    },
    rules: {
        indent: ["error", 4],
        "@typescript-eslint/no-var-requires": "off",
        "eslint-disable-next-line": "off",
        "@typescript-eslint/no-this-alias": "off",
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "prettier/prettier": [
            "error",
            {
                tabWidth: 4,
                printwidth: 120,
                jsxBracketSameLine: false,
            },
            {
                usePrettierrc: false,
            },
        ],
    },
    overrides: [
        {
            files: [
                "**/__tests__/*.{j,t}s?(x)",
                "**/tests/unit/**/*.spec.{j,t}s?(x)",
            ],
            env: {
                jest: true,
            },
        },
    ],
};
