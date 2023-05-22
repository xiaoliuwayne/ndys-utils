// NOTICE !! Must npm run build before npm run test(this test file)
import {
  ajax,
  convertToBoolean,
  deepCloneArr,
  deepCloneObj,
  generateArrayFromObj,
  generateOneLineFunctionStr,
  generateUniqueEleArr,
  getDataType,
  getErrorInstanceName,
  getObjPropertiesByForIn,
  getObjPropertiesByGetOwnPropertyNames,
  getObjPropertiesByGetOwnPropertySymbols,
  getObjPropertiesByKeys,
  getObjPropertiesOrSymbols,
  getQueryStr,
  getRepetedEleIndexesInArr,
  getRequest,
  getUniqueArrIndexes,
  isEmptyObject,
  isObject,
  mergeArrays,
  parseUrlQuery,
  postRequest,
  promiseCatchBlock,
  removeAllSpaceInMultiline,
  resetNullAndUndefined,
  stringifyData,
  tryCatchBlock,
} from '../dist/ndys-utils.esm.min.mjs'

// 只能测试esm模式
describe('ndd-utils.esm.min.mjs in dist fold', () => {
  const funcList = [
    ajax,
    convertToBoolean,
    deepCloneArr,
    deepCloneObj,
    generateArrayFromObj,
    generateOneLineFunctionStr,
    generateUniqueEleArr,
    getDataType,
    getErrorInstanceName,
    getObjPropertiesByForIn,
    getObjPropertiesByGetOwnPropertyNames,
    getObjPropertiesByGetOwnPropertySymbols,
    getObjPropertiesByKeys,
    getObjPropertiesOrSymbols,
    getQueryStr,
    getRepetedEleIndexesInArr,
    getRequest,
    getUniqueArrIndexes,
    isEmptyObject,
    isObject,
    mergeArrays,
    parseUrlQuery,
    postRequest,
    promiseCatchBlock,
    removeAllSpaceInMultiline,
    resetNullAndUndefined,
    stringifyData,
    tryCatchBlock,
  ]
  for (const f of funcList) {
    test(`${f.name} is a function`, () => {
      const flag = getDataType(f) === 'Function'
      expect(flag).toBeTruthy()
    })
  }
})
