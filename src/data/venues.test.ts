import { describe, expect, it } from "vitest";
import { venues } from "./venues";

const museums = venues.filter((v) => v.type === "Museum");
const nonMuseums = venues.filter((v) => v.type !== "Museum");

describe("google rating data", () => {
  it("non-museums never carry rating data", () => {
    for (const venue of nonMuseums) {
      expect(venue.rating).toBeUndefined();
      expect(venue.reviews).toBeUndefined();
    }
  });

  it("museums carry rating and reviews together", () => {
    for (const venue of museums) {
      if (venue.rating !== undefined || venue.reviews !== undefined) {
        expect(venue.rating).toBeDefined();
        expect(venue.reviews).toBeDefined();
      }
    }
  });

  it("ratings are within valid range and counts are positive integers", () => {
    for (const venue of museums) {
      if (venue.rating !== undefined) {
        expect(venue.rating).toBeGreaterThanOrEqual(0);
        expect(venue.rating).toBeLessThanOrEqual(5);
        expect(Number.isInteger(venue.reviews)).toBe(true);
        expect(venue.reviews!).toBeGreaterThan(0);
      }
    }
  });

  it("at least half of all museums have a rating", () => {
    const rated = museums.filter((v) => v.rating !== undefined).length;
    expect(rated).toBeGreaterThan(museums.length * 0.5);
  });
});