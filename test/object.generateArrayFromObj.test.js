import { getDataType } from "../src/common.js";
import { generateArrayFromObj } from "../src/object.js";

describe("object generateArrayFromObj function", () => {
  test("generateArrayFromObj is a function", () => {
    const res = getDataType(generateArrayFromObj);
    expect(res).toBe("Function");
  });

  test("generateArrayFromObj({ a: 1, b: 'bb', c: true }) to be ['a=1','b=bb','c=true']", () => {
    const res = generateArrayFromObj({ a: 1, b: "bb", c: true });
    expect(res).toEqual(expect.arrayContaining(["a=1", "b=bb", "c=true"]));
  });

  test("generateArrayFromObj({a: 1, b: 'bb', c: true},{mark: '&'}) to be ['a&1','b&bb','c&true']", () => {
    const res = generateArrayFromObj({ a: 1, b: "bb", c: true }, { mark: "&" });
    expect(res).toEqual(expect.arrayContaining(["a&1", "b&bb", "c&true"]));
  });

  test("generateArrayFromObj({a: 1, b: 'bb', c: true, d: '中文'},{convertFn: encodeURIComponent}) to be ['a=1','b=bb','c=true','d=%E4%B8%AD%E6%96%87']", () => {
    const res = generateArrayFromObj(
      { a: 1, b: "bb", c: true, d: "中文" },
      { convertFn: encodeURIComponent },
    );
    expect(res).toEqual(expect.arrayContaining(["a=1", "b=bb", "c=true", "d=%E4%B8%AD%E6%96%87"]));
  });
});
