# nrlint-plugin-http-in-resp

Nrlint plug-in for checking whether an http-in node has correspond http-response nodes, or vice versa.

## Usage

### Use with nrlint command

After installing nrlint command, install this package as a global package.
Then, add a description to configuration file (default: $HOME/.nrlintrc.js)

```
module.exports = {
    "rules": [
        {
            name: "http-in-resp"
        },
        ...
    ]
}
...
```
.

