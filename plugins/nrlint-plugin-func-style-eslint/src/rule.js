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

var Linter = require('eslint4b');
var linter = new Linter();

/**
 * Check coding style in a function node. 
 * @param {FlowSet} afs complete flow set
 * @param {*} conf configuration for this rule. {name: "func-style-eslint", rules: ESLint rules }
 * @param {*} cxt context
 * @returns {context, result: [{rule: "func-style-eslint", ids: [flowid], name: "func-style-eslint", severity: "warn", message: "lint result", additionalInfo:{...}}]}
 */
function check(afs, conf, cxt) {
    var res = [];
    var funcs = afs.getAllNodesArray()
        .filter(function (e) {return e.type==='function';})
        .map(function (e) {
            return {id:e.id, func:e.func};
        });
    funcs.forEach(function (e) {
        var f = "function dummy(msg) {\n" + e.func + "\n};";
        var result = linter.verify(f, conf);
        result.forEach(function(r) {
            res.push({
                rule: "func-style-eslint",
                ids: [e.id],
                name: "func-style-eslint",
                severity: "warn",
                message: r.message,
                additionalInfo: r
            });
        });
    });
    return {context:cxt, result: res};
}

module.exports = {
    check: check,
};