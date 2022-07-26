module.exports = {
    meta: {
        type: "suggestion",
        severity: "warn",
        docs: {
            description: "ensure all Links nodes have a name"
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

        function checkNode(node) {
            if (!node.config.name) {
                context.report({
                    location: [node.id],
                    message: "Link node has no name"
                })
            }
            if (!allowDefaultNames && /^link (in|out) \d+$/.test(node.config.name)) {
                context.report({
                    location: [node.id],
                    message: "Link node has default name"
                })                
            }
        }
        return {
            "type:link in": checkNode,
            "type:link out": checkNode
        }
    }
};
