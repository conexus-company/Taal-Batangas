"use client";

import { useRef, useState } from "react";
import { MapPin } from "lucide-react";

type EventType = "festival" | "cultural" | "announcement";

type EventItem = {
  id: string;
  day: number;
  endDay?: number;
  type: EventType;
  title: string;
  location: string;
  description: string;
  cta: string;
  image: string;
};

const TYPE_META: Record<
  EventType,
  { label: string; badge: string; icon: string; color: string }
> = {
  festival: { label: "Festival", badge: "Featured Festival", icon: "🎭", color: "#b98a2f" },
  cultural: { label: "Cultural", badge: "Cultural Event", icon: "🎪", color: "#1e4f9c" },
  announcement: { label: "Advisory", badge: "Announcement", icon: "📢", color: "#b91c1c" },
};

const EVENTS: EventItem[] = [
  {
    id: "museum-night",
    day: 6,
    type: "cultural",
    title: "Taal Museum Night Tour",
    location: "Taal Heritage Museum",
    description:
      "Explore the museum after dark — candlelit halls, vintage cameras, and stories of Taal's revolutionary families.",
    cta: "View Details",
    image: "/assets/4.png",
  },
  {
    id: "house-open-day",
    day: 10,
    type: "cultural",
    title: "Ancestral House Open Day",
    location: "M. Agoncillo Street",
    description:
      "Step inside Taal's grand bahay na bato as private ancestral homes open their doors for one day of tours.",
    cta: "Learn More",
    image: "/assets/5.png",
  },
  {
    id: "barako-morning",
    day: 14,
    type: "cultural",
    title: "Kapeng Barako Morning",
    location: "Taal Coffee Roastery",
    description:
      "Start slow with a barako tasting at the roastery, paired with broas from the heritage bakery.",
    cta: "Learn More",
    image: "/assets/food.webp",
  },
  {
    id: "pasubat",
    day: 20,
    endDay: 24,
    type: "festival",
    title: "El Pasubat Festival",
    location: "Taal Heritage Town Plaza",
    description:
      "Celebrate Taal's rich culture through traditional dances, local cuisine, artisan exhibits, and live performances.",
    cta: "View Details",
    image: "/assets/IMG_8693.webp",
  },
  {
    id: "walking-tour",
    day: 25,
    type: "cultural",
    title: "Heritage Walking Tour",
    location: "Taal Basilica",
    description:
      "Experience a guided walking tour through the historic streets and ancestral houses of Taal.",
    cta: "View Details",
    image: "/assets/1.webp",
  },
  {
    id: "balisong-fair",
    day: 28,
    type: "cultural",
    title: "Balisong Craft Fair",
    location: "Plaza de San Martin",
    description:
      "Watch smiths hammer blades at the plaza, try a training balisong, and take home a numbered piece.",
    cta: "View Details",
    image: "/assets/archi.webp",
  },
  {
    id: "museum-maintenance",
    day: 30,
    type: "announcement",
    title: "Museum Maintenance",
    location: "The Taal Heritage Museum",
    description:
      "The Taal Heritage Museum will be temporarily closed for scheduled maintenance.",
    cta: "Read Advisory",
    image: "/assets/tradition.webp",
  },
];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function WhatsHappening() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const monthName = MONTHS[month];

  const defaultEvent = EVENTS.find((e) => e.type === "festival") ?? EVENTS[0];
  const [selectedId, setSelectedId] = useState<string>(defaultEvent.id);
  const [shown, setShown] = useState(defaultEvent.image);
  const [fade, setFade] = useState<{ src: string; key: number } | null>(null);
  const fadeKey = useRef(0);

  const selected =
    EVENTS.find((e) => e.id === selectedId) ?? defaultEvent;

  const selectEvent = (e: EventItem) => {
    if (e.id === selectedId) return;
    setSelectedId(e.id);
    fadeKey.current += 1;
    setFade({ src: e.image, key: fadeKey.current });
    window.setTimeout(() => {
      setShown(e.image);
      setFade(null);
    }, 450);
  };

  const meta = TYPE_META[selected.type];
  const dateLabel = `${monthName} ${selected.day}${
    selected.endDay ? `–${selected.endDay}` : ""
  }`;

  return (
    <div className="feature-card">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="feature-bg" src={shown} alt={selected.title} />
      {fade && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={fade.key}
          className="feature-bg feature-bg-fade"
          src={fade.src}
          alt={selected.title}
        />
      )}
      <div className="feature-overlay" aria-hidden="true" />

      <div className="feature-info">
        <div className="ev-layout">
          {/* ===== EVENT DETAILS ===== */}
          <div className="ev-details" key={selected.id}>
            <span
              className="ev-badge"
              style={{ color: meta.color, borderColor: meta.color }}
            >
              {meta.icon} {meta.badge}
            </span>
            <h3 className="ev-title">{selected.title}</h3>
            <div className="ev-lines">
              <span className="ev-line">{dateLabel}</span>
              <span className="ev-line ev-loc">
                <MapPin size={12} strokeWidth={2.2} />
                {selected.location}
              </span>
            </div>
            <p className="ev-desc">{selected.description}</p>
            <button type="button" className="btn-flat ev-cta">
              {selected.cta}
            </button>
          </div>

          {/* ===== EVENT TIMELINE ===== */}
          <div className="ev-timeline">
            <div className="ev-tl-head">
              <span className="ev-tl-month">{monthName}</span>
              <span className="ev-tl-year">{year}</span>
            </div>
            <ol className="ev-tl-list">
              {EVENTS.map((e) => {
                const isSel = e.id === selectedId;
                const tMeta = TYPE_META[e.type];
                return (
                  <li key={e.id} className="ev-tl-item">
                    <button
                      type="button"
                      className={`ev-tl-row ${isSel ? "is-selected" : ""}`}
                      onClick={() => selectEvent(e)}
                    >
                      <span className="ev-tl-day">
                        {e.day}
                        {e.endDay ? `–${e.endDay}` : ""}
                      </span>
                      <span
                        className="ev-tl-dot"
                        style={{ background: tMeta.color }}
                      />
                      <span className="ev-tl-name">{e.title}</span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
