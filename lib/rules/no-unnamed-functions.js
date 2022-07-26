module.exports = {
    meta: {
        type: "suggestion",
        severity: "warn",
        docs: {
            description: "ensure all Function nodes have a name"
        },
        options: {
            allowDefaultNames: {
                type: 'boolean',
                default: true,
                label: 'allow default names'
            }
        }
    },
    create: function(context, ruleConfig) {

        let allowDefaultNames = true;
        if (ruleConfig.hasOwnProperty('allowDefaultNames')) {
            allowDefaultNames = ruleConfig.allowDefaultNames;
        }

        return {
            "type:function": function(node) {
                if (!node.config.name) {
                    context.report({
                        location: [node.id],
                        message: "Function node has no name"
                    })
                } else if (!allowDefaultNames && /^function \d+$/.test(node.config.name)) {
                    context.report({
                        location: [node.id],
                        message: "Function node has default name"
                    })
                }
            }
        }
    }
};
