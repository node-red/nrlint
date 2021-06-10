const table = require("table").table;

module.exports = function(result) {
    let errCount = 0;
    let warnCount = 0;

    let rows = [];
    rows.push([
        "Object ID",
        "Severity",
        "Message",
        "Rule"
    ])
    result.forEach((e) => {
        if (!e.error) {
            rows.push([
                `${e.location[0]}${e.location.length>1?"...":""}`,
                e.severity,
                e.message,
                e.rule
            ])
            if (e.severity === "error") {
                errCount += 1;
            } else if (e.severity === "warn") {
                warnCount += 1;
            }
        }
    });
    const config = {
      drawHorizontalLine: (lineIndex, rowCount) => {
        return lineIndex === 0 || lineIndex === 1 || lineIndex === rowCount;
      }
    };
    let output = table(rows,config);
    output += `✖ ${errCount+warnCount} problems (${errCount} errors, ${warnCount} warnings)\n`;
    return output;
}
