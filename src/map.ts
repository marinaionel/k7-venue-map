import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import type { Venue, VenueType } from "./data/venues";

const TYPE_COLORS: Record<VenueType, string> = {
  Museum: "#0f766e",
  Teater: "#db2777",
  "Klassisk musik": "#d97706",
  Film: "#7c3aed",
};

export const TYPE_LABELS: Record<VenueType, string> = {
  Museum: "Museum",
  Teater: "Teater",
  "Klassisk musik": "Classical music",
  Film: "Film",
};

export interface VenueMap {
  map: maplibregl.Map;
  setVenues(venues: Venue[]): number;
}

const OSM_TILES = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const MAX_BOUNDS: [[number, number], [number, number]] = [
  [4, 54],
  [15, 60],
];

const createMarkerElement = (type: VenueType): HTMLDivElement => {
  const el = document.createElement("div");
  el.className = "venue-marker";
  el.style.setProperty("--marker-color", TYPE_COLORS[type]);
  el.setAttribute("data-type", type);
  return el;
};

const popupContent = (venue: Venue): string => {
  const typeBadge = `<span class="badge badge-type">${TYPE_LABELS[venue.type]}</span>`;
  const regionBadge = `<span class="badge badge-region">${venue.region}</span>`;
  const link = venue.url
    ? `<a class="venue-link" href="${venue.url}" target="_blank" rel="noopener noreferrer">Visit website</a>`
    : "";
  return `<div class="venue-popup">
      <h3>${venue.name}</h3>
      <div class="popup-badges">${typeBadge}${regionBadge}</div>
      ${link}
    </div>`;
};

export const createVenueMap = (
  container: string | HTMLElement,
): VenueMap => {
  const map = new maplibregl.Map({
    container,
    style: {
      version: 8,
      sources: {
        osm: {
          type: "raster",
          tiles: [OSM_TILES],
          tileSize: 256,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxzoom: 19,
        },
      },
      layers: [
        {
          id: "osm",
          type: "raster",
          source: "osm",
        },
      ],
    },
    center: [10.5, 56],
    zoom: 5,
    maxBounds: MAX_BOUNDS,
  });

  map.addControl(new maplibregl.NavigationControl(), "top-right");

  let markers: maplibregl.Marker[] = [];

  const clearMarkers = (): void => {
    for (const marker of markers) marker.remove();
    markers = [];
  };

  const setVenues = (next: Venue[]): number => {
    clearMarkers();
    const byCoordinate = new Map<string, Venue>();
    for (const venue of next) {
      byCoordinate.set(`${venue.lat},${venue.lng}`, venue);
    }
    markers = [...byCoordinate.values()].map((venue) => {
      const marker = new maplibregl.Marker({
        element: createMarkerElement(venue.type),
      })
        .setLngLat([venue.lng, venue.lat])
        .setPopup(new maplibregl.Popup({ offset: 18 }).setHTML(popupContent(venue)))
        .addTo(map);
      return marker;
    });
    return markers.length;
  };

  return { map, setVenues };
};
