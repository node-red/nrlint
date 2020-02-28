module.exports = {
  "extends": ["plugin:node/recommended"],
  "env": {
    "es6": true,
    "mocha": true
  },
  "globals": {},
  "rules": {
    "semi": [
      2,
      "always"
    ],
    "curly": 2,
    "no-eq-null": 2,
    "no-extend-native": 2,
    "indent": [
      2,
      4,
      {
        "SwitchCase": 1
      }
    ],
    "guard-for-in": 2,
    "wrap-iife": [
      2,
      "any"
    ],
    "no-irregular-whitespace": 2,
    "no-loop-func": 2,
    "no-shadow": 0,
    "dot-notation": 0,
    "no-proto": 2
  },
  "overrides": [{
    "files": "test/**/*_spec.js",
    "rules": {
      "node/no-unpublished-require": 0
    }
  }]
};
