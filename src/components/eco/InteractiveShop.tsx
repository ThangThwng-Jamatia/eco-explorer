import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { X } from "lucide-react";
import shopImg from "@/assets/ecowear-shop.png";
import { Reveal, Section, SectionHeading } from "./primitives";

type Hotspot = {
  id: string;
  label: string;
  x: number;
  y: number;
  title: string;
  body: string;
};

const hotspots: Hotspot[] = [
  {
    id: "solar",
    label: "Solar panels",
    x: 64,
    y: 19,
    title: "Solar Panels",
    body: "Four rooftop panels convert sunlight into clean electricity that powers the shop's lights, billing counter and washing machines.",
  },
  {
    id: "tank",
    label: "Rainwater tank",
    x: 84,
    y: 68,
    title: "Rainwater Harvesting Tank",
    body: "Rain from the roof travels through pipes into this tank. The stored water is used for cleaning, gardening and watering plants.",
  },
  {
    id: "rack",
    label: "Rental rack",
    x: 45,
    y: 60,
    title: "Rent · Reuse · Return",
    body: "Instead of buying new clothes each time, customers rent an outfit, wear it, return it and we clean it for the next person.",
  },
  {
    id: "garden",
    label: "Green landscaping",
    x: 22,
    y: 74,
    title: "Trees & Green Landscaping",
    body: "Plants and trees around the shop clean the air, provide shade and support a healthy local environment.",
  },
  {
    id: "bag",
    label: "Cloth bags",
    x: 30,
    y: 60,
    title: "Reusable Cloth Bags",
    body: "We say no to single-use plastic. Every order goes home in a reusable cloth or recyclable paper bag.",
  },
];

export function InteractiveShop() {
  const [active, setActive] = useState<Hotspot | null>(null);

  return (
    <Section id="shop" tone="cream">
      <SectionHeading
        eyebrow="Interactive Model"
        title="Explore the EcoWear Shop"
        subtitle="Tap the glowing markers to discover each green feature of the model."
      />
      <Reveal className="relative mx-auto max-w-4xl">
        <div className="relative">
          <img
            src={shopImg}
            alt="EcoWear shop illustration with interactive markers"
            width={1408}
            height={1008}
            loading="lazy"
            className="w-full"
          />
          {hotspots.map((h) => (
            <button
              key={h.id}
              onClick={() => setActive(h)}
              aria-label={h.label}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${h.x}%`, top: `${h.y}%` }}
            >
              <span className="relative flex h-6 w-6 items-center justify-center">
                <span className="bg-emerald absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" />
                <span className="bg-leaf-gradient relative inline-flex h-5 w-5 rounded-full border-2 border-card shadow-glow transition-transform hover:scale-125" />
              </span>
            </button>
          ))}
        </div>

        <AnimatePresence>
          {active ? (
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              className="mt-4 rounded-2xl border border-border bg-card p-5 shadow-soft sm:absolute sm:right-0 sm:bottom-4 sm:mt-0 sm:max-w-xs"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-base text-forest">{active.title}</h3>
                <button onClick={() => setActive(null)} aria-label="Close">
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{active.body}</p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </Reveal>
    </Section>
  );
}
