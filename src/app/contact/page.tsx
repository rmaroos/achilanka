"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

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

type Channel = {
  id: string;
  title: string;
  value: string;
  description: string;
  ctaLabel: string;
  href: string;
  icon: JSX.Element;
};

const CHANNELS: Channel[] = [
  {
    id: "whatsapp",
    title: "WhatsApp",
    value: "+94 77 123 4567",
    description:
      "Fastest way to reach us. Usually answered within an hour, 8am to 9pm Sri Lanka time (GMT+5:30).",
    ctaLabel: "Open WhatsApp",
    href: "https://wa.me/94771234567",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
        <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.44 1.33 4.93L2 22l5.25-1.38a9.9 9.9 0 004.79 1.22h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2z" />
      </svg>
    ),
  },
  {
    id: "email",
    title: "Email",
    value: "hello@achiilanka.com",
    description:
      "Best for detailed questions and custom itineraries. Answered within one working day.",
    ctaLabel: "Send an email",
    href: "mailto:hello@achiilanka.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
        <path d="M4 6.5h16v11a1 1 0 01-1 1H5a1 1 0 01-1-1v-11z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M4.5 7l7.1 5.7a.7.7 0 00.8 0L19.5 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "phone",
    title: "Phone",
    value: "+94 11 234 5678",
    description: "Office line, 9am to 6pm Sri Lanka time, Monday to Saturday.",
    ctaLabel: "Call the office",
    href: "tel:+94112345678",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
        <path
          d="M6.6 10.8c1.3 2.6 3.4 4.7 6 6l2-2a1 1 0 011-.25c1.1.36 2.28.56 3.5.56a1 1 0 011 1V19.5a1 1 0 01-1 1C10.6 20.5 3.5 13.4 3.5 4.9a1 1 0 011-1H7.9a1 1 0 011 1c0 1.22.2 2.4.56 3.5a1 1 0 01-.25 1l-2 2z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

const OFFICE_LINES = [
  "Serendib Journeys (Pvt) Ltd",
  "48 Ward Place, Colombo 00700",
  "Sri Lanka",
];

const HOURS_LINES = ["Mon–Sat, 9am–6pm (GMT+5:30)", "WhatsApp monitored until 9pm"];

const MAP_QUERY = "48 Ward Place, Colombo 00700, Sri Lanka";

type FormState = {
  name: string;
  email: string;
  subject: string;
  comment: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;
type SubmitStatus = "idle" | "loading" | "success" | "error";

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
      { threshold: 0.15 }
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
                  link.label === "Reach Us" ? "text-stone-900" : ""
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-amber-400 transition-all duration-300 ${
                    link.label === "Reach Us" ? "w-full" : "w-0 group-hover:w-full"
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
/*  Intro + channel cards                                              */
/* ------------------------------------------------------------------ */

function IntroAndChannels() {
  return (
    <Reveal className="relative mx-auto max-w-7xl px-4 pt-14 pb-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
        Talk to someone in Colombo
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-stone-500">
        Not a call centre and not a chatbot — the same small team that plans
        and runs the tours. If you are already travelling with us, use
        WhatsApp; it is monitored outside office hours too.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CHANNELS.map((channel) => (
          <div
            key={channel.id}
            className="rounded-2xl border border-stone-100 p-7 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              {channel.icon}
            </div>
            <h3 className="text-lg font-semibold text-stone-900">{channel.title}</h3>
            <p className="mt-1 text-sm font-medium text-stone-700">{channel.value}</p>
            <p className="mt-3 text-sm leading-relaxed text-stone-500">{channel.description}</p>
            <a
              href={channel.href}
              target={channel.id === "whatsapp" ? "_blank" : undefined}
              rel={channel.id === "whatsapp" ? "noreferrer" : undefined}
              className="mt-6 inline-flex rounded-full bg-amber-400 px-5 py-2.5 text-sm font-semibold text-stone-900 transition-transform hover:-translate-y-0.5"
            >
              {channel.ctaLabel}
            </a>
          </div>
        ))}
      </div>

      <a
        href="https://wa.me/94771234567"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-30 hidden items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5 lg:inline-flex"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
          <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.44 1.33 4.93L2 22l5.25-1.38a9.9 9.9 0 004.79 1.22h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2z" />
        </svg>
        Chat on WhatsApp
      </a>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  Contact form + sidebar                                              */
/* ------------------------------------------------------------------ */

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "That doesn't look like a valid email address.";
  }
  if (!values.comment.trim()) errors.comment = "Let us know what you'd like help with.";
  return errors;
}

function FormSection() {
  const [values, setValues] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    comment: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const handleChange =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((v) => ({ ...v, [field]: e.target.value }));
      if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
    };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("loading");
    try {
      // Placeholder for the real enquiry endpoint — wire up to
      // the Contact Us channel once the backend is ready.
      await new Promise((resolve) => setTimeout(resolve, 900));
      setStatus("success");
      setValues({ name: "", email: "", subject: "", comment: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputClasses = (field: keyof FormState) =>
    `w-full rounded-xl border bg-stone-50 px-4 py-3.5 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400/60 ${
      errors[field] ? "border-red-300" : "border-stone-100"
    }`;

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-8 text-center sm:text-left">
        <h3 className="text-xl font-semibold text-stone-900">Thanks — message sent</h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-stone-600">
          Someone from our Colombo team will reply by email, usually within
          one working day. For anything urgent, use WhatsApp instead.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 inline-flex rounded-full bg-amber-400 px-5 py-2.5 text-sm font-semibold text-stone-900 transition-transform hover:-translate-y-0.5"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div>
        <input
          type="text"
          placeholder="Name*"
          value={values.name}
          onChange={handleChange("name")}
          aria-invalid={Boolean(errors.name)}
          className={inputClasses("name")}
        />
        {errors.name && <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>}
      </div>

      <div>
        <input
          type="email"
          placeholder="Email Address*"
          value={values.email}
          onChange={handleChange("email")}
          aria-invalid={Boolean(errors.email)}
          className={inputClasses("email")}
        />
        {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
      </div>

      <input
        type="text"
        placeholder="Subject"
        value={values.subject}
        onChange={handleChange("subject")}
        className={inputClasses("subject")}
      />

      <div>
        <textarea
          placeholder="Comment"
          rows={6}
          value={values.comment}
          onChange={handleChange("comment")}
          aria-invalid={Boolean(errors.comment)}
          className={`${inputClasses("comment")} resize-none`}
        />
        {errors.comment && <p className="mt-1.5 text-xs text-red-500">{errors.comment}</p>}
      </div>

      {status === "error" && (
        <p className="text-sm text-red-500">
          Something went wrong sending your message. Please try again, or
          reach us directly on WhatsApp.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-amber-400 px-8 py-3 text-sm font-semibold text-stone-900 transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "loading" && (
          <svg viewBox="0 0 24 24" className="h-4 w-4 animate-spin">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" fill="none" opacity="0.25" />
            <path d="M21 12a9 9 0 00-9-9" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </svg>
        )}
        {status === "loading" ? "Sending..." : "Submit"}
      </button>
    </form>
  );
}

function ContactAndInfo() {
  return (
    <Reveal className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">Contact Us</h2>
          <div className="mt-6">
            <FormSection />
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-stone-900">Need help?</h3>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-stone-500">
            Tell us roughly where you'd like to go, when you're thinking of
            travelling, and how many people are in your group. If you were
            already looking at a specific tour, mention its name here too —
            it helps us reply with something useful on the first message
            instead of a round of back and forth.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-stone-100 p-6">
              <h4 className="text-base font-semibold text-stone-900">Our office</h4>
              <div className="mt-4 flex gap-3">
                <svg viewBox="0 0 24 24" fill="none" className="mt-0.5 h-5 w-5 shrink-0 text-amber-500">
                  <path
                    d="M12 21.5s7-6.13 7-11.5a7 7 0 10-14 0c0 5.37 7 11.5 7 11.5z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.6" />
                </svg>
                <p className="text-sm leading-relaxed text-stone-500">
                  {OFFICE_LINES.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </div>
              <div className="mt-4 flex gap-3">
                <svg viewBox="0 0 24 24" fill="none" className="mt-0.5 h-5 w-5 shrink-0 text-amber-500">
                  <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="text-sm leading-relaxed text-stone-500">
                  {HOURS_LINES.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-amber-100 bg-amber-50/60 p-6">
              <h4 className="text-base font-semibold text-stone-900">Licensed and registered</h4>
              <p className="mt-4 text-sm leading-relaxed text-stone-600">
                Registered with the Sri Lanka Tourism Development Authority
                (licence #TA/0142) and a member of the Sri Lanka Association
                of Inbound Tour Operators.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  Map                                                                 */
/* ------------------------------------------------------------------ */

function MapSection() {
  return (
    <div className="h-[480px] w-full border-y border-stone-100 sm:h-[560px]">
      <iframe
        title="Achii Lanka Tours office location"
        src={`https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-full w-full grayscale-[15%]"
      />
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

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <IntroAndChannels />
      <ContactAndInfo />
      <MapSection />
      <Footer />
    </main>
  );
}