import { getLangFromUrl } from "./utils";

describe("getLangFromUrl", () => {
  [
    ["/en/blog", "en"],
    ["/blog", "en"],
    ["/fr/blog", "fr"],
    ["/en", "en"],
    ["/fr", "fr"],
    ["/", "en"],
  ].forEach(([pathname, expected]) => {
    it(`should return ${expected} for ${pathname}`, () => {
      expect(getLangFromUrl(pathname)).toBe(expected);
    });
  });

  it("should return the default language if the pathname does not contain a valid language", () => {
    expect(getLangFromUrl("/blog")).toBe("en");
  });
});
