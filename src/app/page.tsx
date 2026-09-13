"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactElement, type ReactNode } from "react";

/* ================================================================== */
/*  DATA — swap these placeholders for business-approved content      */
/*  before launch (see FRD FR-02, FR-03, FR-09).                      */
/* ================================================================== */

type ImageCard = { title: string; subtitle?: string; image: string; href: string };

const destinationHighlights: ImageCard[] = [
  { title: "Beaches", subtitle: "Golden coastlines & lagoons", image: "https://picsum.photos/seed/achii-beaches/900/1100", href: "/explore/beaches" },
  { title: "Hill Country", subtitle: "Tea estates & misty peaks", image: "https://picsum.photos/seed/achii-hillcountry/700/520", href: "/explore/hill-country" },
  { title: "Wildlife", subtitle: "Leopards, elephants & birds", image: "https://picsum.photos/seed/achii-wildlife/700/520", href: "/explore/wildlife" },
  { title: "Heritage & Culture", subtitle: "Ancient cities & temples", image: "https://picsum.photos/seed/achii-heritage/700/460", href: "/explore/heritage-culture" },
  { title: "Tea Trails", subtitle: "Rolling green plantations", image: "https://picsum.photos/seed/achii-teatrails/700/460", href: "/explore/tea-trails" },
];

type TourCard = {
  id: string; name: string; rating: number; reviewCount: number; source: string;
  days: number; nights: number; route: string; privateTour: boolean; fromPrice: number;
  image: string; href: string;
};

const readyMadeTours: TourCard[] = [
  { id: "classic-sri-lanka", name: "Classic Sri Lanka", rating: 4.9, reviewCount: 124, source: "Tripadvisor", days: 8, nights: 7, route: "Negombo - Kandy - Ella - Galle", privateTour: true, fromPrice: 1290, image: "https://picsum.photos/seed/achii-tour-classic/900/560", href: "/tours/classic-sri-lanka" },
  { id: "wildlife-beaches", name: "Wildlife & Beaches", rating: 4.8, reviewCount: 96, source: "Tripadvisor", days: 6, nights: 5, route: "Yala - Mirissa - Colombo", privateTour: true, fromPrice: 980, image: "https://picsum.photos/seed/achii-tour-wildlife/900/560", href: "/tours/wildlife-beaches" },
  { id: "tea-trails-hill-country", name: "Tea Trails & Hill Country", rating: 4.9, reviewCount: 158, source: "Tripadvisor", days: 5, nights: 4, route: "Nuwara Eliya - Ella - Haputale", privateTour: true, fromPrice: 720, image: "https://picsum.photos/seed/achii-tour-teatrails/1400/560", href: "/tours/tea-trails-hill-country" },
];

const exploreSriLanka: ImageCard[] = [
  { title: "Beaches & Coastal", image: "https://picsum.photos/seed/achii-explore-beaches/700/900", href: "/explore/beaches-coastal" },
  { title: "Hill Country & Tea Trails", image: "https://picsum.photos/seed/achii-explore-hills/700/430", href: "/explore/hill-country-tea-trails" },
  { title: "Cultural Triangle", image: "https://picsum.photos/seed/achii-explore-culture/700/430", href: "/explore/cultural-triangle" },
  { title: "Wildlife & Safaris", image: "https://picsum.photos/seed/achii-explore-wildlife/700/900", href: "/explore/wildlife-safaris" },
];

const adventureActivities: ImageCard[] = [
  { title: "Surfing", image: "https://picsum.photos/seed/achii-activity-surf/700/900", href: "/activities/surfing" },
  { title: "Diving", image: "https://picsum.photos/seed/achii-activity-diving/700/430", href: "/activities/diving" },
  { title: "Bird Watching", image: "https://picsum.photos/seed/achii-activity-birds/700/430", href: "/activities/bird-watching" },
  { title: "Hiking", image: "https://picsum.photos/seed/achii-activity-hiking/700/900", href: "/activities/hiking" },
];

const whyTravelWithUs = [
  { title: "Local Experts", description: "We live and work here, giving you the first insider knowledge.", icon: "compass" },
  { title: "Personalized Trips", description: "Every itinerary is tailored to match your pace and interests.", icon: "route" },
  { title: "Fair Pricing", description: "No hidden fees. We work directly with local partners to keep costs honest.", icon: "tag" },
  { title: "24/7 Support", description: "We're with you every step of the way, throughout your journey.", icon: "headset" },
] as const;

const galleryFilters = ["All", "Travel Moments We've Shared", "Travellers' Clicks"] as const;

const galleryImages = Array.from({ length: 12 }).map((_, i) => ({
  image: `https://picsum.photos/seed/achii-gallery-${i}/500/500`,
  alt: "Traveller moment in Sri Lanka",
}));

type BlogPost = { title: string; excerpt: string; image: string; href: string };

const blogPosts: BlogPost[] = [
  { title: "Sri Lanka Travel Guide: Plan Your Journey with Ease", excerpt: "Everything to know before you go — from visas to the best time to visit each region.", image: "https://picsum.photos/seed/achii-blog-guide/700/460", href: "/blog/sri-lanka-travel-guide" },
  { title: "The Perfect Sri Lanka Trip: Where Should You Go?", excerpt: "Beaches, tea country or wildlife — a route planner for first-time visitors.", image: "https://picsum.photos/seed/achii-blog-perfect-trip/700/460", href: "/blog/perfect-sri-lanka-trip" },
  { title: "Discover the Hidden Side of Sri Lanka", excerpt: "Beyond the postcard spots: quiet villages, local food and slower travel days.", image: "https://picsum.photos/seed/achii-blog-hidden/700/460", href: "/blog/hidden-side-of-sri-lanka" },
];

type Testimonial = { name: string; location: string; quote: string; rating: number; avatar: string };

const testimonials: Testimonial[] = [
  { name: "Anita R.", location: "Heritage & Culture Tour", quote: "Our guide knew every backroad and story. It felt like travelling with a friend, not a company.", rating: 5, avatar: "https://i.pravatar.cc/80?img=47" },
  { name: "Jason V.", location: "Wildlife & Beaches Tour", quote: "Every hotel, driver and stop was arranged before we even landed. Genuinely no stress.", rating: 5, avatar: "https://i.pravatar.cc/80?img=12" },
  { name: "Mary Higgins", location: "Classic Sri Lanka Tour", quote: "We asked for a slower pace with our kids and they rebuilt the whole itinerary around it.", rating: 5, avatar: "https://i.pravatar.cc/80?img=32" },
];

const footerLinks = {
  tours: ["All Tours", "Day Tours", "Round Tours"],
  navigate: ["Home", "About Us", "Activities", "Plan My Trip"],
  explore: ["Beaches", "Hill Country", "Wildlife", "Heritage & Culture"],
  contact: ["+94 77 XXX XXXX", "hello@achiilankatours.com", "WhatsApp Us"],
};

/* ================================================================== */
/*  REVEAL — fades/lifts content into view the first time it's        */
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
/*  NAVBAR                                                             */
/* ================================================================== */

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Tours", href: "/tours" },
  { label: "Explore", href: "/explore" },
  { label: "Activities", href: "/activities" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`absolute inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? "bg-white/95 backdrop-blur shadow-sm" : "bg-transparent"}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className={`text-lg font-semibold tracking-tight transition-colors ${scrolled ? "text-stone-900" : "text-white"}`}>
          Achii Lanka Tours
        </Link>

        <ul className={`hidden items-center gap-8 text-sm font-medium md:flex ${scrolled ? "text-stone-700" : "text-white/90"}`}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="relative py-1 transition-colors hover:text-amber-500 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-amber-500 after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Link href="/plan-my-trip" className="rounded-full bg-amber-400 px-5 py-2.5 text-sm font-semibold text-stone-900 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-md">
            Plan My Trip
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={`flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden ${scrolled ? "text-stone-900" : "text-white"}`}
        >
          <span className={`h-0.5 w-6 bg-current transition-transform duration-300 ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-6 bg-current transition-opacity duration-300 ${open ? "opacity-0" : "opacity-100"}`} />
          <span className={`h-0.5 w-6 bg-current transition-transform duration-300 ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </nav>

      <div className={`overflow-hidden bg-white shadow-lg transition-[max-height] duration-300 ease-in-out md:hidden ${open ? "max-h-96" : "max-h-0"}`}>
        <ul className="flex flex-col gap-1 px-5 py-4 text-stone-800">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-amber-50">
                {link.label}
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <Link href="/plan-my-trip" onClick={() => setOpen(false)} className="block rounded-full bg-amber-400 px-4 py-2.5 text-center text-sm font-semibold text-stone-900">
              Plan My Trip
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

/* ================================================================== */
/*  HERO                                                               */
/* ================================================================== */

function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-stone-900">
      <div className="absolute inset-0 scale-105 bg-cover bg-center animate-hero-zoom" style={{ backgroundImage: "url('https://picsum.photos/seed/achii-hero/1800/1200')" }} />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-900/45 to-stone-900/20" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 pt-32 sm:px-8">
        <div className="max-w-2xl">
          <h1 className="animate-fade-up text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl [animation-delay:100ms]">
            Planned properly by the people who live here.
          </h1>
          <p className="animate-fade-up mt-5 max-w-xl text-base text-white/85 sm:text-lg [animation-delay:280ms]">
            Ready-made tours and day trips through Sri Lanka&apos;s highlights. Or customise your own independent route, hotels, guides and transport.
          </p>
          <div className="animate-fade-up mt-9 [animation-delay:440ms]">
            <HeroSearchBar />
          </div>
        </div>
      </div>

      <div className="animate-fade-in absolute right-6 top-24 z-10 hidden [animation-delay:700ms] sm:block md:right-12">
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-2 border-amber-300/80 bg-stone-900/40 text-center text-[10px] font-semibold uppercase leading-tight text-amber-200 shadow-lg backdrop-blur animate-spin-slow">
          Sri Lanka
          <br />
          Specialists
          <br />
          2024
        </div>
      </div>
    </section>
  );
}

function HeroSearchBar() {
  return (
    <form className="flex w-full max-w-xl flex-col gap-3 rounded-2xl bg-white/95 p-3 shadow-xl backdrop-blur sm:flex-row sm:items-center sm:gap-2 sm:rounded-full">
      <label className="flex-1 px-3 py-1.5">
        <span className="block text-[11px] font-medium uppercase tracking-wide text-stone-400">Destination</span>
        <input type="text" placeholder="Where do you want to go?" className="w-full border-0 bg-transparent p-0 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-0" />
      </label>
      <span className="hidden h-8 w-px bg-stone-200 sm:block" />
      <label className="flex-1 px-3 py-1.5">
        <span className="block text-[11px] font-medium uppercase tracking-wide text-stone-400">Travel Dates</span>
        <input type="text" placeholder="Add dates" className="w-full border-0 bg-transparent p-0 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-0" />
      </label>
      <button type="submit" className="w-full shrink-0 rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-stone-900 transition-all duration-200 hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-lg sm:w-auto">
        Search Trips
      </button>
    </form>
  );
}

/* ================================================================== */
/*  DESTINATION HIGHLIGHTS — "Start with the Sri Lanka you came for"  */
/* ================================================================== */

function DestinationHighlights() {
  const [beaches, hillCountry, wildlife, heritage, teaTrails] = destinationHighlights;

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <Reveal>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-stone-900 sm:text-4xl">
              Start with the Sri Lanka
              <br />
              you came for
            </h2>
            <p className="mt-3 max-w-md text-stone-500">
              Most travellers know the feeling that sent them here in the first place. Pick it instead and we&apos;ll shape the tour around it.
            </p>
          </div>
          <Link href="/explore" className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-stone-900">
            See all experiences &amp; activities
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </Reveal>

      <Reveal delay={120}>
        <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:grid-rows-2">
          <DestinationCard item={beaches} className="sm:row-span-2 sm:min-h-[440px]" />
          <DestinationCard item={hillCountry} className="sm:min-h-[210px]" />
          <DestinationCard item={wildlife} className="sm:min-h-[210px]" />
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <DestinationCard item={heritage} className="min-h-[170px]" />
          <DestinationCard item={teaTrails} className="min-h-[170px]" />
        </div>
      </Reveal>
    </section>
  );
}

function DestinationCard({ item, className = "" }: { item: ImageCard; className?: string }) {
  return (
    <Link href={item.href} className={`group relative block overflow-hidden rounded-2xl bg-stone-200 ${className}`}>
      <img src={item.image} alt={item.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/10 to-transparent" />
      <div className="relative flex h-full flex-col justify-end p-5">
        <h3 className="text-lg font-semibold text-white">{item.title}</h3>
        {item.subtitle && <p className="mt-1 text-xs text-white/80">{item.subtitle}</p>}
      </div>
    </Link>
  );
}

/* ================================================================== */
/*  READY-MADE TOURS                                                   */
/* ================================================================== */

function ToursSection() {
  const [first, second, third] = readyMadeTours;

  return (
    <section className="bg-stone-50 py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-semibold text-stone-900 sm:text-4xl">
                Ready-made tours you
                <br />
                can book today
              </h2>
              <p className="mt-3 max-w-md text-stone-500">
                Fixed itineraries, fixed prices, no hidden extras. Pick your start date and travellers, and the rest is arranged.
              </p>
            </div>
            <Link href="/tours" className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-stone-900">
              All 9 tours
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-9 grid grid-cols-1 gap-5 md:grid-cols-2">
            <TourItem tour={first} imageClassName="h-56" />
            <TourItem tour={second} imageClassName="h-56" />
          </div>
          <div className="mt-5">
            <TourItem tour={third} imageClassName="h-56" horizontal />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TourItem({ tour, imageClassName = "", horizontal = false }: { tour: TourCard; imageClassName?: string; horizontal?: boolean }) {
  return (
    <article className={`group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-100 transition-shadow duration-300 hover:shadow-lg ${horizontal ? "md:flex md:items-stretch" : ""}`}>
      <div className={`relative overflow-hidden ${imageClassName} ${horizontal ? "md:w-2/5" : "w-full"}`}>
        <img src={tour.image} alt={tour.name} className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
        {tour.privateTour && <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-stone-700">Private tour</span>}
      </div>

      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-stone-500">
            <StarIcon />
            <span className="font-semibold text-stone-800">{tour.rating}</span>
            <span>({tour.reviewCount} reviews · {tour.source})</span>
          </div>
          <h3 className="mt-2 text-lg font-semibold text-stone-900">{tour.name}</h3>
          <p className="mt-1 text-sm text-stone-500">{tour.days} days · {tour.nights} nights</p>
          <p className="text-sm text-stone-500">{tour.route}</p>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <div>
            <span className="text-xs text-stone-400">From</span>
            <p className="text-xl font-semibold text-stone-900">${tour.fromPrice.toLocaleString()}</p>
          </div>
          <Link href={tour.href} className="rounded-full bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-amber-400 hover:text-stone-900">
            Plan Trip
          </Link>
        </div>
      </div>
    </article>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 text-amber-400">
      <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1 1 5.8L10 14.9l-5.21 2.62 1-5.8-4.21-4.1 5.82-.85L10 1.5z" />
    </svg>
  );
}

/* ================================================================== */
/*  CATEGORY SHOWCASE — reused for Explore Sri Lanka + Activities     */
/* ================================================================== */

function CategoryShowcase({
  title, description, items, className = "",
}: { title: string; description: string; items: [ImageCard, ImageCard, ImageCard, ImageCard]; className?: string }) {
  const [left, topMiddle, bottomMiddle, right] = items;

  return (
    <section className={`mx-auto max-w-7xl px-5 py-20 sm:px-8 ${className}`}>
      <Reveal>
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-semibold text-stone-900 sm:text-4xl">{title}</h2>
          <p className="mt-3 text-stone-500">{description}</p>
        </div>
      </Reveal>

      <Reveal delay={120}>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:grid-rows-2">
          <ShowcaseCard item={left} className="sm:min-h-[440px] sm:[grid-column:1] sm:[grid-row:1/3]" />
          <ShowcaseCard item={topMiddle} className="sm:min-h-[210px] sm:[grid-column:2] sm:[grid-row:1]" />
          <ShowcaseCard item={bottomMiddle} className="sm:min-h-[210px] sm:[grid-column:2] sm:[grid-row:2]" />
          <ShowcaseCard item={right} className="sm:min-h-[440px] sm:[grid-column:3] sm:[grid-row:1/3]" />
        </div>
      </Reveal>
    </section>
  );
}

function ShowcaseCard({ item, className = "" }: { item: ImageCard; className?: string }) {
  return (
    <Link href={item.href} className={`group relative block overflow-hidden rounded-2xl bg-stone-200 ${className}`}>
      <img src={item.image} alt={item.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/5 to-transparent" />
      <div className="relative flex h-full flex-col justify-end p-5">
        <h3 className="text-lg font-semibold text-white">{item.title}</h3>
      </div>
    </Link>
  );
}

/* ================================================================== */
/*  WHY TRAVEL WITH US                                                 */
/* ================================================================== */

const WHY_ICONS: Record<string, ReactElement> = {
  compass: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M15 9l-2 6-4-2 2-6 4 2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  ),
  route: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <circle cx="6" cy="6" r="2.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="18" cy="18" r="2.2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 7c3 0 2 6 5 6h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  tag: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <path d="M11 4h6a2 2 0 012 2v6l-9 9-8-8 9-9z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="15" cy="8" r="1.4" fill="currentColor" />
    </svg>
  ),
  headset: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <path d="M4 13v-1a8 8 0 0116 0v1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <rect x="3" y="13" width="4" height="6" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
      <rect x="17" y="13" width="4" height="6" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
};

function WhyTravelWithUs() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <Reveal>
        <h2 className="text-center text-3xl font-semibold text-stone-900 sm:text-4xl">Why Travel with Us</h2>
      </Reveal>

      <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4">
        {whyTravelWithUs.map((item, i) => (
          <Reveal key={item.title} delay={i * 90}>
            <div className="flex flex-col items-center text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-amber-500 transition-transform duration-300 hover:-translate-y-1 hover:bg-amber-400 hover:text-stone-900">
                {WHY_ICONS[item.icon]}
              </span>
              <h3 className="mt-4 text-sm font-semibold text-stone-900">{item.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-stone-500">{item.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ================================================================== */
/*  CUSTOM TRIP CTA BANNER                                             */
/* ================================================================== */

const CUSTOM_TRIP_POINTS = ["Share your ideas", "We build the itinerary", "You adjust it until it's right"];

function CustomTripBanner() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-4 sm:px-8">
      <Reveal>
        <div className="grid grid-cols-1 overflow-hidden rounded-3xl bg-stone-900 sm:grid-cols-2">
          <div className="flex flex-col justify-center gap-5 p-8 sm:p-12">
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">None of the tours quite fit?</h2>
            <ul className="space-y-2.5 text-sm text-white/80">
              {CUSTOM_TRIP_POINTS.map((point) => (
                <li key={point} className="flex items-center gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-400 text-[11px] font-bold text-stone-900">✓</span>
                  {point}
                </li>
              ))}
            </ul>
            <p className="text-sm text-white/70">
              Tell us roughly what you&apos;re looking for and we&apos;ll put together a route around it — no obligation.
            </p>
            <div className="mt-2 flex flex-wrap gap-3">
              <Link href="/plan-my-trip" className="rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-stone-900 transition-all duration-200 hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-lg">
                Plan My Trip
              </Link>
              <Link href="https://wa.me/94770000000" className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10">
                Chat on WhatsApp
              </Link>
            </div>
          </div>
          <div className="relative min-h-[260px] sm:min-h-0">
            <img src="https://picsum.photos/seed/achii-custom-trip/900/700" alt="Traveller looking over the Sri Lankan hills" className="h-full w-full object-cover" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ================================================================== */
/*  GALLERY                                                            */
/* ================================================================== */

function Gallery() {
  const [active, setActive] = useState<(typeof galleryFilters)[number]>(galleryFilters[0]);

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <Reveal>
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-semibold text-stone-900 sm:text-4xl">Gallery</h2>
          <p className="mt-3 text-stone-500">
            One inspiring story is worth traveling. Discover more about local food, tradition and history that come with every trip.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {galleryFilters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActive(filter)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors duration-200 sm:text-sm ${active === filter ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-600 hover:bg-stone-200"}`}
            >
              {filter}
            </button>
          ))}
        </div>
      </Reveal>

      <Reveal delay={120}>
        <div className="mt-10 grid grid-cols-3 gap-2.5 sm:grid-cols-6 sm:gap-3">
          {galleryImages.map((item) => (
            <div key={item.image} className="group relative aspect-square overflow-hidden rounded-xl bg-stone-200">
              <img src={item.image} alt={item.alt} className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110" />
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ================================================================== */
/*  BLOG POSTS                                                         */
/* ================================================================== */

function BlogPosts() {
  return (
    <section className="bg-stone-50 py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-lg">
              <h2 className="text-3xl font-semibold text-stone-900 sm:text-4xl">Blog Posts</h2>
              <p className="mt-3 text-stone-500">
                One inspiring story is worth reading. Discover more about local food, tradition and history that come with every trip.
              </p>
            </div>
            <Link href="/blog" className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-stone-900">
              View all posts
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </Reveal>

        <div className="mt-9 grid grid-cols-1 gap-6 md:grid-cols-3">
          {blogPosts.map((post, i) => (
            <Reveal key={post.href} delay={i * 100}>
              <article className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-100 transition-shadow duration-300 hover:shadow-lg">
                <div className="relative h-44 overflow-hidden">
                  <img src={post.image} alt={post.title} className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-semibold leading-snug text-stone-900">{post.title}</h3>
                  <p className="mt-2 text-sm text-stone-500">{post.excerpt}</p>
                  <Link href={post.href} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600">
                    Read More
                    <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  TESTIMONIALS                                                       */
/* ================================================================== */

const REVIEW_SOURCES = [
  { name: "Tripadvisor", rating: 4.8, reviews: "1,200+" },
  { name: "Google", rating: 4.7, reviews: "860+" },
];

function Testimonials() {
  return (
    <section className="bg-stone-900 py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <h2 className="text-center text-3xl font-semibold text-white sm:text-4xl">What travellers say, where they said it</h2>
          <p className="mx-auto mt-3 max-w-md text-center text-white/60">
            Every review below is authentic and sourced directly from Tripadvisor or Google, not written or reviewed internally.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-10">
            {REVIEW_SOURCES.map((source) => (
              <div key={source.name} className="text-center">
                <p className="text-2xl font-semibold text-amber-400">{source.rating} ★</p>
                <p className="text-xs text-white/60">{source.name} · {source.reviews} reviews</p>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <blockquote className="flex h-full flex-col justify-between rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/10">
                <div>
                  <div className="mb-3 flex gap-0.5 text-amber-400">
                    {Array.from({ length: t.rating }).map((_, idx) => (
                      <span key={idx}>★</span>
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-white/85">&ldquo;{t.quote}&rdquo;</p>
                </div>
                <footer className="mt-6 flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-white/50">{t.location}</p>
                  </div>
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  SERVICES BANNER                                                    */
/* ================================================================== */

function ServicesBanner() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-8 pt-4 sm:px-8">
      <Reveal>
        <div className="grid grid-cols-1 overflow-hidden rounded-3xl bg-stone-100 sm:grid-cols-2">
          <div className="relative min-h-[260px] sm:min-h-0">
            <img src="https://picsum.photos/seed/achii-services/900/700" alt="Private transport arranged for a Sri Lanka tour" className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col justify-center gap-5 p-8 sm:p-12">
            <h2 className="text-2xl font-semibold text-stone-900 sm:text-3xl">You book one trip. We handle the twelve bookings behind it.</h2>
            <div className="grid grid-cols-2 gap-4 text-sm text-stone-600">
              <div>
                <p className="font-semibold text-stone-900">Transport</p>
                <p className="text-stone-500">Door-to-door drivers and transfers.</p>
              </div>
              <div>
                <p className="font-semibold text-stone-900">Places we have slept in</p>
                <p className="text-stone-500">Hotels and stays we&apos;ve personally checked.</p>
              </div>
            </div>
            <Link href="/about" className="mt-2 inline-block w-fit rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-stone-900 transition-all duration-200 hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-lg">
              View our Services
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ================================================================== */
/*  FOOTER                                                             */
/* ================================================================== */

const FOOTER_COLUMNS: { title: string; items: string[] }[] = [
  { title: "Tours", items: footerLinks.tours },
  { title: "Navigate", items: footerLinks.navigate },
  { title: "Explore", items: footerLinks.explore },
  { title: "Contact Us", items: footerLinks.contact },
];

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-stone-950 pt-16 text-stone-300">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-2 gap-10 pb-12 sm:grid-cols-3 md:grid-cols-5">
          <div className="col-span-2 sm:col-span-3 md:col-span-1">
            <Link href="/" className="text-lg font-semibold text-white">Achii Lanka Tours</Link>
            <p className="mt-3 max-w-xs text-sm text-stone-400">Sri Lanka, planned properly by the people who live here.</p>
            <div className="mt-5 flex gap-3">
              {["Facebook", "Instagram", "WhatsApp"].map((label) => (
                <a key={label} href="#" aria-label={label} className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-xs transition-colors duration-200 hover:bg-amber-400 hover:text-stone-900">
                  {label[0]}
                </a>
              ))}
            </div>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-white">{col.title}</h4>
              <ul className="mt-4 space-y-2.5 text-sm text-stone-400">
                {col.items.map((item) => (
                  <li key={item}>
                    <a href="#" className="transition-colors duration-200 hover:text-amber-400">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 text-xs text-stone-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Achii Lanka Tours. All rights reserved.</p>
          <p>An enquiry is not a confirmed booking — our team follows up personally.</p>
        </div>
      </div>

      <div aria-hidden className="pointer-events-none select-none pb-2 text-center text-[22vw] font-bold leading-none text-white/5">
        Achii
      </div>
    </footer>
  );
}

/* ================================================================== */
/*  PAGE                                                               */
/* ================================================================== */

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <DestinationHighlights />
      <ToursSection />
      <CategoryShowcase
        title="Explore Sri Lanka"
        description="When it comes to exploring exotic places, the choices are numerous. Whether you like peaceful destinations or vibrant landscapes, we have offers for you."
        items={exploreSriLanka as [ImageCard, ImageCard, ImageCard, ImageCard]}
      />
      <CategoryShowcase
        title="Adventure and Activities"
        description="When it comes to exploring exotic places, the choices are numerous. Whether you like peaceful destinations or vibrant landscapes, we have offers for you."
        items={adventureActivities as [ImageCard, ImageCard, ImageCard, ImageCard]}
        className="bg-stone-50"
      />
      <WhyTravelWithUs />
      <CustomTripBanner />
      <Gallery />
      <BlogPosts />
      <Testimonials />
      <ServicesBanner />
      <Footer />
    </>
  );
}