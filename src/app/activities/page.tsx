"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactElement, ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Data                                                               */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Where to Go", href: "/explore" },
  { label: "What to Do", href: "/activities" },
  { label: "Reach Us", href: "/contact" },
  { label: "Our Story", href: "/about" },
];

type TourLink = {
  name: string;
  durationLabel: string;
  href: string;
};

type Experience = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  whereLabel: string;
  image: string;
  tours: TourLink[];
};

const EXPERIENCES: Experience[] = [
  {
    id: "beaches",
    eyebrow: "South & East Coast",
    title: "Beaches",
    description:
      "Long stretches of warm sand from Bentota to Arugam Bay, whale watching off Mirissa, and quiet coves for slow mornings.",
    whereLabel: "Unawatuna · Mirissa · Tangalle · Arugam Bay",
    image: "https://picsum.photos/seed/achii-activity-beach/900/700",
    tours: [
      {
        name: "Classic Sri Lanka",
        durationLabel: "10 days · 9 nights",
        href: "/tours/classic-sri-lanka",
      },
      {
        name: "Wildlife & Beaches",
        durationLabel: "8 days · 7 nights",
        href: "/tours/wildlife-beaches",
      },
      {
        name: "Surf & Coast Escape",
        durationLabel: "9 days · 8 nights",
        href: "/tours/surf-coast",
      },
    ],
  },
  {
    id: "hill-country",
    eyebrow: "Ella & Nuwara Eliya",
    title: "Hill Country",
    description:
      "Cool mountain air, waterfalls, the Kandy to Ella train, and viewpoints you reach before sunrise.",
    whereLabel: "Kandy · Nuwara Eliya · Ella · Horton Plains",
    image: "https://picsum.photos/seed/achii-activity-hillcountry/900/700",
    tours: [
      {
        name: "Classic Sri Lanka",
        durationLabel: "10 days · 9 nights",
        href: "/tours/classic-sri-lanka",
      },
      {
        name: "Tea Trails & Hill Country",
        durationLabel: "6 days · 5 nights",
        href: "/tours/tea-trails",
      },
      {
        name: "Ancient Kingdoms & Heritage",
        durationLabel: "7 days · 6 nights",
        href: "/tours/ancient-kingdoms",
      },
    ],
  },
  {
    id: "wildlife",
    eyebrow: "Yala, Udawalawe & Wilpattu",
    title: "Wildlife",
    description:
      "Leopards, sloth bears and wild elephants in national parks, with early morning and late afternoon game drives.",
    whereLabel: "Yala · Udawalawe · Wilpattu · Minneriya",
    image: "https://picsum.photos/seed/achii-activity-wildlife/900/700",
    tours: [
      {
        name: "Classic Sri Lanka",
        durationLabel: "10 days · 9 nights",
        href: "/tours/classic-sri-lanka",
      },
      {
        name: "Wildlife & Beaches",
        durationLabel: "8 days · 7 nights",
        href: "/tours/wildlife-beaches",
      },
      {
        name: "Yala Full-Day Safari",
        durationLabel: "1 day · dawn to dusk",
        href: "/tours/yala-safari",
      },
    ],
  },
  {
    id: "heritage",
    eyebrow: "The Cultural Triangle",
    title: "Heritage & Culture",
    description:
      "Two thousand years of temples, rock fortresses and royal cities, from Anuradhapura to Sigiriya and Kandy.",
    whereLabel: "Sigiriya · Polonnaruwa · Anuradhapura · Kandy",
    image: "https://picsum.photos/seed/achii-activity-heritage/900/700",
    tours: [
      {
        name: "Classic Sri Lanka",
        durationLabel: "10 days · 9 nights",
        href: "/tours/classic-sri-lanka",
      },
      {
        name: "Ancient Kingdoms & Heritage",
        durationLabel: "7 days · 6 nights",
        href: "/tours/ancient-kingdoms",
      },
      {
        name: "Sigiriya & Dambulla from Colombo",
        durationLabel: "1 day · approx. 15 hours",
        href: "/tours/sigiriya-dambulla",
      },
    ],
  },
  {
    id: "tea-trails",
    eyebrow: "Plantation Country",
    title: "Tea Trails",
    description:
      "Estate walks, factory visits and tastings with the people who pick and process Ceylon tea.",
    whereLabel: "Nuwara Eliya · Haputale · Dickoya · Hatton",
    image: "https://picsum.photos/seed/achii-activity-tea/900/700",
    tours: [
      {
        name: "Classic Sri Lanka",
        durationLabel: "10 days · 9 nights",
        href: "/tours/classic-sri-lanka",
      },
      {
        name: "Tea Trails & Hill Country",
        durationLabel: "6 days · 5 nights",
        href: "/tours/tea-trails",
      },
      {
        name: "Ella Hike & Nine Arch Bridge",
        durationLabel: "1 day · approx. 8 hours",
        href: "/tours/ella-hike",
      },
    ],
  },
];

type Activity = {
  id: string;
  title: string;
  bestPlaces: string;
  season: string;
  image: string;
  href: string;
};

const ACTIVITIES: Activity[] = [
  {
    id: "hiking",
    title: "Hiking",
    bestPlaces: "Horton Plains, Knuckles Range",
    season: "December to March",
    image: "https://picsum.photos/seed/achii-act-hiking/700/500",
    href: "/tours?interest=hiking",
  },
  {
    id: "surfing",
    title: "Surfing",
    bestPlaces: "Weligama, Hiriketiya, Arugam Bay",
    season: "Nov to Apr (south) · May to Sep (east)",
    image: "https://picsum.photos/seed/achii-act-surfing/700/500",
    href: "/tours?interest=surfing",
  },
  {
    id: "diving",
    title: "Diving & Snorkelling",
    bestPlaces: "Trincomalee, Hikkaduwa, Kalpitiya",
    season: "May to September (west)",
    image: "https://picsum.photos/seed/achii-act-diving/700/500",
    href: "/tours?interest=diving-snorkelling",
  },
  {
    id: "birdwatching",
    title: "Bird Watching",
    bestPlaces: "Sinharaja, Bundala, Kumana",
    season: "Nov to April",
    image: "https://picsum.photos/seed/achii-act-birds/700/500",
    href: "/tours?interest=bird-watching",
  },
];

type ServiceItem = {
  title: string;
  description: string;
};

const ACCOMMODATION_ITEMS: ServiceItem[] = [
  {
    title: "Boutique stays",
    description:
      "Restored villas, plantation bungalows and small owner-run hotels. 8 to 20 rooms.",
  },
  {
    title: "4-star hotels",
    description:
      "Reliable comfort with pools and air conditioning — the standard on most of our tours.",
  },
  {
    title: "5-star and resorts",
    description:
      "Beach resorts and luxury tented camps, available as an upgrade on any round tour.",
  },
  {
    title: "Guesthouses",
    description:
      "Simple, clean, family-run places in the hill country and surf towns.",
  },
];

const TRANSPORT_ITEMS: ServiceItem[] = [
  {
    title: "Private car",
    description:
      "Sedan with a chauffeur guide, comfortable for two travellers with normal luggage.",
  },
  {
    title: "Private van",
    description:
      "High-roof van for 3 to 6 travellers, with space for surfboards or child seats.",
  },
  {
    title: "Airport transfers",
    description:
      "Meet and greet inside arrivals at any hour, including 2am landings.",
  },
  {
    title: "Train reservations",
    description:
      "Reserved seats on the hill country lines, booked the day they open.",
  },
];

/* ------------------------------------------------------------------ */
/* Reveal                                                             */
/* ------------------------------------------------------------------ */

function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
      },
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
/* Navbar                                                             */
/* ------------------------------------------------------------------ */

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="bg-stone-950 text-stone-300 text-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
          <div className="hidden items-center gap-4 sm:flex">
            <span className="tracking-wide text-stone-400">
              Follow us
            </span>

            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-amber-400"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5 fill-current"
                  aria-hidden="true"
                >
                  <path d="M12 2.2c2.7 0 3 0 4.1.06 1.06.05 1.79.22 2.43.47.66.26 1.22.6 1.77 1.15.55.55.9 1.11 1.15 1.77.25.64.42 1.37.47 2.43.06 1.06.06 1.4.06 4.1s0 3-.06 4.1c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 01-1.15 1.77 4.9 4.9 0 01-1.77 1.15c-.64.25-1.37.42-2.43.47-1.06.06-1.4.06-4.1.06s-3 0-4.1-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 01-1.77-1.15 4.9 4.9 0 01-1.15-1.77c-.25-.64-.42-1.37-.47-2.43C2.2 15 2.2 14.7 2.2 12s0-3 .06-4.1c.05-1.06.22-1.79.47-2.43.26-.66.6-1.22 1.15-1.77A4.9 4.9 0 015.65 2.55c.64-.25 1.37-.42 2.43-.47C9.14 2.02 9.44 2.02 12 2.02z" />
                </svg>
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="hover:text-amber-400"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5 fill-current"
                  aria-hidden="true"
                >
                  <path d="M13.5 21v-8.2h2.75l.4-3.2h-3.15V7.5c0-.93.26-1.56 1.6-1.56h1.7V3.1C15.9 3 15 2.95 13.94 2.95c-2.2 0-3.71 1.34-3.71 3.8v2.85H7.5v3.2h2.73V21h3.27z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="tel:1-677-124-44227"
              className="hover:text-amber-400"
            >
              1-677-124-44227
            </a>

            <a
              href="mailto:info@achiilanka.com"
              className="hidden hover:text-amber-400 sm:inline"
            >
              info@achiilanka.com
            </a>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
          <a
            href="/"
            className="text-lg font-semibold text-stone-900"
          >
            Achii Lanka{" "}
            <span className="text-amber-500">Tours</span>
          </a>

          <div className="hidden items-center gap-8 text-sm font-medium text-stone-600 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`group relative pb-1 transition-colors hover:text-stone-900 ${
                  link.label === "What to Do"
                    ? "text-stone-900"
                    : ""
                }`}
              >
                {link.label}

                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-amber-400 transition-all duration-300 ${
                    link.label === "What to Do"
                      ? "w-full"
                      : "w-0 group-hover:w-full"
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
              <span aria-hidden="true">→</span>
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              className="rounded-full p-2 text-stone-700 lg:hidden"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6 stroke-current"
                fill="none"
                aria-hidden="true"
              >
                {menuOpen ? (
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                ) : (
                  <path
                    d="M4 7h16M4 12h16M4 17h16"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div className="border-t border-stone-100 bg-white px-4 pb-4 lg:hidden">
            <div className="flex flex-col gap-1 pt-2 text-sm font-medium text-stone-700">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="rounded-xl px-3 py-2.5 hover:bg-stone-50"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}

              <a
                href="/plan-my-trip"
                className="mt-2 rounded-full bg-amber-400 px-5 py-2.5 text-center font-semibold text-stone-900"
                onClick={() => setMenuOpen(false)}
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
/* Intro                                                              */
/* ------------------------------------------------------------------ */

function Intro() {
  return (
    <section className="bg-stone-50 py-16">
      <Reveal className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
          Discover Sri Lanka
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
          Five landscapes, one small island
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-relaxed text-stone-500">
          Sri Lanka is about the size of Ireland, so a two-week trip can
          genuinely combine jungle, mountains and coast. Here is what each
          region is actually like — and which tours go there.
        </p>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Experiences                                                        */
/* ------------------------------------------------------------------ */

function ExperienceCard({
  experience,
  imageFirst,
}: {
  experience: Experience;
  imageFirst: boolean;
}) {
  return (
    <Reveal className="overflow-hidden rounded-2xl ring-1 ring-stone-100">
      <div
        className={`grid grid-cols-1 md:grid-cols-2 ${
          imageFirst ? "" : "md:[direction:rtl]"
        }`}
      >
        <div className="group overflow-hidden md:[direction:ltr]">
          <img
            src={experience.image}
            alt={experience.title}
            className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-110 md:h-full"
          />
        </div>

        <div className="flex flex-col justify-center p-8 md:[direction:ltr] sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-wide text-stone-400">
            {experience.eyebrow}
          </p>

          <h3 className="mt-2 text-2xl font-bold text-stone-900">
            {experience.title}
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-stone-500">
            {experience.description}
          </p>

          <p className="mt-4 text-xs text-stone-400">
            Where: {experience.whereLabel}
          </p>

          <hr className="my-5 border-stone-100" />

          <p className="text-xs font-semibold uppercase tracking-wide text-stone-400">
            Tours that go here
          </p>

          <ul className="mt-3 flex flex-col gap-2">
            {experience.tours.map((tour) => (
              <li key={tour.name}>
                <a
                  href={tour.href}
                  className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700 hover:text-emerald-800"
                >
                  {tour.name} · {tour.durationLabel}

                  <span
                    aria-hidden="true"
                    className="transition-transform group-hover/link:translate-x-1"
                  >
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}

function Experiences() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <Reveal>
        <h2 className="text-3xl font-bold text-stone-900">
          Experiences
        </h2>
      </Reveal>

      <div className="mt-8 flex flex-col gap-6">
        {EXPERIENCES.map((experience, index) => (
          <ExperienceCard
            key={experience.id}
            experience={experience}
            imageFirst={index % 2 === 0}
          />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Activities                                                         */
/* ------------------------------------------------------------------ */

function ActivityCard({ activity }: { activity: Activity }) {
  return (
    <a
      href={activity.href}
      className="group relative block h-56 overflow-hidden rounded-2xl sm:h-64"
    >
      <img
        src={activity.image}
        alt={activity.title}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-6 text-white">
        <h3 className="text-xl font-semibold">
          {activity.title}
        </h3>

        <p className="mt-2 text-xs text-stone-200">
          Best places: {activity.bestPlaces}
        </p>

        <p className="text-xs text-stone-200">
          Season: {activity.season}
        </p>

        <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-amber-300">
          Tours with {activity.title.toLowerCase()}

          <span
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </div>
    </a>
  );
}

function Activities() {
  return (
    <section className="bg-stone-50 py-16">
      <Reveal className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-stone-900">
          Activities
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-stone-500">
          Add any of these to a tour, or tell us which one is the reason
          for the trip and we will build around it. Seasons matter here —
          the two monsoons mean the good coast moves through the year.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {ACTIVITIES.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
            />
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Travel services                                                    */
/* ------------------------------------------------------------------ */

function ServiceCard({
  title,
  items,
  icon,
}: {
  title: string;
  items: ServiceItem[];
  icon: ReactElement;
}) {
  return (
    <div className="rounded-2xl border border-stone-100 p-8">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
        {icon}
      </div>

      <h3 className="mt-5 text-xl font-semibold text-stone-900">
        {title}
      </h3>

      <div className="mt-5 flex flex-col divide-y divide-stone-100">
        {items.map((item) => (
          <div
            key={item.title}
            className="py-4 first:pt-0 last:pb-0"
          >
            <p className="text-sm font-semibold text-stone-800">
              {item.title}
            </p>

            <p className="mt-1 text-sm leading-relaxed text-stone-500">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function TravelServices() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <Reveal>
        <h2 className="text-3xl font-bold text-stone-900">
          Travel services
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-stone-500">
          Accommodation and transport are included in every tour. If you
          only need one of them, ask us — we quote these individually for
          travellers who are otherwise self-organised.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <ServiceCard
            title="Accommodation"
            items={ACCOMMODATION_ITEMS}
            icon={
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path
                  d="M3.5 18.5v-11M3.5 12h17v6.5M8 12V9a2 2 0 012-2h4a2 2 0 012 2v3"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />

          <ServiceCard
            title="Transportation"
            items={TRANSPORT_ITEMS}
            icon={
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path
                  d="M4.5 15.5v-4l1.7-4.25A1.5 1.5 0 017.6 6.3h8.8a1.5 1.5 0 011.4.95l1.7 4.25v4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />

                <path
                  d="M4.5 15.5h15v2a1 1 0 01-1 1h-1a1 1 0 01-1-1v-1h-9v1a1 1 0 01-1 1h-1a1 1 0 01-1-1v-2z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />

                <circle
                  cx="7.5"
                  cy="15.5"
                  r="1.1"
                  fill="currentColor"
                />

                <circle
                  cx="16.5"
                  cy="15.5"
                  r="1.1"
                  fill="currentColor"
                />
              </svg>
            }
          />
        </div>

        <div className="mt-9 flex flex-wrap gap-3">
          <a
            href="/tours"
            className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-stone-900 transition-transform hover:-translate-y-0.5"
          >
            Browse Tours
            <span aria-hidden="true">→</span>
          </a>

          <a
            href="/plan-my-trip"
            className="inline-flex items-center rounded-full border border-stone-200 px-6 py-3 text-sm font-semibold text-stone-800 transition-colors hover:bg-stone-50"
          >
            Plan My Trip
          </a>
        </div>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                             */
/* ------------------------------------------------------------------ */

const FOOTER_COLUMNS = [
  {
    title: "Tours",
    links: ["All Tours", "Day Tours", "Round Tours"],
  },
  {
    title: "Navigation",
    links: [
      "Home",
      "Where to Go",
      "What to Do",
      "Reach Us",
      "Our Story",
    ],
  },
  {
    title: "Explore",
    links: [
      "Beaches",
      "Hill Country",
      "Wildlife",
      "Heritage & Culture",
      "Tea Trails",
    ],
  },
];

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-stone-100 pt-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-5 lg:px-8">
        <div className="md:col-span-2 lg:col-span-2">
          <h3 className="text-lg font-semibold text-stone-900">
            Achii Lanka Tours
          </h3>

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

        {FOOTER_COLUMNS.map((column) => (
          <div key={column.title}>
            <h4 className="text-sm font-semibold text-stone-900">
              {column.title}
            </h4>

            <ul className="mt-4 space-y-2.5 text-sm text-stone-500">
              {column.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="transition-colors hover:text-amber-500"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="text-sm font-semibold text-stone-900">
            Contact us
          </h4>

          <ul className="mt-4 space-y-3 text-sm text-stone-500">
            <li>1-677-124-44227</li>
            <li>Eighth Avenue 487, New York</li>
            <li>info@achiilanka.com</li>
          </ul>

          <h4 className="mt-6 text-sm font-semibold text-stone-900">
            Social Media Links
          </h4>

          <div className="mt-3 flex gap-3 text-stone-500">
            <a
              href="#"
              aria-label="Facebook"
              className="hover:text-amber-500"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 fill-current"
                aria-hidden="true"
              >
                <path d="M13.5 21v-8.2h2.75l.4-3.2h-3.15V7.5c0-.93.26-1.56 1.6-1.56h1.7V3.1C15.9 3 15 2.95 13.94 2.95c-2.2 0-3.71 1.34-3.71 3.8v2.85H7.5v3.2h2.73V21h3.27z" />
              </svg>
            </a>

            <a
              href="#"
              aria-label="Instagram"
              className="hover:text-amber-500"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 fill-current"
                aria-hidden="true"
              >
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
/* Page                                                               */
/* ------------------------------------------------------------------ */

export default function ActivitiesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Intro />
      <Experiences />
      <Activities />
      <TravelServices />
      <Footer />
    </main>
  );
}