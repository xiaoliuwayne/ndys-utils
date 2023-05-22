import { getDataType } from './common.js'

/**
 * @author WayneLiu
 * @function
 * @description
 * @param {}
 * @return {}
 *
 */
function formatDate() {}

/**
 * @author WayneLiu
 * @function
 * @description 转换日期字符串格式
 * @param {Array} 任意多个数组
 * @return {Array} 返回合并后的数组
 *
 */
function dateStrConvertor(source, sourceFormat, outputFormat) {
  const sourceType = getDataType(source),
    sourceFormatType = getDataType(sourceFormat),
    outputFormatType = getDataType(outputFormat)
  // if()
}

export { formatDate, dateStrConvertor }
