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
const FlowSet = require('../lib/flowmanip').FlowSet;
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

if (parsedArgs.help) {
    console.log('Lint tool for Node-RED flow');
    console.log('Usage: nrlint [-h] flow.json');
    console.log('');
    console.log('Options:');
    console.log('  -h, --help            show this help');
    console.log('  -c, --config   FILE   use specified configuration');
    console.log('                        otherwise, use .nrlintrc.js');
    process.exit();
}

if (parsedArgs.argv.remain.length !== 1) {
    console.error('Error: no input file');
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

flowFile = parsedArgs.argv.remain[0];
console.log(`parsing ${flowFile}...`);

const flowstr = fs.readFileSync(flowFile);
const flowobj = JSON.parse(flowstr);

function printResult(res) {  // TODO: customizable output format
    let errCount = 0;
    let warnCount = 0;

    console.log(flowFile);
    res.result.forEach((e) => {
        console.log(`  ${e.ids[0]}${e.ids.length>1?"...":""}\t${e.severity}\t'${e.message}'\t${e.name}`);
        if (e.severity === "error") {
            errCount += 1;
        } else if (e.severity === "warn") {
            warnCount += 1;
        }
    });
    console.log(`✖ ${errCount+warnCount} problems (${errCount} errors, ${warnCount} warnings)`);
}

const result = linter.doLint(flowobj, config).then(printResult);

process.exitCode = 0;