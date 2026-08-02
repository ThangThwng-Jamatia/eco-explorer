import { motion, useInView, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Section({
  id,
  children,
  className,
  tone = "default",
}: {
  id: string;
  children: ReactNode;
  className?: string;
  tone?: "default" | "cream" | "muted";
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-16 px-5 py-20 sm:py-28",
        tone === "cream" && "bg-cream",
        tone === "muted" && "bg-secondary/50",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <Reveal className="mb-12 text-center">
      <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-secondary-foreground uppercase">
        {eyebrow}
      </span>
      <h2 className="mt-4 text-3xl text-forest sm:text-5xl">{title}</h2>
      {subtitle ? (
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">{subtitle}</p>
      ) : null}
    </Reveal>
  );
}

export function useCountUp(target: number, duration = 1.6) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: duration * 1000, bounce: 0 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (inView) mv.set(target);
  }, [inView, mv, target]);

  useEffect(() => spring.on("change", (v) => setValue(v)), [spring]);

  return { ref, value };
}

export function Counter({
  to,
  suffix = "",
  decimals = 0,
}: {
  to: number;
  suffix?: string;
  decimals?: number;
}) {
  const { ref, value } = useCountUp(to);
  return (
    <span ref={ref} className="num">
      {value.toLocaleString(undefined, {
        maximumFractionDigits: decimals,
        minimumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

export function StatCard({
  label,
  to,
  suffix,
  decimals,
  icon,
}: {
  label: string;
  to: number;
  suffix?: string;
  decimals?: number;
  icon?: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 text-center shadow-soft">
      {icon ? <div className="mb-2 flex justify-center text-emerald">{icon}</div> : null}
      <div className="text-2xl font-bold text-forest sm:text-3xl">
        <Counter to={to} suffix={suffix} decimals={decimals} />
      </div>
      <div className="mt-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
        {label}
      </div>
    </div>
  );
}
