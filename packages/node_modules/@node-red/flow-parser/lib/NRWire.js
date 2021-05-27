/**
 * NRWire - Description
 * @property {NRNode} sourceNode - source of the wire
 * @property {number} sourcePortIndex - index of the source port
 * @property {NRNode} destinationNode - destination of the wire
 * @property {number} destinationPortIndex - index of the destination port
 * @property {boolean} virtual - whether this is a virtual wire between link nodes
 */
class NRWire {
    /**
     * constructor - Description
     *
     * @param {type} config Description
     *
     */
    constructor(sourceNode, sourcePortIndex, destinationNode, destinationPortIndex, virtual=false) {
        this.sourceNode = sourceNode;
        this.sourcePortIndex = sourcePortIndex;
        this.destinationNode = destinationNode;
        this.destinationPortIndex = destinationPortIndex;
        this.virtual = virtual;
    }

    toString() {
        return this.sourceNode.id+"["+this.sourcePortIndex+"] "+(this.virtual?"...":"---")+" "+this.destinationNode.id+"["+this.destinationPortIndex+"]"
    }
}

module.exports = NRWire;
