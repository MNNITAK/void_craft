import type { Metadata } from "next";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://voidcraft.agency"),
  title: "Void Craft — Building Intelligent Businesses",
  description:
    "Void Craft is an AI and software agency. We design and ship the AI agents, automations, and products that let ambitious companies operate beyond their headcount.",
  keywords: [
    "AI agency",
    "AI automation",
    "AI voice agents",
    "custom software",
    "SaaS development",
    "workflow automation",
  ],
  openGraph: {
    title: "Void Craft — Building Intelligent Businesses",
    description:
      "The AI and software agency behind intelligent businesses. Automation, agents, and world-class products.",
    type: "website",
    url: "https://voidcraft.agency",
    siteName: "Void Craft",
  },
  twitter: {
    card: "summary_large_image",
    title: "Void Craft — Building Intelligent Businesses",
    description:
      "The AI and software agency behind intelligent businesses.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${interTight.variable} ${inter.variable} ${jetbrainsMono.variable} bg-void font-sans text-bone antialiased`}
      >
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
