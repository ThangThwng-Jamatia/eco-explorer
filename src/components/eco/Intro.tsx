import { Leaf, Recycle, Droplets, Users, Target } from "lucide-react";
import { Reveal, Section, SectionHeading } from "./primitives";

const aims = [
  { icon: Leaf, text: "Reduce pollution" },
  { icon: Droplets, text: "Save energy and water" },
  { icon: Recycle, text: "Promote recycling" },
  { icon: Target, text: "Encourage sustainable fashion" },
  { icon: Users, text: "Inspire responsible consumers" },
];

export function Intro() {
  return (
    <Section id="intro">
      <SectionHeading
        eyebrow="Introduction"
        title="What is a Green Business?"
        subtitle="A company that earns profit while protecting nature — reducing pollution, saving resources and encouraging recycling at every step."
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <Reveal className="rounded-3xl border border-border bg-card p-7 shadow-soft">
          <h3 className="text-xl text-forest">The idea</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Unlike traditional businesses, green businesses think about the environment during every
            step of production, packaging, transportation and waste management.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Our model represents <span className="font-semibold text-emerald">EcoWear</span>, a
            clothing rental business that follows eco-friendly practices — the physical exhibit and
            this website are two halves of the same story.
          </p>
          <div className="mt-6 rounded-2xl bg-secondary p-5 text-center">
            <p className="font-display text-lg text-forest">
              “Small sustainable actions today create a better tomorrow.”
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="rounded-3xl border border-border bg-card p-7 shadow-soft">
          <h3 className="text-xl text-forest">Aim of this project</h3>
          <ul className="mt-4 space-y-3">
            {aims.map(({ icon: Icon, text }) => (
              <li
                key={text}
                className="flex items-center gap-3 rounded-xl border border-dashed border-border px-4 py-3 text-sm text-secondary-foreground"
              >
                <span className="bg-leaf-gradient flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-primary-foreground">
                  <Icon className="h-4 w-4" />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
