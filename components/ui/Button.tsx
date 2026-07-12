"use client";

import { ReactNode } from "react";
import Magnetic from "@/components/motion/Magnetic";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "volt" | "bone" | "ghost-dark" | "ghost-light";
  size?: "md" | "lg";
  className?: string;
};

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-300 will-change-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-volt";

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  volt: "bg-volt text-white hover:bg-volt-deep",
  bone: "bg-bone text-bone-ink hover:bg-white",
  "ghost-dark":
    "border border-bone/15 text-bone hover:border-bone/40 hover:bg-bone/5",
  "ghost-light":
    "border border-bone-ink/15 text-bone-ink hover:border-bone-ink/40 hover:bg-bone-ink/5",
};

const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export default function Button({
  children,
  href = "#contact",
  variant = "volt",
  size = "md",
  className = "",
}: ButtonProps) {
  return (
    <Magnetic strength={0.25} className="inline-block">
      <a
        href={href}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      >
        {children}
        <span
          aria-hidden="true"
          className="inline-block transition-transform duration-300 group-hover:translate-x-1"
        >
          →
        </span>
      </a>
    </Magnetic>
  );
}
