var Linter = require('eslint4b');
var linter = new Linter();

var defaultConfig = {
    "env": {
        "es2021": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 12
    },
    "rules": {
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
                var code = "function dummy(msg) {\n" + node.config.func + "\n};";
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
