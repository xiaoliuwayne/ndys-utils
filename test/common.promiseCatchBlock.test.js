import { promiseCatchBlock, getDataType } from '../src/common.js'

test('promiseCatchBlock is present', () => {
  const isPresent = getDataType(promiseCatchBlock) === 'Function'
  expect(isPresent).toBeTruthy()
})

test('one way support promise expect', () => {
  const fetchData = (parmas) => {
    return parmas
  }
  const promiseTest = promiseCatchBlock(fetchData)
  return promiseTest({ name: 'John', id: 1, success: true }).then((res) => {
    expect(res).toEqual({ name: 'John', id: 1, success: true })
  })
})

test('the other way support promise expect-->async+await', async () => {
  const fetchData = (params) => {
    params['success'] = true
    params['total'] = 1
    return params
  }
  const promiseTest = promiseCatchBlock(fetchData)
  const res = await promiseTest({ id: 1 })
  expect(res).toEqual({ id: 1, total: 1, success: true })
})

test('the promiseCatchBlock catch an error', async () => {
  const autoThrowErr = (params) => {
    throw new Error(`params: ${params} cause promise error`)
  }
  const promiseTest = promiseCatchBlock(autoThrowErr)
  const res = await promiseTest()
  expect(res).toMatchObject({
    success: false,
    msg: 'error.it was rejected',
  })
})
