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
import { CONTACT_EMAIL, gmailComposeUrl } from "@/lib/contact";

type ContactContextValue = { openForm: () => void; closeForm: () => void };

const ContactContext = createContext<ContactContextValue | null>(null);

export function useContact() {
  const ctx = useContext(ContactContext);
  if (!ctx) throw new Error("useContact must be used within <ContactProvider>");
  return ctx;
}

const EASE = [0.16, 1, 0.3, 1] as const;

const budgets = [
  "Not sure yet",
  "Under ₹1L",
  "₹1L – ₹5L",
  "₹5L – ₹15L",
  "₹15L+",
];

export default function ContactProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openForm = useCallback(() => setOpen(true), []);
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const company = String(data.get("company") || "").trim();
    const email = String(data.get("email") || "").trim();
    const project = String(data.get("project") || "").trim();
    const meet = String(data.get("meet") || "").trim();
    const budget = String(data.get("budget") || "").trim();

    const body = `Hi Void Craft,

We'd like to start a project with you.

• Name: ${name || "—"}
• Business: ${company || "—"}
• Email: ${email || "—"}

What we want you to build:
${project || "—"}

Preferred time for a Google Meet:
${meet || "—"}

Budget range: ${budget || "—"}

Looking forward to hearing from you.

Thanks,
${name || "[Your name]"}`;

    const url = gmailComposeUrl({
      subject: `New project enquiry${company ? ` — ${company}` : ""}`,
      body,
    });
    window.open(url, "_blank", "noopener,noreferrer");
    setOpen(false);
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
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-bone/15 text-bone/70 transition-colors hover:border-bone/40 hover:text-bone"
              >
                ✕
              </button>

              <div className="relative">
                <span className="font-mono text-[10px] uppercase tracking-micro text-volt-soft">
                  Start a project
                </span>
                <h2 className="headline mt-3 text-2xl font-semibold text-bone sm:text-3xl">
                  Tell us what to build.
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-mist">
                  A few details and a time to talk — we'll come back within 48
                  hours. Submitting opens a ready-to-send email in Gmail.
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

                  <button
                    type="submit"
                    className="group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-volt px-8 py-4 text-base font-medium text-white transition-colors duration-300 hover:bg-volt-deep"
                  >
                    Send project brief
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </button>

                  <p className="text-center font-mono text-[10px] uppercase tracking-micro text-mist/50">
                    Or email us directly · {CONTACT_EMAIL}
                  </p>
                </form>
              </div>
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
