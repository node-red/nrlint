module.exports = {
    meta: {
        type: "suggestion",
        severity: "warn",
        docs: {
            description: "ensure all Links nodes have a name"
        },
        options: {}
    },
    create: function(context, ruleConfig) {
        function checkNode(node) {
            if (!node.config.name) {
                context.report({
                    location: [node.id],
                    message: "Link node has no name"
                })
            }
        }
        return {
            "type:link in": checkNode,
            "type:link out": checkNode
        }
    }
};
