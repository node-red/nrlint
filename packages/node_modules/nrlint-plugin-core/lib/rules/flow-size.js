module.exports = {
    meta: {
        type: "suggestion",
        severity: "warn",
        docs: {
            description: "limit the number of nodes on any one flow"
        },
        options: {
            maxSize: { type: "number", default: 100}
        }
    },
    create: function(context, ruleConfig) {
        let maxSize = 100;
        if ('maxSize' in ruleConfig) {
            maxSize = ruleConfig.maxSize;
        }
        return {
            flow: function(flow) {
                if (flow.nodes.size > maxSize) {
                    context.report({
                        location: [flow.id],
                        message: "too many nodes on flow"
                    })
                }
            }
        }
    }
};
