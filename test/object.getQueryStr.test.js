import { getDataType } from "../src/common.js";
import { getQueryStr } from "../src/object.js";

describe("object getQueryStr function", () => {
  test("getQueryStr is a function", () => {
    const res = getDataType(getQueryStr);
    expect(res).toBe("Function");
  });

  test("getQueryStr({a: 1, b: 'bb', c: true, d: '中文'},{convertFn: encodeURIComponent}) to be 'a=1&b=bb&c=true&d=%E4%B8%AD%E6%96%87'", () => {
    const res = getQueryStr(
      { a: 1, b: "bb", c: true, d: "中文" },
      { convertFn: encodeURIComponent },
    );
    expect(res).toBe("a=1&b=bb&c=true&d=%E4%B8%AD%E6%96%87");
  });
});
