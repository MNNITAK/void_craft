"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CONTACT_EMAIL } from "@/lib/contact";

type ContactContextValue = { openForm: () => void; closeForm: () => void };

const ContactContext = createContext<ContactContextValue | null>(null);

export function useContact() {
  const ctx = useContext(ContactContext);
  if (!ctx) throw new Error("useContact must be used within <ContactProvider>");
  return ctx;
}

const EASE = [0.16, 1, 0.3, 1] as const;

/* FormSubmit delivers the brief straight to the inbox from its own
   authenticated servers — no visitor mail client, so it doesn't get
   flagged as spam the way the old mailto/Gmail-compose draft did. */
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;

const AUTORESPONSE = `Hi,

Thanks for reaching out to Void Craft — your brief is in.

Here's what happens next:
- Within 48 hours: a short written response with how we'd approach it.
- A 30-minute Google Meet to walk through scope, timeline and a realistic cost.
- A build plan with the numbers behind it, and week-one value.

Prefer email? Just reply to this message.

— Void Craft
voidcraft.admin@gmail.com`;

const budgets = [
  "Not sure yet",
  "Under ₹1L",
  "₹1L – ₹5L",
  "₹5L – ₹15L",
  "₹15L+",
];

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  const openForm = useCallback(() => {
    setStatus("idle");
    setOpen(true);
  }, []);
  const closeForm = useCallback(() => setOpen(false), []);

  // lock scroll + close on Escape while the modal is open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") || "").trim();
    const company = String(data.get("company") || "").trim();
    const email = String(data.get("email") || "").trim();

    setStatus("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          Name: name,
          Business: company || "—",
          Email: email,
          "What they want built": String(data.get("project") || "").trim(),
          "Preferred Google Meet time": String(data.get("meet") || "").trim() || "—",
          "Budget range": String(data.get("budget") || "").trim(),
          _subject: `New project enquiry${company ? ` — ${company}` : ""}`,
          _template: "table",
          _replyto: email,
          _autoresponse: AUTORESPONSE,
          _captcha: "false",
          // honeypot — bots fill this, humans never see it
          _honey: String(data.get("_honey") || ""),
        }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <ContactContext.Provider value={{ openForm, closeForm }}>
      {children}

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto p-4 sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label="Start a project with Void Craft"
          >
            {/* backdrop */}
            <div
              className="absolute inset-0 bg-void/80 backdrop-blur-md"
              onClick={closeForm}
            />

            <motion.div
              className="glass-dark relative my-auto w-full max-w-lg overflow-hidden rounded-3xl border border-bone/10 bg-void/90 p-6 shadow-2xl sm:p-8"
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              {/* volt glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-volt/25 blur-3xl"
              />

              <button
                type="button"
                onClick={closeForm}
                aria-label="Close"
                className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-bone/15 text-bone/70 transition-colors hover:border-bone/40 hover:text-bone"
              >
                ✕
              </button>

              {status === "sent" ? (
                <div className="relative py-6 text-center">
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-volt/15 text-2xl text-volt-soft">
                    ✓
                  </div>
                  <h2 className="headline mt-5 text-2xl font-semibold text-bone sm:text-3xl">
                    Brief received.
                  </h2>
                  <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-mist">
                    Thanks — it's landed in our inbox and a confirmation is on its
                    way to you. We'll come back within 48 hours with how we'd build
                    it.
                  </p>
                  <button
                    type="button"
                    onClick={closeForm}
                    className="mt-7 inline-flex items-center justify-center rounded-full bg-volt px-8 py-3.5 text-base font-medium text-white transition-colors duration-300 hover:bg-volt-deep"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <span className="font-mono text-[10px] uppercase tracking-micro text-volt-soft">
                    Start a project
                  </span>
                  <h2 className="headline mt-3 text-2xl font-semibold text-bone sm:text-3xl">
                    Tell us what to build.
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-mist">
                    A few details and a time to talk — we'll come back within 48
                    hours with how we'd approach it.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Your name" name="name" required autoFocus />
                      <Field label="Business" name="company" />
                    </div>
                    <Field
                      label="Email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@company.com"
                    />

                    <div>
                      <FieldLabel>What do you want us to make?</FieldLabel>
                      <textarea
                        name="project"
                        required
                        rows={4}
                        placeholder="e.g. an AI voice agent that books appointments, a customer dashboard, workflow automation…"
                        className="w-full resize-none rounded-xl border border-bone/15 bg-bone/[0.04] px-4 py-3 text-sm text-bone placeholder:text-mist/50 outline-none transition-colors focus:border-volt focus:bg-bone/[0.06]"
                      />
                    </div>

                    <Field
                      label="When works for a Google Meet?"
                      name="meet"
                      placeholder="e.g. Weekday afternoons, or Tue 24th around 4 PM IST"
                    />

                    <div>
                      <FieldLabel>Budget range</FieldLabel>
                      <select
                        name="budget"
                        defaultValue="Not sure yet"
                        className="w-full rounded-xl border border-bone/15 bg-bone/[0.04] px-4 py-3 text-sm text-bone outline-none transition-colors focus:border-volt focus:bg-bone/[0.06]"
                      >
                        {budgets.map((b) => (
                          <option key={b} value={b} className="bg-void text-bone">
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* honeypot: hidden from humans, catches bots */}
                    <input
                      type="text"
                      name="_honey"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      className="hidden"
                    />

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-volt px-8 py-4 text-base font-medium text-white transition-colors duration-300 hover:bg-volt-deep disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {status === "sending" ? "Sending…" : "Send project brief"}
                      {status !== "sending" && (
                        <span
                          aria-hidden="true"
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        >
                          →
                        </span>
                      )}
                    </button>

                    {status === "error" ? (
                      <p className="text-center text-xs leading-relaxed text-red-400">
                        Something went wrong sending that. Please email us directly
                        at{" "}
                        <a
                          href={`mailto:${CONTACT_EMAIL}`}
                          className="underline underline-offset-2"
                        >
                          {CONTACT_EMAIL}
                        </a>
                        .
                      </p>
                    ) : (
                      <p className="text-center font-mono text-[10px] uppercase tracking-micro text-mist/50">
                        Response within 48h · Or email {CONTACT_EMAIL}
                      </p>
                    )}
                  </form>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ContactContext.Provider>
  );
}

function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-micro text-mist/70">
      {children}
    </label>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  autoFocus = false,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoFocus?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <input
        name={name}
        type={type}
        required={required}
        autoFocus={autoFocus}
        placeholder={placeholder}
        className="w-full rounded-xl border border-bone/15 bg-bone/[0.04] px-4 py-3 text-sm text-bone placeholder:text-mist/50 outline-none transition-colors focus:border-volt focus:bg-bone/[0.06]"
      />
    </div>
  );
}
