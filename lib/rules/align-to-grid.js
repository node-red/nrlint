module.exports = {
    meta: {
        type: "suggestion",
        severity: "warn",
        docs: {
            description: "ensure nodes are aligned to the grid"
        },
        options: {
            "gridSize": {type: 'number', default: 20 }
        }
    },
    create: function(context, ruleConfig) {
        let gridSize = 20;
        if ('gridSize' in ruleConfig) {
            gridSize = parseInt(ruleConfig.gridSize) || 20;
        }
        return {
            "node": function(node) {
                if (node.hasOwnProperty('w') && node.hasOwnProperty('h')) {
                    var nx = (node.x-node.w/2)/gridSize
                    var ny = gridSize*Math.floor(node.y/gridSize);
                    if (nx != Math.floor(nx) || ny != Math.floor(ny)) {
                        context.report({
                            location: [node.id],
                            message: "Node not aligned to grid"
                        })
                    }
                }
            }
        }
    }
};
