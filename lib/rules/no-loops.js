
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
        let stack = {};

        let followLinkNodes = false;
        if (ruleConfig.hasOwnProperty('followLinkNodes')) {
            followLinkNodes = ruleConfig.followLinkNodes;
        }

        function checkNodeGraph(node) {
            let result = new Set();
            if (stack[node.id]) {
                result.add(node.id);
                return result;
            }
            if (checked[node.id]) {
                return result;
            }

            checked[node.id] = true;
            stack[node.id] = true;
            let next = node.getNextNodes(followLinkNodes);
            for (let i=0; i<next.length; i++) {
                let nextResult = checkNodeGraph(next[i]);
                nextResult.forEach(result.add,result);
            }
            if (result.size > 0) {
                result.add(node.id);
            }
            delete stack[node.id];
            return result;
        }

        function checkNode(node) {
            if (node.getPreviousNodes(followLinkNodes).length === 0) {
                // Nothing before this node - cannot be in a loop
                return;
            }
            let next = node.getNextNodes(followLinkNodes);
            if (next.length === 0) {
                // Nothing after this node - cannot be in a loop
                return;
            }

            const result = checkNodeGraph(node);
            if (result.size > 0) {
                context.report({
                    location: Array.from(result),
                    message: "loop detected"
                });
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
