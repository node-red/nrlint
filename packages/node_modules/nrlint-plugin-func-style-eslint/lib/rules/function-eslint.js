var Linter = require('eslint4b');
var linter = new Linter();

module.exports = {
    meta: {
        type: "suggestion",
        docs: {
            description: "run eslint on Function nodes"
        },
        options: {
            // all valid eslint options
        }
    },
    create: function(context, ruleConfig) {
        return {
            "type:function": function(node) {
                // TODO: lint the on-start / on-close code
                var code = "function dummy(msg) {\n" + node.config.func + "\n};";
                var result = linter.verify(code, ruleConfig);
                result.forEach(function(r) {
                    context.report({
                        location: [node.id],
                        message: r.message,
                        severity: (r.severity == 1)? "warn" : "error",
                        additionalInfo: r
                    })
                    console.log(r);
                });
            }
        }
    }
};
