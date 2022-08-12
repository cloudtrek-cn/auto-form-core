module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        "plugin:vue/essential",
        "eslint:recommended",
        "@vue/typescript/recommended",
        "plugin:prettier/recommended"
    ],
    parserOptions: {
        ecmaVersion: 2020
    },
    rules: {
        indent: ["error", 4],
        "@typescript-eslint/no-var-requires": "off",
        "vue/html-closing-bracket-newline": "off",
        "eslint-disable-next-line": "off",
        "@typescript-eslint/no-this-alias": "off",
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "prettier/prettier": [
            "error",
            {
                tabWidth: 4,
                jsxBracketSameLine: false,
                printWidth: 120,
                useTabs: false,
                semi: true,
                vueIndentScriptAndStyle: false,
                singleQuote: false,
                quoteProps: "as-needed",
                bracketSpacing: true,
                bracketSameLine: true,
                trailingComma: "none",
                jsxSingleQuote: false,
                arrowParens: "always",
                insertPragma: false,
                requirePragma: false,
                proseWrap: "never",
                TrailingCooma: "all",
                htmlWhitespaceSensitivity: "ignore",
                endOfLine: "lf"
            },
            { usePrettierrc: false }
        ]
    },
    overrides: [
        {
            files: ["**/__tests__/*.{j,t}s?(x)", "**/tests/unit/**/*.spec.{j,t}s?(x)"],
            env: {
                jest: true
            }
        }
    ]
};
