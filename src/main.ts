import { regions, venues, type VenueType } from "./data/venues";
import { filterVenues, type FilterState } from "./filter";
import { createVenueMap } from "./map";
import "./styles.css";

const regionSelect = document.querySelector<HTMLSelectElement>("#region-filter");
const typeSelect = document.querySelector<HTMLSelectElement>("#type-filter");
const resultCount = document.querySelector<HTMLSpanElement>("#result-count");

if (!regionSelect || !typeSelect || !resultCount) {
  throw new Error("Missing required control elements in the document");
}

const TYPE_OPTIONS = ["All", "Museum", "Teater", "Klassisk musik", "Film"] as const;

const populate = <T extends string>(
  select: HTMLSelectElement,
  options: readonly T[],
  label: (value: T) => string,
): void => {
  for (const value of options) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label(value);
    select.appendChild(option);
  }
};

populate(regionSelect, ["All", ...regions] as const, (value) => value);
populate(typeSelect, TYPE_OPTIONS, (value) => value);

let currentFilter: FilterState = { region: "All", type: "All" };

const app = createVenueMap("map");

const render = (): void => {
  const visible = filterVenues(venues, currentFilter);
  const pinned = app.setVenues(visible);
  resultCount.textContent = `${pinned} / ${new Set(
    visible.map((v) => `${v.lat},${v.lng}`),
  ).size} markers (${visible.length} events)`;
};

regionSelect.addEventListener("change", () => {
  currentFilter = { ...currentFilter, region: regionSelect.value as string | "All" };
  render();
});

typeSelect.addEventListener("change", () => {
  currentFilter = { ...currentFilter, type: typeSelect.value as VenueType | "All" };
  render();
});

app.map.on("load", render);
