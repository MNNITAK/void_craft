"use client";

import { motion, useReducedMotion } from "framer-motion";

type WordRevealProps = {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
};

/** Masked word-by-word rise, like premium hero headlines. */
export default function WordReveal({
  text,
  className,
  delay = 0,
  as: Tag = "h1",
}: WordRevealProps) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom"
          aria-hidden="true"
        >
          <motion.span
            className="inline-block will-change-transform"
            initial={reduced ? { opacity: 0 } : { y: "110%" }}
            animate={reduced ? { opacity: 1 } : { y: "0%" }}
            transition={{
              duration: 0.9,
              delay: delay + i * 0.055,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
