module.exports = {
    meta: {
        type: "suggestion",
        severity: "warn",
        docs: {
            description: "ensure all HTTP In nodes have a unique URL property"
        },
        options: {}
    },
    create: function(context, ruleConfig) {
        let seenPaths;
        return {
            "start": function(flowConfig) {
                seenPaths = {};
            },
            "type:http in": function(node) {
                if (node.config.url) {
                    const key = node.config.method+":"+node.config.url;
                    seenPaths[key] = seenPaths[key] || [];
                    seenPaths[key].push(node.id);
                }
            },
            "end": function(flowConfig) {
                for (var key in seenPaths) {
                    if (seenPaths[key].length > 1) {
                        context.report({
                            location: seenPaths[key],
                            message: "Duplicate HTTP In url"
                        })
                    }
                }
            }
        }
    }
};
