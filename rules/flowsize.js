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

/**
 * Check size of each flow 
 * @param {FlowSet} afs complete flow set
 * @param {*} conf configuration for this rule. {name: "flowsize", maxSize: number }
 * @param {*} cxt context
 * @returns {context, result: [{rule: "flowsize", ids: [flowid], name: "flowsize", severity: "warn", message: "too large flow size"}]}
 */
function check(afs, conf, cxt) {
    const flows = afs.flows;
    const result = [];

    flows.forEach((flow) => {
        const nodes = [...flow];
        let maxSize = 100;
        if (conf.hasOwnProperty("maxSize")) {
            maxSize = conf.maxSize;
        }
        if (nodes.length > maxSize) {
            result.push({rule: "flowsize", ids: [flow.id], name: "flowsize", severity: "warn", message: "too large flow size" } );
        }
    }); 

    return {
        context: cxt,
        result: result
    };
}

module.exports = {
    check: check
};