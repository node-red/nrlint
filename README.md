# nrlint
Node-RED Flow Linter

_**WORK IN PROGRESS.  Current code is aimed for investigating architecture of flow linter.**_ 

This repository contains following submodules.

- nrlint-main
  -  main plugin, and CLI frontend
- nrlint-plugin-core
  - core rule plugin for following: 
    - checking whether a function node has a name.
    - checking whether each http-in node has corresponding http-response, and vice versa.
    - checking whether a flow contains possible infinite loops.
- nrlint-plugin-func-style-eslint
  - rule plugin for checking JavaScript coding style in function node.

## Usage

### From Command-line
- clone this repository
```
 % git clone https://github.com/node-red/nrlint.git
```
- install nrlint (and included plugins)
```
 % npm install -g /path/to/nrlint
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
- (if you are using nvm) set module path to environment variable NODE_PATH
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
- install nrlint 
```
 % cd $HOME/.node-red
 % npm install /path/to/nrlint
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

  
