import { isObject } from "../src/object.js";

test("isObject({}) to be true", () => {
  const res = isObject({});
  expect(res).toBeTruthy();
});
test("isObject() to be false", () => {
  const res = isObject();
  expect(res).toBeFalsy();
});
test("isObject('') to be false", () => {
  const res = isObject("");
  expect(res).toBeFalsy();
});
test("isObject(null) to be false", () => {
  const res = isObject(null);
  expect(res).toBeFalsy();
});
test("isObject(0) to be false", () => {
  const res = isObject(0);
  expect(res).toBeFalsy();
});
test("isObject([1,2,3]) to be false", () => {
  const res = isObject([1, 2, 3]);
  expect(res).toBeFalsy();
});
test("isObject(true) to be false", () => {
  const res = isObject(true);
  expect(res).toBeFalsy();
});
test("isObject(undefined) to be false", () => {
  const res = isObject(undefined);
  expect(res).toBeFalsy();
});
