# ndys-utils function

## 使用方法

1.npm 方式安装使用 `npm install ndys-utils --registry https://r.cnpmjs.org`

yarn add `ndys-utils`

```bash
import { getDataType } from 'ndd-utils'
console.log(getDataType(123))  // Number
```

2,自托管的方式（CDN)下载编译好的 dist 就可以了。 `<script src='packages\ndys-utils\dist\ndys-utils.umd.min.js'></script>`

### ajax.js 模块

函数列表：

- `getRequest`
- `postRequest`
- `ajax`
- `parseUrlQuery`

### common.js 模块

函数列表：

- `getDataType`
- `getErrorInstanceName`
- `tryCatchBlock`
- `promiseCatchBlock`
- `resetNullAndUndefined`
- `stringifyData`
- `generateOneLineFunctionStr`
- `removeAllSpaceInMultiline`
- `convertToBoolean`
- `getUniqueArrIndexes`
- `getRepetedEleIndexesInArr`
- `generateUniqueEleArr`
- `mergeArrays`

### deepClone.js 模块

函数列表：

- `deepCloneArr`
- `getObjPropertiesOrSymbols`
- `deepCloneObj`
- `getObjPropertiesByGetOwnPropertySymbols`
- `getObjPropertiesByGetOwnPropertyNames`
- `getObjPropertiesByForIn`
- `generateOneLineFunctionStr`
- `getObjPropertiesByKeys`

### object.js 模块

函数列表：

- `isObject`
- `isEmptyObject`
- `generateArrayFromObj`
- `getQueryStr`
