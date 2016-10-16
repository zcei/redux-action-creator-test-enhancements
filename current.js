const tape = process.argv[1].includes('tape')
const ava = process.argv[1].includes('ava')

const { TEST_ACTION, testAction } = require('./test-action')

const test = tape ? require('tape') : require('ava')
const actionTest = tape ? require('tape-redux').actionTest : require('redux-ava').actionTest

// This is how it has to be done currently

if (tape) {
  // Parameters bound, not `dispatch`
  const actionCreator = testAction.bind(null, 'Alice')

  test('current tape testAction', actionTest(
    actionCreator,
    { type: TEST_ACTION, name: 'Alice', age: 42 },
    'testAction(\'Alice\') should have 42 as default age'
  ))
}

if (ava) {
  // Only one parameter can be passed within `actionTest`
  const actionCreator = testAction.bind(null, 'Bob', 35)

  test('current ava testAction', actionTest(
    actionCreator,
    null,
    { type: TEST_ACTION, name: 'Bob', age: 35 },
    'Age should be 35'
  ))
}
