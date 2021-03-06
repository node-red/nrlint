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
                    seenPaths[node.config.url] = seenPaths[node.config.url] || [];
                    seenPaths[node.config.url].push(node.id);
                }
            },
            "end": function(flowConfig) {
                for (var url in seenPaths) {
                    if (seenPaths[url].length > 1) {
                        seenPaths[url].forEach(id => {
                            context.report({
                                location: [id],
                                message: "Duplicate HTTP In url"
                            })
                        })
                    }
                }
            }
        }
    }
};
