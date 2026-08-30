# K7 2026 Venue Map

An interactive web map of all [K7 2026](https://www.k7k7.dk) venues — the free-access
Danish culture festival for everyone up to 27 (7–13 September 2026): museums,
theatres, classical-music venues, and cinemas across Denmark, Sydsverige, and Oslo.

Built with vanilla TypeScript + [MapLibre GL](https://maplibre.org) over
OpenStreetMap tiles.

## Features

- One marker per venue, colored by type (Museum / Teater / Classical music / Film)
- Popup with venue name, type, region, and a link to the venue's website
- Region and type dropdown filters
- Venues sharing a coordinate are collapsed into a single pin (event count still shown)

## Data

`src/data/venues.ts` holds all venues with approximate city-level coordinates,
extracted from k7k7.dk (313 event entries / 305 unique venues). Some venues are
listed multiple times for different performances.

## Development

```bash
pnpm install
pnpm dev        # start dev server
pnpm test       # run unit tests (dataset integrity + filter logic)
pnpm build      # typecheck + production build
```
