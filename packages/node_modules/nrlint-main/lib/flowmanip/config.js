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

/*  */
const utils = require('./utils.js');

/** Class for config node */
class FMConfig {

    /**
     * constructor
     * @param {Id} id 
     * @constructor
     */
    constructor(id) {
        /**
         * Id of the Config node
         * @public
         */
        this.id = id || utils.genId();
        /**
         * Type of the Config node
         * @public
         */
        this.type = "";
    }
}

module.exports = FMConfig;
