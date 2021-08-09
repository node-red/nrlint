const FlowParser = require('@node-red/flow-parser');

// resolveRule is a function called to get a rule implementation based on its name.
// Users of the linter module should call `Linter.init()` to provide a concrete
// implementation of this function for non-core modules
let resolveRule = name => {}

function init(opts) {
    if (opts.resolveRule) {
        resolveRule = opts.resolveRule;
    }
}

function parseConfigComments(info) {
    // Look for comments like: // nrlint rule-name:true|false|"off"
    var config = {};
    var re = /^[\s\t]*\/\/[\s\t]*nrlint (.*)$/mg;
    var m = re.exec(info);
    while(m) {
        var configString = m[1].replace(/\s*([:,])\s*/gu, "$1");
        configString.split(",").forEach(function(rule) {
            var parts = rule.split(":");
            if (parts.length === 1 || parts[1] === "true") {
                config[parts[0]] = true;
            } else if (parts[1] === "off") {
                config[parts[0]] = "off";
            }
        })
        m = re.exec(info);
    }
    return config;
}

/**
 * Verify flows based on configuration object
 * @param {object} flowobj The flow configuration to be linted
 * @param {object} config  Linter configuration
*/
function lint(flowobj, config) {
    config = JSON.parse(JSON.stringify(config));

    let lintDisabledFlows = true;
    if (config.hasOwnProperty('lintDisabledFlows')) {
        lintDisabledFlows = config.lintDisabledFlows;
    }
    // Parse the flow
    const flowSet = FlowParser.parseFlow(flowobj);
    const visitors = {
        start: [],
        end: [],
        flow: [],
        subflow: [],
        group: [],
        node: [],
        configNode: []
    };
    // var startTime = Date.now();
    // console.log(startTime,"start lint")
    // Check each rule in the configuration
    Object.keys(config.rules).forEach(function(ruleName) {

        // Get the rule implementation
        let rule = resolveRule(ruleName);

        if (!rule || config.rules[ruleName] === "off") {
            // Not a rule we know about, or rule disabled ("off")
            return
        }

        let ruleConfig = config.rules[ruleName];
        if (ruleConfig === true) {
            let defaultConfig = {};
            if (rule.meta.options) {
                for (let key in rule.meta.options) {
                    if (rule.meta.options[key].hasOwnProperty('default')) {
                        defaultConfig[key] = JSON.parse(JSON.stringify(rule.meta.options[key].default));
                    }
                }
            }
            ruleConfig = defaultConfig;
        }
        let context = {
            flows: flowSet,
            report: function(opts) {
                opts.rule = ruleName;
                if (!opts.severity) {
                    opts.severity = ruleConfig.severity || rule.meta.severity || "warn"
                }
                result.push(opts);
            }
        }
        // Get the rule functions for this run
        const ruleVisitors = rule.create(context, ruleConfig);

        for (let visitorType in ruleVisitors) {
            if (ruleVisitors.hasOwnProperty(visitorType)) {
                visitors[visitorType] = visitors[visitorType] || [];
                visitors[visitorType].push({
                    name: ruleName,
                    rule: rule,
                    visitor: ruleVisitors[visitorType]
                })
            }
        }
    })

    let result = [];
    let flowLevelConfigs = {};

    function dispatchVisitors(id, arg, nodeConfig) {

        if (visitors[id]) {
            var extraConfig = Object.assign({},flowLevelConfigs[arg.z]||{});
            var group = arg.group;
            while(group) {
                extraConfig = Object.assign(extraConfig,flowLevelConfigs[group.id]||{});
                group = group.group;
            }
            extraConfig = Object.assign(extraConfig,nodeConfig||{});
            visitors[id].forEach(v => {
                var ruleConfig = extraConfig[v.name] || config.rules[v.name];
                if (ruleConfig !== "off") {
                    try {
                        v.visitor.call(v.rule, arg);
                    } catch(err) {
                        console.log(err)
                    }
                }
            })
        }
    }
    // console.log(Date.now(),"start dispatch")

    dispatchVisitors('start',flowSet);
    // console.log(Date.now(),"start walk")


    let disabledFlows = new Set();

    flowSet.walk(function(obj) {
        let dispatchTypeEvent = false;
        let extraConfig = {};
        if (obj.info) {
            extraConfig = parseConfigComments(obj.info);
        }

        if (!lintDisabledFlows && obj.z && disabledFlows.has(obj.z)) {
            return;
        }

        switch(obj.TYPE) {
            case FlowParser.types.Flow:
                if (obj.disabled) {
                    disabledFlows.add(obj.id);
                    if (!lintDisabledFlows) {
                        return;
                    }
                }
                flowLevelConfigs[obj.id] = extraConfig;
                dispatchVisitors('flow',obj,extraConfig);
                break;
            case FlowParser.types.Subflow:
                flowLevelConfigs[obj.id] = extraConfig;
                dispatchVisitors('subflow',obj,extraConfig);
                break;
            case FlowParser.types.Group:
                flowLevelConfigs[obj.id] = extraConfig;
                dispatchVisitors('group',obj,extraConfig);
                break;
            case FlowParser.types.ConfigNode:
                dispatchTypeEvent = true;
                dispatchVisitors('configNode',obj,extraConfig);
                break;
            default:
                dispatchTypeEvent = true;
                dispatchVisitors('node',obj,extraConfig);
                break;
        }
        if (dispatchTypeEvent) {
            dispatchVisitors('type:'+obj.type, obj,extraConfig)
        }
    })
    // console.log(Date.now(),"end dispatch")
    dispatchVisitors('end',flowSet);
    // var endTime = Date.now();
    // console.log(endTime,"end lint",(endTime-startTime))

    return result;
}

module.exports = {
    init: init,
    lint: lint
};
