# nrlint
Node-RED Flow Linter

_**WORK IN PROGRESS.  Current code is aimed for investigating architecture of flow linter.**_ 

This repository contains following 3 modules.

- nrlint
  - main module for Node-RED flow linter.
- nrlint-plugin-core
  - core rule plugin for following: 
    - check whether a function node has a name.
    - check whether each http-in node has corresponding http-response, and vice versa.
    - check whether a flow contains possible infinite loops.
- plugins/nrlint-plugin-func-style-eslint
  - flow linter plugin to check JavaScript coding style in function node.
    - currently, Editor integration is not yet supported. 

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
 % npm install -g /path/to/nrlint-plugin-core
 ...
```
- add lint configuration to $HOME/.nrlintrc.js
```
module.exports = {
  "rules": [
    {
      name: "core",
      subrules: [
        {
          name: "flowsize",
          maxSize: 10
        },
        {
          name: "no-func-name",
          mode: "warn",
        },
        {
          name: "http-in-resp"
        },
        {
          name: "loop",
        },
      ]
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
 % npm install /path/to/nrlint-plugin-core
```
- add lint configuration to $HOME/settings.js
```
...
  nrlint: {
    rules: [
      {
        name: "core",
        subrules: [
          {
            name: "no-func-name",
            mode: "warn"
          },
          {
            name: "flowsize",
            maxSize: 10
          },
          {
            name: "http-in-resp"
          },
          {
            name: "loop"
          }
        ]
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
  - flowsize
  - http-in-resp
  - loop
  
