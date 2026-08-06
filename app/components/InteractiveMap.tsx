"use client";

import { useEffect, useRef, useState } from "react";
import {
  Ambulance,
  Coffee,
  Landmark,
  ShoppingBag,
  SquareParking,
  Toilet,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";

type CategoryId =
  | "heritage"
  | "food"
  | "shops"
  | "coffee"
  | "restroom"
  | "parking"
  | "emergency";

type Place = {
  id: string;
  name: string;
  category: CategoryId;
  lat: number;
  lng: number;
  status: "Open" | "Closed";
  visit: string;
  walk: string;
};

const CATEGORIES: {
  id: CategoryId;
  label: string;
  icon: LucideIcon;
  color: string;
  paths: string;
}[] = [
  {
    id: "heritage",
    label: "Heritage",
    icon: Landmark,
    color: "#1e4f9c",
    paths:
      '<path d="M10 18v-7"/><path d="M11.119 2.205a2 2 0 0 1 1.762 0l7.84 3.846A.5.5 0 0 1 20.5 7h-17a.5.5 0 0 1-.22-.949z"/><path d="M14 18v-7"/><path d="M18 18v-7"/><path d="M3 22h18"/><path d="M6 18v-7"/>',
  },
  {
    id: "food",
    label: "Food",
    icon: UtensilsCrossed,
    color: "#b45309",
    paths:
      '<path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8"/><path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7"/><path d="m2.1 21.8 6.4-6.3"/><path d="m19 5-7 7"/>',
  },
  {
    id: "shops",
    label: "Shops",
    icon: ShoppingBag,
    color: "#7c3aed",
    paths:
      '<path d="M16 10a4 4 0 0 1-8 0"/><path d="M3.103 6.034h17.794"/><path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z"/>',
  },
  {
    id: "coffee",
    label: "Coffee",
    icon: Coffee,
    color: "#92400e",
    paths:
      '<path d="M10 2v2"/><path d="M14 2v2"/><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"/><path d="M6 2v2"/>',
  },
  {
    id: "restroom",
    label: "Restrooms",
    icon: Toilet,
    color: "#0e7490",
    paths:
      '<path d="M7 12h13a1 1 0 0 1 1 1 5 5 0 0 1-5 5h-.598a.5.5 0 0 0-.424.765l1.544 2.47a.5.5 0 0 1-.424.765H5.402a.5.5 0 0 1-.424-.765L7 18"/><path d="M8 18a5 5 0 0 1-5-5V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8"/>',
  },
  {
    id: "parking",
    label: "Parking",
    icon: SquareParking,
    color: "#047857",
    paths:
      '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/>',
  },
  {
    id: "emergency",
    label: "Emergency",
    icon: Ambulance,
    color: "#b91c1c",
    paths:
      '<path d="M10 10H6"/><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.28a1 1 0 0 0-.684-.948l-1.923-.641a1 1 0 0 1-.578-.502l-1.539-3.076A1 1 0 0 0 16.382 8H14"/><path d="M8 8v4"/><path d="M9 18h6"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>',
  },
];

const PLACES: Place[] = [
  { id: "basilica", name: "Taal Basilica", category: "heritage", lat: 13.8808, lng: 120.9242, status: "Open", visit: "45 min visit", walk: "Walk 6 mins" },
  { id: "casa-villa", name: "Casa Villavicencio", category: "heritage", lat: 13.8795, lng: 120.9228, status: "Open", visit: "30 min visit", walk: "Walk 4 mins" },
  { id: "sta-lucia-well", name: "Sta. Lucia Well", category: "heritage", lat: 13.8805, lng: 120.9258, status: "Open", visit: "15 min visit", walk: "Walk 8 mins" },
  { id: "caysasay", name: "Caysasay Shrine", category: "heritage", lat: 13.8819, lng: 120.9282, status: "Open", visit: "45 min visit", walk: "Walk 15 mins" },
  { id: "tapa-house", name: "Original Taal Tapa House", category: "food", lat: 13.8788, lng: 120.9222, status: "Open", visit: "30 min visit", walk: "Walk 5 mins" },
  { id: "empanada", name: "Empanada Corner", category: "food", lat: 13.879, lng: 120.9232, status: "Open", visit: "20 min visit", walk: "Walk 3 mins" },
  { id: "bakery", name: "Heritage Bakery", category: "food", lat: 13.8793, lng: 120.9217, status: "Open", visit: "15 min visit", walk: "Walk 2 mins" },
  { id: "balisong-shop", name: "Taal Balisong Shop", category: "shops", lat: 13.8798, lng: 120.9219, status: "Open", visit: "20 min visit", walk: "Walk 5 mins" },
  { id: "market", name: "Taal Public Market", category: "shops", lat: 13.8787, lng: 120.9218, status: "Open", visit: "30 min visit", walk: "Walk 7 mins" },
  { id: "craft-gallery", name: "Embroidery Craft Gallery", category: "shops", lat: 13.881, lng: 120.9265, status: "Closed", visit: "30 min visit", walk: "Walk 9 mins" },
  { id: "cafe-taal", name: "Café Taal", category: "coffee", lat: 13.8796, lng: 120.9237, status: "Open", visit: "25 min visit", walk: "Walk 3 mins" },
  { id: "roastery", name: "Taal Coffee Roastery", category: "coffee", lat: 13.8791, lng: 120.9245, status: "Open", visit: "20 min visit", walk: "Walk 4 mins" },
  { id: "plaza-restroom", name: "Plaza Restroom", category: "restroom", lat: 13.8803, lng: 120.9238, status: "Open", visit: "—", walk: "Walk 2 mins" },
  { id: "market-restroom", name: "Market Restroom", category: "restroom", lat: 13.8789, lng: 120.9215, status: "Open", visit: "—", walk: "Walk 6 mins" },
  { id: "plaza-parking", name: "Plaza Parking", category: "parking", lat: 13.8801, lng: 120.923, status: "Open", visit: "—", walk: "Walk 1 min" },
  { id: "basilica-parking", name: "Basilica Parking", category: "parking", lat: 13.8812, lng: 120.9247, status: "Open", visit: "—", walk: "Walk 3 mins" },
  { id: "hospital", name: "Taal District Hospital", category: "emergency", lat: 13.8782, lng: 120.9262, status: "Open", visit: "24/7", walk: "Walk 12 mins" },
  { id: "police", name: "Taal Police Station", category: "emergency", lat: 13.8794, lng: 120.9253, status: "Open", visit: "24/7", walk: "Walk 6 mins" },
];

const FALLBACK_CENTER: [number, number] = [13.8802, 120.924];
const DEFAULT_ZOOM = 15;

function pinHtml(paths: string, color: string) {
  return `
    <div class="im-pin" style="--pin-color:${color}">
      <svg class="im-pin-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>
    </div>
  `;
}

export default function InteractiveMap() {
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  const [activeCats, setActiveCats] = useState<Set<CategoryId>>(
    new Set(CATEGORIES.map((c) => c.id)),
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [added, setAdded] = useState<Set<string>>(new Set());

  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<{
    remove(): void;
    panTo(c: [number, number], o?: object): void;
  } | null>(null);
  const markersRef = useRef<Record<string, { remove(): void }>>({});

  useEffect(() => {
    if (typeof window === "undefined") return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
    link.crossOrigin = "";
    document.head.appendChild(link);
    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
    script.crossOrigin = "";
    script.onload = () => setLeafletLoaded(true);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(link);
      document.head.removeChild(script);
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  const toggleCat = (id: CategoryId) => {
    setActiveCats((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const visiblePlaces = PLACES.filter((p) => activeCats.has(p.category));
  const selected =
    PLACES.find((p) => p.id === selectedId && activeCats.has(p.category)) || null;

  useEffect(() => {
    if (!leafletLoaded || !mapRef.current || typeof window === "undefined") return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const L = (window as any).L;
    if (!L) return;

    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current, {
        zoomControl: false,
        attributionControl: false,
      }).setView(FALLBACK_CENTER, DEFAULT_ZOOM);

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        { maxZoom: 20 },
      ).addTo(mapInstance.current);

      L.control.zoom({ position: "bottomright" }).addTo(mapInstance.current);
    }

    Object.values(markersRef.current).forEach((m) => m.remove());
    markersRef.current = {};

    visiblePlaces.forEach((place) => {
      const cat = CATEGORIES.find((c) => c.id === place.category)!;
      const icon = L.divIcon({
        html: pinHtml(cat.paths, cat.color),
        className: "im-marker",
        iconSize: [36, 42],
        iconAnchor: [18, 40],
      });
      const marker = L.marker([place.lat, place.lng], { icon })
        .addTo(mapInstance.current)
        .on("click", () => setSelectedId(place.id));
      markersRef.current[place.id] = marker;
    });
  }, [leafletLoaded, visiblePlaces]);

  useEffect(() => {
    if (!leafletLoaded || !mapInstance.current || typeof window === "undefined") return;
    if (!selectedId) return;
    const place = PLACES.find((p) => p.id === selectedId);
    if (!place) return;
    mapInstance.current.panTo([place.lat, place.lng], {
      animate: true,
      duration: 0.6,
    });
  }, [selectedId, leafletLoaded]);

  const toggleAdded = (id: string) => {
    setAdded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="im">
      <div className="im-cats">
        {CATEGORIES.map((c) => {
          const on = activeCats.has(c.id);
          return (
            <button
              key={c.id}
              type="button"
              className={`im-chip ${on ? "is-on" : "is-off"}`}
              onClick={() => toggleCat(c.id)}
            >
              <span aria-hidden="true">
                <c.icon size={15} strokeWidth={2.2} />
              </span>
              {c.label}
            </button>
          );
        })}
      </div>

      <div className="im-map-wrap">
        {!leafletLoaded && (
          <div className="im-loading">
            <div className="im-loading-spinner" />
            <span>Loading map…</span>
          </div>
        )}
        <div ref={mapRef} className="im-map" />

        {selected && (
          <div className="im-card">
            <button
              type="button"
              className="im-card-close"
              aria-label="Close"
              onClick={() => setSelectedId(null)}
            >
              ×
            </button>
            <div className="im-card-row">
              <span className="im-card-icon" aria-hidden="true">
                {(() => {
                  const cat = CATEGORIES.find((c) => c.id === selected.category);
                  return cat ? <cat.icon size={18} strokeWidth={2} color={cat.color} /> : null;
                })()}
              </span>
              <div>
                <h4 className="im-card-name">{selected.name}</h4>
                <div className="im-card-status">
                  <span
                    className={`im-dot ${selected.status === "Open" ? "is-open" : "is-closed"}`}
                  />
                  {selected.status}
                </div>
              </div>
            </div>
            <div className="im-card-meta">
              <span>{selected.visit}</span>
              <span className="im-card-sep">·</span>
              <span>{selected.walk}</span>
            </div>
            <button
              type="button"
              className={`im-add ${added.has(selected.id) ? "is-added" : ""}`}
              onClick={() => toggleAdded(selected.id)}
            >
              {added.has(selected.id) ? "Added ✓" : "Add to itinerary"}
            </button>
          </div>
        )}
      </div>

      <p className="im-note">
        {visiblePlaces.length} places on the map · tap a pin for details
      </p>
    </div>
  );
}
