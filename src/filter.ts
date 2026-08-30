import type { Venue, VenueType } from "./data/venues";

export interface FilterState {
  region: string;
  type: VenueType | "All";
}

export const filterVenues = (
  venues: Venue[],
  filter: FilterState,
): Venue[] =>
  venues.filter(
    (venue) =>
      (filter.region === "All" || venue.region === filter.region) &&
      (filter.type === "All" || venue.type === filter.type),
  );
