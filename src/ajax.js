/**
 * Promise 封装 XMLHttpRequest
 * get
 * post => json / body
 *
 */

// var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
import { promiseCatchBlock, getDataType } from './common.js'
import { getQueryStr } from './object.js'

/**
 * @author WayneLiu
 * @function
 * @description 解析url中的查询字符串为对象.
 * @param {String} url
 * @return {Object} 返回查询字符串对应的对象
 *
 */
function parseUrlQuery(url) {
  // 将查询参数转换成要通过get方法获取属性的search对象 xxx?a=1&b=2 ==> {a:1,b:2}
  // TypeError: Invalid URL: /abc/test
  const base = 'http://localhost'
  const params = {}
  const searchParamsObj = new URL(url, base).searchParams
  for (const [key, value] of searchParamsObj.entries()) {
    params[decodeURIComponent(key)] = decodeURIComponent(value)
  }
  return params
}

/**
 * @author WayneLiu
 * @function
 * @description promise封装的ajax.
 * @param {String} url
 * @param {String} method method:["get","post"]
 * @param {Object} objData 传递到后端的数据
 * @param {Object} headers 追加到XMLHttpRequest的header的数据
 * @return {Object} 返回ajax后的Promise 实例
 *
 */
// XMLHttpRequest才能被mockjs拦截，而fetch是不被拦截的，
function ajax(url, method, objData, headers) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest() // IE 7+ support
    xhr.onreadystatechange = function () {
      switch (xhr.readyState) {
        case 0: // UNSENT
          break
        case 1: // OPENED
          break
        case 2: // HEADERS_RECEIVED
          break
        case 3: // LOADING
          break
        case 4: //DONE
          if (xhr.readyState == 4) {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
              // xhr.responseText 必须是json格式
              const data = JSON.parse(xhr.responseText)
              return resolve(data)
            } else {
              return reject({ msg: `Error!`, data: xhr, success: false })
            }
          }
          break
      }
    }
    xhr.open(method, url, true)
    setXHRHeaders(xhr, headers)
    const data = getPassedData(objData, headers)
    xhr.send(data)
  }).catch((err) => {
    return Promise.resolve({
      success: false,
      msg: 'XMLHttpRequest Error.it was rejected',
      data: err,
    })
  })
}

const promiseAjax = promiseCatchBlock(ajax)
/**
 * @author WayneLiu
 * @function
 * @description 追加信息到xhr的header中
 * @param {Object} xhr XMLHttpRequest实例
 * @param {Object} headers 追加到XMLHttpRequest的header的数据
 * @return {Undefined} 无
 *
 */
function setXHRHeaders(xhr, headers) {
  const isObj = getDataType(headers) === 'Object'
  if (isObj) {
    for (const [k, v] of Object.entries(headers)) {
      xhr.setRequestHeader(k, v)
    }
  }
}
/**
 * @author WayneLiu
 * @function
 * @description 依据content-type来决定post到后端的数据类型
 * @param {Object} objData 待传输的数据
 * @param {Object} headers 追加到XMLHttpRequest的header的数据
 * @return {Object} 最终传后端的指定格式的数据，default是JSON
 *
 */
function getPassedData(objData, headers) {
  function getFormUrlencodedData(obj) {
    return
  }
  function getMultipartFormdata(obj) {}
  function getJsonData(obj) {
    return JSON.stringify(obj)
  }
  const CONTENT_TYPE_DATA = Object.freeze({
    'application/x-www-form-urlencoded': getFormUrlencodedData,
    'multipart/form-data': getMultipartFormdata,
    'application/json; charset=utf-8': getJsonData,
  })
  let data
  const contentType = headers && headers['Content-type']
  if (contentType) {
    const getDataFn = CONTENT_TYPE_DATA[contentType]
    data = getDataFn(objData)
  }
  return data
}
/**
 * @author WayneLiu
 * @function
 * @description get请求
 * @param {String} url
 * @param {Object} data 查询字符串的对应对象
 * @return {Object} 返回ajax后的promise实例
 *
 */
function getRequest(url, data) {
  // const headers = { "Content-type": "application/x-www-form-urlencoded" }; // default
  const queryStr = getQueryStr(data || {})
  const finalUrl = `${url}${queryStr ? '?' : ''}${queryStr}`
  return promiseAjax(finalUrl, 'get')
}
/**
 * @author WayneLiu
 * @function
 * @description post请求
 * @param {String} url
 * @param {Object} data 传递到后端的数据
 * @param {String} mode 数据传输模式，默认是json，目前只支持json
 * @return {Object} 返回ajax后的promise实例
 *
 */
function postRequest(url, data, mode = 'json') {
  const headersContentType = {
    json: 'application/json; charset=utf-8',
    'form-urlencoded': 'application/x-www-form-urlencoded',
    'form-data': 'multipart/form-data',
  }
  const headers = { 'Content-type': headersContentType[mode] }
  return promiseAjax(url, 'post', data, headers)
}

// function putRequest() {}

// function deleteRequest() {}

export {
  getRequest,
  postRequest,
  // putRequest,
  // deleteRequest,
  ajax,
  parseUrlQuery,
}
