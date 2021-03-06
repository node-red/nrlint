const FlowParser = require('@node-red/flow-parser');
const Linter = require("../lib/linter");

// This global is used by rule workers to export their individual rules
nrlint = {
    rules: {}
};

// Initialise the linter
Linter.init({
    // Called by the linter to get ahold of a rule implementation
    resolveRule: function(ruleName) {
        return nrlint.rules[ruleName]
    }
})

console.log("Node-RED Lint Worker started")


// Listen for events from the editor
onmessage = function(event) {
    var msg = event.data;
    if (msg.cmd === 'load') {
        // A Linter Plugin has been loaded - load its worker
        handleLoad(msg.url);
    } else if (msg.cmd === 'lint') {
        // Lint the provided flow
        runLint(msg.flow, msg.config);
    }
};

function handleLoad(url) {
    var existingRules = new Set(Object.keys(nrlint.rules))
    importScripts(url)
    var updatedRules = Object.keys(nrlint.rules);
    updatedRules.forEach(function(rule) {
        if (!existingRules.has(rule)) {
            postMessage({
                "cmd": "ruleAdded",
                "rule": rule,
                "meta": nrlint.rules[rule].meta
            })
        }
    })
}

function runLint(flow, config) {
    if (!config || !config.rules) {
        return;
    }
    var result = Linter.lint(flow, config);
    postMessage({
        "cmd": "result",
        "result": result
    })
}
