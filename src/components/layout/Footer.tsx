import Link from "next/link";
import {
  ArrowRight,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

const FOOTER_COLUMNS = [
  {
    title: "Tours",
    links: [
      {
        label: "All Tours",
        href: "/tours",
      },
      {
        label: "Day Tours",
        href: "/tours?type=day",
      },
      {
        label: "Round Tours",
        href: "/tours?type=round",
      },
    ],
  },
  {
    title: "Navigation",
    links: [
      {
        label: "Home",
        href: "/",
      },
      {
        label: "Where to Go",
        href: "/explore",
      },
      {
        label: "What to Do",
        href: "/activities",
      },
      {
        label: "Reach Us",
        href: "/contact",
      },
      {
        label: "Our Story",
        href: "/about",
      },
      {
        label: "Plan My Trip",
        href: "/plan-my-trip",
      },
    ],
  },
  {
    title: "Explore",
    links: [
      {
        label: "Beaches",
        href: "/explore/beaches",
      },
      {
        label: "Hill Country",
        href: "/explore/hill-country",
      },
      {
        label: "Wildlife",
        href: "/explore/wildlife",
      },
      {
        label: "Heritage & Culture",
        href: "/explore/heritage-culture",
      },
      {
        label: "Tea Trails",
        href: "/explore/tea-trails",
      },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      className="
        relative
        isolate
        min-h-[620px]
        w-full
        overflow-hidden
        bg-stone-100
        text-stone-600

        sm:min-h-[680px]
        md:min-h-[720px]
        lg:min-h-[760px]
        xl:min-h-[800px]
      "
    >
      {/* ====================================================== */}
      {/* MOUNTAIN IMAGE - INSIDE THE FOOTER */}
      {/* ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          z-0
          w-full
          overflow-hidden
        "
      >
        <img
          src="/images/footer-mountains.png"
          alt=""
          className="
            block
            h-auto
            w-full
            max-w-none
          "
        />

        {/* Soft transition from footer content into image */}

        <div
          className="
            absolute
            inset-x-0
            top-0
            h-1/2
            bg-gradient-to-b
            from-stone-100
            via-stone-100/85
            to-transparent
          "
        />

        {/* Soft bottom fade */}

        <div
          className="
            absolute
            inset-x-0
            bottom-0
            h-24
            bg-gradient-to-t
            from-stone-100/50
            to-transparent
          "
        />
      </div>

      {/* ====================================================== */}
      {/* FOOTER CONTENT */}
      {/* ====================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
          px-5
          pt-7
          pb-5

          sm:px-8
          sm:pt-9
          sm:pb-7

          lg:pt-10
          lg:pb-8
        "
      >
        {/* ================================================== */}
        {/* MAIN FOOTER GRID */}
        {/* ================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-8

            sm:grid-cols-2
            sm:gap-x-10
            sm:gap-y-8

            md:grid-cols-3

            lg:grid-cols-5
            lg:gap-10
          "
        >
          {/* ================================================== */}
          {/* BRAND */}
          {/* ================================================== */}

          <div
            className="
              sm:col-span-2
              md:col-span-3
              lg:col-span-1
            "
          >
            <Link
              href="/"
              className="
                inline-block
                text-base
                font-semibold
                tracking-tight
                text-stone-900
                transition-colors
                duration-200
                hover:text-amber-500

                sm:text-lg
              "
            >
              Achii Lanka Tours
            </Link>

            <p
              className="
                mt-3
                max-w-xs
                text-sm
                leading-relaxed
                text-stone-600
              "
            >
              Sri Lanka, planned properly by the people
              who live here.
            </p>

            {/* Plan My Trip */}

            <Link
              href="/plan-my-trip"
              className="
                mt-5
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-amber-400
                px-5
                py-2.5
                text-sm
                font-semibold
                text-stone-900
                shadow-sm
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:bg-amber-300
                hover:shadow-md
              "
            >
              <span>Plan My Trip</span>

              <ArrowRight
                size={17}
                strokeWidth={2}
                aria-hidden="true"
              />
            </Link>

            {/* ====================================================== */}
        {/* COPYRIGHT */}
        {/* ====================================================== */}

        <div
          className="
            relative
            mt-5
            py-5
            text-xs
            text-stone-500

            sm:mt-6
            sm:py-6
          "
        >
          <p>
            © {new Date().getFullYear()} Achii Lanka Tours.
            All rights reserved.
          </p>
        </div>
          </div>
          

          {/* ================================================== */}
          {/* FOOTER COLUMNS */}
          {/* ================================================== */}

          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <h4
                className="
                  text-sm
                  font-semibold
                  text-stone-900
                "
              >
                {column.title}
              </h4>

              <ul
                className="
                  mt-3
                  space-y-2
                  text-sm
                  text-stone-600
                "
              >
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="
                        transition-colors
                        duration-200
                        hover:text-amber-500
                      "
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* ================================================== */}
          {/* CONTACT US */}
          {/* ================================================== */}

          <div>
            <h4
              className="
                text-sm
                font-semibold
                text-stone-900
              "
            >
              Contact Us
            </h4>

            <div className="mt-3 space-y-3">
              {/* Phone */}

              <a
                href="tel:+94112345678"
                className="
                  group
                  flex
                  items-center
                  gap-3
                  text-sm
                  text-stone-600
                  transition-colors
                  duration-200
                  hover:text-amber-500
                "
              >
                <Phone
                  size={15}
                  strokeWidth={1.7}
                  className="
                    shrink-0
                    text-stone-800
                    transition-colors
                    group-hover:text-amber-500
                  "
                />

                <span>+94 11 234 5678</span>
              </a>

              {/* Email */}

              <a
                href="mailto:hello@achiilanka.com"
                className="
                  group
                  flex
                  items-center
                  gap-3
                  text-sm
                  text-stone-600
                  transition-colors
                  duration-200
                  hover:text-amber-500
                "
              >
                <Mail
                  size={15}
                  strokeWidth={1.7}
                  className="
                    shrink-0
                    text-stone-800
                    transition-colors
                    group-hover:text-amber-500
                  "
                />

                <span className="break-all">
                  hello@achiilanka.com
                </span>
              </a>

              {/* WhatsApp */}

              <a
                href="https://wa.me/94770000000"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  flex
                  items-center
                  gap-3
                  text-sm
                  text-stone-600
                  transition-colors
                  duration-200
                  hover:text-amber-500
                "
              >
                <MessageCircle
                  size={15}
                  strokeWidth={1.7}
                  className="
                    shrink-0
                    text-stone-800
                    transition-colors
                    group-hover:text-amber-500
                  "
                />

                <span>WhatsApp Us</span>
              </a>

              {/* Address */}

              <div
                className="
                  flex
                  items-start
                  gap-3
                  text-sm
                  leading-relaxed
                  text-stone-600
                "
              >
                <MapPin
                  size={15}
                  strokeWidth={1.7}
                  className="
                    mt-0.5
                    shrink-0
                    text-stone-800
                  "
                />

                <p>
                  48 Ward Place,
                  <br />
                  Colombo 00700,
                  <br />
                  Sri Lanka
                </p>
              </div>
            </div>

            {/* ================================================== */}
            {/* SOCIAL MEDIA */}
            {/* ================================================== */}

            <div className="mt-5">

              <div className="mt-2 flex items-center gap-1.5">
                {/* Facebook */}

                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="
                    group
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    text-stone-800
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                    hover:bg-amber-400
                    hover:text-stone-900
                  "
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="
                      h-[15px]
                      w-[15px]
                      fill-current
                    "
                    aria-hidden="true"
                  >
                    <path d="M13.5 21v-8.2h2.75l.4-3.2h-3.15V7.5c0-.93.26-1.56 1.6-1.56h1.7V3.1C15.9 3 15 2.95 13.94 2.95c-2.2 0-3.71 1.34-3.71 3.8v2.85H7.5v3.2h2.73V21h3.27z" />
                  </svg>
                </a>

                {/* Instagram */}

                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="
                    group
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    text-stone-800
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                    hover:bg-amber-400
                    hover:text-stone-900
                  "
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="
                      h-[16px]
                      w-[16px]
                      fill-none
                      stroke-current
                    "
                    strokeWidth="1.8"
                    aria-hidden="true"
                  >
                    <rect
                      x="3.2"
                      y="3.2"
                      width="17.6"
                      height="17.6"
                      rx="5"
                    />

                    <circle
                      cx="12"
                      cy="12"
                      r="4"
                    />

                    <circle
                      cx="17.5"
                      cy="6.5"
                      r="1"
                      className="
                        fill-current
                        stroke-none
                      "
                    />
                  </svg>
                </a>

                {/* TikTok */}

                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="
                    group
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    text-stone-800
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                    hover:bg-amber-400
                    hover:text-stone-900
                  "
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="
                      h-[16px]
                      w-[16px]
                      fill-current
                    "
                    aria-hidden="true"
                  >
                    <path d="M16.6 3c.3 1.9 1.4 3.4 3.4 4.2v3.1c-1.4-.1-2.7-.5-3.8-1.2v6.4c0 3.9-2.7 5.8-5.8 5.8-2.9 0-5.4-2-5.4-5.1 0-3.2 2.5-5.4 5.8-5.4.4 0 .8 0 1.2.1v3.1c-.4-.1-.8-.2-1.2-.2-1.4 0-2.5.9-2.5 2.3 0 1.2.9 2.1 2.2 2.1 1.5 0 2.6-.9 2.6-2.8V3h3.5z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </footer>
  );
}