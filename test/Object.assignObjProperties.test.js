import { getDataType, stringifyData } from "../src/common.js";
import { assignObjProperties } from "../src/object.js";

describe("assignObjProperties in Object.js", () => {
  test("assignObjProperties is a function", () => {
    const flag = getDataType(assignObjProperties) === "Function";
    expect(flag).toBeTruthy();
  });

  test("assignObjProperties(target,source) to be expectD", () => {
    const target = {
      a: 1,
      b: 2,
      c: 3,
    };
    const source = {
      b: 7,
      f: 9,
    };
    const expectD = {
      a: 1,
      b: 7,
      c: 3,
      f: 9,
    };
    const res = assignObjProperties(target, source);
    expect(stringifyData(res) === stringifyData(expectD)).toBeTruthy();
  });
  test("assignObjProperties(target,source,properties) and specify properties to be expectD", () => {
    const target = {
      a: 1,
      b: 2,
      c: 3,
      q: "q",
    };
    const source = {
      a: 12,
      b: 7,
      c: "c",
      f: 9,
      p: "p",
    };
    const properties = ["a", "c"];
    const expectD = {
      a: 12,
      b: 2,
      c: "c",
      q: "q",
    };
    const res = assignObjProperties(target, source, properties);
    expect(stringifyData(res) === stringifyData(expectD)).toBeTruthy();
  });
  test("assignObjProperties(target,source) but target not an object then return target itself", () => {
    const target = [1, 2, 3, 4];
    const source = {
      a: 12,
      b: 7,
      c: "c",
      f: 9,
      p: "p",
    };
    const expectD = target;
    const res = assignObjProperties(target, source);
    expect(stringifyData(res) === stringifyData(expectD)).toBeTruthy();
  });
  test("assignObjProperties(target,source) ant target is an object but source not an object then return target itself", () => {
    const target = { a: 1, b: 2 };
    const sources = [[1, 2, 3], false, "0", 123, undefined, null];
    const expectD = target;
    for (const source of sources) {
      const res = assignObjProperties(target, source);
      expect(stringifyData(res) === stringifyData(expectD)).toBeTruthy();
    }
  });
});
