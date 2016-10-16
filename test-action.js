const TEST_ACTION = 'action/test'
const ARRAY_ACTION = 'action/array'

function testAction (name, age = 42) {
  return {
    type: TEST_ACTION,
    name,
    age
  }
}

function arrayAction (list = []) {
  return {
    type: ARRAY_ACTION,
    list
  }
}

module.exports = {
  TEST_ACTION,
  ARRAY_ACTION,
  testAction,
  arrayAction
}
