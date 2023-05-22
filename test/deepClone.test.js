import { getDataType, stringifyData } from '../src/common.js'
import {
  deepClone,
  deepCloneArr,
  deepCloneObj,
  getObjPropertiesOrSymbols,
  getObjPropertiesByGetOwnPropertySymbols,
  getObjPropertiesByGetOwnPropertyNames,
  getObjPropertiesByForIn,
  getObjPropertiesByKeys,
} from '../deepClone.js'

describe('deepClone.js module test', () => {
  const baseObjS1 = Symbol('baseObjS1'),
    baseObjS2 = Symbol('baseObjS2'),
    testObjS1 = Symbol('testObjS1'),
    testObjS2 = Symbol('testObjS2')
  const baseObj = {
    // properties baseObjP1,baseObjP2,
    // they are enumerable properties for itself
    // for testObj,they are inherited enumerable properties
    baseObjP1: 1,
    baseObjP2: 2,
  }
  baseObj[baseObjS1] = 'baseObjSymbol1'
  baseObj[baseObjS2] = 'baseObjSymbol2'
  // non-enumerable properties
  Object.defineProperties(baseObj, {
    baseObjNonEnumP1: {
      value: 'baseObjNonEnumP1',
      writable: true,
      enumerable: false, // if enumerable is false,then baseObj.baseObjNonEnumP1 === undefined
    },
    baseObjNonEnumP2: {
      value: 'baseObjNonEnumP2',
      writable: false,
      enumerable: false,
    },
  })

  // baseObj as the prototype of the newly created object >> testObj.
  const testObj = Object.create(baseObj, {
    //  own enumerable properties
    testObjP1: {
      value() {
        return 'testObjP1 is a function'
      },
      writable: false,
      enumerable: true,
    },
    testObjP2: {
      value: 'testObjP2',
      writable: true,
      enumerable: true,
    },
    // own non-enumerable properties
    testObjNonEnumP1: {
      value() {
        return 'testObjNonEnumP1'
      },
      enumerable: false,
    },
    testObjNonEnumP2: {
      value: 'testObjNonEnumP2',
      enumerable: false,
    },
  })
  // add own symbols
  testObj[testObjS1] = 'testObjS1'
  testObj[testObjS2] = 'testObjS2'
  console.log('baseObj:', baseObj, '\ntestObj:', testObj)

  describe('deepCloneArr in deepClone.js module', () => {
    test('deepCloneArr is a function', () => {
      const flag = getDataType(deepCloneArr) === 'Function'
      expect(flag).toBeTruthy()
    })

    test('the result of deepCloneArr(testArr) is testArrRes and testArrRes is a deep copy of testArr', () => {
      const testArr = [1, 2, 3]
      const testArrRes = deepCloneArr(testArr)
      expect(testArr === testArrRes).toBeFalsy()
      expect(stringifyData(testArr) === stringifyData(testArrRes)).toBeTruthy()
    })

    test('deepCloneArr(nonArrType) return itself', () => {
      const nonArrTypes = [
        { a: 1, b: 2 },
        0,
        '2',
        false,
        null,
        undefined,
        () => {},
      ]
      for (const nonArrType of nonArrTypes) {
        const nonArrTypeRes = deepCloneArr(nonArrType)
        expect(nonArrType === nonArrTypeRes).toBeTruthy()
      }
    })
  })

  describe('getObjPropertiesOrSymbols in deepClone.js module', () => {
    test('getObjPropertiesOrSymbols is a function', () => {
      const flag = getDataType(getObjPropertiesOrSymbols) === 'Function'
      expect(flag).toBeTruthy()
    })

    test('default mode OwnEnumProperties:getObjPropertiesOrSymbols(testObj) to equal expectRes', () => {
      //  Object.keys()
      const expectRes = ['testObjP1', 'testObjP2']
      const res = getObjPropertiesOrSymbols(testObj)
      expect(res).toEqual(expect.arrayContaining(expectRes))
    })

    test('OwnAndInheritedEnumProperties mode:getObjPropertiesOrSymbols(testObj) to equal expectRes', () => {
      // for ... in obj
      // all enumerable string properties of an object , including inherited enumerable properties.
      const expectRes = ['testObjP1', 'testObjP2', 'baseObjP1', 'baseObjP2']
      const res = getObjPropertiesOrSymbols(
        testObj,
        'OwnAndInheritedEnumProperties'
      )
      expect(res).toEqual(expect.arrayContaining(expectRes))
    })

    test('OwnEnumAndOwnNonenumProperties mode:getObjPropertiesOrSymbols(testObj) to equal expectRes', () => {
      // Object.getOwnPropertyNames()
      // all properties (including enumerable and non-enumerable properties)
      const expectRes = [
        'testObjP1',
        'testObjP2',
        'testObjNonEnumP1',
        'testObjNonEnumP2',
      ]
      const res = getObjPropertiesOrSymbols(
        testObj,
        'OwnEnumAndOwnNonenumProperties'
      )
      expect(res).toEqual(expect.arrayContaining(expectRes))
    })

    test('OwnAndInheritedEnumPropertiesAndOwnNonenum mode:getObjPropertiesOrSymbols(testObj) to equal expectRes', () => {
      // Object.getOwnPropertyNames() + for ... in obj
      const expectRes = [
        'testObjP1',
        'testObjP2',
        'baseObjP1',
        'baseObjP2',
        'testObjNonEnumP1',
        'testObjNonEnumP2',
      ]
      const res = getObjPropertiesOrSymbols(
        testObj,
        'OwnAndInheritedEnumPropertiesAndOwnNonenum'
      )
      expect(res).toEqual(expect.arrayContaining(expectRes))
    })

    test('OwnSymbols mode:getObjPropertiesOrSymbols() return ', () => {
      // Object.getOwnPropertySymbols()
      // all own symbol properties
      const expectRes = [testObjS1, testObjS2]
      const res = getObjPropertiesOrSymbols(testObj, 'OwnSymbols')
      expect(res).toEqual(expect.arrayContaining(expectRes))
    })

    test('OwnAndInheritedEnumPropertiesAndOwnSymbols mode:getObjPropertiesOrSymbols(testObj) to equal expectRes', () => {
      // for ... in obj + Object.getOwnPropertySymbols()
      const expectRes = [
        'testObjP1',
        'testObjP2',
        'baseObjP1',
        'baseObjP2',
        testObjS1,
        testObjS2,
      ]
      const res = getObjPropertiesOrSymbols(
        testObj,
        'OwnAndInheritedEnumPropertiesAndOwnSymbols'
      )
      expect(res).toEqual(expect.arrayContaining(expectRes))
    })

    test('OwnAndInheritedEnumPropertiesAndOwnNonenumAndOwnSymbols mode:getObjPropertiesOrSymbols(testObj) to equal expectRes', () => {
      // Object.getOwnPropertyNames() + for ... in obj + Object.getOwnPropertySymbols()
      const expectRes = [
        'testObjP1',
        'testObjP2',
        'baseObjP1',
        'baseObjP2',
        'testObjNonEnumP1',
        'testObjNonEnumP2',
        testObjS1,
        testObjS2,
      ]
      const res = getObjPropertiesOrSymbols(
        testObj,
        'OwnAndInheritedEnumPropertiesAndOwnNonenumAndOwnSymbols'
      )
      expect(res).toEqual(expect.arrayContaining(expectRes))
    })

    test(`getObjPropertiesByGetOwnPropertySymbols(testObj) to equal [testObjS1, testObjS2]`, () => {
      const res = getObjPropertiesByGetOwnPropertySymbols(testObj)
      expect(res).toEqual([testObjS1, testObjS2])
    })

    test(`getObjPropertiesByGetOwnPropertyNames(testObj) to equal ["testObjP1", "testObjP2", "testObjNonEnumP1", "testObjNonEnumP2"]`, () => {
      const res = getObjPropertiesByGetOwnPropertyNames(testObj)
      expect(res).toEqual([
        'testObjP1',
        'testObjP2',
        'testObjNonEnumP1',
        'testObjNonEnumP2',
      ])
    })

    test(`getObjPropertiesByForIn(testObj) to equal ["testObjP1", "testObjP2", "baseObjP1", "baseObjP2"]`, () => {
      const res = getObjPropertiesByForIn(testObj)
      expect(res).toEqual(['testObjP1', 'testObjP2', 'baseObjP1', 'baseObjP2'])
    })

    test("getObjPropertiesByKeys(testObj) to equal ['testObjP1', 'testObjP2']", () => {
      const res = getObjPropertiesByKeys(testObj)
      expect(res).toEqual(['testObjP1', 'testObjP2'])
    })
  })

  describe('deepCloneObj in deepClone.js module', () => {
    test('deepCloneObj is a function', () => {
      const flag = getDataType(deepCloneObj) === 'Function'
      expect(flag).toBeTruthy()
    })

    test('the result of deepCloneObj(testObj) is testObjRes and testObjRes is a deep copy of testObj', () => {
      const innerTestObj = { a: 1, b: 2 }
      const innerTestObjRes = deepCloneObj(innerTestObj)
      expect(innerTestObj === innerTestObjRes).toBeFalsy()
      expect(
        stringifyData(innerTestObj) === stringifyData(innerTestObjRes)
      ).toBeTruthy()
    })

    test('deepCloneObj(nonObjType) return itself', () => {
      const nonObjTypes = [[1, 2, 3], 0, '2', false, null, undefined, () => {}]
      for (const nonObjType of nonObjTypes) {
        const nonObjTypeRes = deepCloneObj(nonObjType)
        expect(nonObjType === nonObjTypeRes).toBeTruthy()
      }
    })

    test('default mode OwnEnumProperties:deepCloneObj(testObj) to equal deep clone of innerExpectObj', () => {
      //  object's own enumerable property
      const innerExpectObj = {
        testObjP1: function value() {
          return 'testObjP1 is a function'
        },
        testObjP2: 'testObjP2',
      }
      const res = deepCloneObj(testObj)
      expect(innerExpectObj === res).toBeFalsy()
      expect(stringifyData(innerExpectObj) === stringifyData(res)).toBeTruthy()
    })

    test("OwnEnumProperties mode:deepCloneObj(testObj,'OwnEnumProperties') to equal deep clone of innerExpectObj ", () => {
      //  object's own enumerable property
      const innerExpectObj = {
        testObjP1: function value() {
          return 'testObjP1 is a function'
        },
        testObjP2: 'testObjP2',
      }
      const res = deepCloneObj(testObj)
      expect(innerExpectObj === res).toBeFalsy()
      expect(stringifyData(innerExpectObj) === stringifyData(res)).toBeTruthy()
    })

    test("OwnAndInheritedEnumProperties mode:deepCloneObj(testObj,'OwnAndInheritedEnumProperties') to equal deep clone of innerExpectObj ", () => {
      //  all enumerable string properties of an object , including inherited enumerable properties.
      const innerExpectObj = {
        testObjP1: function value() {
          return 'testObjP1 is a function'
        },
        testObjP2: 'testObjP2',
        baseObjP1: 1,
        baseObjP2: 2,
      }
      const res = deepCloneObj(testObj, 'OwnAndInheritedEnumProperties')
      expect(innerExpectObj === res).toBeFalsy()
      expect(stringifyData(innerExpectObj) === stringifyData(res)).toBeTruthy()
    })

    test("OwnSymbols mode:deepCloneObj(testObj,'OwnSymbols') to equal deep clone of innerExpectObj ", () => {
      //  all symbols
      const innerExpectObj = {
        [testObjS1]: 'testObjS1',
        [testObjS2]: 'testObjS2',
      }
      const res = deepCloneObj(testObj, 'OwnSymbols')
      expect(innerExpectObj === res).toBeFalsy()
      expect(stringifyData(innerExpectObj) === stringifyData(res)).toBeTruthy()
    })
    test("OwnAndInheritedEnumPropertiesAndOwnSymbols mode:deepCloneObj(testObj,'OwnAndInheritedEnumPropertiesAndOwnSymbols') to equal deep clone of innerExpectObj ", () => {
      //  all properties and all symbols
      const innerExpectObj = {
        testObjP1: function value() {
          return 'testObjP1 is a function'
        },
        testObjP2: 'testObjP2',
        baseObjP1: 1,
        baseObjP2: 2,
        [testObjS1]: 'testObjS1',
        [testObjS2]: 'testObjS2',
      }
      const res = deepCloneObj(
        testObj,
        'OwnAndInheritedEnumPropertiesAndOwnSymbols'
      )
      expect(innerExpectObj === res).toBeFalsy()
      expect(stringifyData(innerExpectObj) === stringifyData(res)).toBeTruthy()
    })
  })

  describe('deepClone in deepClone.js module', () => {
    test('deepClone is a function', () => {
      const flag = getDataType(deepClone) === 'Function'
      expect(flag).toBeTruthy()
    })

    test('the result of deepClone(testArr) is testArrRes and testArrRes is a deep copy of testArr', () => {
      const testArr = [1, 2, 3]
      const testArrRes = deepClone(testArr)
      expect(testArr === testArrRes).toBeFalsy()
      expect(stringifyData(testArr) === stringifyData(testArrRes)).toBeTruthy()
    })

    test('the result of deepClone(testObj) is testObjRes and testObjRes is a deep copy of testObj', () => {
      const innerTestObj = { a: 1, b: 2 }
      const innerTestObjRes = deepClone(innerTestObj)
      expect(innerTestObj === innerTestObjRes).toBeFalsy()
      expect(
        stringifyData(innerTestObj) === stringifyData(innerTestObjRes)
      ).toBeTruthy()
    })

    test('deepClone(nonArrAndObjType) return itself', () => {
      const nonArrAndObjTypes = [0, '2', false, null, undefined, () => {}]
      for (const nonArrAndObjType of nonArrAndObjTypes) {
        const nonArrAndObjTypeRes = deepClone(nonArrAndObjType)
        expect(nonArrAndObjType === nonArrAndObjTypeRes).toBeTruthy()
      }
    })
  })
})
