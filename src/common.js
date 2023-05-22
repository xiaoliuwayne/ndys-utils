/**
 * @description JS关键字
 */
const JS_KEYWORD = [
    "return",
    "break",
    "continue",
    "throw",
    "if",
    "else",
    "switch",
    "try",
    "catch",
    "var",
    "let",
    "const",
    "function",
    "function*",
    "async",
    "await",
    "class",
    "do",
    "while",
    "for",
    "in",
    "of",
    "Empty",
    "Block",
    "debugger",
    "export",
    "import",
    "label",
    "with",
];

/**
 * @author WayneLiu
 * @function
 * @description 获取js数据类型
 * @param {Any} source 任何js数据类型输入
 * @return {String}
 *
 * @example
 * getDataType(true)
 * =>
 * Boolean
 */
function getDataType(source) {
    const type = Object.prototype.toString.call(source);
    switch (type) {
        case "[object Undefined]":
            return "Undefined";
        case "[object Null]":
            return "Null";
        case "[object Number]":
            return "Number";
        case "[object BigInt]":
            return "BigInt";
        case "[object String]":
            return "String";
        case "[object Boolean]":
            return "Boolean";
        case "[object Symbol]":
            return "Symbol";
        case "[object Array]":
            return "Array";
        case "[object Object]":
            return "Object";
        case "[object Date]":
            return "Date";
        case "[object RegExp]":
            return "RegExp";
        case "[object Function]":
            return "Function";
        case "[object Map]":
            return "Map";
        case "[object WeakMap]":
            return "WeakMap";
        case "[object Set]":
            return "Set";
        case "[object WeakSet]":
            return "WeakSet";
        case "[object Error]":
            return "Error";
        case "[object Math]":
            return "Math";
        case "[object JSON]":
            return "JSON";
    }
    return;
}

/**
 * @author WayneLiu
 * @function
 * @description 获取错误类型名称
 * @param {Error} err Error实例
 * @return {String}
 *
 */
function getErrorInstanceName(err) {
    let name = "";
    const type = getDataType(err);
    if (type === "Error") {
        name = err.name;
    }
    return name;
}

/**
 * @author WayneLiu
 * @function
 * @description 高阶函数实现实现封装try-catch块;只能处理同步异常.
 * @param {Function} fn 方法
 * @return {Function} 返回一个在try中的function
 *
 */
function tryCatchBlock(fn) {
    // 用高阶函数实现实现封装 try-catch
    // 只能处理同步异常
    // 同步和异步不是一个线程, 所以同步无法捕捉异步的异常
    return function (...args) {
        try {
            return fn.bind(this)(...args);
        } catch (err) {
            const errName = getErrorInstanceName(err);
            console.error(
                `tryCatchBlock:try function:\n ${fn} \nerror, ErrorName: ${errName}`
            );
            return errName;
        }
    };
}

/**
 * @author WayneLiu
 * @function
 * @description 高阶函数实现实现封装promise-catch块;处理异步异常.
 * @param {Function} fn 方法
 * @return {Function} 返回一个在try中的await function
 *
 */
function promiseCatchBlock(fn) {
    return function (...args) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await fn.bind(this)(...args);
                const isObj = getDataType(res) === "Object";
                if (isObj) {
                    if (res.success || res.code == "200") {
                        return resolve(res);
                    } else {
                        res["success"] = false;
                        resolve(res);
                    }
                } else {
                    const rejectRes = {};
                    rejectRes["success"] = false;
                    rejectRes["data"] = res;
                    const errName = tryCatchBlock(reject)(rejectRes);
                    console.error(
                        `promiseCatchBlock:try function:\n ${fn} \nerror, ErrorName: ${errName}`
                    );
                }
            } catch (err) {
                reject({ msg: err, success: false });
            }
        }).catch((err) => {
            // err 就是 return reject(rejectRes);
            // Promise.reject只能被catch捕获，不能通过await或then来获得
            return Promise.resolve({
                success: false,
                msg: "error.it was rejected",
                data: err,
            });
        });
    };
}

// === common.converter.test.js start ===
/**
 * @author WayneLiu
 * @function
 * @description 重置null和undefined数据.
 * @param {(Null|Undefined|String)} origin :String只支持（"null", "undefined"）
 * @return {String} 返回一个替换值，默认是返回""
 *
 */
function resetNullAndUndefined(origin, substitute = "") {
    const specials = [null, undefined, "null", "undefined"];
    const flag = specials.includes(origin);
    if (flag) {
        return substitute;
    } else {
        return origin;
    }
}

/**
 * @author WayneLiu
 * @function
 * @description 字符串化数据.
 * @param {Any} origin
 * @return {String|Any} 对ES5基础数据类型返回字符串化数据
 *
 */
function stringifyData(origin) {
    const type = getDataType(origin);
    switch (type) {
        case "Null":
            return "null";
        case "Undefined":
            return "undefined";
        case "String":
        case "Boolean":
        case "Number":
            return origin.toString();
        case "Function":
            return generateOneLineFunctionStr(origin);
        case "Object":
            return JSON.stringify(origin); // standard JSON format
        case "Array":
            return `[${origin.toString()}]`;
        default:
            return origin;
    }
}

/**
 * @author WayneLiu
 * @function
 * @description 函数体字符串化成一行.
 * @param {Function} func
 * @return {String} 返回字符串化是函数体
 *
 */
function generateOneLineFunctionStr(func) {
    // 去除函数体内的所有空白符：空格, 制表符, 换行符
    const funBodyStr = func.toString();
    const strWithoutSpace = removeAllSpaceInMultiline(funBodyStr);
    const jsKeywordsReg = new RegExp(`(${JS_KEYWORD.join("|")})`, "g"); // 加上()，使用捕获
    const res = strWithoutSpace.replace(jsKeywordsReg, " $1 "); // 捕获的关键字添加左右空格
    return res;
}

/**
 * @author WayneLiu
 * @function
 * @description 多行字符串中的空格换行符去除.
 * @param {String} multiline
 * @return {String} 返回字去除所有 空格, 制表符, 换行符 的字符串
 *
 */
function removeAllSpaceInMultiline(multiline) {
    const allWhiteSpace = /\s/g; // 匹配任何空白字符。(空格, 制表符, 换行符)
    return multiline.replace(allWhiteSpace, "");
}

/**
 * @author WayneLiu
 * @function
 * @description 输入数据转换为布尔值.
 * @param {Any} val 基础数据类型
 * @param {Array} falseLabels 指定转换为false的标识符
 * @return {Boolean} 返回字布尔值
 *
 */
function convertToBoolean(val, falseLabels = []) {
    const finalFalseLabels = [
        null,
        undefined,
        0,
        "",
        "false",
        false,
        ...falseLabels,
    ]; // '0'
    return !finalFalseLabels.includes(val);
}
// === common.converter.test.js end ===

// === common.array.test.js start ===
/**
 * @author WayneLiu
 * @function
 * @description 获取去除重复元素后的元素索引组成的数组.
 * @param {Array} arr
 * @param {Boolean} isUniqueObj 是否对象也唯一
 * @return {Array} 返回去除重复元素后的元素索引组成的数组
 *
 */
function getUniqueArrIndexes(arr, isUniqueObj = false) {
    // 返回去除重复元素后的元素索引组成的数组：e.g. => [0,1,1,2,4,2] ==> indexes [0,1,3,4]
    const indexesWithoutRepetition = [];
    const isArr = Array.isArray(arr);
    const tmpUniqueArr = [];
    if (!isArr) {
        return indexesWithoutRepetition;
    }
    for (let i = 0; i < arr.length; i++) {
        const item = isUniqueObj ? stringifyData(arr[i]) : arr[i];
        if (!tmpUniqueArr.includes(item)) {
            tmpUniqueArr.push(item);
            indexesWithoutRepetition.push(i);
        }
    }
    return indexesWithoutRepetition;
}
/**
 * @author WayneLiu
 * @function
 * @description 获取重复元素在数组中的索引.
 * @param {Array} arr
 * @param {Boolean} isUniqueObj 是否对象也唯一
 * @return {Number} 返回元素所在的索引值
 *
 */
function getRepetedEleIndexesInArr(arr, isUniqueObj = false) {
    const res = [];
    const isArr = Array.isArray(arr);
    if (!isArr) {
        return res;
    }
    const uniqueArrIndexes = getUniqueArrIndexes(arr, isUniqueObj);
    const allIndexes = arr.keys();
    return Array.from(allIndexes).filter(
        (el, index) => !uniqueArrIndexes.includes(el)
    );
}
/**
 * @author WayneLiu
 * @function
 * @description 根据数组生成没有重复元素的数组.
 * @param {Array} arr
 * @param {Boolean} isUniqueObj 是否对象也唯一
 * @return {Number} 返回没有重复元素的数组
 *
 */
function generateUniqueEleArr(arr, isUniqueObj = false) {
    const isArr = Array.isArray(arr);
    if (isArr) {
        const copy = [].concat(arr);
        const uniqueArrIndexes = getUniqueArrIndexes(arr, isUniqueObj);
        // 根据索引数组生产新的数组
        return copy.filter((element, index, array) =>
            uniqueArrIndexes.includes(index)
        );
    } else {
        console.error(`${arr} is not array!`);
        return [];
    }
}
/**
 * @author WayneLiu
 * @function
 * @description 根据数组生成没有重复元素的数组.
 * @param {Array} 任意多个数组
 * @return {Array} 返回合并后的数组
 *
 */
function mergeArrays() {
    let res = [];
    for (let i = 0; i < arguments.length; i++) {
        // 任意参数
        const arg = arguments[i];
        const isArr = getDataType(arg) === "Array";
        const arr = isArr ? arg : [];
        res = res.concat(arr);
    }
    return res;
}
// === common.array.test.js end ===

function isNumberStr(source, strictMode = true) {
    const regModes = Object.freeze({
        true: /(^[1-9]\d*\.?\d*$)|(^0\.\d*[1-9]$)/,
        false: /^[0-9]+\.{0,1}\d+$/,
    });
    let flag = false;
    const sourceType = getDataType(source);
    const mode = regModes[stringifyData(strictMode)];
    if (sourceType === "String") {
        if (mode.test(source)) {
            flag = true;
        }
    }
    return flag;
}

export {
    getDataType,
    getErrorInstanceName,
    tryCatchBlock,
    promiseCatchBlock,
    resetNullAndUndefined,
    stringifyData,
    generateOneLineFunctionStr,
    removeAllSpaceInMultiline,
    convertToBoolean,
    getUniqueArrIndexes,
    getRepetedEleIndexesInArr,
    generateUniqueEleArr,
    mergeArrays,
    isNumberStr,
};
