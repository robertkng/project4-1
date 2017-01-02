module.exports = {
    "extends": "airbnb",
    "env": {
      "browser": true,
      "node": true,
      "mocha": true,
    },
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "rules": {
      "new-cap": [
        2,
        {
          "capIsNewExceptions": [
            "Map",
            "List"
          ]
        }
      ],
      "import/no-extraneous-dependencies": 0,
      "global-require": 0,
      "react/forbid-prop-types": 0,
      "import/extensions": 0,
      "react/jsx-no-bind": 0,
      "react/prefer-stateless-function": 0,
      "react/prop-types": 0
    },
};
