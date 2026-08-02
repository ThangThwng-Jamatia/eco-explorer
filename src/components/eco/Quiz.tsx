import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Award, RotateCcw } from "lucide-react";
import { Reveal, Section, SectionHeading } from "./primitives";

type Choice = { label: string; good: boolean; note: string };
type Step = { question: string; choices: Choice[] };

const steps: Step[] = [
  {
    question: "How will you power your shop?",
    choices: [
      { label: "Rooftop solar panels", good: true, note: "Clean, renewable and cheaper over time." },
      { label: "Diesel generator", good: false, note: "Burns fuel and pollutes the air." },
    ],
  },
  {
    question: "Where will your water come from?",
    choices: [
      { label: "Rainwater harvesting tank", good: true, note: "Saves freshwater and lowers bills." },
      { label: "Only municipal supply", good: false, note: "Misses free rainwater every monsoon." },
    ],
  },
  {
    question: "How will you pack customer orders?",
    choices: [
      { label: "Reusable cloth bags", good: true, note: "One cloth bag replaces hundreds of plastic ones." },
      { label: "Single-use plastic bags", good: false, note: "Plastic waste lingers for centuries." },
    ],
  },
  {
    question: "What surrounds your shop?",
    choices: [
      { label: "Trees and green landscaping", good: true, note: "Cleaner air, shade and biodiversity." },
      { label: "Concrete parking only", good: false, note: "Heat, dust and no habitat." },
    ],
  },
  {
    question: "How will you deliver orders?",
    choices: [
      { label: "Electric eco delivery van", good: true, note: "Low emissions on every trip." },
      { label: "Old petrol truck", good: false, note: "High fuel use and emissions." },
    ],
  },
];

function medal(score: number) {
  if (score >= 5) return { name: "Gold", copy: "A truly green business. Nature approves!" };
  if (score >= 3) return { name: "Silver", copy: "Strong start — a few greener swaps to go." };
  return { name: "Bronze", copy: "Good try! Revisit the sections and play again." };
}

export function Quiz() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [note, setNote] = useState<Choice | null>(null);

  const step = steps[index];
  const finished = index >= steps.length;

  function pick(c: Choice) {
    if (c.good) setScore((s) => s + 1);
    setNote(c);
    setTimeout(() => {
      setNote(null);
      setIndex((i) => i + 1);
    }, 1100);
  }

  function restart() {
    setIndex(0);
    setScore(0);
    setNote(null);
  }

  const result = medal(score);

  return (
    <Section id="quiz" tone="cream">
      <SectionHeading
        eyebrow="Mini Game"
        title="Can You Build a Green Business?"
        subtitle="Make five choices and earn your badge."
      />
      <Reveal className="mx-auto max-w-2xl rounded-3xl border border-border bg-card p-7 shadow-soft">
        <AnimatePresence mode="wait">
          {!finished && step ? (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
            >
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  Question {index + 1} of {steps.length}
                </span>
                <span className="num font-semibold text-forest">Score {score}</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
                <motion.div
                  className="bg-leaf-gradient h-full"
                  animate={{ width: `${(index / steps.length) * 100}%` }}
                />
              </div>
              <h3 className="mt-5 text-xl text-forest">{step.question}</h3>
              <div className="mt-5 grid gap-3">
                {step.choices.map((c) => (
                  <button
                    key={c.label}
                    onClick={() => pick(c)}
                    disabled={!!note}
                    className="rounded-2xl border border-border bg-secondary px-5 py-4 text-left text-sm font-medium text-secondary-foreground transition-all hover:-translate-y-0.5 hover:shadow-soft disabled:opacity-60"
                  >
                    {c.label}
                  </button>
                ))}
              </div>
              {note ? (
                <p
                  className={`mt-4 text-sm font-medium ${note.good ? "text-emerald" : "text-destructive"}`}
                >
                  {note.good ? "Great choice! " : "Hmm… "}
                  {note.note}
                </p>
              ) : null}
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <span className="bg-sun-gradient mx-auto flex h-20 w-20 items-center justify-center rounded-full text-primary-foreground">
                <Award className="h-9 w-9" />
              </span>
              <h3 className="mt-4 text-2xl text-forest">{result.name} Badge</h3>
              <p className="num mt-1 text-sm text-muted-foreground">
                {score} / {steps.length} green choices
              </p>
              <p className="mt-3 text-sm text-secondary-foreground">{result.copy}</p>
              <button
                onClick={restart}
                className="bg-leaf-gradient mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft"
              >
                <RotateCcw className="h-4 w-4" /> Play again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </Reveal>
    </Section>
  );
}
