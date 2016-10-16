# Action Creator Test Enhancements For `tape-redux` and `redux-ava`

## Why?

Allow multiple parameters for action creators

## Changes

New signature: `actionTest(actionCreator[, ...data], expected[, description])`

## Tests

* All tests: `npm test`
* Current behavior: `npm run test:current`
* Proposed behavior: `npm run test:next`
