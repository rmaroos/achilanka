"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Data                                                               */
/* ------------------------------------------------------------------ */

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
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-6"
      }`}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Intro                                                              */
/* ------------------------------------------------------------------ */

function Intro() {
  return (
    <section className="relative overflow-hidden bg-stone-950 text-white">
      <div className="absolute inset-0">
        <img
          src="https://picsum.photos/seed/achii-activities-hero/1800/1000"
          alt="Sri Lanka landscape"
          className="h-full w-full object-cover opacity-45"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-stone-950" />
      </div>

      <div className="relative mx-auto flex min-h-[70vh] max-w-7xl items-end px-6 pb-20 pt-36 sm:px-8 lg:px-12">
        <Reveal>
          <div className="max-w-4xl">
            <p className="mb-5 text-sm font-medium uppercase tracking-[0.28em] text-white/70">
              What to do in Sri Lanka
            </p>

            <h1 className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl lg:text-8xl">
              Experiences
              <br />
              worth travelling for.
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">
              From wild coastlines and misty tea country to ancient cities
              and unforgettable wildlife encounters, discover the experiences
              that make Sri Lanka special.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#experiences"
                className="rounded-full bg-white px-6 py-3 text-sm font-medium text-stone-950 transition hover:bg-white/90"
              >
                Explore experiences
              </a>

              <Link
                href="/plan-my-trip"
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Plan my trip
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Experience Card                                                    */
/* ------------------------------------------------------------------ */

function ExperienceCard({
  experience,
}: {
  experience: Experience;
}) {
  return (
    <article className="group overflow-hidden rounded-[2rem] bg-stone-100">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[360px] overflow-hidden lg:min-h-[500px]">
          <img
            src={experience.image}
            alt={experience.title}
            className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          <div className="absolute bottom-6 left-6 right-6">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/80">
              {experience.eyebrow}
            </p>

            <h3 className="mt-2 text-4xl font-semibold text-white">
              {experience.title}
            </h3>
          </div>
        </div>

        <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
          <p className="text-lg leading-8 text-stone-600">
            {experience.description}
          </p>

          <div className="mt-8 border-t border-stone-300 pt-6">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-stone-500">
              Where to go
            </p>

            <p className="mt-2 text-sm font-medium text-stone-900">
              {experience.whereLabel}
            </p>
          </div>

          <div className="mt-8">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-stone-500">
              Suggested tours
            </p>

            <div className="mt-4 space-y-3">
              {experience.tours.map((tour) => (
                <Link
                  key={tour.href}
                  href={tour.href}
                  className="group/link flex items-center justify-between gap-4 rounded-2xl border border-stone-200 bg-white p-4 transition hover:border-stone-400"
                >
                  <div>
                    <p className="font-medium text-stone-900">
                      {tour.name}
                    </p>

                    <p className="mt-1 text-xs text-stone-500">
                      {tour.durationLabel}
                    </p>
                  </div>

                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-stone-100 text-lg transition group-hover/link:bg-stone-900 group-hover/link:text-white">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* Experiences                                                        */
/* ------------------------------------------------------------------ */

function Experiences() {
  return (
    <section
      id="experiences"
      className="bg-white px-6 py-20 sm:px-8 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-14 max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-stone-500">
              Discover your Sri Lanka
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl">
              Choose what you want
              <br />
              to experience.
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-7 text-stone-600">
              Every journey can be shaped around the places and experiences
              you care about most.
            </p>
          </div>
        </Reveal>

        <div className="space-y-8">
          {EXPERIENCES.map((experience, index) => (
            <Reveal key={experience.id} className={`delay-${index * 100}`}>
              <ExperienceCard experience={experience} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Activity Card                                                      */
/* ------------------------------------------------------------------ */

function ActivityCard({
  activity,
}: {
  activity: Activity;
}) {
  return (
    <Link
      href={activity.href}
      className="group block overflow-hidden rounded-[1.75rem] border border-stone-200 bg-white transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-[7/5] overflow-hidden">
        <img
          src={activity.image}
          alt={activity.title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <div className="absolute bottom-5 left-5">
          <h3 className="text-2xl font-semibold text-white">
            {activity.title}
          </h3>
        </div>
      </div>

      <div className="p-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-stone-500">
            Best places
          </p>

          <p className="mt-2 text-sm leading-6 text-stone-700">
            {activity.bestPlaces}
          </p>
        </div>

        <div className="mt-5 border-t border-stone-200 pt-5">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-stone-500">
            Best season
          </p>

          <p className="mt-2 text-sm leading-6 text-stone-700">
            {activity.season}
          </p>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-sm font-medium text-stone-950">
            Explore tours
          </span>

          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-100 transition group-hover:bg-stone-900 group-hover:text-white">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Activities                                                         */
/* ------------------------------------------------------------------ */

function Activities() {
  return (
    <section className="bg-stone-100 px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-12 max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-stone-500">
              Active Sri Lanka
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl">
              Add a little
              <br />
              adventure.
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-7 text-stone-600">
              Make your trip as active or relaxed as you like with experiences
              designed around Sri Lanka's landscapes and seasons.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ACTIVITIES.map((activity) => (
            <Reveal key={activity.id}>
              <ActivityCard activity={activity} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Service Card                                                       */
/* ------------------------------------------------------------------ */

function ServiceCard({
  title,
  description,
}: ServiceItem) {
  return (
    <div className="rounded-[1.5rem] border border-stone-200 bg-white p-6">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-950 text-sm text-white">
        ✓
      </div>

      <h3 className="mt-5 text-lg font-semibold text-stone-950">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-stone-600">
        {description}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Travel Services                                                    */
/* ------------------------------------------------------------------ */

function TravelServices() {
  return (
    <section className="bg-white px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-stone-500">
                Travel services
              </p>

              <h2 className="mt-4 text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl">
                We take care
                <br />
                of the details.
              </h2>

              <p className="mt-6 max-w-lg text-base leading-7 text-stone-600">
                From the moment you land to the moment you leave, our team
                takes care of the practical details so you can focus on
                enjoying Sri Lanka.
              </p>

              <Link
                href="/plan-my-trip"
                className="mt-8 inline-flex rounded-full bg-stone-950 px-6 py-3 text-sm font-medium text-white transition hover:bg-stone-800"
              >
                Plan my trip →
              </Link>
            </div>

            <div className="space-y-12">
              <div>
                <h3 className="text-2xl font-semibold text-stone-950">
                  Accommodation
                </h3>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {ACCOMMODATION_ITEMS.map((item) => (
                    <ServiceCard
                      key={item.title}
                      title={item.title}
                      description={item.description}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-stone-950">
                  Getting around
                </h3>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {TRANSPORT_ITEMS.map((item) => (
                    <ServiceCard
                      key={item.title}
                      title={item.title}
                      description={item.description}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                               */
/* ------------------------------------------------------------------ */

export default function ActivitiesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Intro />
      <Experiences />
      <Activities />
      <TravelServices />
    </main>
  );
}