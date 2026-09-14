"use client";

import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";

/* ================================================================== */
/*  DATA                                                              */
/* ================================================================== */

const features = [
  {
    title: "Private Transport",
    description:
      "Travel comfortably with private vehicles and experienced local drivers, giving you the freedom to explore Sri Lanka at your own pace.",
    icon: "globe",
  },
  {
    title: "Diverse Destinations",
    description:
      "From golden beaches and misty mountains to ancient cities and wildlife parks, discover the many sides of Sri Lanka.",
    icon: "check",
  },
  {
    title: "Great Hotels",
    description:
      "Stay at carefully selected hotels and resorts that combine comfort, character, and convenient locations.",
    icon: "building",
  },
  {
    title: "Fast Booking",
    description:
      "Plan your journey with ease. Our team makes booking your Sri Lankan adventure simple, quick, and hassle-free.",
    icon: "ticket",
  },
] as const;

const stats = [
  {
    value: "20",
    label: "Years Experience",
    size: "sm",
    offset: "down",
  },
  {
    value: "97%",
    label: "Retention Rate",
    size: "lg",
    offset: "up",
  },
  {
    value: "8k",
    label: "Tour Completed",
    size: "sm",
    offset: "down",
  },
  {
    value: "19k",
    label: "Happy Travellers",
    size: "lg",
    offset: "up",
  },
] as const;

/* ================================================================== */
/*  REVEAL                                                            */
/* ================================================================== */

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) return;

    const prefersReducedMotion = window
      .matchMedia("(prefers-reduced-motion: reduce)")
      .matches;

    if (prefersReducedMotion) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -60px 0px",
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out will-change-transform ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-8 opacity-0"
      } ${className}`}
      style={{
        transitionDelay: visible ? `${delay}ms` : "0ms",
      }}
    >
      {children}
    </div>
  );
}

/* ================================================================== */
/*  HERO                                                              */
/* ================================================================== */

function Hero() {
  return (
    <section className="relative flex min-h-[560px] items-end overflow-hidden bg-stone-900 pb-16 pt-4">
      <div
        className="absolute inset-0 scale-105 bg-cover bg-center animate-hero-zoom"
        style={{
          backgroundImage:
            "url('https://picsum.photos/seed/achii-story-hero/1800/1000')",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-stone-950/55 via-stone-950/35 to-stone-950/70" />

      <div className="relative z-10 mx-auto w-full max-w-3xl px-5 text-center sm:px-8">
        <h1 className="animate-fade-up font-serif text-4xl font-semibold text-white sm:text-5xl md:text-6xl [animation-delay:120ms]">
          The Story About Us
        </h1>

        <p className="animate-fade-up mx-auto mt-5 max-w-xl text-sm text-white/85 sm:text-base [animation-delay:300ms]">
          Discover the beauty, culture, and unforgettable
          experiences of Sri Lanka with a team that knows
          the island from coast to coast.
        </p>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  FEATURE ICONS                                                     */
/* ================================================================== */

const FEATURE_ICONS: Record<string, ReactElement> = {
  globe: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="8.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />

      <path
        d="M4 12h16M12 3.5c2.4 2.4 3.6 5.4 3.6 8.5s-1.2 6.1-3.6 8.5c-2.4-2.4-3.6-5.4-3.6-8.5S9.6 5.9 12 3.5z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  ),

  check: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path
        d="M12 3l7 3v5c0 4.6-3 8.3-7 9.5-4-1.2-7-4.9-7-9.5V6l7-3z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />

      <path
        d="M9 12l2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

  building: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <rect
        x="5"
        y="3.5"
        width="9"
        height="17"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.6"
      />

      <path
        d="M14 9h4.5A1.5 1.5 0 0120 10.5V20a.5.5 0 01-.5.5H14"
        stroke="currentColor"
        strokeWidth="1.6"
      />

      <path
        d="M8 7.5h1M8 11h1M8 14.5h1"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  ),

  ticket: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path
        d="M4 9a2 2 0 002 2v2a2 2 0 00-2 2v0a2 2 0 002 2h12a2 2 0 002-2v0a2 2 0 00-2-2v-2a2 2 0 002-2v0a2 2 0 00-2-2H6a2 2 0 00-2 2z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      <path
        d="M14 8v9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="2 2"
      />
    </svg>
  ),
};

/* ================================================================== */
/*  FEATURES                                                          */
/* ================================================================== */

function Features() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, i) => (
          <Reveal
            key={feature.title}
            delay={i * 90}
          >
            <div className="flex flex-col items-center text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400 text-stone-900 transition-transform duration-300 hover:-translate-y-1 hover:rotate-3">
                {FEATURE_ICONS[feature.icon]}
              </span>

              <h3 className="mt-4 text-base font-semibold text-stone-900">
                {feature.title}
              </h3>

              <p className="mt-2 max-w-[220px] text-sm leading-relaxed text-stone-500">
                {feature.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ================================================================== */
/*  STATS                                                             */
/* ================================================================== */

function Stats() {
  const sizeClasses: Record<string, string> = {
    sm: "h-40 w-40 text-3xl sm:h-48 sm:w-48 sm:text-4xl",
    lg: "h-52 w-52 text-4xl sm:h-60 sm:w-60 sm:text-5xl",
  };

  const offsetClasses: Record<string, string> = {
    up: "sm:-translate-y-6",
    down: "sm:translate-y-6",
  };

  return (
    <section className="mx-auto max-w-6xl px-5 pb-24 pt-4 sm:px-8">
      <Reveal>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:flex-nowrap sm:gap-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`relative flex shrink-0 items-center justify-center rounded-full border border-amber-300 bg-amber-100 transition-transform duration-300 hover:-translate-y-1 ${
                sizeClasses[stat.size]
              } ${offsetClasses[stat.offset]}`}
              style={{
                transitionDelay: `${i * 60}ms`,
              }}
            >
              <span className="absolute -top-1 right-6 text-amber-400">
                <SparkleIcon />
              </span>

              <div className="text-center">
                <p className="font-serif font-semibold text-stone-900">
                  {stat.value}
                </p>

                <p className="mt-1 text-xs font-medium text-stone-600 sm:text-sm">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ================================================================== */
/*  HUMBLE BEGINNINGS                                                 */
/* ================================================================== */

function HumbleBeginnings() {
  return (
    <section className="bg-stone-50 py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src="https://picsum.photos/seed/achii-story-hiking/900/700"
                alt="Two travellers hiking together through the highlands"
                className="h-72 w-full object-cover sm:h-96"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />

              <div className="absolute bottom-5 left-6">
                <p className="font-serif text-lg italic text-amber-300">
                  Hiking
                </p>

                <p className="font-serif text-2xl font-semibold text-white">
                  With Your Friends
                </p>
              </div>
            </div>

            <div>
              <h2 className="font-serif text-3xl font-semibold text-stone-900 sm:text-4xl">
                Humble
                <br />
                Beginnings
              </h2>

              <p className="mt-5 max-w-md text-stone-500">
                What started with a passion for sharing Sri
                Lanka has grown into a trusted travel
                experience built around local knowledge and
                genuine hospitality. We believe the best
                journeys are personal, meaningful, and filled
                with moments you will remember long after you
                return home.
              </p>

              <a
                href="https://wa.me/94770000000"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-400 hover:shadow-lg"
              >
                <ChatIcon />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  ICONS                                                             */
/* ================================================================== */

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-3.5 w-3.5"
      aria-hidden="true"
    >
      <path
        d="M6.5 4h2.7l1.2 4-1.9 1.5a11 11 0 005.9 5.9l1.5-1.9 4 1.2v2.7c0 .8-.7 1.5-1.6 1.4C11.2 18.3 5.7 12.8 5.1 5.6 5 4.7 5.7 4 6.5 4z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-3.5 w-3.5"
      aria-hidden="true"
    >
      <rect
        x="3.5"
        y="5.5"
        width="17"
        height="13"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.4"
      />

      <path
        d="M4.5 6.5l7.5 6 7.5-6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path
        d="M4 12a8 8 0 1114.5 4.6L20 20l-3.6-1.3A8 8 0 014 12z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" />
    </svg>
  );
}

/* ================================================================== */
/*  PAGE                                                              */
/* ================================================================== */

export default function OurStoryPage() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />

      <Features />

      <Stats />

      <HumbleBeginnings />
    </main>
  );
}