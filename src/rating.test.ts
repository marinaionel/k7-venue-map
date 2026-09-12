import { describe, expect, it } from "vitest";
import { formatRating, formatReviewCount } from "./rating";

describe("formatRating", () => {
  it("formats a score with one decimal", () => {
    expect(formatRating(4.6)).toBe("4.6");
  });

  it("rounds to the nearest tenth", () => {
    expect(formatRating(4.65)).toBe("4.7");
  });
});

describe("formatReviewCount", () => {
  it("groups thousands with English separators", () => {
    expect(formatReviewCount(0)).toBe("0");
    expect(formatReviewCount(1234)).toBe("1,234");
    expect(formatReviewCount(1500000)).toBe("1,500,000");
  });
});