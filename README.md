# nrlint - Node-RED Flow Linter

nrlint is a linting tool for identifying potential problems with Node-RED flows.

It can be used within the Node-RED editor or run as a command-line tool.

## Installation and Usage

### In the editor

In your Node-RED user directory (typically `~/.node-red`), run:

```
npm install nrlint
```

You can then generate a default configuration file with:

```
npx nrlint --init > .nrlintrc.js
```

Edit your Node-RED settings file, `~/.node-red/settings.js` and add the follow
inside the `module.exports` block. Remember, each entry in the block must be separated
by a comma (`,`).

```
module.exports {
    // Add a `nrlint` entry pointing to your nrlint config file
    nrlint: require("./.nrlintrc.js"),
}
```

Finally, restart Node-RED.

In the editor you will now have a linter sidebar available. It will report
any warnings or errors the linter detects whilst you edit your flows.

The cog icon at the top of the sidebar allows you to customise your linter configuration.
Note that doing so will not modify the `.nrlintrc.js` file you created - the new
configuration will be stored in the editor preferences.

### Command-line usage

You can run nrlint as a command line tool to lint a local json flow file.

Following the instructions above to install nrlint. You can then run it from the
`~/.node-red` directory using `npx`:

```
npx nrlint myFlowFile.json
```

Run with `--help` to see the available options.


## Developing

To use the development version of nrlint you can clone its source code repository
and build it yourself.

1. Get the source code

```
git clone https://github.com/node-red/nrlint.git
```

2. Install the dependencies

```
cd nrlint
npm install
```

3. Build the plugin

```
npm run build
```

4. Install into Node-RED

```
cd ~/.node-red
npm install <path-to-nrlint-directory>
```

5. Restart Node-RED to load the linter.

### Source code structure

 - `bin` - CLI executable
 - `lib` - main source code of the linter
   - `cli` - source code of the CLI
     - `formatters` - source code of the output formatters used by the CLI version
   - `rules` - source code of the built-in rules
     - `function-eslint` - source code of the built-in function-eslint rule.
 - `scripts` - build scripts used by `npm run build`
 - `src` - source code of the plugins

After `npm run build` is run, the following directories will be created:

 - `dist` - contains the built plugin files
 - `resources` contains the built Worker files


## Acknowledgements

nrlint is modelled after [eslint](https://eslint.org/) and borrows many of its concepts.
