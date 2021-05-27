#!/usr/bin/env node

/* eslint no-process-exit: 0 */

const linterCli = require("../lib/cli");

linterCli.run(process.argv).then(rc => {
    process.exitCode = rc;
}).catch(err => {
    process.exitCode = 1;
    console.error(`Unexpected error: ${err.toString()}`);
});
