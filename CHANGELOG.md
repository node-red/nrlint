### 1.1.0

 - Update to flow-parser@1.0.2
 - Do not send event for disabled flows when lintDisabledFlows is false
 - Allow a flow-scoped warning to be disabled for that flow Fixes #15
 - Consider method property when detecting duplicate HTTP In paths Fixes #19
 - Ensure rule settings that are cleared get removed from runtime settings Fixes #11
 - Add allowDefaultName options to function/link rules (#34) @knolleary
 - Handle junctions in overlapping-nodes rule (#33) @knolleary
 - Run eslint on all parts of Function node and handle built-ins (#24) @knolleary
 - Support --version option (#25) @k-toumura
 - Add option to skip linting disabled flows (#14) @knolleary
 - Fix function-eslint rule for precise linting (#18) @k-toumura
 - Improve no-loop detection (#13) @knolleary

### 1.0.2

 - Handle rule that is disabled at the top level config

### 1.0.1

 - Fix no-loop rule to detect real loop (#10) @HiroyasuNishiyama

### 1.0.0

 - Initial release
