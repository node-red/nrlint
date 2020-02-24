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
 * check an existence of name of a function node 
 * @param {FlowSet} afs complete flow set
 * @param {*} conf configuration for this rule. {name: "no-func-name", maxSize: number }
 * @param {*} cxt context
 * @returns {context, result: [{rule: "no-func-name", ids: [flowid], name: "no-func-name", severity: "warn", message: "function node has no name"}]}
 */
function check (afs, conf, cxt) {
    var funcs = afs.getAllNodesArray()
        .filter(function (e) {return e.type==='function';})
        .map(function (e) {
            return {id:e.id, name:e.name};
        });
    var verified = funcs
        .filter(function (e) {return e.name === undefined || e.name === "";})
        .map(function (e){
            return {rule:"no-func-name", ids: [e.id], severity: "warn", name: "no-func-name", message: "function node has no name"};
        });

    return {context: cxt, result: verified};
}

module.exports = {
    check: check
};