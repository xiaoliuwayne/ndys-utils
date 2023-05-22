// export { getRequest, postRequest, ajax, parseUrlQuery } from './src/ajax.js'

// export {
//   getDataType,
//   getErrorInstanceName,
//   tryCatchBlock,
//   promiseCatchBlock,
//   resetNullAndUndefined,
//   stringifyData,
//   generateOneLineFunctionStr,
//   removeAllSpaceInMultiline,
//   convertToBoolean,
//   getUniqueArrIndexes,
//   getRepetedEleIndexesInArr,
//   generateUniqueEleArr,
//   mergeArrays,
// } from './src/common.js'

// export {
//   deepCloneArr,
//   getObjPropertiesOrSymbols,
//   deepCloneObj,
//   getObjPropertiesByGetOwnPropertySymbols,
//   getObjPropertiesByGetOwnPropertyNames,
//   getObjPropertiesByForIn,
//   getObjPropertiesByKeys,
// } from './src/deepClone.js'

// export {
//   isObject,
//   isEmptyObject,
//   generateArrayFromObj,
//   getQueryStr,
// } from './src/object.js'

import * as ajax from "./src/ajax.js";
import * as common from "./src/common.js";
import * as deepClone from "./src/deepClone.js";
import * as object from "./src/object.js";

export default {
    ...ajax,
    ...common,
    ...deepClone,
    ...object,
};
