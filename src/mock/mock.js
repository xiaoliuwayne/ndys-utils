// const Mock = require("mockjs");
import Mock from 'mockjs'
import { parseUrlQuery } from '../ajax.js'

Mock.mock(RegExp('/testApi/getMethod$'), 'get', (options) => {
  // 添加$结束符号，避免请求/testApi/getMethodWithParams 时也匹配到此处。
  return {
    success: true,
    msg: 'no query string',
    params: null,
  }
})

Mock.mock(RegExp('/testApi/getMethodWithParams' + '.*'), 'get', (options) => {
  const params = parseUrlQuery(options.url)
  return {
    success: true,
    msg: 'query with params',
    params: params,
  }
})

Mock.mock('/testApi/postMethodByJson', 'post', (options) => {
  const data = JSON.parse(options.body)
  return {
    success: true,
    msg: 'default mode is json',
    data: data,
  }
})

Mock.mock('/testApi/postMethodByUrlEncoded', 'post', (options) => {
  // 数据不在options.body中，动态拦截
  const data = {
    msg: 'form-urlencoded mode',
    id: 4,
  }
  return {
    success: true,
    msg: 'default mode is json',
    data: data,
  }
})

Mock.mock('/testApi/postMethodByFormdata', 'post', (options) => {
  // 数据不在options.body中，动态拦截
  const data = {
    msg: 'form-data mode',
    id: 3,
  }
  return {
    success: true,
    msg: 'default mode is json',
    data: data,
  }
})
