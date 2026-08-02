import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { motion } from "motion/react";
import { Reveal, Section, SectionHeading } from "./primitives";

const emissions = [
  { name: "Year 1", traditional: 100, green: 74 },
  { name: "Year 2", traditional: 104, green: 55 },
  { name: "Year 3", traditional: 108, green: 38 },
  { name: "Year 4", traditional: 112, green: 24 },
];

const energyMix = [
  { name: "Solar", value: 72 },
  { name: "Grid", value: 22 },
  { name: "Backup", value: 6 },
];

const pieColors = ["var(--color-chart-3)", "var(--color-chart-2)", "var(--color-chart-5)"];

const progress = [
  { label: "Waste reduction", value: 78 },
  { label: "Renewable energy share", value: 72 },
  { label: "Water reuse", value: 64 },
  { label: "Plastic-free packaging", value: 96 },
];

function Ring({ label, value }: { label: string; value: number }) {
  const c = 2 * Math.PI * 42;
  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="112" height="112" viewBox="0 0 100 100" className="-rotate-90">
        <circle cx="50" cy="50" r="42" fill="none" stroke="var(--color-secondary)" strokeWidth="10" />
        <motion.circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke="var(--color-emerald)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          whileInView={{ strokeDashoffset: c - (c * value) / 100 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
        <text
          x="50"
          y="50"
          textAnchor="middle"
          dominantBaseline="central"
          className="num rotate-90 fill-forest text-[20px] font-bold"
          style={{ transformOrigin: "50px 50px" }}
        >
          {value}%
        </text>
      </svg>
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

export function ImpactDashboard() {
  return (
    <Section id="impact" tone="muted">
      <SectionHeading
        eyebrow="Environmental Impact"
        title="The Numbers Behind the Model"
        subtitle="Comparing a traditional business with our green EcoWear model."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        <Reveal className="rounded-3xl border border-border bg-card p-6 shadow-soft">
          <h3 className="text-base text-forest">Carbon emissions (index)</h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={emissions}>
                <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid var(--color-border)",
                    background: "var(--color-card)",
                  }}
                />
                <Bar dataKey="traditional" fill="var(--color-chart-5)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="green" fill="var(--color-chart-1)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="rounded-3xl border border-border bg-card p-6 shadow-soft">
          <h3 className="text-base text-forest">Energy source mix</h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={energyMix} dataKey="value" innerRadius={55} outerRadius={90} paddingAngle={3}>
                  {energyMix.map((entry, i) => (
                    <Cell key={entry.name} fill={pieColors[i]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid var(--color-border)",
                    background: "var(--color-card)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 text-xs text-muted-foreground">
            {energyMix.map((e, i) => (
              <span key={e.name} className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: pieColors[i] }} />
                {e.name} {e.value}%
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.12} className="rounded-3xl border border-border bg-card p-6 shadow-soft">
          <h3 className="text-base text-forest">Progress towards our goals</h3>
          <div className="mt-5 space-y-4">
            {progress.map((p) => (
              <div key={p.label}>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{p.label}</span>
                  <span className="num font-semibold text-forest">{p.value}%</span>
                </div>
                <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-secondary">
                  <motion.div
                    className="bg-leaf-gradient h-full rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${p.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.16} className="rounded-3xl border border-border bg-card p-6 shadow-soft">
          <h3 className="text-base text-forest">Key indicators</h3>
          <div className="mt-5 flex flex-wrap justify-center gap-8">
            <Ring label="Water reused" value={64} />
            <Ring label="Waste recycled" value={82} />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
