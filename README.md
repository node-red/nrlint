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
- clone this repository and build nrlint
```sh
 % git clone https://github.com/node-red/nrlint.git
 % cd nrlint
 % npm install

```
- install nrlint (and included plugins)
```sh
 % npm install -g /path/to/nrlint
 ...
```
- add lint configuration to $HOME/.nrlintrc.js
```js
module.exports = {
  rules: [
    {
      name: "core",
      subrules: [
        {
          name: "flowsize",
          maxSize: 10
        },
        {
          name: "no-func-name",
          severity: "warn",
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
      name: "func-style-eslint",
      parserOptions: {
        ecmaVersion: 6
      },
      rules: {
        semi: 2
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
```sh
 % nrlint /path/to/flow.json
```

### From Node-RED Editor

- clone this repository and build nrlint
```sh
 % git clone https://github.com/node-red/nrlint.git
 % cd nrlint
 % npm install
```
- install nrlint
```sh
 % cd $HOME/.node-red
 % npm install /path/to/nrlint
```
- add lint configuration to $HOME/settings.js
```js
...
  nrlint: {
    rules: [
      {
        name: "core",
        subrules: [
          {
            name: "no-func-name",
            severity: "warn"
          },
          {
            name: "flowsize",
            maxSize: 10,
            severity: "error"
          },
          {
            name: "http-in-resp",
            severity: "warn"
          },
          {
            name: "loop",
            severity: "warn"
          }
        ]
      },
      {
        name: "func-style-eslint",
        parserOptions: {
          ecmaVersion: 6
        },
        rules: {
          semi: 2
        }
      },
    ]
  }
...
```
- run Node-RED
```sh
 % npm start
```
- Then, lint tab (marked with a paw) will be appeared.

## Configuration

Configuration has the following structure:
```js
rules: [
  {
    name: "NAME_OF_RULE",
    severity: "(error|warn)"
    other_setting_key: "OTHER_SETTING_VALUE"
  },
  //...
]
```
### `core` plugin

The core plugin contains multiple rules, so you can configure each rule in `subrules` array.
`subrules` array have the same structure as `rules`.

#### rule `no-func-name`
This rule checks an existence of name of a function node.
```js
{
  name: "no-func-name",
  severity: "warn"
}
```
- `severity`: rule severity

#### rule `flowsize`
This rule checks a size of each flow (a.k.a tab, workspace).
```js
{
  name: "flowsize",
  severity: "warn",
  maxSize: 100
}
```
- `severity`: rule severity
- `maxSize`: if number of nodes in a flow exceeded this value, warning or error will emit.

#### rule `http-in-resp`
This rule checks whether an HTTP-in node has corresponding HTTP-response node (or vice versa).
```js
{
  name: "http-in-resp",
  severity: "warn"
}
```
- `severity`: rule severity

#### rule `loop`
This rule checks possibility of infinite loops in a flow.
```js
{
  name: "loop",
  severity: "warn"
}
```
- `severity`: rule severity

### `func-style-eslint` plugin
This rule checks coding style in a function nodes.
```js
{
  name: "func-style-eslint"
  parserOptions: {
    ecmaVersion: 6
  },
  rules: {
    semi: 2
  }
}
```
- `parserOptions`, `rules` etc.: ESLint configuration parameters.  See [ESLint documentation](https://eslint.org/docs/user-guide/configuring/)
