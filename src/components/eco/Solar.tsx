import { motion } from "motion/react";
import { Sun, Zap, Store, Check } from "lucide-react";
import { Reveal, Section, SectionHeading, StatCard } from "./primitives";

const benefits = ["Clean Energy", "Renewable", "No Air Pollution", "Lower Electricity Cost"];

export function Solar() {
  return (
    <Section id="solar">
      <SectionHeading
        eyebrow="Solar Energy"
        title="Powering Our Shop, Naturally"
        subtitle="Sunlight falls on the rooftop panels, becomes electricity and runs the whole shop — no fuel, no smoke."
      />

      <Reveal className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-10">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {[
            { icon: Sun, label: "Sunlight", tone: "bg-sun-gradient" },
            { icon: Zap, label: "Solar panels", tone: "bg-leaf-gradient" },
            { icon: Zap, label: "Electricity", tone: "bg-leaf-gradient" },
            { icon: Store, label: "EcoWear shop", tone: "bg-leaf-gradient" },
          ].map((step, i) => (
            <div key={step.label} className="flex flex-1 flex-col items-center gap-3 sm:flex-row">
              <div className="flex flex-col items-center gap-2 text-center">
                <motion.span
                  className={`${step.tone} flex h-16 w-16 items-center justify-center rounded-2xl text-primary-foreground`}
                  animate={{ scale: [1, 1.07, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                >
                  <step.icon className="h-7 w-7" />
                </motion.span>
                <span className="text-xs font-semibold tracking-wide text-forest uppercase">
                  {step.label}
                </span>
              </div>
              {i < 3 ? (
                <div className="relative h-8 w-1 overflow-hidden rounded-full bg-secondary sm:h-1 sm:flex-1">
                  <motion.span
                    className="bg-sun absolute inset-0 rounded-full"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.3, ease: "linear" }}
                  />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </Reveal>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Reveal className="rounded-3xl border border-border bg-card p-7 shadow-soft">
          <h3 className="text-xl text-forest">How it works</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Solar panels are made of cells that absorb sunlight and release electrons, creating a
            direct current. An inverter converts it into the alternating current our shop uses. Extra
            energy goes back to the grid.
          </p>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {benefits.map((b) => (
              <li
                key={b}
                className="flex items-center gap-2 rounded-xl bg-secondary px-3 py-2 text-sm text-secondary-foreground"
              >
                <Check className="text-emerald h-4 w-4" /> {b}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard label="CO₂ saved / year" to={1450} suffix=" kg" />
          <StatCard label="Energy produced" to={6200} suffix=" kWh" />
          <StatCard label="Money saved" to={52000} suffix=" ₹" />
        </Reveal>
      </div>
    </Section>
  );
}
