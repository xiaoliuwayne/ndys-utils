import { getDataType, mergeArrays, generateUniqueEleArr } from '../../common.js'
import { isObject } from './object.js'

/**
 * @author WayneLiu
 * @function
 * @description Object，Array的深拷贝.
 * @param {Object|Array} data
 * @param {String} mode String:["Object","Array"]
 * @return {Object|Array} 返回data的深拷贝
 *
 */
function deepClone(data, mode) {
  const type = getDataType(data)
  switch (type) {
    case 'Object':
      return deepCloneObj(data, mode)
    case 'Array':
      return deepCloneArr(data)
    default:
      return data
  }
}
/**
 * @author WayneLiu
 * @function
 * @description Array的深拷贝.
 * @param {Array} data
 * @return {Array} 返回data的深拷贝
 *
 */
function deepCloneArr(data) {
  const isArr = getDataType(data) === 'Array'
  if (isArr) {
    return [].concat(data)
  } else {
    return data
  }
}
/**
 * @author WayneLiu
 * @function
 * @description Object的深拷贝.
 * @param {Object} data
 * @return {Object} 返回data的深拷贝
 *
 */
function deepCloneObj(data, mode = 'OwnEnumProperties') {
  const isObj = isObject(data)
  if (isObj) {
    const res = {}
    const properties = getObjPropertiesOrSymbols(data, mode)
    for (const p of properties) {
      res[p] = data[p]
    }
    return res
  } else {
    return data
  }
}
/**
 * @author WayneLiu
 * @function
 * @description 依据mode模式获取对象的属性.
 * @param {Object} obj
 * @param {String} mode mode: ["OwnEnumProperties","OwnAndInheritedEnumProperties","OwnEnumAndOwnNonenumProperties","OwnAndInheritedEnumPropertiesAndOwnNonenum","OwnSymbols","OwnAndInheritedEnumPropertiesAndOwnSymbols","OwnAndInheritedEnumPropertiesAndOwnNonenumAndOwnSymbols"]
 * @return {Array} 返回mode下的对象属性数组
 *
 */
function getObjPropertiesOrSymbols(obj, mode = 'OwnEnumProperties') {
  let objPropertiesIncludingSymbols = []
  const isObj = isObject(obj)
  if (isObj) {
    const ownEnumProperties = getObjPropertiesByKeys(obj)
    const ownAndInheritedEnumProperties = getObjPropertiesByForIn(obj)
    const ownEnumAndOwnNonenumProperties =
      getObjPropertiesByGetOwnPropertyNames(obj)
    const ownSymbols = getObjPropertiesByGetOwnPropertySymbols(obj)
    let tmpRes = []
    switch (mode) {
      case 'OwnEnumProperties':
        objPropertiesIncludingSymbols = ownEnumProperties
        break
      case 'OwnAndInheritedEnumProperties':
        objPropertiesIncludingSymbols = ownAndInheritedEnumProperties
        break
      case 'OwnEnumAndOwnNonenumProperties':
        objPropertiesIncludingSymbols = ownEnumAndOwnNonenumProperties
        break
      case 'OwnAndInheritedEnumPropertiesAndOwnNonenum':
        tmpRes = mergeArrays(
          ownAndInheritedEnumProperties,
          ownEnumAndOwnNonenumProperties
        )
        objPropertiesIncludingSymbols = generateUniqueEleArr(tmpRes)
        break
      case 'OwnSymbols':
        objPropertiesIncludingSymbols = ownSymbols
        break
      case 'OwnAndInheritedEnumPropertiesAndOwnSymbols':
        tmpRes = mergeArrays(ownAndInheritedEnumProperties, ownSymbols)
        objPropertiesIncludingSymbols = generateUniqueEleArr(tmpRes)
        break
      case 'OwnAndInheritedEnumPropertiesAndOwnNonenumAndOwnSymbols':
        tmpRes = mergeArrays(
          ownAndInheritedEnumProperties,
          ownEnumAndOwnNonenumProperties,
          ownSymbols
        )
        objPropertiesIncludingSymbols = generateUniqueEleArr(tmpRes)
        break
    }
  }
  return objPropertiesIncludingSymbols
}
/**
 * @author WayneLiu
 * @function
 * @description 获取对象的自身属性.
 * @param {Object} obj
 * @return {Array} 返回对象的自身属性组成的数组
 *
 */
function getObjPropertiesByKeys(obj) {
  let properties = []
  const isObj = isObject(obj)
  if (isObj) {
    properties = Object.keys(obj)
  }
  return properties
}
/**
 * @author WayneLiu
 * @function
 * @description 获取对象的自身属性和继承的属性.
 * @param {Object} obj
 * @return {Array} 返回对象的自身属性和继承的属性组成的数组
 *
 */
function getObjPropertiesByForIn(obj) {
  const properties = []
  const isObj = isObject(obj)
  if (isObj) {
    for (const p in obj) {
      properties.push(p)
    }
  }
  return properties
}
/**
 * @author WayneLiu
 * @function
 * @description 获取对象的自身属性和自身非枚举属性.
 * @param {Object} obj
 * @return {Array} 返回对象的自身属性和和自身非枚举属性组成的数组
 *
 */
function getObjPropertiesByGetOwnPropertyNames(obj) {
  let properties = []
  const isObj = isObject(obj)
  if (isObj) {
    properties = Object.getOwnPropertyNames(obj)
  }
  return properties
}
/**
 * @author WayneLiu
 * @function
 * @description 获取对象的自身symbol属性.
 * @param {Object} obj
 * @return {Array} 返回对象的自身symbol属性组成的数组
 *
 */
function getObjPropertiesByGetOwnPropertySymbols(obj) {
  let properties = []
  const isObj = isObject(obj)
  if (isObj) {
    properties = Object.getOwnPropertySymbols(obj)
  }
  return properties
}

export {
  deepCloneArr,
  getObjPropertiesOrSymbols,
  deepCloneObj,
  getObjPropertiesByGetOwnPropertySymbols,
  getObjPropertiesByGetOwnPropertyNames,
  getObjPropertiesByForIn,
  getObjPropertiesByKeys,
  deepClone,
}
