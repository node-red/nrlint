module.exports = {
    "rules": [
        {
            name: "no-func-name",
            mode: "warn",
        },
        {
            name: "func-style-eslint",
            parserOptions: {
                ecmaVersion: 6
            },
            rules: {
                semi: 2
            }
        },
        {
            name: "http-in-resp"
        },
        {
            name: "loop",
        },
        {
            name: "flowsize",
            maxSize: 10
        }
    ]
};