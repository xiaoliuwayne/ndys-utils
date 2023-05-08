import { tryCatchBlock } from "../src/common.js";

test("tryCatchBlock(tryFn)(1,2) to be 'input a is 1, input b is 2'", () => {
  function tryFn(a, b) {
    return `input a is ${a}, input b is ${b}`;
  }
  const tryTest = tryCatchBlock(tryFn);
  const res = tryTest(1, 2);
  expect(res).toBe("input a is 1, input b is 2");
});

test("tryCatchBlock(errFn)('RangeError') to be RangeError", () => {
  const errFn = (errName) => {
    throw new RangeError(errName);
  };
  const tryTest = tryCatchBlock(errFn);
  const res = tryTest("RangeError");
  expect(res).toBe("RangeError");
});

test("tryCatchBlock(tryFn)('test msg') to be ReferenceError", () => {
  // ReferenceError（引用错误）对象代表 当一个不存在（或尚未初始化）的变量被引用时发生的错误。
  const tryFn = (msg) => {
    console, log(msg); // Error Point
  };
  const tryTest = tryCatchBlock(tryFn);
  const res = tryTest("test msg");
  expect(res).toBe("ReferenceError");
});
