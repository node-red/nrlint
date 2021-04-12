#!/usr/bin/env node

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

/* eslint no-process-exit: 0 */
const nopt = require('nopt');
const fs = require('fs');
const path = require('path');
const linter = require('../lib/linter');
const os = require('os');

const defaultConfigFile = path.join(os.homedir(), '.nrlintrc.js');

const knownOpts = {
    'help': Boolean,
    'config': [path],
};

const shortHands = {
    'h':['--help'],
    'c':['--config'],
};

const parsedArgs = nopt(knownOpts, shortHands, process.argv, 2);

const helpMessage = `Lint tool for Node-RED flow
Usage: nrlint [-h] [-c configfile] flows.json'

Options:
  -h, --help                show this help
  -c, --config configfile   use specified configuration
                            otherwise, use .nrlintrc.js`;

if (parsedArgs.help) {
    console.log(helpMessage);
    process.exit();
}

if (parsedArgs.argv.remain.length !== 1) {
    console.error('Error: no input file');
    console.error(helpMessage);
    process.exit(1);
}

// read configuration file
const configFile = parsedArgs.config ? parsedArgs.config : defaultConfigFile;
let config;
try {
    config = require(configFile);
    config.configFile = configFile;
} catch(err) {
    console.log(`Error loading settings file: ${parsedArgs.config}`);
    console.log(err);
    process.exit(1);
}

const flowFile = parsedArgs.argv.remain[0];

function printResult(res) {  // TODO: customizable output format
    let errCount = 0;
    let warnCount = 0;

    res.result.forEach((e) => {
        if (!e.error) {
            console.log(`  ${e.ids[0]}${e.ids.length>1?"...":""}\t${e.severity}\t'${e.message}'\t${e.name}`);
            if (e.severity === "error") {
                errCount += 1;
            } else if (e.severity === "warn") {
                warnCount += 1;
            }
        }
    });
    console.log(`✖ ${errCount+warnCount} problems (${errCount} errors, ${warnCount} warnings)`);
}

(async () => {
    try {
        const flowstr = fs.readFileSync(flowFile);
        console.log(`parsing ${flowFile}...`);
        const flowobj = JSON.parse(flowstr);
        const result = await linter.doLint(flowobj, config);
        printResult(result);
    } catch(err) {
        console.error(`${err.toString()}`);
    }
})();

process.exitCode = 0;