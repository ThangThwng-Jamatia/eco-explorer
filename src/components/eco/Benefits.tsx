import { Leaf, TrendingUp, Users } from "lucide-react";
import { Reveal, Section, SectionHeading, StatCard } from "./primitives";

const columns = [
  {
    icon: Leaf,
    title: "Environment",
    items: [
      "Less air, water and soil pollution",
      "Lower carbon footprint",
      "Water conserved through harvesting",
      "Safer habitat for wildlife",
      "Cleaner, greener cities",
    ],
  },
  {
    icon: TrendingUp,
    title: "Economy",
    items: [
      "Lower electricity and water costs",
      "Long-term savings on resources",
      "Positive brand image",
      "More loyal customers",
      "Government incentives",
    ],
  },
  {
    icon: Users,
    title: "Society",
    items: [
      "Healthier communities",
      "Creates green jobs",
      "Encourages responsible living",
      "Better future for everyone",
      "Stronger community bonds",
    ],
  },
];

export function Benefits() {
  return (
    <Section id="benefits">
      <SectionHeading
        eyebrow="Benefits"
        title="Good for Nature, Good for Everyone"
        subtitle="A green business creates positive impact across environment, economy and society."
      />
      <div className="grid gap-5 lg:grid-cols-3">
        {columns.map((c, i) => (
          <Reveal
            key={c.title}
            delay={i * 0.08}
            className="rounded-3xl border border-border bg-card p-6 shadow-soft"
          >
            <div className="flex items-center gap-3">
              <span className="bg-leaf-gradient flex h-11 w-11 items-center justify-center rounded-2xl text-primary-foreground">
                <c.icon className="h-5 w-5" />
              </span>
              <h3 className="text-lg text-forest">{c.title}</h3>
            </div>
            <ul className="mt-4 space-y-2.5">
              {c.items.map((it) => (
                <li key={it} className="flex gap-2 text-sm text-muted-foreground">
                  <span className="bg-emerald mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" />
                  {it}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard label="Trees saved" to={340} />
        <StatCard label="Water saved (L)" to={48000} />
        <StatCard label="Waste reduced (kg)" to={2100} />
        <StatCard label="Carbon reduced (kg)" to={1450} />
        <StatCard label="Cleaner streets" to={12} />
      </div>
    </Section>
  );
}
