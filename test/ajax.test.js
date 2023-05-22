// import {expect, jest, test} from '@jest/globals'; // 已经在全局中可用。不使用jest的funciton mock 改用mockjs

import { getDataType, stringifyData } from '../src/common.js'
import { ajax, getRequest, postRequest, parseUrlQuery } from '../src/ajax.js'
import { isEmptyObject } from '../src/object.js'

// 开启mockjs拦截
import '../src/mock/mock.js' // 引入mock数据，不需要时，则注释掉

describe('ajax.js module', () => {
  describe('ajax function', () => {
    test(' ajax is a function', () => {
      const res = getDataType(ajax) === 'Function'
      expect(res).toBeTruthy()
    })
  })

  describe('parseUrlQuery function', () => {
    test('parseUrlQuery is a function', () => {
      const res = getDataType(parseUrlQuery) === 'Function'
      expect(res).toBeTruthy()
    })
    test('parseUrlQuery(testUrl) to be a empty object', () => {
      const testUrl = '/abc/test'
      const res = parseUrlQuery(testUrl)
      expect(isEmptyObject(res)).toBeTruthy()
    })
    test('parseUrlQuery(testUrl) to be a expectRes', () => {
      const testUrl = '/abc/test?id=3&isDone=true'
      const expectRes = {
        id: '3',
        isDone: 'true',
      }
      const res = parseUrlQuery(testUrl)
      expect(stringifyData(expectRes) === stringifyData(res)).toBeTruthy()
    })
    test('testUrl with chinese parseUrlQuery(testUrl) to be a expectRes', () => {
      const testUrl = '/abc/test?id=3&lang=%E4%B8%AD%E6%96%87'
      const expectRes = {
        id: '3',
        lang: '中文',
      }
      const res = parseUrlQuery(testUrl)
      expect(stringifyData(expectRes) === stringifyData(res)).toBeTruthy()
    })
  })

  describe('test getRequest', () => {
    test('getRequest is a function', () => {
      const res = getDataType(getRequest) === 'Function'
      expect(res).toBeTruthy()
    })
    test("getRequest('/testApi/getMethod') without params works", async () => {
      const res = await getRequest('/testApi/getMethod') // 百度走vpn后是302 且必须是https
      const expectRes = {
        success: true,
        msg: 'no query string',
        params: null,
      }
      expect(res.success).toBeTruthy()
      expect(stringifyData(res) === stringifyData(expectRes)).toBeTruthy()
    })
    test("getRequest('/testApi/getMethodWithParams', {id: 1}) with params {id: 1} works", async () => {
      const params = {
        id: 1,
      }
      const expectRes = {
        success: true,
        msg: 'query with params',
        params: { id: '1' }, // 注意 number 1 变为了 string 1
      }
      const res = await getRequest('/testApi/getMethodWithParams', params)
      expect(res.success).toBeTruthy()
      expect(stringifyData(res) === stringifyData(expectRes)).toBeTruthy()
    })
  })

  describe('test postRequest', () => {
    test('postRequest is a function', () => {
      const res = getDataType(postRequest) === 'Function'
      expect(res).toBeTruthy()
    })
    test("postRequest('/testApi/postMethodByJson', by JSON works：default JSON mode", async () => {
      const data = {
        msg: 'json mode',
        id: 1,
      }
      const expectRes = {
        success: true,
        msg: 'default mode is json',
        data: data, // 类型
      }
      const res = await postRequest('/testApi/postMethodByJson', data)
      expect(res.success).toBeTruthy()
      expect(stringifyData(res) === stringifyData(expectRes)).toBeTruthy()
    })
    test("postRequest('/testApi/postMethodByJson', by JSON works：default JSON mode", async () => {
      const data = {
        msg: 'json mode',
        id: 2,
      }
      const expectRes = {
        success: true,
        msg: 'default mode is json',
        data: data, // 类型
      }
      const res = await postRequest('/testApi/postMethodByJson', data, 'json')
      expect(res.success).toBeTruthy()
      expect(stringifyData(res) === stringifyData(expectRes)).toBeTruthy()
    })
    test("postRequest('/testApi/postMethodByFormdata') by formdata works：formdata mode", async () => {
      const data = {
        msg: 'form-data mode',
        id: 3,
      }
      const expectRes = {
        success: true,
        msg: 'default mode is json',
        data: data, // 类型
      }
      const res = await postRequest(
        '/testApi/postMethodByFormdata',
        data,
        'form-data'
      )
      expect(res.success).toBeTruthy()
      expect(stringifyData(res) === stringifyData(expectRes)).toBeTruthy()
    })

    test("postRequest('/testApi/postMethodByUrlEncoded') by form-urlencoded mode", async () => {
      const data = {
        msg: 'form-urlencoded mode',
        id: 4,
      }
      const expectRes = {
        success: true,
        msg: 'default mode is json',
        data: data, // 类型
      }
      const res = await postRequest(
        '/testApi/postMethodByUrlEncoded',
        data,
        'form-urlencoded'
      )
      expect(res.success).toBeTruthy()
      expect(stringifyData(res) === stringifyData(expectRes)).toBeTruthy()
    })
  })
})
