import { describe, expect, it } from "vitest";
import { venues } from "./data/venues";
import { filterVenues } from "./filter";

describe("k7 venue dataset", () => {
  it("contains every expected venue", () => {
    expect(venues.length).toBe(313);
  });

  it("every venue has finite coordinates", () => {
    for (const venue of venues) {
      expect(Number.isFinite(venue.lat)).toBe(true);
      expect(Number.isFinite(venue.lng)).toBe(true);
      expect(venue.lat).toBeGreaterThanOrEqual(50);
      expect(venue.lat).toBeLessThanOrEqual(65);
      expect(venue.lng).toBeGreaterThanOrEqual(3);
      expect(venue.lng).toBeLessThanOrEqual(18);
    }
  });

  it("every venue has a name and a region", () => {
    for (const venue of venues) {
      expect(venue.name.trim().length).toBeGreaterThan(0);
      expect(venue.region.trim().length).toBeGreaterThan(0);
    }
  });

  it("all regions are part of the known region set", () => {
    const known = new Set([
      "Aarhus",
      "Bornholm",
      "Fyn",
      "København",
      "Midt- og Vestjylland",
      "Nordjylland",
      "Nordsjælland",
      "Oslo",
      "Syd - og Sønderjylland",
      "Syd- og Vestsjælland",
      "Sydsverige",
    ]);
    for (const venue of venues) {
      expect(known.has(venue.region)).toBe(true);
    }
  });
});

describe("filterVenues", () => {
  it("returns everything for no filters", () => {
    expect(filterVenues(venues, { region: "All", type: "All" }).length).toBe(
      venues.length,
    );
  });

  it("filters by region only", () => {
    const result = filterVenues(venues, { region: "Bornholm", type: "All" });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((v) => v.region === "Bornholm")).toBe(true);
  });

  it("filters by type only", () => {
    const result = filterVenues(venues, { region: "All", type: "Museum" });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((v) => v.type === "Museum")).toBe(true);
  });

  it("filters by region and type combined", () => {
    const result = filterVenues(venues, {
      region: "København",
      type: "Film",
    });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((v) => v.region === "København" && v.type === "Film")).toBe(
      true,
    );
  });
});
