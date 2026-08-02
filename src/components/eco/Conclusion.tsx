import { motion } from "motion/react";
import { Globe2, RotateCcw } from "lucide-react";
import { Reveal, Section } from "./primitives";

const keys = ["Reduce", "Reuse", "Recycle", "Respect Nature", "Protect Earth"];

export function Conclusion() {
  return (
    <Section id="thankyou">
      <Reveal className="rounded-[2rem] border border-border bg-card p-8 text-center shadow-soft sm:p-14">
        <motion.span
          className="bg-sky mx-auto flex h-24 w-24 items-center justify-center rounded-full text-primary-foreground"
          animate={{ rotate: 360 }}
          transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        >
          <Globe2 className="h-12 w-12" />
        </motion.span>

        <h2 className="mt-6 text-3xl text-forest sm:text-5xl">Thank You</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
          Green businesses are the need of today and the hope for tomorrow. Our EcoWear model shows how
          renewable energy, water conservation, waste management and responsible consumers can build a
          cleaner, greener world.
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-2">
          {keys.map((k) => (
            <span
              key={k}
              className="rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground"
            >
              {k}
            </span>
          ))}
        </div>

        <p className="font-display mt-8 text-lg text-emerald">
          Together we can build a sustainable future.
        </p>

        <a
          href="#home"
          className="bg-leaf-gradient mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5"
        >
          <RotateCcw className="h-4 w-4" /> Restart Tour
        </a>
      </Reveal>
    </Section>
  );
}
