var Linter = require('eslint4b');
var linter = new Linter();

var defaultConfig = {
    "env": {
        "es2021": true
    },
    "parserOptions": {
        "ecmaVersion": 12
    },
    "rules": {
        "constructor-super": "error",
        "for-direction": "error",
        "getter-return": "error",
        "no-async-promise-executor": "error",
        "no-case-declarations": "error",
        "no-class-assign": "error",
        "no-compare-neg-zero": "error",
        "no-cond-assign": "error",
        "no-const-assign": "error",
        "no-constant-condition": "error",
        "no-control-regex": "error",
        "no-debugger": "error",
        "no-delete-var": "error",
        "no-dupe-args": "error",
        "no-dupe-class-members": "error",
        "no-dupe-else-if": "error",
        "no-dupe-keys": "error",
        "no-duplicate-case": "error",
        "no-empty": "error",
        "no-empty-character-class": "error",
        "no-empty-pattern": "error",
        "no-ex-assign": "error",
        "no-extra-boolean-cast": "error",
        "no-extra-semi": "error",
        "no-fallthrough": "error",
        "no-func-assign": "error",
        "no-global-assign": "error",
        "no-import-assign": "error",
        "no-inner-declarations": "error",
        "no-invalid-regexp": "error",
        "no-irregular-whitespace": "error",
        "no-misleading-character-class": "error",
        "no-mixed-spaces-and-tabs": "error",
        "no-new-symbol": "error",
        "no-obj-calls": "error",
        "no-octal": "error",
        "no-prototype-builtins": "error",
        "no-redeclare": "error",
        "no-regex-spaces": "error",
        "no-self-assign": "error",
        "no-setter-return": "error",
        "no-shadow-restricted-names": "error",
        "no-sparse-arrays": "error",
        "no-this-before-super": "error",
        "no-undef": "error",
        "no-unexpected-multiline": "error",
        "no-unreachable": "error",
        "no-unsafe-finally": "error",
        "no-unsafe-negation": "error",
        "no-unused-labels": "error",
        "no-unused-vars": "error",
        "no-useless-catch": "error",
        "no-useless-escape": "error",
        "no-with": "error",
        "require-yield": "error",
        "use-isnan": "error",
        "valid-typeof": "error"
    }
}

module.exports = {
    meta: {
        type: "suggestion",
        docs: {
            description: "run eslint on Function nodes"
        },
        options: {
            config: {
                type: "object",
                default: defaultConfig
            }
        }
    },
    create: function(context, ruleConfig) {
        var config = ruleConfig.config || defaultConfig;
        return {
            "type:function": function(node) {
                // TODO: lint the on-start / on-close code
                var code = "(async function(msg,__send__,__done__){"+
                    "var __msgid__;"+
                    "var node; // eslint-disable-line\n"+
                    node.config.func+"\n"+
                    "}); // eslint-disable-line";
                var result = linter.verify(code, config);
                result.forEach(function(r) {
                    // console.log(r);
                    context.report({
                        location: [node.id],
                        message: r.message,
                        severity: (r.severity == 1)? "warn" : "error",
                        additionalInfo: r
                    })
                    // console.log(r);
                });
            }
        }
    }
};
