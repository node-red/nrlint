
module.exports = {
    meta: {
        type: "suggestion",
        severity: "warn",
        docs: {
            description: "ensure there are no loops in the flows"
        },
        options: {
            followLinkNodes: { type: 'boolean', default: false}
        }
    },
    create: function(context, ruleConfig) {

        let checked = {};
        let followLinkNodes = false;
        if (ruleConfig.hasOwnProperty('followLinkNodes')) {
            followLinkNodes = ruleConfig.followLinkNodes;
        }

        function checkNode(node) {
            checked[node.id] = true;
            if (node.getPreviousNodes(followLinkNodes).length === 0) {
                // Nothing before this node - cannot be in a loop
                return;
            }
            let next = node.getNextNodes(followLinkNodes);
            if (next.length === 0) {
                // Nothing after this node - cannot be in a loop
                return;
            }
            let level = 1;
            let stack = [node]
            let visited = {};
            while(stack.length > 0) {
                let n = stack.pop();
                checked[n.id] = true;
                if (!visited[n.id]) {
                    visited[n.id] = level++;
                    let next = n.getNextNodes(followLinkNodes);
                    next.forEach(nn => {
                        if (!visited[nn.id]) {
                            stack.push(nn);
                        }
                        else if (visited[nn.id] <=
                                 visited[n.id]) {
                            context.report({
                                location: [n.id],
                                message: "loop detected"
                            });
                        }
                    });
                }
            }
        }
        return {
            node: function(node) {
                if (!checked[node.id]) {
                    checkNode(node);
                }
            }
        }
    }
};
