const NRObject = require("./NRObject.js");

/**
 * NRContainer - Description
 * @property {object} nodes - Flow nodes in this flow/subflow/group
 */
class NRContainer extends NRObject {
    /**
     * constructor - Description
     *
     * @param {type} config Description
     *
     */
    constructor(config) {
        super(config);
        this.nodes = new Map();
    }

    /**
     * addNode - Description
     * @param {NRNode} node Description
     */
    addNode(node) {
        this.nodes.set(node.id, node);
        node.setParent(this);
    }

    exportContents() {
        let result = [];
        this.nodes.forEach((n,_) => {
            result.push(n.export());
        })
        return result;
    }

    walk(callback) {
        super.walk(callback);
        this.nodes.forEach(n => n.walk(callback))
    }
}

module.exports = NRContainer;
