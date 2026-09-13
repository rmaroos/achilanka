"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactElement, type ReactNode } from "react";

/* ================================================================== */
/*  DATA — swap placeholders for approved content before launch.      */
/* ================================================================== */

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Where to Go", href: "/explore" },
  { label: "What to Do", href: "/activities" },
  { label: "Reach Us", href: "/contact" },
  { label: "Our Story", href: "/about" },
];

const features = [
  {
    title: "Private Transport",
    description: "Travel comfortably with private vehicles and experienced local drivers, giving you the freedom to explore Sri Lanka at your own pace.",
    icon: "globe",
  },
  {
    title: "Diverse Destinations",
    description: "From golden beaches and misty mountains to ancient cities and wildlife parks, discover the many sides of Sri Lanka.",
    icon: "check",
  },
  {
    title: "Great Hotels",
    description: "Stay at carefully selected hotels and resorts that combine comfort, character, and convenient locations.",
    icon: "building",
  },
  {
    title: "Fast Booking",
    description: "Plan your journey with ease. Our team makes booking your Sri Lankan adventure simple, quick, and hassle-free.",
    icon: "ticket",
  },
] as const;

const stats = [
  { value: "20", label: "Years Experience", size: "sm", offset: "down" },
  { value: "97%", label: "Retention Rate", size: "lg", offset: "up" },
  { value: "8k", label: "Tour Completed", size: "sm", offset: "down" },
  { value: "19k", label: "Happy Travellers", size: "lg", offset: "up" },
] as const;

const footerColumns = [
  { title: "Tours", items: ["All Tours", "Day Tours", "Round Tours"] },
  { title: "Navigation", items: ["Home", "Where to Go", "What to Do", "Reach Us", "Our Story"] },
  { title: "Explore", items: ["Beaches", "Hill Country", "Wildlife", "Heritage & Culture", "Tea Trails"] },
];

const contactDetails = [
  { icon: "phone", text: "1-677-124-44227" },
  { icon: "pin", text: "Eighth Avenue 487, New York" },
  { icon: "mail", text: "info@achiilanka.com" },
];

/* ================================================================== */
/*  REVEAL — fades/lifts a section into view the first time it's      */
/*  scrolled into the viewport. Respects prefers-reduced-motion.      */
/* ================================================================== */

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out will-change-transform ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

/* ================================================================== */
/*  TOP UTILITY BAR                                                    */
/* ================================================================== */

function TopBar() {
  return (
    <div className="relative z-50 bg-stone-950 px-5 py-2 text-[11px] text-white/70 sm:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="hidden items-center gap-4 sm:flex">
          <span className="font-medium tracking-wide text-white/50">FOLLOW US:</span>
          <a href="#" aria-label="Instagram" className="transition-colors hover:text-amber-400">
            <InstagramIcon />
          </a>
          <a href="#" aria-label="Facebook" className="transition-colors hover:text-amber-400">
            <FacebookIcon />
          </a>
        </div>

        <div className="flex flex-1 items-center justify-center gap-5 sm:flex-none">
          <a href="tel:16771244227" className="flex items-center gap-1.5 transition-colors hover:text-amber-400">
            <PhoneIcon /> 1-677-124-44227
          </a>
          <a href="mailto:info@achiilanka.com" className="hidden items-center gap-1.5 transition-colors hover:text-amber-400 sm:flex">
            <MailIcon /> info@achiilanka.com
          </a>
        </div>

        <div className="hidden items-center gap-4 sm:flex">
          <button type="button" className="flex items-center gap-1 transition-colors hover:text-amber-400">
            <GlobeIcon /> English <ChevronIcon />
          </button>
          <button type="button" className="flex items-center gap-1 transition-colors hover:text-amber-400">
            USD <ChevronIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  NAVBAR — floating rounded pill over the hero                      */
/* ================================================================== */

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute inset-x-0 top-0 z-40 mx-auto w-full max-w-4xl px-5 pt-5 sm:px-8">
      <nav className="flex items-center justify-between gap-4 rounded-full bg-white/95 px-5 py-3 shadow-lg backdrop-blur">
        <Link href="/" className="shrink-0 font-serif text-lg font-semibold text-stone-900">
          Achii Lanka <span className="font-sans font-normal text-stone-500">Tours</span>
        </Link>

        <ul className="hidden items-center gap-6 text-sm font-medium text-stone-600 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`relative py-1 transition-colors hover:text-stone-900 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-amber-500 after:transition-transform after:duration-300 hover:after:scale-x-100 ${
                  link.label === "Our Story" ? "font-semibold text-stone-900" : ""
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/plan-my-trip"
          className="hidden shrink-0 items-center gap-1.5 rounded-full bg-amber-400 px-5 py-2.5 text-sm font-semibold text-stone-900 transition-all duration-200 hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-md md:inline-flex"
        >
          Plan My Trip
          <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </Link>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 text-stone-900 md:hidden"
        >
          <span className={`h-0.5 w-5 bg-current transition-transform duration-300 ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-5 bg-current transition-opacity duration-300 ${open ? "opacity-0" : "opacity-100"}`} />
          <span className={`h-0.5 w-5 bg-current transition-transform duration-300 ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </nav>

      <div className={`overflow-hidden rounded-2xl bg-white shadow-lg transition-[max-height] duration-300 ease-in-out md:hidden ${open ? "mt-2 max-h-80" : "max-h-0"}`}>
        <ul className="flex flex-col gap-1 p-3 text-stone-800">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-amber-50">
                {link.label}
              </Link>
            </li>
          ))}
          <li className="pt-1">
            <Link href="/plan-my-trip" onClick={() => setOpen(false)} className="block rounded-full bg-amber-400 px-4 py-2.5 text-center text-sm font-semibold text-stone-900">
              Plan My Trip
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  HERO                                                               */
/* ================================================================== */

function Hero() {
  return (
    <section className="relative flex min-h-[560px] items-end overflow-hidden bg-stone-900 pb-16 pt-4">
      <div
        className="absolute inset-0 scale-105 bg-cover bg-center animate-hero-zoom"
        style={{ backgroundImage: "url('https://picsum.photos/seed/achii-story-hero/1800/1000')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950/55 via-stone-950/35 to-stone-950/70" />

      <Navbar />

      <div className="relative z-10 mx-auto w-full max-w-3xl px-5 text-center sm:px-8">
        <h1 className="animate-fade-up font-serif text-4xl font-semibold text-white sm:text-5xl md:text-6xl [animation-delay:120ms]">
          The Story About Us
        </h1>
        <p className="animate-fade-up mx-auto mt-5 max-w-xl text-sm text-white/85 sm:text-base [animation-delay:300ms]">
          Discover the beauty, culture, and unforgettable experiences of Sri
          Lanka with a team that knows the island from coast to coast.
        </p>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  FEATURES                                                           */
/* ================================================================== */

const FEATURE_ICONS: Record<string, ReactElement> = {
  globe: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 12h16M12 3.5c2.4 2.4 3.6 5.4 3.6 8.5s-1.2 6.1-3.6 8.5c-2.4-2.4-3.6-5.4-3.6-8.5S9.6 5.9 12 3.5z" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <path d="M12 3l7 3v5c0 4.6-3 8.3-7 9.5-4-1.2-7-4.9-7-9.5V6l7-3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  building: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <rect x="5" y="3.5" width="9" height="17" rx="1" stroke="currentColor" strokeWidth="1.6" />
      <path d="M14 9h4.5A1.5 1.5 0 0120 10.5V20a.5.5 0 01-.5.5H14" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 7.5h1M8 11h1M8 14.5h1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  ticket: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <path d="M4 9a2 2 0 002 2v2a2 2 0 00-2 2v0a2 2 0 002 2h12a2 2 0 002-2v0a2 2 0 00-2-2v-2a2 2 0 002-2v0a2 2 0 00-2-2H6a2 2 0 00-2 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M14 8v9" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
    </svg>
  ),
};

function Features() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, i) => (
          <Reveal key={feature.title} delay={i * 90}>
            <div className="flex flex-col items-center text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400 text-stone-900 transition-transform duration-300 hover:-translate-y-1 hover:rotate-3">
                {FEATURE_ICONS[feature.icon]}
              </span>
              <h3 className="mt-4 text-base font-semibold text-stone-900">{feature.title}</h3>
              <p className="mt-2 max-w-[220px] text-sm leading-relaxed text-stone-500">{feature.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ================================================================== */
/*  STATS — staggered circles                                          */
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
              className={`relative flex shrink-0 items-center justify-center rounded-full border border-amber-300 bg-amber-100 transition-transform duration-300 hover:-translate-y-1 ${sizeClasses[stat.size]} ${offsetClasses[stat.offset]}`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <span className="absolute -top-1 right-6 text-amber-400">
                <SparkleIcon />
              </span>
              <div className="text-center">
                <p className="font-serif font-semibold text-stone-900">{stat.value}</p>
                <p className="mt-1 text-xs font-medium text-stone-600 sm:text-sm">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ================================================================== */
/*  HUMBLE BEGINNINGS                                                  */
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
                <p className="font-serif text-lg italic text-amber-300">Hiking</p>
                <p className="font-serif text-2xl font-semibold text-white">With Your Friends</p>
              </div>
            </div>

            <div>
              <h2 className="font-serif text-3xl font-semibold text-stone-900 sm:text-4xl">
                Humble
                <br />
                Beginnings
              </h2>
              <p className="mt-5 max-w-md text-stone-500">
                What started with a passion for sharing Sri Lanka has grown
                into a trusted travel experience built around local
                knowledge and genuine hospitality. We believe the best
                journeys are personal, meaningful, and filled with moments
                you will remember long after you return home.
              </p>

              <a
                href="https://wa.me/94770000000"
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
/*  FOOTER                                                             */
/* ================================================================== */

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-stone-100 pt-16 text-stone-600">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-2 gap-10 pb-12 sm:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2 sm:col-span-3 lg:col-span-2">
            <p className="font-serif text-lg font-semibold text-stone-900">Achii Lanka Tours</p>
            <p className="mt-3 max-w-xs text-sm text-stone-500">
              A Sri Lankan tour operator based in Colombo. We run our own
              tours, with our own drivers and guides so the people you book
              with are the people who look after you here.
            </p>
            <Link
              href="/plan-my-trip"
              className="mt-5 inline-block rounded-full bg-amber-400 px-5 py-2.5 text-sm font-semibold text-stone-900 transition-all duration-200 hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-md"
            >
              Plan My Trip
            </Link>
            <p className="mt-6 text-xs text-stone-400">© 2026 Achii Lanka — All rights reserved.</p>
          </div>

          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-stone-900">{col.title}</h4>
              <ul className="mt-4 space-y-2.5 text-sm text-stone-500">
                {col.items.map((item) => (
                  <li key={item}>
                    <a href="#" className="transition-colors duration-200 hover:text-amber-500">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-sm font-semibold text-stone-900">Contact us</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-stone-500">
              {contactDetails.map((detail) => (
                <li key={detail.text} className="flex items-center gap-2">
                  <span className="text-amber-500">
                    {detail.icon === "phone" && <PhoneIcon />}
                    {detail.icon === "pin" && <PinIcon />}
                    {detail.icon === "mail" && <MailIcon />}
                  </span>
                  {detail.text}
                </li>
              ))}
            </ul>
            <h4 className="mt-5 text-sm font-semibold text-stone-900">Social Media Links</h4>
            <div className="mt-3 flex gap-2.5">
              {["Facebook", "Instagram", "TikTok"].map((label) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-400 text-[11px] font-semibold text-stone-900 transition-colors duration-200 hover:bg-stone-900 hover:text-white"
                >
                  {label[0]}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative mt-4 h-64 w-full overflow-hidden sm:h-80">
        <img
          src="https://picsum.photos/seed/achii-footer-mountains/1800/500"
          alt="Sri Lankan hills at sunset"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-100 via-stone-950/10 to-transparent" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 select-none text-center text-[22vw] font-bold leading-none text-white/80 mix-blend-overlay">
          Achii
        </div>
      </div>
    </footer>
  );
}

/* ================================================================== */
/*  ICONS                                                              */
/* ================================================================== */

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17" cy="7" r="1" fill="currentColor" />
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.25-1.5 1.55-1.5H16.7V3.7c-.28-.04-1.24-.12-2.36-.12-2.33 0-3.93 1.42-3.93 4.03V10H8v3.1h2.4V21h3.1z" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
      <path d="M6.5 4h2.7l1.2 4-1.9 1.5a11 11 0 005.9 5.9l1.5-1.9 4 1.2v2.7c0 .8-.7 1.5-1.6 1.4C11.2 18.3 5.7 12.8 5.1 5.6 5 4.7 5.7 4 6.5 4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4.5 6.5l7.5 6 7.5-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3.5 12h17M12 3.5c2.2 2.3 3.4 5.3 3.4 8.5s-1.2 6.2-3.4 8.5c-2.2-2.3-3.4-5.3-3.4-8.5S9.8 5.8 12 3.5z" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3">
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
      <path d="M12 21s7-6.4 7-11.5A7 7 0 105 9.5C5 14.6 12 21 12 21z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <circle cx="12" cy="9.5" r="2.2" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <path d="M4 12a8 8 0 1114.5 4.6L20 20l-3.6-1.3A8 8 0 014 12z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
function SparkleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" />
    </svg>
  );
}

/* ================================================================== */
/*  PAGE                                                               */
/* ================================================================== */

export default function OurStoryPage() {
  return (
    <>
      <TopBar />
      <Hero />
      <Features />
      <Stats />
      <HumbleBeginnings />
      <Footer />
    </>
  );
}