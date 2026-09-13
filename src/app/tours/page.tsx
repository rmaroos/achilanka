"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Where to Go", href: "/explore" },
  { label: "What to Do", href: "/activities" },
  { label: "Reach Us", href: "/contact" },
  { label: "Our Story", href: "/about" },
];

type TourType = "round" | "day";

type Interest =
  | "Beaches"
  | "Hill Country"
  | "Wildlife"
  | "Heritage & Culture"
  | "Tea Trails"
  | "Hiking"
  | "Surfing"
  | "Diving & Snorkelling"
  | "Bird Watching";

const INTEREST_OPTIONS: Interest[] = [
  "Beaches",
  "Hill Country",
  "Wildlife",
  "Heritage & Culture",
  "Tea Trails",
  "Hiking",
  "Surfing",
  "Diving & Snorkelling",
  "Bird Watching",
];

type ReviewSource = "Tripadvisor" | "Trustpilot";

type Tour = {
  id: string;
  name: string;
  type: TourType;
  rating: number;
  reviewCount: number;
  reviewSource: ReviewSource;
  durationLabel: string;
  durationDays: number; // used for the "max trip length" filter
  locations: string[];
  groupLabel: string;
  description: string;
  fromPrice: number;
  image: string;
  interests: Interest[];
};

const TOURS: Tour[] = [
  {
    id: "classic-sri-lanka",
    name: "Classic Sri Lanka",
    type: "round",
    rating: 4.9,
    reviewCount: 214,
    reviewSource: "Tripadvisor",
    durationLabel: "10 days · 9 nights",
    durationDays: 10,
    locations: ["Negombo", "Sigiriya", "Kandy", "Nuwara Eliya", "+3"],
    groupLabel: "Private tour (2 to 6 travellers)",
    description:
      "The whole country in one loop: the Cultural Triangle, the hill country train, a safari in Yala and four nights to slow down on the south coast. Our most booked itinerary, and the one we recommend for a first visit.",
    fromPrice: 1290,
    image: "https://picsum.photos/seed/achii-classic-sl/800/600",
    interests: ["Hill Country", "Heritage & Culture", "Wildlife"],
  },
  {
    id: "sigiriya-dambulla",
    name: "Sigiriya & Dambulla from Colombo",
    type: "day",
    rating: 4.7,
    reviewCount: 189,
    reviewSource: "Tripadvisor",
    durationLabel: "1 day · approx. 15 hours",
    durationDays: 1,
    locations: ["Sigiriya", "Dambulla"],
    groupLabel: "Private tour (1 to 6 travellers)",
    description:
      "A long but rewarding day from Colombo or Negombo: the Lion Rock fortress before the crowds and heat, the Dambulla cave temples after lunch, and a private car door to door.",
    fromPrice: 145,
    image: "https://picsum.photos/seed/achii-sigiriya/800/600",
    interests: ["Heritage & Culture"],
  },
  {
    id: "yala-safari",
    name: "Yala Full-Day Safari",
    type: "day",
    rating: 4.6,
    reviewCount: 143,
    reviewSource: "Tripadvisor",
    durationLabel: "1 day · dawn to dusk",
    durationDays: 1,
    locations: ["Yala National Park"],
    groupLabel: "Private jeep (1 to 6 travellers)",
    description:
      "A full day in Yala Block 1 with a tracker who works the park daily, out at first light, a shaded break with breakfast and lunch, and back out for the late afternoon.",
    fromPrice: 95,
    image: "https://picsum.photos/seed/achii-yala/800/600",
    interests: ["Wildlife"],
  },
  {
    id: "wildlife-beaches",
    name: "Wildlife & Beaches",
    type: "round",
    rating: 4.8,
    reviewCount: 137,
    reviewSource: "Tripadvisor",
    durationLabel: "8 days · 7 nights",
    durationDays: 8,
    locations: ["Negombo", "Wilpattu", "Udawalawe", "Yala"],
    groupLabel: "Private tour (2 to 6 travellers)",
    description:
      "Three national parks and four nights on the coast, for travellers who came for animals and sea rather than temples. Game drives are timed for first light and late afternoon, when the parks are actually active.",
    fromPrice: 980,
    image: "https://picsum.photos/seed/achii-wildlife-beach/800/600",
    interests: ["Wildlife", "Beaches"],
  },
  {
    id: "ella-hike",
    name: "Ella Hike & Nine Arch Bridge",
    type: "day",
    rating: 4.8,
    reviewCount: 111,
    reviewSource: "Trustpilot",
    durationLabel: "1 day · approx. 8 hours",
    durationDays: 1,
    locations: ["Ella", "Nine Arch Bridge", "Ravana Falls"],
    groupLabel: "Private tour (1 to 4 travellers)",
    description:
      "A walking day around Ella with a local guide: Little Adam's Peak at sunrise, the Nine Arch Bridge timed for a passing train, a tea factory, and Ravana Falls on the way back.",
    fromPrice: 80,
    image: "https://picsum.photos/seed/achii-ella-hike/800/600",
    interests: ["Hiking", "Hill Country", "Tea Trails"],
  },
  {
    id: "tea-trails",
    name: "Tea Trails & Hill Country",
    type: "round",
    rating: 4.9,
    reviewCount: 96,
    reviewSource: "Trustpilot",
    durationLabel: "6 days · 5 nights",
    durationDays: 6,
    locations: ["Kandy", "Hatton", "Nuwara Eliya", "Haputale"],
    groupLabel: "Private tour (2 to 6 travellers)",
    description:
      "A slow week in the mountains: two train journeys, estate walks with plantation staff, factory visits, and enough time to actually sit still with a pot of tea and a view.",
    fromPrice: 720,
    image: "https://picsum.photos/seed/achii-tea-trails/800/600",
    interests: ["Tea Trails", "Hill Country"],
  },
  {
    id: "colombo-street-food",
    name: "Colombo City & Street Food",
    type: "day",
    rating: 4.6,
    reviewCount: 87,
    reviewSource: "Tripadvisor",
    durationLabel: "Half day · approx. 5 hours",
    durationDays: 1,
    locations: ["Colombo", "Pettah", "Galle Face"],
    groupLabel: "Private tour (1 to 6 travellers)",
    description:
      "An afternoon and evening walk through Colombo with a guide who grew up there: the Pettah markets, a Hindu temple, colonial Fort, and six street-food stops ending at Galle Face Green.",
    fromPrice: 65,
    image: "https://picsum.photos/seed/achii-colombo-food/800/600",
    interests: ["Heritage & Culture"],
  },
  {
    id: "ancient-kingdoms",
    name: "Ancient Kingdoms & Heritage",
    type: "round",
    rating: 4.7,
    reviewCount: 74,
    reviewSource: "Tripadvisor",
    durationLabel: "7 days · 6 nights",
    durationDays: 7,
    locations: ["Negombo", "Anuradhapura", "Polonnaruwa", "Sigiriya", "+2"],
    groupLabel: "Private tour (2 to 8 travellers)",
    description:
      "Five UNESCO World Heritage sites with an archaeology-trained guide, paced so each site gets a proper morning rather than a rushed hour.",
    fromPrice: 860,
    image: "https://picsum.photos/seed/achii-ancient-kingdoms/800/600",
    interests: ["Heritage & Culture"],
  },
  {
    id: "surf-coast",
    name: "Surf & Coast Escape",
    type: "round",
    rating: 4.8,
    reviewCount: 58,
    reviewSource: "Trustpilot",
    durationLabel: "9 days · 8 nights",
    durationDays: 9,
    locations: ["Weligama", "Hiriketiya", "Tangalle", "Arugam Bay"],
    groupLabel: "Private tour (2 to 4 travellers)",
    description:
      "A coast-hopping trip built around the swell, with morning lessons or free surfs, afternoons for snorkelling and food, and a driver who moves you between breaks.",
    fromPrice: 1050,
    image: "https://picsum.photos/seed/achii-surf-coast/800/600",
    interests: ["Beaches", "Surfing"],
  },
];

const MAX_PRICE = 1500;
const MAX_DAYS = 10;

type SortOption = "booked" | "price-asc" | "price-desc" | "rating";

const SORT_LABELS: Record<SortOption, string> = {
  booked: "Most booked",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  rating: "Highest Rated",
};

/* ------------------------------------------------------------------ */
/*  Reveal — fade + lift once, first time a section enters view        */
/* ------------------------------------------------------------------ */

function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Navbar                                                              */
/* ------------------------------------------------------------------ */

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="bg-stone-950 text-stone-300 text-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
          <div className="hidden items-center gap-4 sm:flex">
            <span className="tracking-wide text-stone-400">Follow us</span>
            <div className="flex items-center gap-3">
              <a href="#" aria-label="Instagram" className="hover:text-amber-400">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
                  <path d="M12 2.2c2.7 0 3 0 4.1.06 1.06.05 1.79.22 2.43.47.66.26 1.22.6 1.77 1.15.55.55.9 1.11 1.15 1.77.25.64.42 1.37.47 2.43.06 1.06.06 1.4.06 4.1s0 3-.06 4.1c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 01-1.15 1.77 4.9 4.9 0 01-1.77 1.15c-.64.25-1.37.42-2.43.47-1.06.06-1.4.06-4.1.06s-3 0-4.1-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 01-1.77-1.15 4.9 4.9 0 01-1.15-1.77c-.25-.64-.42-1.37-.47-2.43C2.2 15 2.2 14.7 2.2 12s0-3 .06-4.1c.05-1.06.22-1.79.47-2.43.26-.66.6-1.22 1.15-1.77A4.9 4.9 0 015.65 2.55c.64-.25 1.37-.42 2.43-.47C9.14 2.02 9.44 2.02 12 2.02z" />
                </svg>
              </a>
              <a href="#" aria-label="Facebook" className="hover:text-amber-400">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
                  <path d="M13.5 21v-8.2h2.75l.4-3.2h-3.15V7.5c0-.93.26-1.56 1.6-1.56h1.7V3.1C15.9 3 15 2.95 13.94 2.95c-2.2 0-3.71 1.34-3.71 3.8v2.85H7.5v3.2h2.73V21h3.27z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:1-677-124-44227" className="hover:text-amber-400">
              1-677-124-44227
            </a>
            <a href="mailto:info@achiilanka.com" className="hidden hover:text-amber-400 sm:inline">
              info@achiilanka.com
            </a>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
          <a href="/" className="text-lg font-semibold text-stone-900">
            Achii Lanka <span className="text-amber-500">Tours</span>
          </a>

          <div className="hidden items-center gap-8 text-sm font-medium text-stone-600 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`group relative pb-1 transition-colors hover:text-stone-900 ${
                  link.label === "Where to Go" ? "text-stone-900" : ""
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-amber-400 transition-all duration-300 ${
                    link.label === "Where to Go" ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/plan-my-trip"
              className="hidden items-center gap-2 rounded-full bg-amber-400 px-5 py-2.5 text-sm font-semibold text-stone-900 shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md sm:inline-flex"
            >
              Plan My Trip
              <span aria-hidden>→</span>
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              className="rounded-full p-2 text-stone-700 lg:hidden"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6 stroke-current" fill="none">
                {menuOpen ? (
                  <path d="M6 6l12 12M18 6L6 18" strokeWidth="1.8" strokeLinecap="round" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" strokeWidth="1.8" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div className="border-t border-stone-100 bg-white px-4 pb-4 lg:hidden">
            <div className="flex flex-col gap-1 pt-2 text-sm font-medium text-stone-700">
              {NAV_LINKS.map((link) => (
                <a key={link.label} href={link.href} className="rounded-xl px-3 py-2.5 hover:bg-stone-50">
                  {link.label}
                </a>
              ))}
              <a
                href="/plan-my-trip"
                className="mt-2 rounded-full bg-amber-400 px-5 py-2.5 text-center font-semibold text-stone-900"
              >
                Plan My Trip
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Star rating                                                        */
/* ------------------------------------------------------------------ */

function StarRating({ rating, reviewCount, source }: { rating: number; reviewCount: number; source: ReviewSource }) {
  return (
    <div className="flex items-center gap-1.5 text-sm">
      <svg viewBox="0 0 20 20" className="h-4 w-4 fill-amber-400">
        <path d="M10 1.5l2.47 5.4 5.93.61-4.48 4 1.28 5.85L10 14.8l-5.2 2.56 1.28-5.85-4.48-4 5.93-.61z" />
      </svg>
      <span className="font-semibold text-stone-800">{rating.toFixed(1)}</span>
      <span className="text-stone-400">
        ({reviewCount} reviews) · {source}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sidebar filters                                                     */
/* ------------------------------------------------------------------ */

type Filters = {
  search: string;
  type: "all" | TourType;
  interests: Interest[];
  maxPrice: number;
  maxDays: number;
};

const DEFAULT_FILTERS: Filters = {
  search: "",
  type: "all",
  interests: [],
  maxPrice: MAX_PRICE,
  maxDays: MAX_DAYS,
};

function FilterSidebar({
  filters,
  onChange,
  onClear,
}: {
  filters: Filters;
  onChange: (next: Partial<Filters>) => void;
  onClear: () => void;
}) {
  const toggleInterest = (interest: Interest) => {
    const has = filters.interests.includes(interest);
    onChange({
      interests: has
        ? filters.interests.filter((i) => i !== interest)
        : [...filters.interests, interest],
    });
  };

  return (
    <aside className="h-fit rounded-2xl border border-stone-100 p-6 lg:sticky lg:top-24">
      <div>
        <h3 className="text-sm font-semibold text-stone-900">Search tours</h3>
        <div className="relative mt-3">
          <svg viewBox="0 0 24 24" fill="none" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400">
            <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.6" />
            <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onChange({ search: e.target.value })}
            placeholder="Ella, safari, tea, Sigiriya..."
            className="w-full rounded-xl border border-stone-100 bg-stone-50 py-2.5 pl-10 pr-3 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400/60"
          />
        </div>
      </div>

      <div className="mt-7">
        <h3 className="text-sm font-semibold text-stone-900">Tour type</h3>
        <div className="mt-3 flex gap-2">
          {(["all", "round", "day"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => onChange({ type: t })}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                filters.type === t
                  ? "bg-stone-900 text-white"
                  : "bg-stone-50 text-stone-600 hover:bg-stone-100"
              }`}
            >
              {t === "all" ? "All" : t === "round" ? "Round Tours" : "Day Tours"}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-7">
        <h3 className="text-sm font-semibold text-stone-900">Interests</h3>
        <div className="mt-3 flex flex-col gap-2.5">
          {INTEREST_OPTIONS.map((interest) => (
            <label key={interest} className="flex cursor-pointer items-center gap-2.5 text-sm text-stone-600">
              <input
                type="checkbox"
                checked={filters.interests.includes(interest)}
                onChange={() => toggleInterest(interest)}
                className="h-4 w-4 rounded border-stone-300 text-amber-400 focus:ring-amber-400/60"
              />
              {interest}
            </label>
          ))}
        </div>
      </div>

      <div className="mt-7">
        <div className="flex items-center justify-between text-sm font-semibold text-stone-900">
          <span>Max price per person</span>
          <span className="font-normal text-stone-400">
            {filters.maxPrice >= MAX_PRICE ? "Any" : `$${filters.maxPrice}`}
          </span>
        </div>
        <input
          type="range"
          min={50}
          max={MAX_PRICE}
          step={10}
          value={filters.maxPrice}
          onChange={(e) => onChange({ maxPrice: Number(e.target.value) })}
          className="mt-3 w-full accent-amber-400"
        />
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between text-sm font-semibold text-stone-900">
          <span>Max trip length</span>
          <span className="font-normal text-stone-400">
            {filters.maxDays >= MAX_DAYS ? "Any" : `${filters.maxDays}d`}
          </span>
        </div>
        <input
          type="range"
          min={1}
          max={MAX_DAYS}
          step={1}
          value={filters.maxDays}
          onChange={(e) => onChange({ maxDays: Number(e.target.value) })}
          className="mt-3 w-full accent-amber-400"
        />
      </div>

      <button
        type="button"
        onClick={onClear}
        className="mt-7 text-xs font-semibold uppercase tracking-wide text-stone-500 underline decoration-stone-300 underline-offset-4 hover:text-stone-800"
      >
        Clear all filters
      </button>
    </aside>
  );
}

/* ------------------------------------------------------------------ */
/*  Tour card                                                           */
/* ------------------------------------------------------------------ */

function TourCard({ tour }: { tour: Tour }) {
  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-stone-100 p-4 shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:p-5">
      <div className="group relative h-56 w-full shrink-0 overflow-hidden rounded-xl sm:h-auto sm:w-64">
        <img
          src={tour.image}
          alt={tour.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <span className="absolute left-3 top-3 rounded-full bg-stone-950/70 px-3 py-1 text-xs font-medium text-white">
          {tour.type === "round" ? "Round tours" : "Day tours"}
        </span>
      </div>

      <div className="flex flex-1 flex-col">
        <StarRating rating={tour.rating} reviewCount={tour.reviewCount} source={tour.reviewSource} />
        <h3 className="mt-2 text-xl font-semibold text-stone-900">{tour.name}</h3>

        <div className="mt-3 flex flex-col gap-1.5 text-sm text-stone-500">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 shrink-0 text-stone-400">
              <rect x="4" y="5.5" width="16" height="14.5" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M4 9.5h16M8 3.5v3M16 3.5v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            {tour.durationLabel}
          </div>
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 shrink-0 text-stone-400">
              <path d="M12 21.5s7-6.13 7-11.5a7 7 0 10-14 0c0 5.37 7 11.5 7 11.5z" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            {tour.locations.join(" · ")}
          </div>
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 shrink-0 text-stone-400">
              <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
              <path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M15.5 6.5a3 3 0 010 5.8M18 19c0-2.4-1.7-4.3-4-4.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            {tour.groupLabel}
          </div>
        </div>

        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-stone-500">{tour.description}</p>

        <div className="mt-4 flex flex-1 items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-stone-400">From</p>
            <p className="text-2xl font-bold text-stone-900">${tour.fromPrice.toLocaleString()}</p>
            <p className="text-xs text-stone-400">per person · taxes included</p>
          </div>
          <a
            href={`/tours/${tour.id}`}
            className="shrink-0 rounded-full bg-amber-400 px-6 py-2.5 text-sm font-semibold text-stone-900 transition-transform hover:-translate-y-0.5"
          >
            View Tour
          </a>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Empty state                                                         */
/* ------------------------------------------------------------------ */

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-stone-200 px-6 py-16 text-center">
      <svg viewBox="0 0 24 24" fill="none" className="h-10 w-10 text-stone-300">
        <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
      <h3 className="mt-4 text-lg font-semibold text-stone-900">No tours match your filters</h3>
      <p className="mt-2 max-w-sm text-sm text-stone-500">
        Try widening your price or trip length, or clearing an interest so
        more tours can show up.
      </p>
      <button
        type="button"
        onClick={onClear}
        className="mt-6 rounded-full bg-amber-400 px-6 py-2.5 text-sm font-semibold text-stone-900 transition-transform hover:-translate-y-0.5"
      >
        Clear all filters
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer                                                              */
/* ------------------------------------------------------------------ */

const FOOTER_COLUMNS = [
  { title: "Tours", links: ["All Tours", "Day Tours", "Round Tours"] },
  {
    title: "Navigation",
    links: ["Home", "Where to Go", "What to Do", "Reach Us", "Our Story"],
  },
  {
    title: "Explore",
    links: ["Beaches", "Hill Country", "Wildlife", "Heritage & Culture", "Tea Trails"],
  },
];

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-stone-100 pt-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-5 lg:px-8">
        <div className="md:col-span-2 lg:col-span-2">
          <h3 className="text-lg font-semibold text-stone-900">Achii Lanka Tours</h3>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-stone-500">
            A Sri Lankan tour operator based in Colombo. We run our own
            tours, with our own drivers and guides so the people you book
            with are the people who look after you here.
          </p>
          <a
            href="/plan-my-trip"
            className="mt-6 inline-flex rounded-full bg-amber-400 px-5 py-2.5 text-sm font-semibold text-stone-900 transition-transform hover:-translate-y-0.5"
          >
            Plan My Trip
          </a>
        </div>

        {FOOTER_COLUMNS.map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-semibold text-stone-900">{col.title}</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-stone-500">
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#" className="transition-colors hover:text-amber-500">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="text-sm font-semibold text-stone-900">Contact us</h4>
          <ul className="mt-4 space-y-3 text-sm text-stone-500">
            <li>1-677-124-44227</li>
            <li>Eighth Avenue 487, New York</li>
            <li>info@achiilanka.com</li>
          </ul>
          <h4 className="mt-6 text-sm font-semibold text-stone-900">Social Media Links</h4>
          <div className="mt-3 flex gap-3 text-stone-500">
            <a href="#" aria-label="Facebook" className="hover:text-amber-500">
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                <path d="M13.5 21v-8.2h2.75l.4-3.2h-3.15V7.5c0-.93.26-1.56 1.6-1.56h1.7V3.1C15.9 3 15 2.95 13.94 2.95c-2.2 0-3.71 1.34-3.71 3.8v2.85H7.5v3.2h2.73V21h3.27z" />
              </svg>
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-amber-500">
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                <path d="M12 2.2c2.7 0 3 0 4.1.06 1.06.05 1.79.22 2.43.47.66.26 1.22.6 1.77 1.15.55.55.9 1.11 1.15 1.77.25.64.42 1.37.47 2.43.06 1.06.06 1.4.06 4.1s0 3-.06 4.1c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 01-1.15 1.77 4.9 4.9 0 01-1.77 1.15c-.64.25-1.37.42-2.43.47-1.06.06-1.4.06-4.1.06s-3 0-4.1-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 01-1.77-1.15 4.9 4.9 0 01-1.15-1.77c-.25-.64-.42-1.37-.47-2.43C2.2 15 2.2 14.7 2.2 12s0-3 .06-4.1c.05-1.06.22-1.79.47-2.43.26-.66.6-1.22 1.15-1.77A4.9 4.9 0 015.65 2.55c.64-.25 1.37-.42 2.43-.47C9.14 2.02 9.44 2.02 12 2.02z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-stone-200 px-4 py-5 text-xs text-stone-400 sm:px-6 lg:px-8">
        © 2026 Achii Lanka - All rights reserved
      </div>

      <div className="pointer-events-none relative h-40 select-none overflow-hidden sm:h-56">
        <img
          src="https://picsum.photos/seed/achii-mountains/1600/400"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-100 via-stone-100/40 to-transparent" />
        <span className="absolute inset-x-0 bottom-0 text-center text-[8rem] font-bold leading-none tracking-tight text-white/30 sm:text-[11rem]">
          Achii
        </span>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

export default function ToursPage() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [sort, setSort] = useState<SortOption>("booked");

  const updateFilters = (next: Partial<Filters>) =>
    setFilters((prev) => ({ ...prev, ...next }));

  const clearFilters = () => setFilters(DEFAULT_FILTERS);

  const filteredTours = useMemo(() => {
    const search = filters.search.trim().toLowerCase();

    const result = TOURS.filter((tour) => {
      if (filters.type !== "all" && tour.type !== filters.type) return false;
      if (tour.fromPrice > filters.maxPrice) return false;
      if (tour.durationDays > filters.maxDays) return false;
      if (
        filters.interests.length > 0 &&
        !filters.interests.some((i) => tour.interests.includes(i))
      )
        return false;
      if (search) {
        const haystack = `${tour.name} ${tour.locations.join(" ")} ${tour.description}`.toLowerCase();
        if (!haystack.includes(search)) return false;
      }
      return true;
    });

    const sorted = [...result];
    if (sort === "price-asc") sorted.sort((a, b) => a.fromPrice - b.fromPrice);
    if (sort === "price-desc") sorted.sort((a, b) => b.fromPrice - a.fromPrice);
    if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
    // "booked" keeps the curated default order (already sorted by review count)
    return sorted;
  }, [filters, sort]);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <nav className="text-xs text-stone-400">
          <a href="/" className="hover:text-stone-600">
            Home
          </a>{" "}
          / <span className="text-stone-600">All tours</span>
        </nav>

        <Reveal className="mt-4">
          <h1 className="text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">All tours</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-stone-500">
            Every tour is operated by us, priced per person with taxes
            included, and can be adjusted before you pay. Browse as long as
            you like — there is no account needed to explore or to reserve.
          </p>
        </Reveal>
      </div>

      <div className="mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-8 px-4 pb-24 sm:px-6 lg:grid-cols-[280px_1fr] lg:px-8">
        <FilterSidebar filters={filters} onChange={updateFilters} onClear={clearFilters} />

        <div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-stone-500">
              {filteredTours.length} {filteredTours.length === 1 ? "tour" : "tours"} match your filters
            </p>
            <label className="flex items-center gap-2 text-sm text-stone-500">
              Sort by
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-400/60"
              >
                {(Object.keys(SORT_LABELS) as SortOption[]).map((key) => (
                  <option key={key} value={key}>
                    {SORT_LABELS[key]}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-6 flex flex-col gap-6">
            {filteredTours.length === 0 ? (
              <EmptyState onClear={clearFilters} />
            ) : (
              filteredTours.map((tour) => <TourCard key={tour.id} tour={tour} />)
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}