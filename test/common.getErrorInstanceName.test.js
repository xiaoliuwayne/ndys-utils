import { getErrorInstanceName } from '../src/common.js'

test('getErrorInstanceName(new Error(1)) to be Error', () => {
  const res = getErrorInstanceName(new Error(1))
  expect(res).toBe('Error')
})

test('getErrorInstanceName(new EvalError(1)) to be EvalError', () => {
  const res = getErrorInstanceName(new EvalError(1))
  expect(res).toBe('EvalError')
})

test('getErrorInstanceName(new RangeError(1)) to be RangeError', () => {
  const res = getErrorInstanceName(new RangeError(1))
  expect(res).toBe('RangeError')
})

test('getErrorInstanceName(new ReferenceError(1)) to be ReferenceError', () => {
  const res = getErrorInstanceName(new ReferenceError(1))
  expect(res).toBe('ReferenceError')
})

test('getErrorInstanceName(new SyntaxError(1)) to be SyntaxError', () => {
  const res = getErrorInstanceName(new SyntaxError(1))
  expect(res).toBe('SyntaxError')
})

test('getErrorInstanceName(new TypeError(1)) to be TypeError', () => {
  const res = getErrorInstanceName(new TypeError(1))
  expect(res).toBe('TypeError')
})

test('getErrorInstanceName(new URIError(1)) to be URIError', () => {
  const res = getErrorInstanceName(new URIError(1))
  expect(res).toBe('URIError')
})

test("getErrorInstanceName(new AggregateError([new Error('some error'),], 'Hello')) to be AggregateError", () => {
  const res = getErrorInstanceName(
    new AggregateError([new Error('some error')], 'Hello')
  )
  expect(res).toBe('AggregateError')
})
