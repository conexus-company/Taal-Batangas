import HeroMount from "./components/HeroMount";
import ValueCarousel from "./components/ValueCarousel";
import { Footer2 } from "@/components/ui/footer-2";
import { Testimonials } from "@/components/ui/stagger-testimonials";

export default function Home() {
  return (
    <>

      {/* ===== HERO — full-bleed, fills the screen ===== */}
      <section className="hero">
        <HeroMount />
        <div className="hero-content">
          <h1>TAAL</h1>
          <p>
            Preserved through time. Walk the ancestral streets and the grand Basilica.
            Some places are worth slowing down for.
          </p>
        </div>
        {/* ===== HERO BOTTOM BAR (Framed by 72px grid) ===== */}
        <div className="hero-bottom-bar">
          <span className="hero-star hero-star-left" aria-hidden="true" />
          <span className="hero-star hero-star-right" aria-hidden="true" />
          <div className="corner-square-bottom-left" />
          <div className="hero-search-inner">
            <div className="field">
              <div className="label">Activity/Goal</div>
              <div className="value">Heritage / Coffee / Craft</div>
            </div>
            <div className="field">
              <div className="label">Location</div>
              <div className="value">Taal, Batangas</div>
            </div>
            <div className="field">
              <div className="label">Date/Duration</div>
              <div className="value">Dec–May · 1 day</div>
            </div>
            <div className="field">
              <div className="label">Budget</div>
              <div className="value">₱0 – ₱5,000</div>
            </div>
          </div>
          <div className="explore-square">
            <button type="button" className="explore-btn" aria-label="Explore">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ===== TRUST STRIP ===== */}
      <section className="trust-strip">
        <div className="squares">
          <span />
          <span />
          <span />
        </div>
      </section>

      <div className="page">
      {/* ===== HEADLINE ===== */}
      <section className="headline">
        <h2>
          Walk through history, feel at <span className="highlight">home</span>
        </h2>
        <div className="trust-badges">
          <span className="trust-pill">Heritage Town of the Philippines</span>
          <span className="trust-divider">•</span>
          <span className="trust-pill">100+ ancestral houses</span>
        </div>
      </section>

      {/* ===== VALUE SECTION ===== */}
      <section className="value-section">
        <div className="value-left">
          <span className="tag">01 Our Value</span>
          <h3>A Heritage Town Worth Slowing For</h3>
          <p>We plan slow, curated trips with good stories and better people.</p>
          <button type="button" className="btn-flat">Book a Heritage Walk</button>
        </div>
        <ValueCarousel />
      </section>

      {/* ===== PICK THE PLACE ===== */}
      <section className="pick-section">
        <div className="pick-header">
          <div>
            <span className="tag">Popular Destination · 2025</span>
            <h2>Pick the Place</h2>
          </div>
          <div className="sub">
            Heritage spots for everyone, with quiet corners for your own pace.
          </div>
        </div>

        <div className="filter-bar">
          <div className="field">
            <div className="label">Destination</div>
            <div className="value">Find a spot ...</div>
          </div>
          <div className="field">
            <div className="label">Category</div>
            <div className="value">Heritage / Museum</div>
          </div>
          <div className="field">
            <div className="label">Price</div>
            <div className="value">Select range</div>
          </div>
          <div className="field">
            <div className="label">Date</div>
            <div className="value">Select date</div>
          </div>
          <div className="discover">Discover</div>
        </div>

        <div className="destinations">
          <div className="dest-card">
            <div className="dest-top">
              <div>
                <div className="place">Minor Basilica of St. Martin de Tours</div>
                <div className="sub">Taal Basilica · Taal Town Proper</div>
              </div>
              <div className="slots">★ Heritage walk</div>
            </div>
            <div className="image-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/1.webp"
                alt="Minor Basilica of St. Martin de Tours"
              />
              <span className="open-trip">Open Trip</span>
            </div>
            <div className="meta-row">
              <span className="m">Free</span>
              <span className="m">Timed entry</span>
              <span className="m">Daily</span>
            </div>
          </div>

          <div className="dest-card">
            <div className="dest-top">
              <div>
                <div className="place">Sta. Lucia Well</div>
                <div className="sub">Heritage well · Taal Town Proper</div>
              </div>
              <div className="slots">★ Well heritage</div>
            </div>
            <div className="image-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/2.jpg"
                alt="Sta. Lucia Well"
              />
              <span className="open-trip">Open Trip</span>
            </div>
            <div className="meta-row">
              <span className="m">Free</span>
              <span className="m">Landmark</span>
              <span className="m">All year</span>
            </div>
          </div>

          <div className="dest-card">
            <div className="dest-top">
              <div>
                <div className="place">Archdiocesan Shrine of Our Lady of Caysasay</div>
                <div className="sub">Caysasay Shrine · Barangay Caysasay</div>
              </div>
              <div className="slots">★ Pilgrimage</div>
            </div>
            <div className="image-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/3.png"
                alt="Archdiocesan Shrine of Our Lady of Caysasay"
              />
              <span className="open-trip">Open Trip</span>
            </div>
            <div className="meta-row">
              <span className="m">Free</span>
              <span className="m">Pilgrimage</span>
              <span className="m">Daily</span>
            </div>
          </div>

          <div className="dest-card">
            <div className="dest-top">
              <div>
                <div className="place">Museo nina Marcela Mariño at Felipe Agoncillo</div>
                <div className="sub">Marcela Agoncillo Museum</div>
              </div>
              <div className="slots">★ Guided tours</div>
            </div>
            <div className="image-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/4.png"
                alt="Museo nina Marcela Mariño at Felipe Agoncillo"
              />
              <span className="open-trip">Open Trip</span>
            </div>
            <div className="meta-row">
              <span className="m">₱50.00</span>
              <span className="m">Guided</span>
              <span className="m">Sat–Sun</span>
            </div>
          </div>

          <div className="dest-card">
            <div className="dest-top">
              <div>
                <div className="place">Museo nina Leon at Galicano Apacible</div>
                <div className="sub">Apacible Ancestral House</div>
              </div>
              <div className="slots">★ Heritage house</div>
            </div>
            <div className="image-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/5.png"
                alt="Museo nina Leon at Galicano Apacible"
              />
              <span className="open-trip">Open Trip</span>
            </div>
            <div className="meta-row">
              <span className="m">Donation</span>
              <span className="m">Guided</span>
              <span className="m">Daily</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURED PICK ===== */}
      <section className="feature-section">
        <div className="pick-header">
          <div>
            <span className="tag">Heart of the Town · 2026</span>
            <h2>This Season&apos;s Featured</h2>
          </div>
          <div className="sub">
            One hand-picked walk, our favorites in full detail.
          </div>
        </div>

        <div className="feature-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="feature-bg"
            src="/assets/IMG_8687.webp"
            alt="Basilica of Taal at golden hour"
          />
          <div className="feature-info">
            <span className="tag">★ Featured Walk · 3 hours</span>
            <h3>Basilica &amp; the Ancients</h3>
            <p>
              A slow walk from the grand Basilica through cobblestone lanes and
              ancestral homes, with local stories at every turn.
            </p>
            <div className="feature-meta">
              <span>₱300 / person</span>
              <span>2x daily</span>
              <span>Guide included</span>
            </div>
            <button type="button" className="btn-flat">Book this walk</button>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="steps-section">
        <div className="pick-header">
          <div>
            <span className="tag">Simple · Slow · Local</span>
            <h2>How it Works</h2>
          </div>
          <div className="sub">
            Three easy steps to a memorable day in Taal.
          </div>
        </div>

        <div className="steps">
          <div className="step">
            <div className="step-num">01</div>
            <h4>Choose your walk</h4>
            <p>Pick from curated heritage, food, or people tours.</p>
          </div>
          <div className="step">
            <div className="step-num">02</div>
            <h4>Pick a date</h4>
            <p>Reserve your slot in just a few taps.</p>
          </div>
          <div className="step">
            <div className="step-num">03</div>
            <h4>Slow down & arrive</h4>
            <p>A local guide leads you through the story of the town.</p>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="testi-section">
        <div className="pick-header">
          <div>
            <span className="tag">What Guests Say · 2026</span>
            <h2>Kept at the Top of Our Minds</h2>
          </div>
          <div className="sub">
            A few words from people who took it slow.
          </div>
        </div>

        <Testimonials />
      </section>

      </div>

      {/* ===== NEWSLETTER / CTA — full-width band, top rule touches the grid lines ===== */}
      <section className="cta-section relative mt-20 overflow-hidden md:mt-28">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/IMG_8693.webp"
          alt="Taal heritage town"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="relative z-10 mx-auto max-w-[1200px] px-10 py-16 text-ivory md:py-20">
          <h2 className="text-ivory">Plan a slow day in Taal</h2>
          <p className="sub text-ivory/80">
            Get new walks and heritage picks straight to your inbox.
          </p>
          <form className="cta-form">
            <input type="email" placeholder="Your email" aria-label="Email address" />
            <button type="submit" className="btn-flat">Get the newsletter</button>
          </form>
        </div>
      </section>

      {/* ===== FOOTER — full-width band outside the .page grid ===== */}
      <Footer2 />
    </>
  );
}
