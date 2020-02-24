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
 * Does HTTP-in node has corresponding HTTP-response node? 
 * @param {FlowSet} afs complete flow set
 * @param {*} conf configuration for this rule. {name: "http-in-resp"}
 * @param {*} cxt context
 * @returns {context, result: [{rule: "http-in-resp", ids: [flowid], name: "dangling-http-in/resp", severity: "warn", message: "dangling http-in node"}]}
 */
function check (afs, conf, cxt) {
    const danglingHttpIns = afs.getAllNodesArray()
        .filter(e => e.type === 'http in')
        .filter(e => {
            const ds = afs.downstream(e.id);
            return ds.length === 0 || ds.every(i => afs.getNode(i).type != 'http response');
        })
        .map(e => ({rule:"http-in-resp", ids: [e.id], name: "dangling-http-in", severity: "warn", message: "dangling http-in node"}));

    const danglingHttpResponses = afs.getAllNodesArray()
        .filter(e => e.type==='http response')
        .filter(e => {
            const ds = afs.upstream(e.id);
            return ds.length === 0 || ds.every(i => afs.getNode(i).type != 'http in');
        })
        .map(e => ({rule:"http-in-resp", ids: [e.id], name: "dangling-http-resp", severity: "warn", message: "dangling http-response node"}));

    return {context: cxt, result: danglingHttpIns.concat(danglingHttpResponses)};
}

module.exports = {
    check: check
};