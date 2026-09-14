"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Where to Go", href: "/tours" },
  { label: "What to Do", href: "/activities" },
  { label: "Reach Us", href: "/contact" },
  { label: "Our Story", href: "/about" },
];

export default function Header() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /*
   * Home and Our Story use the floating header
   * over the hero image.
   *
   * All other pages use the white header.
   */
  const isFloatingPage =
    pathname === "/" || pathname === "/about";

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /*
   * Close mobile menu whenever route changes
   */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={
        isFloatingPage
          ? "absolute inset-x-0 top-0 z-50 px-4 pt-6 sm:px-6"
          : "relative z-50 w-full border-b border-stone-100 bg-white"
      }
    >
      <div
        className={`
          mx-auto
          ${
            isFloatingPage
              ? "max-w-4xl"
              : "max-w-7xl"
          }
        `}
      >
        {/* ====================================================== */}
        {/* DESKTOP HEADER */}
        {/* ====================================================== */}

        <nav
          className={`
            hidden
            items-center
            justify-between
            md:flex

            ${
              isFloatingPage
                ? `
                  min-h-[72px]
                  gap-6
                  rounded-2xl
                  border
                  border-white/40
                  bg-white/95
                  px-7
                  py-4
                  shadow-lg
                  backdrop-blur-md
                `
                : `
                  min-h-[78px]
                  gap-8
                  px-6
                  py-3
                `
            }
          `}
        >
          {/* ================================================== */}
          {/* LOGO */}
          {/* ================================================== */}

          <Link
            href="/"
            className={`
              shrink-0
              font-semibold
              tracking-tight
              transition-colors

              ${
                isFloatingPage
                  ? "text-sm text-stone-900 lg:text-[15px]"
                  : "text-[15px] text-stone-900"
              }
            `}
          >
            Achii Lanka Tours
          </Link>

          {/* ================================================== */}
          {/* NAVIGATION */}
          {/* ================================================== */}

          <ul
            className={`
              flex
              items-center
              font-medium

              ${
                isFloatingPage
                  ? "gap-6 text-xs text-stone-700 lg:gap-7 lg:text-[13px]"
                  : "gap-7 text-xs text-stone-600 lg:gap-8 lg:text-[13px]"
              }
            `}
          >
            {NAV_LINKS.map((link) => {
              const isActive =
                pathname === link.href;

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`
                      relative
                      whitespace-nowrap
                      py-2
                      transition-colors

                      ${
                        isActive
                          ? "text-stone-950"
                          : "hover:text-stone-950"
                      }

                      after:absolute
                      after:inset-x-0
                      after:-bottom-0.5
                      after:h-[2px]
                      after:origin-left
                      after:bg-amber-500
                      after:transition-transform
                      after:duration-300

                      ${
                        isActive
                          ? "after:scale-x-100"
                          : "after:scale-x-0 hover:after:scale-x-100"
                      }
                    `}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* ================================================== */}
          {/* CTA */}
          {/* ================================================== */}

          <Link
            href="/plan-my-trip"
            className={`
              flex
              shrink-0
              items-center
              gap-2
              rounded-full
              bg-amber-400
              font-bold
              text-stone-900
              shadow-sm
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:bg-amber-300
              hover:shadow-md

              ${
                isFloatingPage
                  ? "px-5 py-3 text-[11px] uppercase tracking-wide lg:px-6 lg:text-xs"
                  : "px-5 py-3 text-[11px] uppercase tracking-wide"
              }
            `}
          >
            <span>Plan My Trip</span>

            <ArrowRight
              size={17}
              strokeWidth={2.2}
              aria-hidden="true"
            />
          </Link>
        </nav>

        {/* ====================================================== */}
        {/* MOBILE HEADER */}
        {/* ====================================================== */}

        <nav
          className={`
            flex
            min-h-[64px]
            items-center
            justify-between

            ${
              isFloatingPage
                ? `
                  rounded-2xl
                  border
                  border-white/40
                  bg-white/95
                  px-5
                  py-4
                  shadow-lg
                  backdrop-blur-md
                `
                : `
                  border-b
                  border-stone-100
                  bg-white
                  px-5
                  py-4
                `
            }

            md:hidden
          `}
        >
          {/* Mobile Logo */}

          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="text-base font-semibold tracking-tight text-stone-900"
          >
            Achii Lanka Tours
          </Link>

          {/* Mobile Button */}

          <button
            type="button"
            aria-label={
              open
                ? "Close menu"
                : "Open menu"
            }
            aria-expanded={open}
            onClick={() =>
              setOpen((value) => !value)
            }
            className="
              flex
              h-10
              w-10
              flex-col
              items-center
              justify-center
              gap-1.5
              rounded-full
              text-stone-900
              transition-colors
              hover:bg-stone-100
            "
          >
            <span
              className={`
                h-0.5
                w-5
                bg-current
                transition-transform
                duration-300

                ${
                  open
                    ? "translate-y-2 rotate-45"
                    : ""
                }
              `}
            />

            <span
              className={`
                h-0.5
                w-5
                bg-current
                transition-opacity
                duration-300

                ${
                  open
                    ? "opacity-0"
                    : "opacity-100"
                }
              `}
            />

            <span
              className={`
                h-0.5
                w-5
                bg-current
                transition-transform
                duration-300

                ${
                  open
                    ? "-translate-y-2 -rotate-45"
                    : ""
                }
              `}
            />
          </button>
        </nav>

        {/* ====================================================== */}
        {/* MOBILE MENU */}
        {/* ====================================================== */}

        <div
          className={`
            overflow-hidden
            bg-white
            shadow-lg
            transition-all
            duration-300
            md:hidden

            ${
              open
                ? "max-h-[500px] opacity-100"
                : "max-h-0 opacity-0"
            }

            ${
              isFloatingPage
                ? "mt-2 rounded-2xl"
                : "border-b border-stone-100"
            }
          `}
        >
          <ul className="flex flex-col gap-1 p-4">
            {NAV_LINKS.map((link) => {
              const isActive =
                pathname === link.href;

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() =>
                      setOpen(false)
                    }
                    className={`
                      block
                      rounded-xl
                      px-4
                      py-3.5
                      text-[15px]
                      font-medium
                      transition-colors

                      ${
                        isActive
                          ? "bg-amber-50 text-stone-950"
                          : "text-stone-700 hover:bg-amber-50 hover:text-stone-950"
                      }
                    `}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}

            {/* Mobile CTA */}

            <li className="mt-2 border-t border-stone-100 pt-4">
              <Link
                href="/plan-my-trip"
                onClick={() =>
                  setOpen(false)
                }
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  bg-amber-400
                  px-5
                  py-3.5
                  text-sm
                  font-semibold
                  text-stone-900
                  transition-all
                  hover:bg-amber-300
                "
              >
                <span>Plan My Trip</span>

                <ArrowRight
                  size={18}
                  strokeWidth={2.2}
                  aria-hidden="true"
                />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}