/**
 * Copyright JS Foundation and other contributors, http://js.foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

/* Subflow class */
const utils = require('./utils.js');

/** Class for subflow container node (not instance) */
class FMSubFlow {

    /**
     * constructor
     * @param {string} id 
     * @constructor
     */
    constructor(id, name) {
        this.id = id || utils.genId();
        this.name = name || "";
        this.nodes = []; // subflow elements + pseudo in/out node
        this.in = [];    // add Id for each in/out object (type == "pseudoin-subflow" etc.)
        this.out = [];   //    when serialized, ids have been omitted.
    }

    *[Symbol.iterator]() {
        const filtered = this.nodes.filter(e => e.type !== "pseudoin-subflow" && e.type !== "pseudoout-subflow");
        yield* filtered;
    }

    /**
     * add node to the subflow
     * @param {FMNode} node 
     */
    addNode(node) {
        this.nodes.push(node);
    }

    /**
     * get node by id
     * @param {string} nid 
     */
    getNode(nid) {
        return this.nodes.find(elem => elem.id === nid);
    }

    /**
     * retrieve array of next node in this subflow
     * @param {string} id 
     * @returns {string[]} List of node ids.
     */
    next(id) {
        const n = this.getNode(id);
        if (n) {
            return n.wires.reduce((acc,val) => acc.concat(val), []);
        } else {
            return [];
        }
        // TODO: How to treat subflow output port?
    }

    /**
     * retrive array of previous node in this flow  
     * @param {string} id 
     * @returns {string[]} list of node ids.
     */
    prev(id) {
        return this.nodes.filter(n => n.wires.some(w => w.includes(id))).map(n => n.id);
        // TODO: How to treat subflow input port?
    }

    /**
     * insert node (between ordinal nodes) 
     * @param {FMNode} tnode node to be inserted.
     * @param {number} tport port number for connect to next node
     * @param {string} pnid previous node.
     * @param {number} pport previout node's port
     * @param {string} nnid next node.
     */
    insert(tnode, tport, pnid, pport, nnid) {
        const pnode = this.getNode(pnid);
        const nnode = this.getNode(nnid);
        if (pnode) {
            pnode.connectTo(pport, tnode);
        } 
        if (nnode) {
            tnode.connectTo(tport, nnode);
        } 
        if (pnode && nnode) {
            pnode.wires[pport] = pnode.wires[pport].filter(e => e !== nnode.id);
        }
    }

    /**
     * remove the node from subflow
     * @param {id} id node's id
     * @returns {Node} removed node object
     */
    remove(nodeId) {
        // TODO: implement
    }

    /**
     * create input/output ports as special node
     * @param {number} numIn number of in node
     * @param {number} numOut number of out node
     */
    setInOutNode(numIn, numOut) {
        if (this.in.length < numIn) {
            for (let i = this.in.length; i < numIn; i++) {
                const pseudoIn = new Node();
                pseudoIn.type = "pseudoin-subflow";
                this.addNode(pseudoIn);
                this.in.push({x:100, y:100*i, id: pseudoIn.id, wires: []});
            }
        } else if (this.in.length > numIn) {
            const removed = this.in.splice(numIn);
            this.nodes = this.nodes.filter(e => !removed.some(r => r.id === e.id));
        }
        if (this.out.length < numOut) {
            for (let i = this.out.length; i < numOut; i++) {
                const pseudoOut = new Node();
                pseudoOut.type = "pseudoout-subflow";
                this.addNode(pseudoOut);
                this.out.push({x:200, y:100*i, id: pseudoOut.id, wires: []});
            }
        } else if (this.out.length > numOut) {
            const removed = this.out.splice(numOut);
            this.nodes = this.nodes.filter(e => !removed.some(r => r.id === e.id));
        }
    }

    /**
     * analyse difference of two flows
     * @param {FMFlow} flow flow to be compared
     * @returns {Object} node ids of added, deleted and change nodes  
     */
    diff(flow) {
        // TODO: implement
    }
};

module.exports = FMSubFlow;