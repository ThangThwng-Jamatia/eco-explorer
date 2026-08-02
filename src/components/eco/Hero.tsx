import { motion } from "motion/react";
import { ArrowDown, Leaf, QrCode } from "lucide-react";
import shopImg from "@/assets/ecowear-shop.png";

function Cloud({ top, delay, dur, scale }: { top: string; delay: number; dur: number; scale: number }) {
  return (
    <div
      className="animate-drift pointer-events-none absolute left-0 opacity-80"
      style={{ top, animationDuration: `${dur}s`, animationDelay: `${delay}s`, transform: `scale(${scale})` }}
      aria-hidden
    >
      <svg width="120" height="52" viewBox="0 0 120 52" fill="none">
        <ellipse cx="38" cy="34" rx="30" ry="18" fill="white" />
        <ellipse cx="66" cy="26" rx="26" ry="20" fill="white" />
        <ellipse cx="90" cy="36" rx="24" ry="15" fill="white" />
      </svg>
    </div>
  );
}

function Leaf_({
  left,
  delay,
  dur,
  scale,
}: {
  left: string;
  delay: number;
  dur: number;
  scale: number;
}) {
  return (
    <motion.div
      className="pointer-events-none absolute top-[-40px] text-leaf/70"
      style={{ left }}
      initial={{ y: -40, opacity: 0, rotate: 0 }}
      animate={{ y: "620px", opacity: [0, 1, 1, 0], rotate: 360, x: [0, 18, -14, 0] }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: "linear" }}
      aria-hidden
    >
      <Leaf className="h-5 w-5" style={{ transform: `scale(${scale})` }} />
    </motion.div>
  );
}

function Bird({ top, left, delay }: { top: string; left: string; delay: number }) {
  return (
    <motion.svg
      className="pointer-events-none absolute text-forest/50"
      style={{ top, left }}
      width="34"
      height="16"
      viewBox="0 0 34 16"
      fill="none"
      animate={{ x: [0, 40, 0], y: [0, -14, 0] }}
      transition={{ duration: 9, delay, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden
    >
      <path d="M1 10c5 0 7-7 8-7s3 7 8 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M17 10c5 0 7-6 8-6s3 6 8 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </motion.svg>
  );
}

export function Hero() {
  return (
    <section id="home" className="bg-hero-sky relative overflow-hidden px-5 pt-20 pb-16 sm:pt-28">
      {/* sun */}
      <div className="pointer-events-none absolute top-10 right-6 sm:right-20" aria-hidden>
        <div className="animate-spin-slow bg-sun-gradient h-24 w-24 rounded-full opacity-90 blur-[1px] sm:h-32 sm:w-32" />
        <div className="animate-ray bg-sun absolute inset-0 -z-10 rounded-full blur-3xl" />
      </div>
      <Cloud top="12%" delay={0} dur={48} scale={1} />
      <Cloud top="26%" delay={12} dur={70} scale={0.7} />
      <Cloud top="6%" delay={26} dur={60} scale={1.3} />
      <Bird top="22%" left="18%" delay={0} />
      <Bird top="30%" left="60%" delay={2.5} />
      <Leaf_ left="8%" delay={0} dur={11} scale={1} />
      <Leaf_ left="34%" delay={3.5} dur={13} scale={0.75} />
      <Leaf_ left="72%" delay={1.5} dur={12} scale={1.1} />
      <Leaf_ left="88%" delay={6} dur={10} scale={0.85} />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-card/80 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-forest uppercase shadow-soft">
            <QrCode className="h-4 w-4" /> Scan · Explore · Learn
          </span>
          <h1 className="mt-5 flex flex-wrap gap-x-3 text-4xl leading-[1.05] text-forest sm:text-6xl">
            {["Green", "Business", "Model"].map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                {word}
              </motion.span>
            ))}
          </h1>
          <p className="mt-4 max-w-md text-lg text-secondary-foreground">
            Sustainable Today. <span className="text-emerald font-semibold">Better Tomorrow.</span>
          </p>
          <p className="mt-3 max-w-md text-sm text-muted-foreground">
            An interactive digital extension of the EcoWear clothes rental model — solar power,
            rainwater harvesting, waste segregation and eco-friendly practices, all in one tour.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <motion.a
              href="#intro"
              className="bg-leaf-gradient inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft"
              whileHover={{ scale: 1.05, y: -2, boxShadow: "0 12px 30px -8px oklch(0.45 0.14 150 / 0.55)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <Leaf className="h-4 w-4" /> Explore Project
            </motion.a>
            <motion.a
              href="#quiz"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-forest"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              Play the Mini Game
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="animate-float">
            <img
              src={shopImg}
              alt="Illustration of the EcoWear clothes rental shop with solar panels and a rainwater tank"
              width={1408}
              height={1008}
              className="w-full drop-shadow-xl"
            />
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#intro"
        className="relative mx-auto mt-10 flex w-fit flex-col items-center gap-1 text-xs font-medium tracking-widest text-forest/70 uppercase"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      >
        Scroll
        <ArrowDown className="h-4 w-4" />
      </motion.a>
    </section>
  );
}
