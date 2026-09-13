"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { notFound, useParams } from "next/navigation";

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/*  Only "classic-sri-lanka" is fully populated for now — copy this     */
/*  shape into TOUR_DETAILS for each additional tour as its content     */
/*  is ready. Falls through to a "not found" state otherwise.           */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Where to Go", href: "/explore" },
  { label: "What to Do", href: "/activities" },
  { label: "Reach Us", href: "/contact" },
  { label: "Our Story", href: "/about" },
];

type ItineraryDay = {
  day: number;
  title: string;
  description: string;
  stayLabel?: string;
  mealsLabel?: string;
};

type Faq = { question: string; answer: string };

type Review = {
  rating: number;
  quote: string;
  author: string;
  location: string;
  date: string;
  source: string;
};

type TourDetail = {
  slug: string;
  name: string;
  breadcrumbType: string;
  breadcrumbHref: string;
  rating: number;
  reviewCount: number;
  reviewSource: string;
  durationLabel: string;
  groupLabel: string;
  startsAt: string;
  images: string[];
  fromPrice: number;
  priceNote: string;
  overviewParagraph: string;
  overviewHighlights: string[];
  quickFacts: { label: string; value: string }[];
  itineraryIntro: string;
  itinerary: ItineraryDay[];
  included: string[];
  notIncluded: string[];
  review: Review;
  faqs: Faq[];
};

const TOUR_DETAILS: Record<string, TourDetail> = {
  "classic-sri-lanka": {
    slug: "classic-sri-lanka",
    name: "Classic Sri Lanka",
    breadcrumbType: "Round tours",
    breadcrumbHref: "/tours?type=round",
    rating: 4.9,
    reviewCount: 214,
    reviewSource: "Tripadvisor",
    durationLabel: "10 days · 9 nights",
    groupLabel: "Private tour (2 to 6 travellers)",
    startsAt: "Starts: Colombo airport (CMB)",
    images: [
      "https://picsum.photos/seed/achii-detail-hero/1200/800",
      "https://picsum.photos/seed/achii-detail-1/400/300",
      "https://picsum.photos/seed/achii-detail-2/400/300",
      "https://picsum.photos/seed/achii-detail-3/400/300",
      "https://picsum.photos/seed/achii-detail-4/400/300",
    ],
    fromPrice: 1290,
    priceNote: "per person, based on 2 travellers · all taxes included",
    overviewParagraph:
      "The whole country in one loop: the Cultural Triangle, the hill country train, a safari in Yala and four nights to slow down on the south coast. Our most booked itinerary, and the one we recommend for a first visit.",
    overviewHighlights: [
      "Climb Sigiriya rock fortress before the heat of the day",
      "Ride the Kandy to Ella train in reserved seats",
      "Private 4x4 game drive in Yala National Park",
      "Two full free days on the south coast",
    ],
    quickFacts: [
      { label: "Destinations", value: "Negombo · Sigiriya · Kandy · Nuwara Eliya · Ella · Yala · Mirissa" },
      { label: "Best months to travel", value: "December to April" },
      { label: "Accommodation", value: "4-star hotels and one safari lodge. Boutique and 5-star upgrades available on request." },
      { label: "Transport", value: "Private air-conditioned car or van with chauffeur guide, plus two reserved train journeys." },
    ],
    itineraryIntro:
      "Your guide can adjust the order or pace as you go — nothing here is locked once you are on the road.",
    itinerary: [
      {
        day: 1,
        title: "Arrive Colombo to Negombo",
        description:
          "Airport pickup at any hour and a short 25-minute transfer to a beach hotel in Negombo so you can sleep off the flight.",
        stayLabel: "Beach hotel, Negombo",
        mealsLabel: "Breakfast",
      },
      {
        day: 2,
        title: "Negombo → Anuradhapura → Sigiriya",
        description:
          "Drive north to the first royal capital, cycling between the stupas and monastery ruins with a guide, then continue to Sigiriya.",
      },
      {
        day: 3,
        title: "Sigiriya & Dambulla",
        description:
          "Early start for Sigiriya Lion Rock, back for a late breakfast, then the Dambulla cave temples in the afternoon.",
      },
      {
        day: 4,
        title: "Sigiriya to Kandy",
        description:
          "Polonnaruwa ruins en route, a stop at a spice garden, then arrival in Kandy for the evening ceremony at the Temple of the Tooth.",
      },
      {
        day: 5,
        title: "Kandy to Nuwara Eliya by train",
        description:
          "Morning at the botanical gardens, then the observation-carriage train up into tea country. Your driver meets you at Nanu Oya station.",
      },
      {
        day: 6,
        title: "Tea country & Horton Plains",
        description:
          "Sunrise at Horton Plains for World's End, then a working tea factory and tasting in the afternoon.",
      },
      {
        day: 7,
        title: "Nuwara Eliya → Ella",
        description:
          "Short train hop to Ella, then the Nine Arch Bridge and the walk up Little Adam's Peak for sunset.",
      },
      {
        day: 8,
        title: "Ella → Yala safari",
        description:
          "Down to the dry zone for an afternoon private game drive in Yala National Park, looking for leopard, elephant and sloth bear.",
      },
      {
        day: 9,
        title: "Yala → Mirissa",
        description: "Coast road west to the south beaches. The rest of the day is yours.",
      },
      {
        day: 10,
        title: "Mirissa → Colombo airport",
        description:
          "Free morning by the sea, then a transfer to the airport timed around your flight, with a stop in Galle Fort if time allows.",
      },
    ],
    included: [
      "9 nights accommodation in hand-picked 4-star hotels",
      "Daily breakfast and 1 dinner at the safari lodge",
      "Private air-conditioned car with English-speaking chauffeur guide throughout",
      "Reserved seats, Kandy to Nuwara Eliya and Nuwara Eliya to Ella trains",
      "Private 4x4 game drive in Yala National Park",
      "All entrance fees listed in the itinerary",
      "Airport pickup and drop-off at any hour",
      "Local SIM card with data on arrival",
      "24/7 WhatsApp support from our Colombo office",
    ],
    notIncluded: [
      "International flights to and from Colombo (CMB)",
      "Sri Lanka visa / ETA fee (approx. USD 50 per person)",
      "Travel insurance",
      "Lunches and dinners unless listed as included",
      "Entrance fees marked as optional in the itinerary",
      "Personal expenses, drinks and tips",
    ],
    review: {
      rating: 5,
      quote:
        "Everything was arranged exactly as written on the website. Our driver Nuwan met us at the airport at 2am and stayed with us for the whole trip. No surprise costs at any point.",
      author: "Marianne D.",
      location: "France",
      date: "March 2026",
      source: "Tripadvisor",
    },
    faqs: [
      {
        question: "Is this a private tour or a group tour?",
        answer:
          "Private. The car, driver and guide are yours alone, and the itinerary can be adjusted with your guide as you go.",
      },
      {
        question: "How much driving is there each day?",
        answer:
          "Most days are 2 to 4 hours on the road, split up by stops. The longest single drive is the transfer from Sigiriya to Kandy, which includes a Polonnaruwa stop to break it up.",
      },
      {
        question: "What if we want different hotels?",
        answer:
          "Tell us your preference when you enquire. We can swap in boutique or 5-star properties at the same stops for an adjusted price.",
      },
      {
        question: "Can we see the tour price in euros?",
        answer:
          "Yes — mention your preferred currency when you get in touch and we'll quote the price in euros, pounds, or another currency of your choice.",
      },
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  Reveal                                                              */
/* ------------------------------------------------------------------ */

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
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
/*  Gallery                                                             */
/* ------------------------------------------------------------------ */

function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="overflow-hidden rounded-2xl">
        <img src={images[active]} alt={alt} className="h-[420px] w-full object-cover sm:h-[480px]" />
      </div>
      <div className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-5">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(i)}
            className={`overflow-hidden rounded-xl border-2 transition-colors ${
              active === i ? "border-amber-400" : "border-transparent"
            }`}
            aria-label={`Show photo ${i + 1}`}
          >
            <img src={src} alt="" className="h-20 w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Booking / enquiry sidebar                                          */
/* ------------------------------------------------------------------ */

function EnquirySidebar({ tour }: { tour: TourDetail }) {
  const [startDate, setStartDate] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [dateError, setDateError] = useState<string | null>(null);

  const whatsappHref = useMemo(() => {
    const lines = [
      `Hi! I'd like to enquire about the "${tour.name}" tour.`,
      startDate ? `Preferred start date: ${startDate}` : null,
      `Travellers: ${adults} adult${adults === 1 ? "" : "s"}${children ? `, ${children} child${children === 1 ? "" : "ren"}` : ""}`,
    ].filter(Boolean);
    return `https://wa.me/94771234567?text=${encodeURIComponent(lines.join("\n"))}`;
  }, [tour.name, startDate, adults, children]);

  const handleDateChange = (value: string) => {
    setStartDate(value);
    if (value && new Date(value) < new Date(new Date().toDateString())) {
      setDateError("Pick a date from today onward.");
    } else {
      setDateError(null);
    }
  };

  return (
    <aside className="rounded-2xl border border-stone-100 p-6 shadow-sm lg:sticky lg:top-24">
      <p className="text-xs font-medium uppercase tracking-wide text-stone-400">From</p>
      <p className="text-3xl font-bold text-stone-900">${tour.fromPrice.toLocaleString()}</p>
      <p className="mt-1 text-xs text-stone-400">{tour.priceNote}</p>

      <div className="mt-6">
        <label className="text-sm font-medium text-stone-700" htmlFor="start-date">
          Preferred start date
        </label>
        <input
          id="start-date"
          type="date"
          value={startDate}
          onChange={(e) => handleDateChange(e.target.value)}
          aria-invalid={Boolean(dateError)}
          className={`mt-2 w-full rounded-xl border bg-stone-50 px-3.5 py-2.5 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-400/60 ${
            dateError ? "border-red-300" : "border-stone-200"
          }`}
        />
        {dateError && <p className="mt-1.5 text-xs text-red-500">{dateError}</p>}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium text-stone-700" htmlFor="adults">
            Adults
          </label>
          <select
            id="adults"
            value={adults}
            onChange={(e) => setAdults(Number(e.target.value))}
            className="mt-2 w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-400/60"
          >
            {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-stone-700" htmlFor="children">
            Children (2–11)
          </label>
          <select
            id="children"
            value={children}
            onChange={(e) => setChildren(Number(e.target.value))}
            className="mt-2 w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-400/60"
          >
            {Array.from({ length: 6 }, (_, i) => i).map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>

      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        className="mt-6 flex w-full items-center justify-center rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-stone-900 transition-transform hover:-translate-y-0.5"
      >
        Chat on WhatsApp
      </a>
      <p className="mt-3 text-center text-xs text-stone-400">
        No account needed. You'll see the full price before any payment.
      </p>

      <hr className="my-5 border-stone-100" />

      <p className="text-sm text-stone-500">
        Want something changed — different hotels, an extra day, a different
        start point?{" "}
        <a href="/plan-my-trip" className="font-medium text-stone-700 underline underline-offset-2">
          Ask us on the Plan My Trip form
        </a>
        .
      </p>
    </aside>
  );
}

/* ------------------------------------------------------------------ */
/*  Itinerary accordion                                                 */
/* ------------------------------------------------------------------ */

function ItineraryAccordion({ days }: { days: ItineraryDay[] }) {
  const [openDay, setOpenDay] = useState<number | null>(1);

  return (
    <div className="flex flex-col gap-3">
      {days.map((day) => {
        const isOpen = openDay === day.day;
        return (
          <div key={day.day} className="overflow-hidden rounded-2xl border border-stone-100">
            <button
              type="button"
              onClick={() => setOpenDay(isOpen ? null : day.day)}
              aria-expanded={isOpen}
              className="flex w-full items-start gap-4 p-5 text-left"
            >
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-stone-900 text-sm font-semibold text-white">
                {day.day}
              </span>
              <span className="flex-1">
                <span className="block text-base font-semibold text-stone-900">{day.title}</span>
                <span className="mt-1 block text-sm leading-relaxed text-stone-500">{day.description}</span>
              </span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className={`mt-1 h-4 w-4 shrink-0 text-stone-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
              >
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {isOpen && (day.stayLabel || day.mealsLabel) && (
              <div className="flex flex-wrap gap-5 border-t border-stone-100 bg-stone-50/60 px-5 py-4 pl-[3.75rem] text-xs text-stone-500">
                {day.stayLabel && (
                  <span className="flex items-center gap-1.5">
                    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                      <path d="M3.5 18.5v-11M3.5 12h17v6.5M8 12V9a2 2 0 012-2h4a2 2 0 012 2v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {day.stayLabel}
                  </span>
                )}
                {day.mealsLabel && (
                  <span className="flex items-center gap-1.5">
                    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                      <path d="M7 3v7a2 2 0 01-2 2v9M7 3v9M5 3v9M17 3v18M17 3c-2.2 0-3.5 1.8-3.5 4.5S14.8 12 17 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {day.mealsLabel}
                  </span>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ accordion                                                       */
/* ------------------------------------------------------------------ */

function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-stone-100 rounded-2xl border border-stone-100">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={faq.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="text-sm font-semibold text-stone-900">{faq.question}</span>
              <span className="shrink-0 text-lg text-stone-400">{isOpen ? "–" : "+"}</span>
            </button>
            {isOpen && (
              <p className="px-5 pb-4 text-sm leading-relaxed text-stone-500">{faq.answer}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer                                                              */
/* ------------------------------------------------------------------ */

const FOOTER_COLUMNS = [
  { title: "Tours", links: ["All Tours", "Day Tours", "Round Tours"] },
  { title: "Navigation", links: ["Home", "Where to Go", "What to Do", "Reach Us", "Our Story"] },
  { title: "Explore", links: ["Beaches", "Hill Country", "Wildlife", "Heritage & Culture", "Tea Trails"] },
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

export default function TourDetailPage() {
  const params = useParams<{ slug: string }>();
  const tour = TOUR_DETAILS[params.slug];

  if (!tour) {
    // No matching tour data yet for this slug.
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <nav className="text-xs text-stone-400">
          <a href="/" className="hover:text-stone-600">
            Home
          </a>{" "}
          /{" "}
          <a href={tour.breadcrumbHref} className="hover:text-stone-600">
            {tour.breadcrumbType}
          </a>{" "}
          / <span className="text-stone-600">{tour.name}</span>
        </nav>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">{tour.name}</h1>

        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-stone-500">
          <span className="flex items-center gap-1.5">
            <svg viewBox="0 0 20 20" className="h-4 w-4 fill-amber-400">
              <path d="M10 1.5l2.47 5.4 5.93.61-4.48 4 1.28 5.85L10 14.8l-5.2 2.56 1.28-5.85-4.48-4 5.93-.61z" />
            </svg>
            <span className="font-semibold text-stone-800">{tour.rating.toFixed(1)}</span>
            <span>
              ({tour.reviewCount} reviews) · {tour.reviewSource}
            </span>
          </span>
          <span className="flex items-center gap-1.5">
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-stone-400">
              <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {tour.durationLabel}
          </span>
          <span className="flex items-center gap-1.5">
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-stone-400">
              <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
              <path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            {tour.groupLabel}
          </span>
        </div>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-stone-500">
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-stone-400">
            <path d="M12 21.5s7-6.13 7-11.5a7 7 0 10-14 0c0 5.37 7 11.5 7 11.5z" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          {tour.startsAt}
        </p>
      </div>

      <div className="mx-auto mt-6 grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_340px] lg:px-8">
        <Reveal>
          <Gallery images={tour.images} alt={tour.name} />
        </Reveal>

        <Reveal>
          <EnquirySidebar tour={tour} />
        </Reveal>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-24 pt-14 sm:px-6 lg:grid lg:grid-cols-[1fr_340px] lg:gap-8 lg:px-8">
        <div>
          <Reveal>
            <h2 className="text-2xl font-bold text-stone-900">Tour overview</h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-stone-500">
              {tour.overviewParagraph}
            </p>

            <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
              {tour.overviewHighlights.map((item) => (
                <div key={item} className="flex items-start gap-2 text-sm text-stone-600">
                  <svg viewBox="0 0 24 24" fill="none" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500">
                    <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 rounded-2xl border border-stone-100 p-6 sm:grid-cols-2">
              {tour.quickFacts.map((fact) => (
                <div key={fact.label}>
                  <p className="text-xs font-semibold uppercase tracking-wide text-stone-400">{fact.label}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-stone-600">{fact.value}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="mt-14">
            <h2 className="text-2xl font-bold text-stone-900">Day-by-day itinerary</h2>
            <p className="mt-2 text-sm text-stone-500">{tour.itineraryIntro}</p>
            <div className="mt-6">
              <ItineraryAccordion days={tour.itinerary} />
            </div>
          </Reveal>

          <Reveal className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2">
            <div>
              <h2 className="text-xl font-bold text-stone-900">What is included</h2>
              <ul className="mt-4 flex flex-col gap-3">
                {tour.included.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-stone-600">
                    <svg viewBox="0 0 24 24" fill="none" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500">
                      <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-bold text-stone-900">What is not included</h2>
              <ul className="mt-4 flex flex-col gap-3">
                {tour.notIncluded.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-stone-600">
                    <svg viewBox="0 0 24 24" fill="none" className="mt-0.5 h-4 w-4 shrink-0 text-red-400">
                      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal className="mt-14">
            <h2 className="text-2xl font-bold text-stone-900">Reviews from travellers on this tour</h2>
            <p className="mt-2 text-sm text-stone-500">
              Published on {tour.review.source} under the traveller's own account.
            </p>
            <div className="mt-5 max-w-xl rounded-2xl border border-stone-100 p-6">
              <div className="flex items-center gap-1.5">
                {Array.from({ length: 5 }, (_, i) => (
                  <svg
                    key={i}
                    viewBox="0 0 20 20"
                    className={`h-4 w-4 ${i < tour.review.rating ? "fill-amber-400" : "fill-stone-200"}`}
                  >
                    <path d="M10 1.5l2.47 5.4 5.93.61-4.48 4 1.28 5.85L10 14.8l-5.2 2.56 1.28-5.85-4.48-4 5.93-.61z" />
                  </svg>
                ))}
                <span className="ml-1 text-sm font-semibold text-stone-700">{tour.review.rating}/5</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-stone-600">"{tour.review.quote}"</p>
              <p className="mt-4 text-sm font-semibold text-stone-900">
                {tour.review.author}
                <span className="ml-1 font-normal text-stone-400">
                  · {tour.review.location} · {tour.review.date} · {tour.review.source}
                </span>
              </p>
            </div>
          </Reveal>

          <Reveal className="mt-14">
            <h2 className="text-2xl font-bold text-stone-900">Questions travellers ask us</h2>
            <div className="mt-5">
              <FaqAccordion faqs={tour.faqs} />
            </div>
          </Reveal>
        </div>

        <div className="hidden lg:block" />
      </div>

      <Footer />
    </main>
  );
}