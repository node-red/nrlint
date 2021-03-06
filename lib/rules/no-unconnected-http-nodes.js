module.exports = {
    meta: {
        type: "suggestion",
        severity: "warn",
        docs: {
            description: "ensure all HTTP In nodes reach an HTTP Response node"
        },
        options: {}
    },
    create: function(context, ruleConfig) {
        return {
            "type:http in": function(node) {
                const downstreamNodes = node.getDownstreamNodes(true);
                const connectedResponseNodes = downstreamNodes.filter(n => n.type === "http response");
                if (connectedResponseNodes.length === 0) {
                    context.report({
                        location: [node.id],
                        message: "HTTP In node does not reach an HTTP Response node"
                    })
                }
            },
            "type:http response": function(node) {
                const upstreamNodes = node.getUpstreamNodes(true);
                const connectedInNodes = upstreamNodes.filter(n => n.type === "http in");
                if (connectedInNodes.length === 0) {
                    context.report({
                        location: [node.id],
                        message: "Unconnected HTTP Response node"
                    })
                }
            }
        }
    }
};
