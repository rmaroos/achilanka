"use client";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactElement,
  type ReactNode,
} from "react";

/* -------------------------------------------------------------------------- */
/* Data                                                                       */
/* -------------------------------------------------------------------------- */

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
  icon: ReactElement;
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
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6 fill-current"
        aria-hidden="true"
      >
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
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <path
          d="M4 6.5h16v11a1 1 0 01-1 1H5a1 1 0 01-1-1v-11z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M4.5 7l7.1 5.7a.7.7 0 00.8 0L19.5 7"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "phone",
    title: "Phone",
    value: "+94 11 234 5678",
    description:
      "Office line, 9am to 6pm Sri Lanka time, Monday to Saturday.",
    ctaLabel: "Call the office",
    href: "tel:+94112345678",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-6 w-6"
        aria-hidden="true"
      >
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

const HOURS_LINES = [
  "Mon–Sat, 9am–6pm (GMT+5:30)",
  "WhatsApp monitored until 9pm",
];

const MAP_QUERY = "48 Ward Place, Colombo 00700, Sri Lanka";

type FormState = {
  name: string;
  email: string;
  subject: string;
  comment: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

type SubmitStatus = "idle" | "loading" | "success" | "error";

/* -------------------------------------------------------------------------- */
/* Reveal Animation                                                           */
/* -------------------------------------------------------------------------- */

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

    if (typeof IntersectionObserver === "undefined") {
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
        threshold: 0.12,
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={[
        className,
        "transition-all duration-700 ease-out",
        "motion-reduce:transition-none",
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-6 opacity-0",
      ].join(" ")}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Navbar                                                                     */
/* -------------------------------------------------------------------------- */

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="bg-stone-950 text-xs text-stone-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
          <div className="hidden items-center gap-4 sm:flex">
            <span className="tracking-wide text-stone-400">
              Follow us
            </span>

            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="transition-colors hover:text-amber-400"
              >
                Instagram
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="transition-colors hover:text-amber-400"
              >
                Facebook
              </a>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-4">
            <a
              href="tel:1-677-124-44227"
              className="transition-colors hover:text-amber-400"
            >
              1-677-124-44227
            </a>

            <a
              href="mailto:info@achiilanka.com"
              className="hidden transition-colors hover:text-amber-400 sm:inline"
            >
              info@achiilanka.com
            </a>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-stone-100 bg-white/95 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
          <a
            href="/"
            className="text-lg font-semibold tracking-tight text-stone-900"
          >
            Achii Lanka{" "}
            <span className="text-amber-500">Tours</span>
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive = link.label === "Reach Us";

              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={[
                    "group relative pb-1 text-sm font-medium",
                    "transition-colors hover:text-stone-950",
                    isActive
                      ? "text-stone-950"
                      : "text-stone-600",
                  ].join(" ")}
                >
                  {link.label}

                  <span
                    className={[
                      "absolute bottom-0 left-0 h-0.5 bg-amber-400",
                      "transition-all duration-300",
                      isActive
                        ? "w-full"
                        : "w-0 group-hover:w-full",
                    ].join(" ")}
                  />
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/plan-my-trip"
              className="hidden items-center gap-2 rounded-full bg-amber-400 px-5 py-2.5 text-sm font-semibold text-stone-900 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md sm:inline-flex"
            >
              Plan My Trip
              <span aria-hidden="true">→</span>
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((current) => !current)}
              aria-label={
                menuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={menuOpen}
              className="rounded-full p-2 text-stone-700 transition-colors hover:bg-stone-100 lg:hidden"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
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
          <div className="border-t border-stone-100 bg-white px-4 pb-5 lg:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-1 pt-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-50 hover:text-stone-950"
                >
                  {link.label}
                </a>
              ))}

              <a
                href="/plan-my-trip"
                onClick={() => setMenuOpen(false)}
                className="mt-2 rounded-full bg-amber-400 px-5 py-3 text-center text-sm font-semibold text-stone-900"
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

/* -------------------------------------------------------------------------- */
/* Intro + Contact Channels                                                   */
/* -------------------------------------------------------------------------- */

function IntroAndChannels() {
  return (
    <section className="relative">
      <Reveal className="mx-auto max-w-7xl px-4 pb-6 pt-14 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">
          Get in touch
        </p>

        <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
          Talk to someone in Colombo
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-relaxed text-stone-500">
          Not a call centre and not a chatbot — the same small team
          that plans and runs the tours. If you are already travelling
          with us, use WhatsApp; it is monitored outside office hours too.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CHANNELS.map((channel) => (
            <div
              key={channel.id}
              className="group rounded-2xl border border-stone-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-100">
                {channel.icon}
              </div>

              <h2 className="mt-5 text-lg font-semibold text-stone-900">
                {channel.title}
              </h2>

              <p className="mt-1 text-sm font-medium text-stone-700">
                {channel.value}
              </p>

              <p className="mt-3 text-sm leading-relaxed text-stone-500">
                {channel.description}
              </p>

              <a
                href={channel.href}
                target={
                  channel.id === "whatsapp"
                    ? "_blank"
                    : undefined
                }
                rel={
                  channel.id === "whatsapp"
                    ? "noreferrer"
                    : undefined
                }
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-400 px-5 py-2.5 text-sm font-semibold text-stone-900 transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                {channel.ctaLabel}
                <span aria-hidden="true">→</span>
              </a>
            </div>
          ))}
        </div>
      </Reveal>

      <a
        href="https://wa.me/94771234567"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-30 hidden items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl lg:inline-flex"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 fill-current"
          aria-hidden="true"
        >
          <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.44 1.33 4.93L2 22l5.25-1.38a9.9 9.9 0 004.79 1.22h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2z" />
        </svg>

        Chat on WhatsApp
      </a>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Form Validation                                                            */
/* -------------------------------------------------------------------------- */

function validateForm(values: FormState): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Please enter your name.";
  }

  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)
  ) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.comment.trim()) {
    errors.comment =
      "Please tell us what you would like help with.";
  }

  return errors;
}

/* -------------------------------------------------------------------------- */
/* Contact Form                                                               */
/* -------------------------------------------------------------------------- */

function FormSection() {
  const [values, setValues] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    comment: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] =
    useState<SubmitStatus>("idle");

  const handleChange =
    (field: keyof FormState) =>
    (
      event: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement
      >,
    ) => {
      setValues((current) => ({
        ...current,
        [field]: event.target.value,
      }));

      if (errors[field]) {
        setErrors((current) => ({
          ...current,
          [field]: undefined,
        }));
      }
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateForm(values);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setStatus("loading");

    try {
      /*
       * Temporary frontend submission state.
       *
       * Connect this section to the approved Contact Us backend /
       * Google Form / API when the final submission workflow is supplied.
       */
      await new Promise((resolve) =>
        setTimeout(resolve, 900),
      );

      setStatus("success");

      setValues({
        name: "",
        email: "",
        subject: "",
        comment: "",
      });
    } catch {
      setStatus("error");
    }
  };

  const inputClass = (field: keyof FormState) =>
    [
      "w-full rounded-xl border bg-stone-50 px-4 py-3.5",
      "text-sm text-stone-800",
      "placeholder:text-stone-400",
      "focus:border-amber-300 focus:outline-none",
      "focus:ring-2 focus:ring-amber-400/40",
      errors[field]
        ? "border-red-300"
        : "border-stone-100",
    ].join(" ");

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-6 w-6"
            aria-hidden="true"
          >
            <path
              d="M5 12.5l4.2 4L19 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h3 className="mt-5 text-xl font-semibold text-stone-900">
          Thanks — message sent
        </h3>

        <p className="mt-2 max-w-lg text-sm leading-relaxed text-stone-600">
          Someone from our Colombo team will reply by email,
          usually within one working day. For anything urgent,
          use WhatsApp instead.
        </p>

        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 rounded-full bg-amber-400 px-5 py-2.5 text-sm font-semibold text-stone-900 transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-4"
    >
      <div>
        <label
          htmlFor="contact-name"
          className="sr-only"
        >
          Name
        </label>

        <input
          id="contact-name"
          type="text"
          placeholder="Name*"
          value={values.name}
          onChange={handleChange("name")}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={
            errors.name ? "contact-name-error" : undefined
          }
          className={inputClass("name")}
        />

        {errors.name && (
          <p
            id="contact-name-error"
            className="mt-1.5 text-xs text-red-500"
          >
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="contact-email"
          className="sr-only"
        >
          Email Address
        </label>

        <input
          id="contact-email"
          type="email"
          placeholder="Email Address*"
          value={values.email}
          onChange={handleChange("email")}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={
            errors.email
              ? "contact-email-error"
              : undefined
          }
          className={inputClass("email")}
        />

        {errors.email && (
          <p
            id="contact-email-error"
            className="mt-1.5 text-xs text-red-500"
          >
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="contact-subject"
          className="sr-only"
        >
          Subject
        </label>

        <input
          id="contact-subject"
          type="text"
          placeholder="Subject"
          value={values.subject}
          onChange={handleChange("subject")}
          className={inputClass("subject")}
        />
      </div>

      <div>
        <label
          htmlFor="contact-comment"
          className="sr-only"
        >
          Comment
        </label>

        <textarea
          id="contact-comment"
          rows={6}
          placeholder="Comment"
          value={values.comment}
          onChange={handleChange("comment")}
          aria-invalid={Boolean(errors.comment)}
          aria-describedby={
            errors.comment
              ? "contact-comment-error"
              : undefined
          }
          className={`${inputClass(
            "comment",
          )} resize-none`}
        />

        {errors.comment && (
          <p
            id="contact-comment-error"
            className="mt-1.5 text-xs text-red-500"
          >
            {errors.comment}
          </p>
        )}
      </div>

      {status === "error" && (
        <div
          role="alert"
          className="rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-600"
        >
          Something went wrong sending your message.
          Please try again or contact us directly on
          WhatsApp.
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-amber-400 px-8 py-3 text-sm font-semibold text-stone-900 transition-all hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" && (
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 animate-spin"
            aria-hidden="true"
          >
            <circle
              cx="12"
              cy="12"
              r="9"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              opacity="0.25"
            />

            <path
              d="M21 12a9 9 0 00-9-9"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        )}

        {status === "loading"
          ? "Sending..."
          : "Submit"}

        {status !== "loading" && (
          <span aria-hidden="true">→</span>
        )}
      </button>
    </form>
  );
}

/* -------------------------------------------------------------------------- */
/* Contact + Office Information                                               */
/* -------------------------------------------------------------------------- */

function ContactAndInfo() {
  return (
    <Reveal className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-2">
        {/* Form */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">
            Send an enquiry
          </p>

          <h2 className="mt-2 text-2xl font-bold text-stone-900 sm:text-3xl">
            Contact Us
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-stone-500">
            Have a question about a tour or want help planning
            your trip? Send us a message and our travel team
            will get back to you.
          </p>

          <div className="mt-7">
            <FormSection />
          </div>
        </div>

        {/* Information */}
        <div>
          <h3 className="text-xl font-semibold text-stone-900">
            Need help?
          </h3>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-stone-500">
            Tell us roughly where you would like to go, when
            you are thinking of travelling, and how many people
            are in your group. If you were already looking at a
            specific tour, mention its name here too — it helps
            us reply with something useful on the first message
            instead of a round of back and forth.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* Office */}
            <div className="rounded-2xl border border-stone-100 bg-white p-6 shadow-sm">
              <h4 className="text-base font-semibold text-stone-900">
                Our office
              </h4>

              <div className="mt-4 flex gap-3">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="mt-0.5 h-5 w-5 shrink-0 text-amber-500"
                  aria-hidden="true"
                >
                  <path
                    d="M12 21.5s7-6.13 7-11.5a7 7 0 10-14 0c0 5.37 7 11.5 7 11.5z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />

                  <circle
                    cx="12"
                    cy="10"
                    r="2.4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                </svg>

                <p className="text-sm leading-relaxed text-stone-500">
                  {OFFICE_LINES.map((line) => (
                    <span
                      key={line}
                      className="block"
                    >
                      {line}
                    </span>
                  ))}
                </p>
              </div>

              <div className="mt-5 flex gap-3">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="mt-0.5 h-5 w-5 shrink-0 text-amber-500"
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
                    d="M12 7.5V12l3 2"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <p className="text-sm leading-relaxed text-stone-500">
                  {HOURS_LINES.map((line) => (
                    <span
                      key={line}
                      className="block"
                    >
                      {line}
                    </span>
                  ))}
                </p>
              </div>
            </div>

            {/* Registration */}
            <div className="rounded-2xl border border-amber-100 bg-amber-50/70 p-6">
              <h4 className="text-base font-semibold text-stone-900">
                Licensed and registered
              </h4>

              <p className="mt-4 text-sm leading-relaxed text-stone-600">
                Registered with the Sri Lanka Tourism
                Development Authority (licence #TA/0142)
                and a member of the Sri Lanka Association
                of Inbound Tour Operators.
              </p>
            </div>
          </div>

          {/* Direct contact */}
          <div className="mt-6 rounded-2xl bg-stone-50 p-6">
            <h4 className="text-base font-semibold text-stone-900">
              Prefer to contact us directly?
            </h4>

            <div className="mt-4 flex flex-col gap-3 text-sm">
              <a
                href="mailto:hello@achiilanka.com"
                className="text-stone-600 transition-colors hover:text-amber-600"
              >
                hello@achiilanka.com
              </a>

              <a
                href="tel:+94112345678"
                className="text-stone-600 transition-colors hover:text-amber-600"
              >
                +94 11 234 5678
              </a>

              <a
                href="https://wa.me/94771234567"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-emerald-700 transition-colors hover:text-emerald-900"
              >
                WhatsApp us →
              </a>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* -------------------------------------------------------------------------- */
/* Map                                                                        */
/* -------------------------------------------------------------------------- */

function MapSection() {
  return (
    <section aria-label="Office location">
      <div className="h-[420px] w-full border-y border-stone-100 sm:h-[520px]">
        <iframe
          title="Achii Lanka Tours office location"
          src={`https://www.google.com/maps?q=${encodeURIComponent(
            MAP_QUERY,
          )}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full grayscale-[10%]"
        />
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Footer                                                                     */
/* -------------------------------------------------------------------------- */

const FOOTER_COLUMNS = [
  {
    title: "Tours",
    links: [
      { label: "All Tours", href: "/tours" },
      { label: "Day Tours", href: "/tours?type=day" },
      { label: "Round Tours", href: "/tours?type=round" },
    ],
  },
  {
    title: "Navigation",
    links: [
      { label: "Home", href: "/" },
      { label: "Where to Go", href: "/explore" },
      { label: "What to Do", href: "/activities" },
      { label: "Reach Us", href: "/contact" },
      { label: "Our Story", href: "/about" },
    ],
  },
  {
    title: "Explore",
    links: [
      {
        label: "Beaches",
        href: "/explore?experience=beaches",
      },
      {
        label: "Hill Country",
        href: "/explore?experience=hill-country",
      },
      {
        label: "Wildlife",
        href: "/explore?experience=wildlife",
      },
      {
        label: "Heritage & Culture",
        href: "/explore?experience=heritage",
      },
      {
        label: "Tea Trails",
        href: "/explore?experience=tea-trails",
      },
    ],
  },
];

function Footer() {
  return (
    <footer className="overflow-hidden bg-stone-100 pt-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-5 lg:px-8">
        {/* Brand */}
        <div className="md:col-span-2 lg:col-span-2">
          <a
            href="/"
            className="text-lg font-semibold tracking-tight text-stone-900"
          >
            Achii Lanka{" "}
            <span className="text-amber-500">Tours</span>
          </a>

          <p className="mt-4 max-w-sm text-sm leading-7 text-stone-500">
            A Sri Lankan tour operator based in Colombo. We
            run our own tours, with our own drivers and guides
            so the people you book with are the people who look
            after you here.
          </p>

          <a
            href="/plan-my-trip"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-400 px-5 py-2.5 text-sm font-semibold text-stone-900 transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            Plan My Trip
            <span aria-hidden="true">→</span>
          </a>
        </div>

        {/* Columns */}
        {FOOTER_COLUMNS.map((column) => (
          <div key={column.title}>
            <h3 className="text-sm font-semibold text-stone-900">
              {column.title}
            </h3>

            <ul className="mt-4 space-y-2.5">
              {column.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-stone-500 transition-colors hover:text-amber-600"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Contact */}
        <div>
          <h3 className="text-sm font-semibold text-stone-900">
            Contact us
          </h3>

          <div className="mt-4 space-y-3 text-sm text-stone-500">
            <a
              href="tel:1-677-124-44227"
              className="block hover:text-amber-600"
            >
              1-677-124-44227
            </a>

            <p>
              Eighth Avenue 487,
              <br />
              New York
            </p>

            <a
              href="mailto:info@achiilanka.com"
              className="block hover:text-amber-600"
            >
              info@achiilanka.com
            </a>
          </div>

          <h3 className="mt-7 text-sm font-semibold text-stone-900">
            Social Media
          </h3>

          <div className="mt-3 flex gap-4 text-sm text-stone-500">
            <a
              href="#"
              aria-label="Facebook"
              className="transition-colors hover:text-amber-600"
            >
              Facebook
            </a>

            <a
              href="#"
              aria-label="Instagram"
              className="transition-colors hover:text-amber-600"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mx-auto mt-12 max-w-7xl border-t border-stone-200 px-4 py-5 text-xs text-stone-400 sm:px-6 lg:px-8">
        © 2026 Achii Lanka Tours — All rights reserved.
      </div>

      {/* Decorative footer image */}
      <div className="relative h-40 overflow-hidden sm:h-56">
        <img
          src="https://picsum.photos/seed/achii-contact-footer/1800/500"
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-stone-100 via-stone-100/40 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 text-center">
          <span className="text-[7rem] font-bold leading-none tracking-tight text-white/30 sm:text-[11rem]">
            Achii
          </span>
        </div>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

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