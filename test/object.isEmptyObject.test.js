import { isEmptyObject } from '../src/object'

test('isEmptyObject({}) to be true', () => {
  const res = isEmptyObject({})
  expect(res).toBeTruthy()
})
test('isEmptyObject({a:1, b: () => {}}) to be false', () => {
  const res = isEmptyObject({ a: 1, b: () => {} })
  expect(res).toBeFalsy()
})
test('isEmptyObject(0) to be false', () => {
  const res = isEmptyObject(0)
  expect(res).toBeFalsy()
})
