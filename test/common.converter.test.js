import {
    stringifyData,
    resetNullAndUndefined,
    getDataType,
    generateOneLineFunctionStr,
    removeAllSpaceInMultiline,
    convertToBoolean,
} from "../src/common.js";

describe("resetNullAndUndefined in common.js module", () => {
    test("resetNullAndUndefined is a function", () => {
        const flag = getDataType(resetNullAndUndefined) === "Function";
        expect(flag).toBeTruthy();
    });

    test("resetNullAndUndefined(null) to be ''", () => {
        const res = resetNullAndUndefined(null);
        expect(res).toBe("");
    });
    test("resetNullAndUndefined('null') to be ''", () => {
        const res = resetNullAndUndefined("null");
        expect(res).toBe("");
    });

    test("resetNullAndUndefined(undefined) to be ''", () => {
        const res = resetNullAndUndefined(undefined);
        expect(res).toBe("");
    });
    test("resetNullAndUndefined('undefined') to be ''", () => {
        const res = resetNullAndUndefined("undefined");
        expect(res).toBe("");
    });

    test("resetNullAndUndefined(null,'-') to be '-'", () => {
        const res = resetNullAndUndefined(null, "-");
        expect(res).toBe("-");
    });

    test("resetNullAndUndefined(undefined,'-') to be '-'", () => {
        const res = resetNullAndUndefined(undefined, "-");
        expect(res).toBe("-");
    });
});

describe("stringifyData in common.js module", () => {
    test("stringifyData is a function", () => {
        const flag = getDataType(stringifyData) === "Function";
        expect(flag).toBeTruthy();
    });

    test("stringifyData(true) to be 'true'", () => {
        const res = stringifyData(true);
        expect(res).toBe("true");
    });
    test("stringifyData(1) to be '1'", () => {
        const res = stringifyData(1);
        expect(res).toBe("1");
    });

    test("stringifyData('dd') to be 'dd'", () => {
        const res = stringifyData("dd");
        expect(res).toBe("dd");
    });

    test("stringifyData() to be 'undefined'", () => {
        const res = stringifyData();
        expect(res).toBe("undefined");
    });
    test("stringifyData(undefined) to be 'undefined'", () => {
        const res = stringifyData(undefined);
        expect(res).toBe("undefined");
    });
    test("stringifyData(null) to be 'null'", () => {
        const res = stringifyData(null);
        expect(res).toBe("null");
    });
    test(`stringifyData({"id":1}) to be '{"id":1}'`, () => {
        const res = stringifyData({ id: 1 });
        expect(res).toBe('{"id":1}');
    });
    test("stringifyData([1,2,3]) to be '[1,2,3]'", () => {
        const res = stringifyData([1, 2, 3]);
        expect(res).toBe("[1,2,3]");
    });
    test("stringifyData(()=>{ console.log(1); }) to be '()=>{console.log(1);}'", () => {
        const res = stringifyData(() => {
            console.log(1);
        });
        expect(res).toBe("()=>{console.log(1);}");
    });
});

describe("generateOneLineFunctionStr in common.js module", () => {
    test("generateOneLineFunctionStr is a function", () => {
        const res = getDataType(generateOneLineFunctionStr);
        expect(res).toBe("Function");
    });

    test(`generateOneLineFunctionStr(testFn1) to be testFnRes1`, () => {
        const testFn1 = () => {
            console.log(1);
        };
        const testFnRes1 = `()=>{console.log(1);}`;
        const res = generateOneLineFunctionStr(testFn1);
        expect(res).toBe(testFnRes1);
    });
    test(`generateOneLineFunctionStr(testFn2) to be testFnRes2`, () => {
        // 注意函数的空格（JS关键字）和引号
        function testFn2() {
            const a = "astr";
            console.log(a);
        }
        const testFnRes2 = ` function testFn2(){ const a="astr";console.log(a);}`;
        const res = generateOneLineFunctionStr(testFn2);
        expect(res).toBe(testFnRes2);
    });
    test(`generateOneLineFunctionStr(testFn3) to be testFnRes3`, () => {
        const testFn3 = () => {
            console.log(`    这是
      一个
      跨行
      3`);
        };
        const testFnRes3 = "()=>{console.log(`这是一个跨行3`);}";
        const res = generateOneLineFunctionStr(testFn3);
        expect(res).toBe(testFnRes3);
    });
});

describe("removeAllSpaceInMultiline in common.js module", () => {
    test("removeAllSpaceInMultiline is a function", () => {
        const flag = getDataType(removeAllSpaceInMultiline) === "Function";
        expect(flag).toBeTruthy();
    });
    test("removeAllSpaceInMultiline(testOneLine) to be testOneLineRes", () => {
        const testOneLine = " I am testing one line . ";
        const testOneLineRes = "Iamtestingoneline.";
        const res = removeAllSpaceInMultiline(testOneLine);
        expect(res).toBe(testOneLineRes);
    });
    test("removeAllSpaceInMultiline(testMultiLine) to be testMultiLineRes", () => {
        const testMultiLine = ` I am
     testing
    multiline
     .包括
     多行
     中文。`;
        const testMultiLineRes = "Iamtestingmultiline.包括多行中文。";
        const res = removeAllSpaceInMultiline(testMultiLine);
        expect(res).toBe(testMultiLineRes);
    });
});

describe("convertToBoolean in common.js module", () => {
    test("convertToBoolean is a function", () => {
        const flag = getDataType(convertToBoolean) === "Function";
        expect(flag).toBeTruthy();
    });
    test("convertToBoolean() to be falsy", () => {
        const res = convertToBoolean();
        expect(res).toBeFalsy();
    });
    test("convertToBoolean(0) to be falsy", () => {
        const res = convertToBoolean(0);
        expect(res).toBeFalsy();
    });
    test("convertToBoolean(null) to be falsy", () => {
        const res = convertToBoolean(null);
        expect(res).toBeFalsy();
    });
    test("convertToBoolean(undefined) to be falsy", () => {
        const res = convertToBoolean(undefined);
        expect(res).toBeFalsy();
    });
    test("convertToBoolean('false') to be falsy", () => {
        const res = convertToBoolean("false");
        expect(res).toBeFalsy();
    });
    test("convertToBoolean(false) to be falsy", () => {
        const res = convertToBoolean(false);
        expect(res).toBeFalsy();
    });
    test("convertToBoolean('0',['0']) to be falsy", () => {
        const res = convertToBoolean(false);
        expect(res).toBeFalsy();
    });
    test("convertToBoolean('0') to be truthy", () => {
        const res = convertToBoolean("0");
        expect(res).toBeTruthy();
    });
});
