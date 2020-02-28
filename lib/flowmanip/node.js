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

/* node */
const utils = require('./utils.js');

/** Class for FMNode (incl. subflow instances) */
class FMNode {
    /**
     * constructor
     * @param {string} id - node id.
     */
    constructor(id) {
        this.id = id || utils.genId();
        this.type = "";
        this.x = 0;
        this.y = 0;
        this.wires = [];
    }

    /**
     * connect two nodes
     * @param {number} fromport - node port number of this node
     * @param {FMNode} nextnode - reference to next node
     */
    connectTo(fromport, nextnode) {
        this.wires[fromport].push(nextnode.id);
    }

    
    /**
     * unconnect designated node with the node
     * @param {number} fromport - portnumber. if -1, remove all occurrence of nextnode
     * @param {FMNode} nextnode 
     */
    unconnectTo(fromport, nextnode) {
        if (fromport == -1) {
            for (const i = 0; i < this.wires.length; i++) {
                this.wires[i] = this.wires[i].filter(w => w !== nextnode.id);
            }
        }
        if (this.wires[fromport]) {
            this.wires[fromport] = this.wires[fromport].filter(w => w !== nextnode.id);
        }
    }
};

module.exports = FMNode;