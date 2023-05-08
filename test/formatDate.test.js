import { getDataType } from "../src/common.js";
import { formatDate, dateStrConvertor } from "../src/formatDate.js";

describe("formatDate.js mudule", () => {
  describe("formatDate in formatDate.js", () => {
    test("formatDate is a function", () => {
      const flag = getDataType(formatDate) === "Function";
      expect(flag).toBeTruthy();
    });
    test("res = formatDate(source). source is Date instance, res is a datetime string which default format is yyyy-mm-dd HH:MM:SS", () => {
      const source = new Date("2022", "11", "15", "10", "11", "45");
      const expectRes = "2022-11-15 10:11:45";
      const res = formatDate(source);
      expect(res).toBe(expectRes);
    });
    test("res = formatDate(source). source is datetime string, res is a datetime string which default format is yyyy-mm-dd HH:MM:SS", () => {
      const source = "December 17, 1995 03:24:00"; // 1995-12-17T03:24:00
      const expectRes = "1995-12-17 03:24:00";
      const res = formatDate(source);
      expect(res).toBe(expectRes);
    });
    test("res = formatDate(source,'yyyy-mm-dd HH:MM:SS'). source is datetime string, res is a datetime string which format is given", () => {
      const source = "1995-12-17T03:24:00";
      const expectRes = "1995-12-17 03:24:00";
      const res = formatDate(source, "yyyy-mm-dd HH:MM:SS");
      expect(res).toBe(expectRes);
    });
    test("res = formatDate(source,'illegal format'). source is datetime string, res is a default datetime string which format is given illegal", () => {
      const source = "1995-12-17T03:24:00";
      const expectRes = "1995-12-17 03:24:00";
      const res = formatDate(source, "illegal format");
      expect(res).toBe(expectRes);
    });
    test("res = formatDate(source,'yyyy-mm-dd HH:MM'). source is datetime string, res is a datetime string which format is given", () => {
      const source = "1995-12-17T03:24:12";
      const expectRes = "1995-12-17 03:24";
      const res = formatDate(source, "yyyy-mm-dd HH:MM");
      expect(res).toBe(expectRes);
    });
    test("res = formatDate(source,'yyyy-mm-dd HH'). source is datetime string, res is a datetime string which format is given", () => {
      const source = "1995-12-17T03:24:12";
      const expectRes = "1995-12-17 03";
      const res = formatDate(source, "yyyy-mm-dd HH");
      expect(res).toBe(expectRes);
    });
    test("res = formatDate(source,'yyyy-mm-dd'). source is datetime string, res is a datetime string which format is given", () => {
      const source = "1995-12-17T03:24:12";
      const expectRes = "1995-12-17";
      const res = formatDate(source, "yyyy-mm-dd");
      expect(res).toBe(expectRes);
    });
    test("res = formatDate(source,'yyyy-mm'). source is datetime string, res is a datetime string which format is given", () => {
      const source = "1995-12-17T03:24:12";
      const expectRes = "1995-12";
      const res = formatDate(source, "yyyy-mm");
      expect(res).toBe(expectRes);
    });
    test("res = formatDate(source,'mm-dd'). source is datetime string, res is a datetime string which format is given", () => {
      const source = "1995-12-17T03:24:12";
      const expectRes = "12-17";
      const res = formatDate(source, "mm-dd");
      expect(res).toBe(expectRes);
    });
    test("res = formatDate(source,'yyyy'). source is datetime string, res is a datetime string which format is given", () => {
      const source = "1995-12-17T03:24:12";
      const expectRes = "1995";
      const res = formatDate(source, "yyyy");
      expect(res).toBe(expectRes);
    });
    test("res = formatDate(source,'yyyy/mm/dd HH:MM:SS'). source is datetime string, res is a datetime string which format is given", () => {
      const source = "1995-12-17T03:24:00";
      const expectRes = "1995/12/17 03:24:00";
      const res = formatDate(source, "yyyy/mm/dd HH:MM:SS");
      expect(res).toBe(expectRes);
    });
    test("res = formatDate(source,'yyyy/mm/dd H:M:S'). source is datetime string, res is a datetime string which format is given", () => {
      const source = "1995-12-17T03:24:00";
      const expectRes = "1995/12/17 3:24:0";
      const res = formatDate(source, "yyyy/mm/dd H:M:S");
      expect(res).toBe(expectRes);
    });
    test("res = formatDate(source,'yy/m/d HH:MM:SS'). source is datetime string, res is a datetime string which format is given", () => {
      const source = "1995-02-07T03:24:00";
      const expectRes = "95/2/7 03:24:00";
      const res = formatDate(source, "yy/m/d HH:MM:SS");
      expect(res).toBe(expectRes);
    });
    test("res = formatDate(source,'yyyy/mm/dd HH:MM:SS'). source cannot convert to Date instance, res to be empty string", () => {
      const source = "abc";
      const expectRes = "";
      const res = formatDate(source, "yyyy/mm/dd HH:MM:SS");
      expect(res).toBe(expectRes);
    });
  });
  describe("datetimeStrConvertor in formatDate.js", () => {
    test("datetimeStrConvertor is a function", () => {
      const flag = getDataType(datetimeStrConvertor) === "Function";
      expect(flag).toBeTruthy();
    });
    test("dateStrConvertor('12/25/2000','mm/dd/yyyy'),res to be expectRes", () => {
      const source = "12/25/2000";
      const sourceFormat = "mm/dd/yyyy";
      const expectRes = "2000-12-25"; // default outputFormat: yyyy-mm-dd
      const res = dateStrConvertor(source, sourceFormat);
      expect(res).toBeTruthy(expectRes);
    });
    test("dateStrConvertor('12~10~2000','dd~mm~yyyy','yyyy/mm/dd'),res to be expectRes", () => {
      const source = "12~10~2000";
      const sourceFormat = "dd~mm~yyyy";
      const outputFormat = "yyyy/mm/dd";
      const expectRes = "2000/10/12";
      const res = dateStrConvertor(source, sourceFormat, outputFormat);
      expect(res).toBeTruthy(expectRes);
    });
    test("dateStrConvertor('12 10 2000','dd mm yyyy','yyyy/mm/dd'),res to be expectRes", () => {
      const source = "12 10 2000";
      const sourceFormat = "dd mm yyyy";
      const outputFormat = "yyyy/mm/dd";
      const expectRes = "2000/10/12";
      const res = dateStrConvertor(source, sourceFormat, outputFormat);
      expect(res).toBeTruthy(expectRes);
    });
    test("dateStrConvertor('12102000','ddmmyyyy','yyyy/mm/dd'),res to be expectRes", () => {
      const source = "12102000";
      const sourceFormat = "ddmmyyyy";
      const outputFormat = "yyyy/mm/dd";
      const expectRes = "2000/10/12";
      const res = dateStrConvertor(source, sourceFormat, outputFormat);
      expect(res).toBeTruthy(expectRes);
    });
    test("dateStrConvertor('122000','dmyyyy','yyyy/mm/dd'),res to be expectRes", () => {
      const source = "122000";
      const sourceFormat = "dmyyyy";
      const outputFormat = "yyyy/mm/dd";
      const expectRes = "2000/01/02";
      const res = dateStrConvertor(source, sourceFormat, outputFormat);
      expect(res).toBeTruthy(expectRes);
    });
    test("dateStrConvertor('122000','dmyyyy','yyyy/m/d'),res to be expectRes", () => {
      const source = "122000";
      const sourceFormat = "dmyyyy";
      const outputFormat = "yyyy/m/d";
      const expectRes = "2000/2/1";
      const res = dateStrConvertor(source, sourceFormat, outputFormat);
      expect(res).toBeTruthy(expectRes);
    });
    test("dateStrConvertor('122000','notaformat','yyyy/m/d'),res to be expectRes which an empty string", () => {
      const source = "122000";
      const sourceFormat = "notaformat";
      const outputFormat = "yyyy/m/d";
      const expectRes = "";
      const res = dateStrConvertor(source, sourceFormat, outputFormat);
      expect(res).toBeTruthy(expectRes);
    });
    test("dateStrConvertor('nota-fo-rm','yyyy-mm-dd','yyyy/m/d'),res to be expectRes which an empty string", () => {
      const source = "nota-fo-rm";
      const sourceFormat = "yyyy-mm-dd";
      const outputFormat = "yyyy/m/d";
      const expectRes = "";
      const res = dateStrConvertor(source, sourceFormat, outputFormat);
      expect(res).toBeTruthy(expectRes);
    });
  });
});
