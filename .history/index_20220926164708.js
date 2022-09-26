function decreasingTimer(seconds, tickCallback, finishedCallback) {
  if (isNaN(seconds)) {
    throw Error("Param 'milliseconds' is not a number")
  }
  seconds = ~~seconds //取整
  if (seconds < 1) {
    typeof finishedCallback === 'function' && finishedCallback()
  } else {
    seconds -= 1
    setTimeout(function () {
      typeof tickCallback === 'function' && tickCallback(seconds)
      decreasingTimer(seconds, tickCallback, finishedCallback)
    }, 1000)
  }
}

/**
 * 判断当前时间进度
 * @param startDate
 * @param endDate
 * @returns {number} -1表示未开始，1表示已完成， 0到1之间为完成度
 */
function dateProgress(startDate, endDate) {
  var startTime = startDate.getTime(),
    endTime = endDate.getTime(),
    currentTime = new Date().getTime(),
    progress = (currentTime - startTime) / (endTime - startTime)

  return currentTime >= endTime
    ? 1
    : progress >= 1
    ? 1
    : progress < 0
    ? -1
    : progress
}

function toPrecision(value, precision) {
  if (precision > 0) {
    var magnification = Math.pow(10, parseInt(precision, 10))
    return Math.round(parseFloat(value) * magnification) / magnification
  }

  return value
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

function formatTime(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return `${[year, month, day].map(formatNumber).join('-')} ${[
    hour,
    minute,
    second,
  ]
    .map(formatNumber)
    .join(':')}`
}

function dateFormat(fmt, date) {
  let ret
  const dateObj = new Date(date)
  const opt = {
    'Y+': dateObj.getFullYear().toString(), // 年
    'm+': (dateObj.getMonth() + 1).toString(), // 月
    'd+': dateObj.getDate().toString(), // 日
    'H+': dateObj.getHours().toString(), // 时
    'M+': dateObj.getMinutes().toString(), // 分
    'S+': dateObj.getSeconds().toString(), // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  }
  for (let k in opt) {
    ret = new RegExp('(' + k + ')').exec(fmt)
    if (ret) {
      fmt = fmt.replace(
        ret[1],
        ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0')
      )
    }
  }
  return fmt
}

function simpleDeepClone(source) {
  const type = getSourceType(source)
  if (type === 'Object') {
    return JSON.parse(JSON.stringify(source))
  } else if (type === 'Array') {
    return [].concat(source)
  } else {
    return obj
  }
}

function updateObjProperties(targetObj, newSourceObj) {
  // targetObj, newSourceObj共同的属性，从newSourceObj中更新的熬targetObj
  const result = {}
  if (isObject(targetObj) && isObject(newSourceObj)) {
    Object.keys(targetObj).forEach((key) => {
      const newValue = newSourceObj[key]
      if (newValue) {
        result[key] = newValue
      } else {
        result[key] = targetObj[key] // 没有新值维持原样
      }
    })
  }
  return result
}

function getSourceType(source) {
  const type = Object.prototype.toString.call(source)
  switch (type) {
    case '[object Symbol]':
      return 'Symbol'
    case '[object BigInt]':
      return 'BigInt'
    case '[object Boolean]':
      return 'Boolean'
    case '[object Number]':
      return 'Number'
    case '[object String]':
      return 'String'
    case '[object Date]':
      return 'Date'
    case '[object RegExp]':
      return 'RegExp'
    case '[object Array]':
      return 'Array'
    case '[object Function]':
      return 'Function'
    case '[object Object]':
      return 'Object'
    case '[object Undefined]':
      return 'Undefined'
    case '[object Null]':
      return 'Null'
  }
}

function isObject(obj) {
  return getSourceType(obj) === 'Object'
}

function nonValueConverter(source, defaultValue = '') {
  const specifics = ['Null', 'Undefined']
  const type = getSourceType(source)
  if (specifics.includes(type)) {
    return defaultValue
  } else {
    return source
  }
}

function obj2queryString(obj) {
  if (!isObject(obj)) {
    return ''
  }
  return (
    '?' +
    Object.entries(obj)
      .map(([k, v]) => `${k}=${nonValueConverter(v)}`)
      .join('&')
  )
}

export { formatTime, dateFormat, simpleDeepClone, obj2queryString, isObject }
