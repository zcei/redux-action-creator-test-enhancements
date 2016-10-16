const tape = process.argv[1].includes('tape')

const { TEST_ACTION, ARRAY_ACTION, testAction, arrayAction } = require('./test-action')
const test = tape ? require('tape') : require('ava')

const actionTestAsArray = (actionCreator, data, expected, description) => t => {
  const args = [].concat(data)
  t.deepEqual(actionCreator(...args), expected, description)
  tape && t.end()
}

const actionTestMultipleParams = (actionCreator, ...params) => {
  const length = params.length
  const hasDescription = typeof params[length - 1] === 'string'
  const description = hasDescription ? params[length - 1] : ''
  const offset = hasDescription ? 2 : 1
  const expected = params[length - offset]
  const args = params.slice(0, length - offset)

  return (t) => {
    t.deepEqual(actionCreator(...args), expected, description)
    tape && t.end()
  }
}

const actionTests = {
  current: {

  },
  next: {
    multipleParams: actionTestMultipleParams,
    asArray: actionTestAsArray
  }
}

// This is how it should work in my opinion

// Allow array as data
test('asArray with single param', actionTests.next.asArray(
  testAction,
  'Alice',
  { type: TEST_ACTION, name: 'Alice', age: 42 },
  'testAction(\'Alice\') should have 42 as default age'
))

test('asArray with multiple params', actionTests.next.asArray(
  testAction,
  ['Bob', 35],
  { type: TEST_ACTION, name: 'Bob', age: 35 },
  'Age should be 35'
))
test('asArray with single array param', actionTests.next.asArray(
  arrayAction,
  [[0, 1, 2, 3]],
  { type: ARRAY_ACTION, list: [0, 1, 2, 3] },
  'List should be array'
))

test('multipleParams with single param', actionTests.next.multipleParams(
  testAction,
  'Alice',
  { type: TEST_ACTION, name: 'Alice', age: 42 },
  'testAction(\'Alice\') should have 42 as default age'
))

test('multipleParams with multiple params', actionTests.next.multipleParams(
  testAction,
  'Bob',
  35,
  { type: TEST_ACTION, name: 'Bob', age: 35 },
  'Age should be 35'
))

test('multipleParams with single array param', actionTests.next.multipleParams(
  arrayAction,
  [0, 1, 2, 3],
  { type: ARRAY_ACTION, list: [0, 1, 2, 3] },
  'List should be array'
))
