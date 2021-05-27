module.exports = {
    meta: {
        type: "suggestion",
        severity: "warn",
        docs: {
            description: "ensure all Function nodes have a name"
        },
        options: {}
    },
    create: function(context, ruleConfig) {
        return {
            "type:function": function(node) {
                if (!node.config.name) {
                    context.report({
                        location: [node.id],
                        message: "Function node has no name"
                    })
                }
            }
        }
    }
};
