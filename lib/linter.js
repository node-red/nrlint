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

/**
 * Verify flows based on configuration object
 * @param {object} flowobj The flow configuration to be linted
 * @param {object} config  Linter configuration
*/
function lint(flowobj, config) {
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
                    rule: rule,
                    visitor: ruleVisitors[visitorType]
                })
            }
        }
    })

    let result = [];

    function dispatchVisitors(id, arg) {
        if (visitors[id]) {
            visitors[id].forEach(v => {
                try {
                    v.visitor.call(v.rule, arg);
                } catch(err) {
                    console.log(err)
                }
            })
        }
    }
    // console.log(Date.now(),"start dispatch")

    dispatchVisitors('start',flowSet);
    // console.log(Date.now(),"start walk")

    flowSet.walk(function(obj) {
        let dispatchTypeEvent = false;
        switch(obj.TYPE) {
            case FlowParser.types.Flow:
                dispatchVisitors('flow',obj);
                break;
            case FlowParser.types.Subflow:
                dispatchVisitors('subflow',obj);
                break;
            case FlowParser.types.Group:
                dispatchVisitors('group',obj);
                break;
            case FlowParser.types.ConfigNode:
                dispatchTypeEvent = true;
                dispatchVisitors('configNode',obj);
                break;
            default:
                dispatchTypeEvent = true;
                dispatchVisitors('node',obj);
                break;
        }
        if (dispatchTypeEvent) {
            dispatchVisitors('type:'+obj.type, obj)
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
