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

const FlowSet = require('./flowmanip').FlowSet;
const path = require('path');

/**
 * Search rule definition plug-in:
 *  - Validation order is an appearance order in configuration object.
 *    - If plug-in is found, it returns 
 *    - If no plug-in is found, it returns undefined
 * @param {string} pluginName name of plugin  
 * @returns {object} module object or undefined
 */
function loadPlugin(pluginName) {
    // search globally installed module
    let name = `nrlint-plugin-${pluginName}`;
    let ruleMod = undefined;
    try {
        ruleMod = require(name);
        return ruleMod;
    } catch (_e) {
        return undefined;
    } 
}

/**
 * Verify flows based on configuration object
 * @param {object} flowobj Flows subject to verification 
 * @param {object} config  Configuration object. {"rules": [ {"name": ..., }], ... }
 * @returns 
 */
function doLint(flowobj, config) {
    return new Promise((resolve, _reject) => {
        const afs = FlowSet.parseFlow(flowobj);

        let results = {};
        const rules = config.rules;
        if (Array.isArray(rules)) {
            results = rules.reduce((acc,cur) => {
                const ruleMod = loadPlugin(cur.name);
                if (ruleMod) {
                    const {context: newCxt, result: newRes} = ruleMod.check(afs, cur, acc.context);
                    if (newRes.length > 0) {
                        return {
                            context: newCxt,
                            result: acc.result.concat(newRes)
                        };
                    } else {
                        return {
                            context: newCxt,
                            result: acc.result
                        };
                    }
                } else { // MODULE_NOT_FOUND
                    return {
                        context: acc.context,
                        result: acc.result.concat([{name:`${cur.name}`, error: "MODULE_NOT_FOUND"}])
                    };
                }
            }, {context: {}, result: []});
        }
        resolve(results);
    });
};

module.exports = {
    doLint: doLint
};