module.exports = {
    "rules": [
        {
            name: "core",
            subrules: [
                {
                    name: "flowsize",
                    maxSize: 10
                },
                {
                    name: "no-func-name",
                    mode: "warn",
                },
                {
                    name: "http-in-resp"
                },
                {
                    name: "loop",
                },                
            ]
        },
        {
            name: "func-style-eslint",
            parserOptions: {
                ecmaVersion: 6
            },
            rules: {
                semi: 2
            }
        }
    ]
};