const nopt = require('nopt');
const fs = require('fs');
const path = require('path');
const linter = require('../linter');

const rules = {};

function parseArguments(args) {
    const knownOpts = {
        'help': Boolean,
        'config': [path],
        'format': String,
        'debug': Boolean,
        'init': Boolean
    };

    const shortHands = {
        'h':['--help'],
        'c':['--config'],
        'f':['--format']
    };
    return nopt(knownOpts, shortHands, args, 2);
}

function help() {
    const helpMessage = `Lint tool for Node-RED flows
    Usage: nrlint [-h] [-c configfile] flows.json

    Options:
      -h, --help                   Show this help
      -c, --config configfile      Configuration file to use, otherwise use .nrlintrc.js
      -f, --format outputFormat    Output format: 'default,json'
      --debug                      Output debugging information
      --init                       Generate a default configuration
`;
    console.log(helpMessage);
    return 0;
}

// Create a default config file.
// TODO: create a recommended set of defaults
async function initialise() {
    loadCoreRules();
    let config = { rules:{} };
    for (var r in rules) {
        var rule = rules[r];
        if (rule.meta && rule.meta.options) {
            var keyCount = 0;
            config.rules[r] = {};
            for (var opt in rules[r].meta.options) {
                if (rules[r].meta.options.hasOwnProperty(opt)) {
                    var v = rules[r].meta.options[opt];
                    if (v.type === "object") {
                        config.rules[r][opt] = v.default;
                        keyCount++;
                    }
                }
            }
            if (keyCount === 0) {
                config.rules[r] = true;
            }
        } else {
            config.rules[r] = true;
        }
    }
    console.log("module.exports = "+JSON.stringify(config,null,4))
    return 0;
}

function loadRulesFromPlugin(pluginPath) {
    try {
        const plugin = require(pluginPath);
        Object.keys(plugin).forEach(function(r) {
            rules[r] = plugin[r];
        })
    } catch(err) {
        console.log(err);
    }
}

function loadCoreRules() {
    loadRulesFromPlugin('../rules');
    loadRulesFromPlugin('../rules/function-eslint');
}

async function run(args) {
    const options = parseArguments(args);
    if (options.help) {
        return help();
    }
    if (options.init) {
        return initialise();
    }

    if (options.argv.remain.length !== 1) {
        console.error('Error: no input file');
        return help();
    }

    let flowFile = options.argv.remain[0];

    if (!fs.existsSync(flowFile)) {
        console.error(`Cannot find flow file: ${flowFile}`)
        return 1;
    }
    flowFile = path.resolve(flowFile);

    // Locate the configuration file - .nrlintrc.js in this order:
    // - user provided path via --config/-c
    // - relative to the flow file
    // - each parent directory from the flow file to the file system root
    // - ~/.node-red/.nrlintrc.js
    // - ~/.nrlintrc.js

    let configFile;
    if (options.config) {
        // - user provided path via --config/-c
        configFile = options.config;
        if (!fs.existsSync(configFile)) {
            console.error(`Cannot find configuration file: ${configFile}`)
            return 1;
        }
    } else {
        // Search for a `.nrlintrc.js` file relative to the flow file
        let searchPath = path.dirname(flowFile);
        configFile = path.join(searchPath,".nrlintrc.js");
        while(configFile && !fs.existsSync(configFile)) {
            // Check the parent directory up to the file system root
            let newSearchPath = path.resolve(searchPath,"..");
            if (newSearchPath === searchPath) {
                // At the root, stop looking
                configFile = null;
            } else {
                searchPath = newSearchPath;
                configFile = path.join(searchPath,".nrlintrc.js");
            }
        }
        // Check Node-RED User directory - assuming ~/.node-red
        if (!configFile) {
            const os = require('os');
            configFile = path.join(os.homedir(), '.node-red/.nrlintrc.js');
            if (!fs.existsSync(configFile)) {
                configFile = null;
            }
        }
        // Check home directory
        if (!configFile) {
            const os = require('os');
            configFile = path.join(os.homedir(), '.nrlintrc.js');
        }

        if (!fs.existsSync(configFile)) {
            console.error(`Cannot find configuration file`)
            return 1;
        }
    }
    let config;
    try {
        config = require(configFile);
        config.configFile = configFile;
    } catch(err) {
        console.error(`Error loading settings file: ${configFile}`);
        console.err(err);
        return 1
    }

    if (options.debug) {
        console.log(`Flow file: ${flowFile}`)
        console.log(`Configuration file: ${configFile}`)
    }

    loadCoreRules();
    if (config.plugins) {
        config.plugins.forEach(pluginName => {
            if (options.debug) {
                console.log(`Loading rules from ${pluginName}`)
            }
            loadRulesFromPlugin(pluginName);
        })
    }

    linter.init({
        resolveRule: r => rules[r]
    })

    let flowobj;
    try {
        const flowstr = fs.readFileSync(flowFile);
        flowobj = JSON.parse(flowstr);
    } catch (err) {
        console.error(`Error loading flow file: ${err.toString()}`)
        return 1;
    }
    if (flowobj) {
        try {
            const result = linter.lint(flowobj, config);
            let report;
            let outputFormatter;
            try {
                outputFormatter = require("./formatters/"+(options.format||"default"));
            } catch(err) {
                outputFormatter = require("./formatters/default");
            }
            report = outputFormatter(result);
            console.log(report);
            if (result.length > 0) {
                return 1;
            }
        } catch(err) {
            console.error(`Unexpected error: ${err.toString()}`);
            return 1;
        }
    }
    return 0;
}


module.exports = {
    run
}
