"use client";

import { useState } from "react";

type Stop = {
  name: string;
  walk: string;
  photo: string;
  history: string;
  things: string[];
  nearby: string[];
  ai: string;
};

type Trail = {
  label: string;
  tag: string;
  overview: string;
  duration: string;
  distance: string;
  difficulty: string;
  stops: Stop[];
};

const TRAILS: Trail[] = [
  {
    label: "Heritage Walk",
    tag: "Most popular · 2.5 hrs",
    overview:
      "Wander Taal's ancestral core — grand bahay na bato houses, the towering Basilica, and quiet plazas where the town's story unfolds step by step.",
    duration: "2.5 hours",
    distance: "2 km",
    difficulty: "Easy · flat streets",
    stops: [
      {
        name: "Casa Villavicencio",
        walk: "Walk 4 mins",
        photo: "/assets/IMG_8685.webp",
        history:
          "A grand 19th-century bahay na bato on Calle M. Agoncillo, once home to Don Eulalio Villavicencio — whose wife Gliceria Marella is remembered as a hero of the Revolution.",
        things: [
          "Admire the capiz-shell windows and carved wooden balusters",
          "Look for the lace panels woven by local hand weavers",
          "Photo the house against the Basilica bell tower",
        ],
        nearby: ["Taal Basilica", "Museo ni Marcela Agoncillo", "Sta. Lucia Well"],
        ai: "Built around 1850, this house blends stone and wood in the classic bahay na bato style. The Villavicencio family hosted revolutionary gatherings here — ask your guide about the secret rooms used to hide documents.",
      },
      {
        name: "Taal Basilica",
        walk: "Walk 3 mins",
        photo: "/assets/1.webp",
        history:
          "The Minor Basilica of St. Martin de Tours is the largest Catholic basilica in Asia, its facade rising 97 meters above the town plaza — rebuilt after every eruption and earthquake.",
        things: [
          "Walk the long nave to the marble altar",
          "Climb for the view of Taal Lake and the volcano",
          "Catch the golden-hour light on the coral-stone facade",
        ],
        nearby: ["Taal Public Plaza", "Municipal Hall", "Casa Villavicencio"],
        ai: "Consecrated in 1878, the basilica survived the 1911 and 1965 eruptions of Taal Volcano. Its neoclassical facade uses coral stones cut by hand. It is wider than it is tall — a deliberate design to sway less in earthquakes.",
      },
      {
        name: "Local Café",
        walk: "Walk 3 mins",
        photo: "/assets/IMG_8669.webp",
        history:
          "A slow-rising corner café in the old commercial district, where Taal's coffee tradition — roasting beans the way the town has for generations — meets a quiet plaza view.",
        things: [
          "Sip kapeng barako brewed from Taal-roasted beans",
          "Try the maja blanca with latik",
          "Rest on the balcony while people pass below",
        ],
        nearby: ["Taal Public Market", "Balisong shops", "Town Plaza"],
        ai: "Taal was a trading town long before tourism — coffee was its currency. This café roasts beans in small batches, so the aroma changes by the hour. A good place to rest before the museum.",
      },
      {
        name: "Museum",
        walk: "Walk 6 mins",
        photo: "/assets/4.png",
        history:
          "The Museo nina Marcela Mariño at Felipe Agoncillo, the 19th-century home of the woman who sewed the first Philippine flag, now a museum of her life and the revolution.",
        things: [
          "See Marcela Agoncillo's sewing room and personal items",
          "Read the letters to her husband Felipe, a diplomat abroad",
          "Join the guided tour of the second-floor gallery",
        ],
        nearby: ["Apacible Ancestral House", "Taal Basilica", "Casa Villavicencio"],
        ai: "Marcela Mariño Agoncillo sewed the first Philippine flag in Hong Kong in 1898. This house-museum pairs her story with her husband's — Felipe served as the country's first diplomat. The rooms keep their original narra flooring and capiz windows.",
      },
    ],
  },
  {
    label: "Food Trail",
    tag: "Taste the town · 3 hrs",
    overview:
      "Eat your way through Taal's kitchens — from the birthplace of the original tapa to empanadas, sweets, and coffee that has been roasted here for a century.",
    duration: "3 hours",
    distance: "1.5 km",
    difficulty: "Easy · eat as you go",
    stops: [
      {
        name: "Original Taal Tapa House",
        walk: "Walk 5 mins",
        photo: "/assets/food.webp",
        history:
          "A family kitchen that claims the birthplace of the famous Taal tapa — thinly sliced beef cured with a sweet-salty marinade and fried over wood fire.",
        things: [
          "Order the classic tapa with puso (hanging rice)",
          "Buy a vacuum pack to take home",
          "Ask how the marinade has changed over three generations",
        ],
        nearby: ["Taal Public Market", "Balisong shops", "Plaza de San Martin"],
        ai: "Taal tapa is thinner and sweeter than most Philippine tapa, thanks to the town's long trade history — sugar from nearby plantations met beef from the uplands right here. The secret is a long cure, never a shortcut.",
      },
      {
        name: "Empanada Corner",
        walk: "Walk 4 mins",
        photo: "/assets/tradition.webp",
        history:
          "A bakery stall famous for Taal's empanada — a savory turnover stuffed with shredded green papaya, longganisa, and egg, fried to order.",
        things: [
          "Watch the dough being stretched and filled by hand",
          "Eat it hot, wrapped in newspaper",
          "Pair with a glass of sugarcane juice",
        ],
        nearby: ["Original Tapa House", "Heritage houses", "San Agustin Street"],
        ai: "Unlike the empanada of the north, Taal's version is fried, not baked — a nod to the town's coastal cooking. The papaya filling keeps it light so you can keep walking.",
      },
      {
        name: "Taal Coffee Roastery",
        walk: "Walk 6 mins",
        photo: "/assets/IMG_8669.webp",
        history:
          "A backyard roastery keeping the town's barako tradition alive, turning Lipa and Batangas beans over an open flame exactly as it was done a hundred years ago.",
        things: [
          "Try a strong cup of kapeng barako",
          "Buy whole roasted beans for travel",
          "Learn the difference between arabica and barako",
        ],
        nearby: ["Empanada Corner", "Balisong shops", "Casa Villavicencio"],
        ai: "Barako (Liberica) beans are bigger, fruitier, and more caffeinated than arabica — Batangas has grown them since the 1800s. The roasting here is dark and fast, which is why the cup comes out thick and bittersweet.",
      },
      {
        name: "Heritage Bakery",
        walk: "Walk 5 mins",
        photo: "/assets/food.jfif",
        history:
          "A wood-fired bakery on the edge of the old town, baking pandesal, broas, and the crisp barquillos that Taal families have served at fiestas for generations.",
        things: [
          "Buy fresh pandesal straight from the oven",
          "Try the sweet broas, Taal's sponge cookies",
          "Watch barquillos being rolled on hot irons",
        ],
        nearby: ["Taal Basilica", "Public Market", "Town Plaza"],
        ai: "Broas are Taal's claim to cookie fame — feather-light sponge fingers dipped in milk. The bakery still uses a wood-fired oven, which gives the crusts their char and the interior its softness.",
      },
    ],
  },
  {
    label: "Faith Trail",
    tag: "Follow devotion · 4 hrs",
    overview:
      "Trace the town's pilgrimage path — from the great Basilica to the Santa Lucia Well and the Caysasay Shrine on the riverbank where miracles are remembered.",
    duration: "4 hours",
    distance: "4 km",
    difficulty: "Moderate · one gentle climb",
    stops: [
      {
        name: "Taal Basilica",
        walk: "Walk 8 mins",
        photo: "/assets/1.webp",
        history:
          "The Minor Basilica of St. Martin de Tours has been Taal's spiritual center since the 16th century, rebuilt time and again after eruptions and earthquakes.",
        things: [
          "Attend morning Mass with the locals",
          "Light a candle at the side chapels",
          "Walk the nave slowly to feel the scale",
        ],
        nearby: ["Plaza de San Martin", "Casa Villavicencio", "Municipal Hall"],
        ai: "The parish of Taal was founded in 1572, making it one of the oldest in Batangas. The present basilica, consecrated in 1878, is the largest church in Asia by floor area.",
      },
      {
        name: "Santa Lucia Well",
        walk: "Walk 4 mins",
        photo: "/assets/2.jpg",
        history:
          "A centuries-old well on the path to Caysasay, long venerated for its waters — pilgrims stop to drink and fill bottles before continuing to the shrine.",
        things: [
          "Fill a bottle with the well water",
          "Say a short prayer at the grotto",
          "Learn why locals call it the healing well",
        ],
        nearby: ["Taal Basilica", "Caysasay Shrine", "Dona Caysasay Street"],
        ai: "Oral tradition holds that the well's water was linked to healings after prayers to Our Lady of Caysasay. It sits on the old pilgrimage route — many families still stop here every time they visit.",
      },
      {
        name: "Caysasay Shrine",
        walk: "Walk 12 mins",
        photo: "/assets/3.png",
        history:
          "The Archdiocesan Shrine of Our Lady of Caysasay, perched above the Pansipit River, is the town's most beloved pilgrimage site — the image of the Virgin was reportedly found in the river in 1603.",
        things: [
          "Climb the steps to the shrine's main altar",
          "See the centuries-old image of Our Lady",
          "Walk down to the river for the original site",
        ],
        nearby: ["Pansipit River", "Santa Lucia Well", "Calvary Chapel"],
        ai: "According to tradition, the image of Our Lady of Caysasay was caught by fishermen on the Pansipit River and has drawn pilgrims since 1603. The present shrine dates to the 1800s and sits on a terrace above the water.",
      },
      {
        name: "Calvary Hill",
        walk: "Walk 7 mins",
        photo: "/assets/hero-volcano.svg",
        history:
          "A hillside of stone stations of the cross overlooking the river and town, where the faithful pray the Passion each Lent.",
        things: [
          "Walk the fourteen stations at your own pace",
          "Pause at the summit chapel for the view",
          "Join the dawn walk during Holy Week",
        ],
        nearby: ["Caysasay Shrine", "Pansipit River", "Taal Basilica"],
        ai: "The Calvary was built to let pilgrims relive the Passion without leaving Taal. On Good Friday, the whole town climbs it together — one of the largest processions in the province.",
      },
    ],
  },
  {
    label: "Cultural Trail",
    tag: "Meet the makers · 3.5 hrs",
    overview:
      "Meet Taal's makers and keepers — museum keepers, balisong blacksmiths, and the embroiderers whose hands have dressed the town for two centuries.",
    duration: "3.5 hours",
    distance: "2.5 km",
    difficulty: "Easy · walk & workshop",
    stops: [
      {
        name: "Museo nina Marcela & Felipe Agoncillo",
        walk: "Walk 5 mins",
        photo: "/assets/4.png",
        history:
          "The ancestral home of the couple behind the first Philippine flag — Marcela who sewed it, Felipe who served as the country's first diplomat.",
        things: [
          "Tour the flag room and family gallery",
          "See original furniture from the 1800s",
          "Sign the visitors' book in the ground-floor office",
        ],
        nearby: ["Casa Villavicencio", "Apacible House", "Taal Basilica"],
        ai: "This is a rare house-museum where both residents were national figures. Marcela Agoncillo sewed the flag in exile in 1898; her story is told here alongside her husband's diplomatic letters.",
      },
      {
        name: "Balisong Forge",
        walk: "Walk 6 mins",
        photo: "/assets/archi.webp",
        history:
          "A working blacksmith shop where the famous Taal balisong (butterfly knife) is still hammered, heat-treated, and hand-assembled in the traditional way.",
        things: [
          "Watch the blade be forged on an anvil",
          "Try folding and unfolding a training balisong",
          "Buy a numbered piece straight from the maker",
        ],
        nearby: ["Apacible House", "Public Market", "Original Tapa House"],
        ai: "The balisong has been made in Taal since the early 1900s, after the Americans banned fixed-blade knives. The folding design let it hide in plain sight — and made Taal's smiths world-famous.",
      },
      {
        name: "Apacible Ancestral House",
        walk: "Walk 4 mins",
        photo: "/assets/5.png",
        history:
          "The Museo nina Leon at Galicano Apacible, home of the revolutionaries who signed for Batangas — furnished as a 19th-century upper-class home.",
        things: [
          "Walk the capiz-lit halls and wide azotea",
          "See the family portraits and period furniture",
          "Learn about the Apacibles' role in the Katipunan",
        ],
        nearby: ["Balisong Forge", "Museo ni Marcela Agoncillo", "Casa Villavicencio"],
        ai: "The Apacible brothers were part of the Propaganda Movement. The house keeps its original layout — kitchens below, living quarters above — with the azotea looking out over neighboring rooftops.",
      },
      {
        name: "Embroidery Workshop",
        walk: "Walk 7 mins",
        photo: "/assets/people.webp",
        history:
          "A heritage workshop keeping alive Taal's lace and embroidery trade, which once supplied vestments and gowns across the archipelago.",
        things: [
          "Watch the embroiderers at their frames",
          "Try a few stitches under their guidance",
          "Buy a handkerchief or barong panel",
        ],
        nearby: ["Apacible House", "Taal Basilica", "Public Market"],
        ai: "Taal's embroidery tradition goes back to the convent schools of the 1800s, when nuns taught women the craft. Today's workshop uses the same piña and jusi fibers, finished entirely by hand.",
      },
    ],
  },
  {
    label: "Festival Trail",
    tag: "Celebrate Taal · Half day",
    overview:
      "Join the town in celebration — from the grand town fiesta in March to the candle-lit dawn processions and the fireworks over the plaza at night.",
    duration: "Half day",
    distance: "2 km",
    difficulty: "Easy · stay for the night",
    stops: [
      {
        name: "Town Plaza",
        walk: "Walk 2 mins",
        photo: "/assets/hero-basilica.svg",
        history:
          "The plaza de San Martin, the town's public heart — fairgrounds, stage, and food stalls set up here every fiesta week.",
        things: [
          "Watch the parades roll around the fountain",
          "Try the fiesta food stalls at night",
          "Join the municipal band concerts",
        ],
        nearby: ["Taal Basilica", "Municipal Hall", "Public Market"],
        ai: "Taal's fiesta, held in honor of St. Martin of Tours in November, turns the plaza into a fairground for a full week — parades by day, concerts and stalls by night.",
      },
      {
        name: "Basilica Steps",
        walk: "Walk 4 mins",
        photo: "/assets/IMG_8687.webp",
        history:
          "The wide steps of the Basilica become the town's grandstand — the best view of processions, fireworks, and the annual parade of saints.",
        things: [
          "Claim a spot early for the evening procession",
          "Watch the fireworks reflect on the church facade",
          "Listen to the band serenade from the steps",
        ],
        nearby: ["Town Plaza", "Casa Villavicencio", "Municipal Hall"],
        ai: "The basilica steps are the natural amphitheater of the town. During fiesta week, the facade is lit from below — the coral stone glows gold against the night sky.",
      },
      {
        name: "Caysasay Festival Grounds",
        walk: "Walk 15 mins",
        photo: "/assets/3.png",
        history:
          "The riverside grounds below the shrine where the fluvial procession of Our Lady of Caysasay sets off and returns.",
        things: [
          "Board the decorated river boats",
          "Watch the blessing of the river",
          "Join the candle-lit walk back to the plaza",
        ],
        nearby: ["Caysasay Shrine", "Pansipit River", "Calvary Hill"],
        ai: "Every fiesta, the image of Our Lady of Caysasay rides the Pansipit River in a flower-decked boat — a tradition that draws pilgrims from across Batangas to the riverbank.",
      },
      {
        name: "Fireworks Point",
        walk: "Walk 6 mins",
        photo: "/assets/hero-streets.svg",
        history:
          "An open lot at the edge of the old town, used for the grand fireworks finale that closes the fiesta every year.",
        things: [
          "Find a rooftop or balcony seat",
          "Bring snacks for the long finale",
          "Stay for the band's last number",
        ],
        nearby: ["Town Plaza", "Taal Basilica", "Original Tapa House"],
        ai: "The fiesta's last night ends with a choreographed fireworks show over the plaza, timed to the band playing the town hymn — a tradition that has run unbroken for decades.",
      },
    ],
  },
];

const METAS = [
  { key: "Duration", get: (t: Trail) => t.duration },
  { key: "Distance", get: (t: Trail) => t.distance },
  { key: "Difficulty", get: (t: Trail) => t.difficulty },
];

export default function HeritageTrails() {
  const [trailIdx, setTrailIdx] = useState<number | null>(null);
  const [phase, setPhase] = useState<"select" | "overview" | "journey">("select");
  const [stopIdx, setStopIdx] = useState(0);

  const trail = trailIdx === null ? null : TRAILS[trailIdx];

  const pickTrail = (i: number) => {
    setTrailIdx(i);
    setStopIdx(0);
    setPhase("overview");
  };

  return (
    <div className="ht">
      {/* ===== STEP 1 — CHOOSE A TRAIL ===== */}
      {phase === "select" && (
        <div className="ht-select">
          <p className="ht-intro">
            Think of Heritage Trails as guided experiences. Pick the kind of
            story you want to follow today.
          </p>
          <div className="ht-grid">
            {TRAILS.map((t, i) => (
              <button
                key={t.label}
                type="button"
                className="ht-card"
                onClick={() => pickTrail(i)}
              >
                <span className="ht-card-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="ht-card-label">{t.label}</span>
                <span className="ht-card-tag">{t.tag}</span>
                <span className="ht-card-go" aria-hidden="true">
                  →
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ===== STEP 2 — TRAIL OVERVIEW ===== */}
      {phase === "overview" && trail && (
        <div className="ht-overview">
          <button
            type="button"
            className="ht-back"
            onClick={() => setPhase("select")}
          >
            ← All trails
          </button>
          <div className="ht-overview-grid">
            <div className="ht-overview-info">
              <span className="ht-overview-tag">{trail.tag}</span>
              <h3 className="ht-overview-title">{trail.label}</h3>
              <p className="ht-overview-desc">{trail.overview}</p>

              <div className="ht-meta">
                {METAS.map((m) => (
                  <div key={m.key} className="ht-meta-item">
                    <span className="ht-meta-key">{m.key}</span>
                    <span className="ht-meta-val">{m.get(trail)}</span>
                  </div>
                ))}
                <div className="ht-meta-item">
                  <span className="ht-meta-key">Stops</span>
                  <span className="ht-meta-val">{trail.stops.length} stops</span>
                </div>
              </div>

              <button
                type="button"
                className="ht-start"
                onClick={() => setPhase("journey")}
              >
                Start Journey →
              </button>
            </div>

            <div className="ht-map" aria-hidden="true">
              <svg viewBox="0 0 320 220" className="ht-map-svg">
                <path
                  d="M40 180 C 90 160, 120 140, 160 120 S 240 60, 280 40"
                  className="ht-map-path"
                />
                {trail.stops.map((s, i) => {
                  const x = 40 + i * (240 / (trail.stops.length - 1 || 1));
                  const y = 180 - i * (140 / (trail.stops.length - 1 || 1));
                  return (
                    <g key={s.name}>
                      <circle cx={x} cy={y} r="14" className="ht-map-dot" />
                      <text x={x} y={y} className="ht-map-num" textAnchor="middle" dy="4">
                        {i + 1}
                      </text>
                    </g>
                  );
                })}
              </svg>
              <span className="ht-map-label">Route map · {trail.stops.length} stops</span>
            </div>
          </div>
        </div>
      )}

      {/* ===== STEP 3 — THE JOURNEY ===== */}
      {phase === "journey" && trail && (
        <div className="ht-journey">
          <button
            type="button"
            className="ht-back"
            onClick={() => setPhase("overview")}
          >
            ← Overview
          </button>

          <div className="ht-journey-head">
            <span className="ht-overview-tag">Your route</span>
            <h3 className="ht-overview-title">{trail.label}</h3>
            <p className="ht-overview-desc">
              {trail.duration} · {trail.distance} · {trail.difficulty}
            </p>
          </div>

          <div className="ht-journey-layout">
            {/* ===== ROUTE LIST (sticky nav) ===== */}
            <aside className="ht-route">
              <span className="ht-route-title">Stops</span>
              <ol className="ht-route-list">
                {trail.stops.map((s, i) => (
                  <li key={s.name}>
                    <button
                      type="button"
                      className={`ht-route-item ${stopIdx === i ? "is-active" : ""}`}
                      onClick={() => setStopIdx(i)}
                    >
                      <span className="ht-route-num">{i + 1}</span>
                      <span className="ht-route-mid">
                        <span className="ht-route-name">{s.name}</span>
                        <span className="ht-route-walk">{s.walk}</span>
                      </span>
                    </button>
                    {i < trail.stops.length - 1 && (
                      <span className="ht-route-connector" aria-hidden="true" />
                    )}
                  </li>
                ))}
              </ol>
              <button
                type="button"
                className="ht-route-back"
                onClick={() => setPhase("overview")}
              >
                ← Back to overview
              </button>
            </aside>

            {/* ===== ACTIVE STOP DETAIL ===== */}
            <div className="ht-stop-detail" key={trail.stops[stopIdx].name}>
              <span className="ht-overview-tag">
                Stop {stopIdx + 1} of {trail.stops.length}
              </span>
              <h4 className="ht-stop-detail-title">{trail.stops[stopIdx].name}</h4>

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={trail.stops[stopIdx].photo}
                alt={trail.stops[stopIdx].name}
                className="ht-stop-photo"
              />

              <div className="ht-stop-row">
                <div className="ht-block">
                  <span className="ht-block-title">History</span>
                  <p className="ht-block-text">{trail.stops[stopIdx].history}</p>
                </div>
                <div className="ht-block">
                  <span className="ht-block-title">Things to do</span>
                  <ul className="ht-block-list">
                    {trail.stops[stopIdx].things.map((thing) => (
                      <li key={thing}>{thing}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="ht-block">
                <span className="ht-block-title">Nearby places</span>
                <div className="ht-nearby">
                  {trail.stops[stopIdx].nearby.map((n) => (
                    <span key={n} className="ht-nearby-chip">
                      {n}
                    </span>
                  ))}
                </div>
              </div>

              <div className="ht-block ht-ai">
                <span className="ht-block-title ht-ai-title">✦ AI explanation</span>
                <p className="ht-block-text">{trail.stops[stopIdx].ai}</p>
              </div>

              <div className="ht-detail-nav">
                <button
                  type="button"
                  className="ht-detail-btn"
                  onClick={() =>
                    setStopIdx((stopIdx - 1 + trail.stops.length) % trail.stops.length)
                  }
                  disabled={stopIdx === 0}
                >
                  ← Previous stop
                </button>
                {stopIdx < trail.stops.length - 1 ? (
                  <button
                    type="button"
                    className="ht-detail-btn ht-detail-btn-next"
                    onClick={() => setStopIdx(stopIdx + 1)}
                  >
                    Next stop: {trail.stops[stopIdx + 1].name} →
                  </button>
                ) : (
                  <button
                    type="button"
                    className="ht-detail-btn ht-detail-btn-next"
                    onClick={() => setPhase("overview")}
                  >
                    Trail complete · Back to overview →
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
