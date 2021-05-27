module.exports = {
    plugins: [
        "nrlint-plugin-core",
        "nrlint-plugin-func-style-eslint"
    ],
    rules: {
        "avoid-loops": true,
        "flow-size": { maxSize: 6 },
        "function-eslint": {
            parserOptions: {
                ecmaVersion: 6
            },
            rules: {
                semi: 2
            }
        },
        "http-in-response": true,
        "named-functions": true
    }
};
