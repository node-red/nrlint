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

const utils = require('./utils.js');

/** Class represents a Flow (aka Tab, Workspace) 
 * This object manages nodes in the Flow.
 * It doesn't contain nodes which are linked by link nodes.
 */
class FMFlow {
    /**
     * Construct a flow.
     * @constructor
     * @param {string} id - Id of flow.  if null, constructor generates it from random value. 
     */
    constructor(id, name) {
        this.id = id || utils.genId();
        this.name = name || "";  
        this.nodes = []; // [FMNode]
    }

    /**
     * Iterator
     */
    *[Symbol.iterator]() {
        yield* this.nodes;
    }

    /** 
     * add single node to the flow.
     * TODO: This function may be eliminated, because it just create dangling node.
     *       We recommend to use insert function.
     * @param {Node} node - node to be added.
    */
    addNode(node) {
        this.nodes.push(node);
    }

    /**
     * get node by Id
     * @param {string} id 
     */
    getNode(id) {
        return this.nodes.find(elem => elem.id === id);
    }

    /**
     * retrieve array of next node in this flow
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
    }

    /**
     * retrieve array of previous node in this flow  
     * @param {string} id 
     * @returns {string[]} list of node ids.
     */
    prev(id) {
        return this.nodes.filter(n => n.wires.some(w => w.includes(id))).map(n => n.id);
    }

    /**
     * insert node
     * @param {FMNode} node - a node to be inserted
     * @param {number} wid - a node port to be connected
     * @param {string} pnid - id of the node in front of inserting node
     * @param {number} pport - port number of previous node
     * @param {string} nnid - id of the node after inserting node
     */
    insert(node, wid, pnid, ppport, nnid) {
        const pnode = this.getNode(pnid);
        const nnode = this.getNode(nnid);
        if (pnode) {
            pnode.connectTo(pport, node);
        }
        if (nnode) {
            node.connectTo(wid, nnode);
        }
        if (pnode && nnode) { // delete existing direct link between pnode and nnode
            pnode.wires[pport] = pnode.wires[pport].filter(e => e !== nnode.id);
        }
    }

    /**
     * remove node from the flow. 
     * @param {id} nid 
     */
    remove(nid) {
        const node = this.getNode(nid);
        if (node) {
            const ps = this.prev(node.id);
            ps.forEach(p => {
                const pn = this.getNode(p);
                p.unconnectTo(-1, nid);
            });
        }
        this.nodes = this.nodes.filter(n => n.id !== nid);

        return node;
    }

    /**
     * analyse difference of two flows
     * @param {FMFlow} flow flow to be compared
     * @returns {Object} node ids of added, deleted, and changed nodes 
     */
    diff(flow) {
        // TODO: implement
    }
};

module.exports = FMFlow;