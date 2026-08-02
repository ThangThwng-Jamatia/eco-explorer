import { motion } from "motion/react";
import { CloudRain, Home, Filter, Database, Sprout } from "lucide-react";
import { Reveal, Section, SectionHeading, StatCard } from "./primitives";

const steps = [
  { icon: CloudRain, title: "Rain falls", body: "Monsoon and seasonal rain lands on the shop roof." },
  { icon: Home, title: "Collected from roof", body: "Sloped gutters channel every drop toward the downpipe." },
  { icon: Filter, title: "Filtered through pipe", body: "A mesh filter removes leaves, dust and debris." },
  { icon: Database, title: "Stored in tank", body: "Clean water is stored in the covered harvesting tank." },
  { icon: Sprout, title: "Used every day", body: "Plant watering, cleaning, washing outdoor areas, gardening." },
];

export function Rainwater() {
  return (
    <Section id="rainwater" tone="muted">
      <SectionHeading
        eyebrow="Rainwater Harvesting"
        title="Save Water, Secure Future"
        subtitle="Collecting and storing rooftop rainwater so nothing is wasted."
      />

      <Reveal className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-soft">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {Array.from({ length: 26 }).map((_, i) => (
            <span
              key={i}
              className="bg-sky absolute top-0 h-3 w-0.5 rounded-full opacity-60"
              style={{
                left: `${(i * 3.8 + 2) % 100}%`,
                animation: `rain-fall ${1.2 + (i % 5) * 0.25}s linear ${(i % 7) * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
        <ol className="relative grid gap-4 md:grid-cols-5">
          {steps.map((s, i) => (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-border bg-card/90 p-4 text-center backdrop-blur"
            >
              <span className="bg-sky mx-auto flex h-11 w-11 items-center justify-center rounded-full text-primary-foreground">
                <s.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-3 text-sm text-forest">{`${i + 1}. ${s.title}`}</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{s.body}</p>
            </motion.li>
          ))}
        </ol>
      </Reveal>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatCard label="Water saved / year" to={48000} suffix=" L" />
        <StatCard label="Water bill reduced" to={35} suffix="%" />
        <StatCard label="Litres per 1mm rain" to={100} suffix=" L" />
      </div>

      <Reveal delay={0.1} className="mt-6 rounded-2xl border border-dashed border-border bg-card p-5 text-center">
        <p className="text-sm text-secondary-foreground">
          <span className="font-semibold text-forest">Did you know?</span> 1 mm of rainfall on a 100 m²
          roof can collect around 100 litres of water. Let's make every raindrop count.
        </p>
      </Reveal>
    </Section>
  );
}
