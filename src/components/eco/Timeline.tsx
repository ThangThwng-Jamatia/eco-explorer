import { Factory, Trash2, Sun, Recycle, Trees, Droplets } from "lucide-react";
import { Reveal, Section, SectionHeading } from "./primitives";

const oldWay = [
  { icon: Factory, text: "Smoke and air pollution" },
  { icon: Trash2, text: "Plastic packaging and landfill waste" },
  { icon: Droplets, text: "Heavy water consumption" },
];

const newWay = [
  { icon: Sun, text: "Solar powered operations" },
  { icon: Recycle, text: "Recycling and waste segregation" },
  { icon: Trees, text: "Trees, gardens and clean surroundings" },
];

export function Timeline() {
  return (
    <Section id="timeline">
      <SectionHeading
        eyebrow="Timeline"
        title="Traditional Business → Green Business"
        subtitle="The same business, reimagined for the planet."
      />
      <div className="grid items-stretch gap-6 lg:grid-cols-[1fr_auto_1fr]">
        <Reveal className="rounded-3xl border border-border bg-muted p-7">
          <h3 className="text-lg text-muted-foreground">Traditional</h3>
          <ul className="mt-4 space-y-3">
            {oldWay.map((o) => (
              <li key={o.text} className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="bg-smoke flex h-9 w-9 items-center justify-center rounded-xl text-primary-foreground">
                  <o.icon className="h-4 w-4" />
                </span>
                {o.text}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="flex items-center justify-center">
          <span className="bg-leaf-gradient rounded-full px-5 py-2 text-sm font-semibold text-primary-foreground shadow-soft">
            →
          </span>
        </div>

        <Reveal delay={0.1} className="rounded-3xl border border-border bg-card p-7 shadow-soft">
          <h3 className="text-lg text-forest">Green</h3>
          <ul className="mt-4 space-y-3">
            {newWay.map((n) => (
              <li key={n.text} className="flex items-center gap-3 text-sm text-secondary-foreground">
                <span className="bg-leaf-gradient flex h-9 w-9 items-center justify-center rounded-xl text-primary-foreground">
                  <n.icon className="h-4 w-4" />
                </span>
                {n.text}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
