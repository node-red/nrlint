# nrlint
Node-RED Flow Linter

_**WORK IN PROGRESS.  Current code is aimed for investigating architecture of flow linter.**_ 

This repository contains following 5 modules.

- nrlint
  - main module for Node-RED flow linter.
- plugins/nrlint-plugin-func-style-eslint
  - flow linter plugin to check JavaScript coding style in function node.
- plugins/nrlint-plugin-no-func-name
  - flow linter plugin to check whether a function node has a name.
- plugins/nrlint-plugin-http-in-resp
  - flow linter plugin to check whether each http-in node has corresponding http-response, and vice versa.
- plugins/nrlint-plugin-loop
  - flow linter plugin to check whether a flow contains possible infinite loops.

## Usage

### From Command-line
- clone this repository
```
 % git clone https://github.com/node-red/nrlint.git
```
- install nrlint and plugin
```
 % npm install -g /path/to/nrlint
 % npm install -g /path/to/nrlint-plugin-func-style-eslint
 % npm install -g /path/to/nrlint-plugin-no-func-name
 ...
```
- add lint configuration to $HOME/.nrlintrc.js
```
module.exports = {
  "rules": [
    {
      "name": "no-func-name",
      "mode": "warn",
    },
    {
      "name": "func-style-eslint",
      "parserOptions": {
        "ecmaVersion": 6
      },
      "rules": {
        "semi": 2
      }
    },
  ]
}
```
- set module path to environment variable NODE_PATH
```
 % export NODE_PATH=$(npm root -g)
```

- run nrlint command
```
 % nrlint /path/to/flow.json
```

### From Node-RED Editor

- clone this repository
```
 % git clone https://github.com/node-red/nrlint.git
```
- install nrlint and plugin
```
 % cd $HOME/.node-red
 % npm install /path/to/nrlint
 % npm install /path/to/nrlint-plugin-func-style-eslint
 % npm install /path/to/nrlint-plugin-no-func-name
```
- add lint configuration to $HOME/settings.js
```
...
    nrlint: {
      rules: [
        {
          "name": "no-func-name",
          "mode": "warn",
        },
        {
          "name": "func-style-eslint",
          "parserOptions": {
            "ecmaVersion": 6
          },
          "rules": {
            "semi": 2
          }
        }
      ]
    }
...
```
- run Node-RED
```
 % npm start
```
- Then, lint tab (marked with a paw) will be appeared.

## Limitation
- Only following rule can use from editor:
  - no-func-name
  - func-style-eslint
  - flowsize
