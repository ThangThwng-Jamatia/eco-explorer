import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { RotateCcw, Trash2, Truck, Factory, Recycle, ShoppingBag } from "lucide-react";
import { Reveal, Section, SectionHeading } from "./primitives";

type Bin = "paper" | "plastic" | "textiles";

const items: { id: string; label: string; bin: Bin }[] = [
  { id: "news", label: "Newspaper", bin: "paper" },
  { id: "bottle", label: "Plastic bottle", bin: "plastic" },
  { id: "tshirt", label: "Old T-shirt", bin: "textiles" },
  { id: "carton", label: "Cardboard carton", bin: "paper" },
  { id: "wrapper", label: "Snack wrapper", bin: "plastic" },
  { id: "jeans", label: "Torn jeans", bin: "textiles" },
];

const bins: { id: Bin; label: string; hint: string }[] = [
  { id: "paper", label: "Paper", hint: "Newspapers, books, cartons" },
  { id: "plastic", label: "Plastic", hint: "Bottles, bags, wrappers" },
  { id: "textiles", label: "Textiles", hint: "Old clothes, fabric pieces" },
];

const cycle = [
  { icon: Trash2, label: "Segregate" },
  { icon: Truck, label: "Collect" },
  { icon: Factory, label: "Process" },
  { icon: Recycle, label: "Recycle" },
  { icon: ShoppingBag, label: "New product" },
];

function Confetti() {
  const pieces = useMemo(
    () => Array.from({ length: 24 }).map((_, i) => ({ i, x: Math.random() * 100, d: Math.random() })),
    [],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {pieces.map((p) => (
        <motion.span
          key={p.i}
          className={p.i % 2 ? "bg-leaf absolute h-2 w-2 rounded-sm" : "bg-sun absolute h-2 w-2 rounded-full"}
          style={{ left: `${p.x}%`, top: "10%" }}
          initial={{ opacity: 1, y: 0, rotate: 0 }}
          animate={{ opacity: 0, y: 220, rotate: 360 }}
          transition={{ duration: 1.2 + p.d, ease: "easeIn" }}
        />
      ))}
    </div>
  );
}

export function WasteGame() {
  const [placed, setPlaced] = useState<Record<string, boolean>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ ok: boolean; msg: string } | null>(null);
  const [burst, setBurst] = useState(0);

  const remaining = items.filter((i) => !placed[i.id]);
  const done = remaining.length === 0;

  function drop(bin: Bin, itemId: string | null) {
    if (!itemId) return;
    const item = items.find((i) => i.id === itemId);
    if (!item) return;
    if (item.bin === bin) {
      setPlaced((p) => ({ ...p, [itemId]: true }));
      setFeedback({ ok: true, msg: `Correct! ${item.label} goes in ${bin}.` });
      setBurst((b) => b + 1);
    } else {
      setFeedback({ ok: false, msg: `Not quite — try again with ${item.label}.` });
    }
    setSelected(null);
  }

  function reset() {
    setPlaced({});
    setSelected(null);
    setFeedback(null);
  }

  return (
    <Section id="waste">
      <SectionHeading
        eyebrow="Waste Management"
        title="Segregate Today, Recycle Tomorrow"
        subtitle="Drag a waste item into the right bin — or tap the item, then tap a bin."
      />

      <Reveal className="relative rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
        {burst > 0 ? <Confetti key={burst} /> : null}

        <div className="flex flex-wrap justify-center gap-3">
          {remaining.map((item) => (
            <button
              key={item.id}
              draggable
              onDragStart={(e) => e.dataTransfer.setData("text/plain", item.id)}
              onClick={() => setSelected(item.id === selected ? null : item.id)}
              className={`cursor-grab rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                selected === item.id
                  ? "border-transparent bg-leaf-gradient text-primary-foreground shadow-glow"
                  : "border-border bg-secondary text-secondary-foreground hover:-translate-y-0.5"
              }`}
            >
              {item.label}
            </button>
          ))}
          {done ? (
            <p className="text-sm font-semibold text-emerald">
              All sorted! Less waste, cleaner earth. 🌍
            </p>
          ) : null}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {bins.map((b) => (
            <div
              key={b.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                drop(b.id, e.dataTransfer.getData("text/plain"));
              }}
              onClick={() => drop(b.id, selected)}
              className="rounded-2xl border-2 border-dashed border-border bg-secondary/60 p-5 text-center transition-colors hover:border-emerald"
            >
              <Recycle className="mx-auto h-8 w-8 text-emerald" />
              <h3 className="mt-2 text-base text-forest">{b.label}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{b.hint}</p>
              <div className="mt-3 flex flex-wrap justify-center gap-1">
                {items
                  .filter((i) => i.bin === b.id && placed[i.id])
                  .map((i) => (
                    <span
                      key={i.id}
                      className="rounded-full bg-card px-2 py-1 text-[11px] text-muted-foreground"
                    >
                      {i.label}
                    </span>
                  ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between gap-4">
          <AnimatePresence mode="wait">
            {feedback ? (
              <motion.p
                key={feedback.msg}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`text-sm font-medium ${feedback.ok ? "text-emerald" : "text-destructive"}`}
              >
                {feedback.msg}
              </motion.p>
            ) : (
              <span className="text-sm text-muted-foreground">Pick an item to begin.</span>
            )}
          </AnimatePresence>
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-semibold text-forest"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </button>
        </div>
      </Reveal>

      <Reveal delay={0.1} className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-soft">
        <h3 className="text-center text-lg text-forest">The recycling cycle</h3>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          {cycle.map((c, i) => (
            <div key={c.label} className="flex items-center gap-3">
              <div className="flex w-24 flex-col items-center gap-2 text-center">
                <span className="bg-leaf-gradient flex h-12 w-12 items-center justify-center rounded-2xl text-primary-foreground">
                  <c.icon className="h-5 w-5" />
                </span>
                <span className="text-xs font-semibold text-forest">{c.label}</span>
              </div>
              {i < cycle.length - 1 ? <span className="text-emerald">→</span> : null}
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
