import { getDataType } from "../src/common.js";

test("getDataType() to be Undefined", () => {
  const type = getDataType();
  expect(type).toBe("Undefined");
});
test("getDataType(undefined) to be Undefined", () => {
  const type = getDataType(undefined);
  expect(type).toBe("Undefined");
});

test("getDataType(null) to be Null", () => {
  const type = getDataType(null);
  expect(type).toBe("Null");
});

test("getDataType(0) to be Number", () => {
  const type = getDataType(0);
  expect(type).toBe("Number");
});

test("getDataType(BigInt(Number.MAX_SAFE_INTEGER)) to be BigInt", () => {
  const type = getDataType(BigInt(Number.MAX_SAFE_INTEGER));
  expect(type).toBe("BigInt");
});

test("getDataType('') to be String", () => {
  const type = getDataType("");
  expect(type).toBe("String");
});

test("getDataType(Symbol('foo')) to be Symbol", () => {
  const type = getDataType(Symbol("foo"));
  expect(type).toBe("Symbol");
});

test("getDataType(true) to be Boolean", () => {
  const type = getDataType(true);
  expect(type).toBe("Boolean");
});

test("getDataType([1,2,3]) to be Array", () => {
  const type = getDataType([1, 2, 3]);
  expect(type).toBe("Array");
});

test("getDataType({a:1}) to be Object", () => {
  const type = getDataType({ a: 1 });
  expect(type).toBe("Object");
});

test("getDataType(new Date()) to be Date", () => {
  const type = getDataType(new Date());
  expect(type).toBe("Date");
});

test("getDataType(/abc/g) to be RegExp", () => {
  const type = getDataType(/abc/g);
  expect(type).toBe("RegExp");
});

test("getDataType(() => {}) to be Function", () => {
  const type = getDataType(() => {});
  expect(type).toBe("Function");
});

test("getDataType(new Map()) to be Map", () => {
  const type = getDataType(new Map());
  expect(type).toBe("Map");
});

test("getDataType(new WeakMap()) to be WeakMap", () => {
  const type = getDataType(new WeakMap());
  expect(type).toBe("WeakMap");
});

test("getDataType(new Set()) to be Set", () => {
  const type = getDataType(new Set());
  expect(type).toBe("Set");
});

test("getDataType(new WeakSet()) to be WeakSet", () => {
  const type = getDataType(new WeakSet());
  expect(type).toBe("WeakSet");
});

test("getDataType(new Error()) to be Error", () => {
  const type = getDataType(new Error());
  expect(type).toBe("Error");
});

test("getDataType(Math) to be Math", () => {
  const type = getDataType(Math);
  expect(type).toBe("Math");
});

test("getDataType(JSON) to be JSON", () => {
  const type = getDataType(JSON);
  expect(type).toBe("JSON");
});
