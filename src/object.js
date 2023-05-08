import { getDataType } from "./common.js";
/**
 * @author WayneLiu
 * @function
 * @description 判断是否Object类型.
 * @param {Any} data 任意基础数据类型
 * @return {Boolean} 返回Boolean
 *
 */
function isObject(data) {
  const type = getDataType(data);
  return type === "Object";
}
/**
 * @author WayneLiu
 * @function
 * @description 判断是否空Object类型.
 * @param {Any} data 任意基础数据类型
 * @return {Boolean} 返回Boolean
 *
 */
function isEmptyObject(data) {
  // {}
  const flag = isObject(data);
  if (flag) {
    const length = Object.keys(data).length;
    return length === 0;
  } else {
    console.warn(`${data}: Not a Object...`);
    return false;
  }
}
/**
 * @author WayneLiu
 * @function
 * @description Object类型转为以key value 连接后为元素的数组.
 * @param {Object} obj
 * @param {String} opt 链接Object key value的 链接符
 * @return {Array} 返回以key value 连接后为元素的数组.
 *
 */
function generateArrayFromObj(obj, opt) {
  const flag = isObject(obj);
  const defaultOpt = { mark: "=", convertFn: null };
  if (flag) {
    const finalOpt = Object.assign(defaultOpt, opt);
    const res = Object.entries(obj).map(([k, v]) => {
      const isFunction = getDataType(finalOpt.convertFn) === "Function";
      if (isFunction) {
        return `${finalOpt.convertFn(k)}${finalOpt.mark}${finalOpt.convertFn(v)}`;
      } else {
        return `${k}${finalOpt.mark}${v}`;
      }
    });
    return res;
  } else {
    console.warn(`${obj} is not an object`);
    return [];
  }
}
/**
 * @author WayneLiu
 * @function
 * @description 将查询对象转为查询字符串，通常用于get请求.
 * @param {Object} obj
 * @return {Array} 返回形如 key=value&key1=value1 的字符串.
 *
 */
function getQueryStr(obj) {
  const queryStrArr = generateArrayFromObj(obj, { convertFn: encodeURIComponent });
  return queryStrArr.join("&");
}

/**
 * @author WayneLiu
 * @function
 * @description 不同对象之间同属性批量赋值.
 * @param {Object} target
 * @param {Object} source
 * @param {Array} commonProperties 不指定则执行Object.assign();指定则只有当source 与 target有同名属性的部分更新，
 * @return {Object} 返回更新属性后的对象
 *
 */
function assignObjProperties(target = {}, source = {}, commonProperties = []) {
  // 不同对象之间同属性批量赋值
  const targetIsObj = getDataType(target) === "Object";
  const sourceIsObj = getDataType(source) === "Object";
  const res = {};
  if (!(targetIsObj && sourceIsObj)) return target;
  if (commonProperties.length > 0) {
    Object.assign(res, target);
    for (const p of commonProperties) {
      if (p in res && p in source) {
        res[p] = source[p];
      }
    }
  } else {
    Object.assign(res, target, source);
  }
  return res;
}

export { isObject, isEmptyObject, generateArrayFromObj, getQueryStr, assignObjProperties };
