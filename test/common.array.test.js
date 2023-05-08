import {
  generateUniqueEleArr,
  getDataType,
  mergeArrays,
  getUniqueArrIndexes,
  getRepetedEleIndexesInArr,
} from "../src/common.js";

describe("array related function in common.js", () => {
  describe("getUniqueArrIndexes related", () => {
    test("getUniqueArrIndexes is a function", () => {
      const flag = getDataType(getUniqueArrIndexes) === "Function";
      expect(flag).toBeTruthy();
    });
    test(`getUniqueArrIndexes(testArr) to equal expectArr`, () => {
      const testArr = [0, 1, 1, 2, 3, 2];
      const expectArr = [0, 1, 3, 4];
      const res = getUniqueArrIndexes(testArr);
      expect(res).toEqual(expect.arrayContaining(expectArr));
    });

    test(`getUniqueArrIndexes(testArr,true) to equal expectArr`, () => {
      const testArr = [0, { a: 1 }, { a: 1 }, 2, 3, 2];
      const expectArr = [0, 1, 3, 4];
      const res = getUniqueArrIndexes(testArr, true);
      expect(res).toEqual(expectArr);
    });

    test(`getUniqueArrIndexes('not array') to equal expectArr`, () => {
      const testArr = "not array";
      const expectArr = [];
      const res = getUniqueArrIndexes(testArr);
      expect(res).toEqual(expectArr);
    });
  });

  describe("getRepetedEleIndexesInArr related", () => {
    test("getRepetedEleIndexesInArr is a function", () => {
      const flag = getDataType(getRepetedEleIndexesInArr) === "Function";
      expect(flag).toBeTruthy();
    });

    test(`getRepetedEleIndexesInArr(testArr) to equal expectArr`, () => {
      const testArr = [0, 1, 1, 2, 3, 2, { a: 1 }, { a: 1 }];
      const expectArr = [2, 5];
      const res = getRepetedEleIndexesInArr(testArr);
      expect(res).toEqual(expectArr);
    });

    test(`getRepetedEleIndexesInArr(testArr,true) to equal expectArr`, () => {
      const testArr = [0, { a: 1 }, { a: 1 }, 2, 3, 2];
      const expectArr = [2, 5];
      const res = getRepetedEleIndexesInArr(testArr, true);
      expect(res).toEqual(expectArr);
    });
  });

  describe("generateUniqueEleArr related", () => {
    test("generateUniqueEleArr is a function", () => {
      const flag = getDataType(generateUniqueEleArr);
      expect(flag).toBeTruthy();
    });
  });

  describe("generate a basic type(number,string,boolean,null) datas that no repetition array", () => {
    test("generateUniqueEleArr(testArr) to equal expectArr", () => {
      const testArr = [
        1,
        1,
        0,
        0,
        2,
        2,
        true,
        true,
        null,
        null,
        { a: 1 },
        { a: 1 },
        [1, 2],
        [1, 2],
        "foo",
        "foo",
      ];
      const expectArr = [1, 0, 2, true, null, { a: 1 }, { a: 1 }, [1, 2], [1, 2], "foo"];
      const res = generateUniqueEleArr(testArr);
      expect(res).toEqual(expect.arrayContaining(expectArr));
    });
  });

  describe("generate a stringifyData(datas) that no repetition array", () => {
    test("generateUniqueEleArr(testArr, true) to equal expectArr", () => {
      const testArr = [
        1,
        1,
        0,
        0,
        2,
        2,
        true,
        true,
        null,
        null,
        { a: 1 },
        { a: 1 },
        [1, 2],
        [1, 2],
        "foo",
        "foo",
      ];
      const expectArr = [1, 0, 2, true, null, { a: 1 }, [1, 2], "foo"];
      const res = generateUniqueEleArr(testArr, true);
      expect(res).toEqual(expect.arrayContaining(expectArr));
    });
  });

  describe("mergeArrays related", () => {
    test("mergeArrays is a function", () => {
      const flag = getDataType(mergeArrays);
      expect(flag).toBeTruthy();
    });

    test("mergeArrays(arr1,arr2) to equal expectArr", () => {
      const arr1 = [1, 1, 2, 0, false, { a: 1 }];
      const arr2 = [1, "a", true, null, null, { a: 1 }, [1, 2, 3]];
      const expectArr = [
        1,
        1,
        2,
        0,
        false,
        { a: 1 },
        1,
        "a",
        true,
        null,
        null,
        { a: 1 },
        [1, 2, 3],
      ];
      const res = mergeArrays(arr1, arr2);
      expect(res).toEqual(expect.arrayContaining(expectArr));
    });

    test("arr1 empty array: mergeArrays(arr1,arr2) to equal expectArr", () => {
      const arr1 = [];
      const arr2 = [1, "a", true, null, null, { a: 1 }, [1, 2, 3]];
      const expectArr = [1, "a", true, null, null, { a: 1 }, [1, 2, 3]];
      const res = mergeArrays(arr1, arr2);
      expect(res).toEqual(expect.arrayContaining(expectArr));
    });

    test("arr2 empty array: mergeArrays(arr1,arr2) to equal expectArr", () => {
      const arr1 = [1, 1, 2, 0, false, { a: 1 }];
      const arr2 = [];
      const expectArr = [1, 1, 2, 0, false, { a: 1 }];
      const res = mergeArrays(arr1, arr2);
      expect(res).toEqual(expect.arrayContaining(expectArr));
    });

    test("arr1 is undefined: mergeArrays(arr1,arr2) to equal expectArr", () => {
      const arr1 = undefined;
      const arr2 = [1, "a", true, null, null, { a: 1 }, [1, 2, 3]];
      const expectArr = [1, "a", true, null, null, { a: 1 }, [1, 2, 3]];
      const res = mergeArrays(arr1, arr2);
      expect(res).toEqual(expect.arrayContaining(expectArr));
    });

    test("arr2 is undefined: mergeArrays(arr1,arr2) to equal expectArr", () => {
      const arr1 = [1, 1, 2, 0, false, { a: 1 }];
      const arr2 = undefined;
      const expectArr = [1, 1, 2, 0, false, { a: 1 }];
      const res = mergeArrays(arr1, arr2);
      expect(res).toEqual(expect.arrayContaining(expectArr));
    });

    test("arr1 is null: mergeArrays(arr1,arr2) to equal expectArr", () => {
      const arr1 = null;
      const arr2 = [1, "a", true, null, null, { a: 1 }, [1, 2, 3]];
      const expectArr = [1, "a", true, null, null, { a: 1 }, [1, 2, 3]];
      const res = mergeArrays(arr1, arr2);
      expect(res).toEqual(expect.arrayContaining(expectArr));
    });

    test("arr2 is null: mergeArrays(arr1,arr2) to equal expectArr", () => {
      const arr1 = [1, 1, 2, 0, false, { a: 1 }];
      const arr2 = null;
      const expectArr = [1, 1, 2, 0, false, { a: 1 }];
      const res = mergeArrays(arr1, arr2);
      expect(res).toEqual(expect.arrayContaining(expectArr));
    });

    test("more than 2 arrays: mergeArrays(arr1,arr2,arr3) to equal expectArr", () => {
      const arr1 = [1, 1, 2, 0, false, { a: 1 }];
      const arr2 = [1, 3, "3"];
      const arr3 = [null, undefined, {}, []];
      const expectArr = [1, 1, 2, 0, false, { a: 1 }, 1, 3, "3", null, undefined, {}, []];
      const res = mergeArrays(arr1, arr2, arr3);
      expect(res).toEqual(expect.arrayContaining(expectArr));
    });
  });
});
