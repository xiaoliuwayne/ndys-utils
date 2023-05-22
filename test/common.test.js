import { isNumberStr } from '../src/common.js'

describe('other function in common.js', () => {
  describe('isNumberStr related', () => {
    test('isNumberStr is a function', () => {
      const flag = getDataType(isNumberStr) === 'Function'
      expect(flag).toBeTruthy()
    })
    test('isNumberStr(nonstring) the result to be false', () => {
      const sources = [null, undefined, 0, {}, [], true]
      sources.forEach((item) => {
        const res = isNumberStr(item)
        expect(res).toBeFalsy()
      })
    })
    test("isNumberStr('1234') the result to be true", () => {
      const source = '1234'
      const res = isNumberStr(source)
      expect(res).toBeTruthy()
    })
    test("isNumberStr('0.1234') the result to be true", () => {
      const source = '0.1234'
      const res = isNumberStr(source)
      expect(res).toBeTruthy()
    })
    test("isNumberStr('1230.1234') the result to be true", () => {
      const source = '1230.1234'
      const res = isNumberStr(source)
      expect(res).toBeTruthy()
    })
    test("isNumberStr('dfg1234sd') the result to be false", () => {
      const source = 'dfg1234sd'
      const res = isNumberStr(source)
      expect(res).toBeFalsy()
    })
    test("isNumberStr('000.123') the result to be false", () => {
      const source = '000.123'
      const res = isNumberStr(source)
      expect(res).toBeFalsy()
    })
    test("isNumberStr('000.123', false) the result to be true", () => {
      const source = '000.123'
      const strictMode = false
      const res = isNumberStr(source, strictMode)
      expect(res).toBeTruthy()
    })
  })
})
