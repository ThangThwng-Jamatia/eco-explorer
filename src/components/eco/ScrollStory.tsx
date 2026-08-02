import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sun, Zap, CloudRain, Recycle, Store } from "lucide-react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const frames = [
  {
    icon: Sun,
    tone: "bg-sun-gradient",
    eyebrow: "01 · Sunlight",
    title: "The sun rises over EcoWear",
    body: "Every day begins with free, clean energy pouring onto the rooftop.",
  },
  {
    icon: Zap,
    tone: "bg-leaf-gradient",
    eyebrow: "02 · Solar Power",
    title: "Panels turn light into power",
    body: "Rooftop solar cells convert sunlight into electricity that runs the entire shop.",
  },
  {
    icon: CloudRain,
    tone: "bg-sky",
    eyebrow: "03 · Rainwater",
    title: "Rain is caught, not wasted",
    body: "A harvesting system channels every monsoon drop into storage tanks below.",
  },
  {
    icon: Recycle,
    tone: "bg-leaf-gradient",
    eyebrow: "04 · Waste Sorted",
    title: "Nothing goes to landfill by accident",
    body: "Waste is separated at the source — recycled, composted, or reused.",
  },
  {
    icon: Store,
    tone: "bg-forest",
    eyebrow: "05 · The Shop Thrives",
    title: "A business that gives back",
    body: "Powered, watered and cleaned sustainably — EcoWear runs in harmony with the planet.",
  },
];

export function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const frameRefs = useRef<Array<HTMLDivElement | null>>([]);
  const dotRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useGSAP(
    () => {
      const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mql.matches) return;

      const panels = frameRefs.current.filter(Boolean) as HTMLDivElement[];
      if (!panels.length) return;

      const dots = dotRefs.current.filter(Boolean) as HTMLSpanElement[];

      gsap.set(panels, { opacity: 0, y: 40, scale: 0.96 });
      gsap.set(panels[0]!, { opacity: 1, y: 0, scale: 1 });
      gsap.set(dots[0] ?? null, { backgroundColor: "var(--forest)", width: "2.5rem" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=400%",
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      });

      panels.forEach((panel, i) => {
        if (i === 0) return;
        const prev = panels[i - 1]!;
        tl.to(prev, { opacity: 0, y: -40, scale: 0.96, duration: 0.5, ease: "power1.inOut" }, i - 0.5)
          .to(panel, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power1.inOut" }, i - 0.5)
          .to(dots[i - 1] ?? null, { backgroundColor: "transparent", width: "1.5rem", duration: 0.3 }, i - 0.5)
          .to(dots[i] ?? null, { backgroundColor: "var(--forest)", width: "2.5rem", duration: 0.3 }, i - 0.5);
      });

      if (progressRef.current) {
        tl.to(progressRef.current, { scaleX: 1, ease: "none", duration: panels.length }, 0);
      }
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      id="story"
      aria-label="How the EcoWear green business model works, told as a scroll-driven sequence"
      className="relative"
    >
      <div ref={trackRef} className="bg-hero-sky relative h-screen w-full overflow-hidden">
        <div
          ref={progressRef}
          className="bg-leaf-gradient absolute top-0 left-0 z-20 h-1 w-full origin-left scale-x-0"
          aria-hidden
        />

        {frames.map((frame, i) => (
          <div
            key={frame.title}
            ref={(el) => {
              frameRefs.current[i] = el;
            }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          >
            <span
              className={cn(
                "flex h-20 w-20 items-center justify-center rounded-3xl text-primary-foreground shadow-glow sm:h-28 sm:w-28",
                frame.tone,
              )}
            >
              <frame.icon className="h-10 w-10 sm:h-14 sm:w-14" />
            </span>
            <span className="mt-6 text-xs font-semibold tracking-[0.22em] text-forest/70 uppercase">
              {frame.eyebrow}
            </span>
            <h3 className="mt-3 max-w-2xl text-3xl text-forest sm:text-5xl">{frame.title}</h3>
            <p className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">{frame.body}</p>
          </div>
        ))}

        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2" aria-hidden>
          {frames.map((f, i) => (
            <span
              key={f.title}
              ref={(el) => {
                dotRefs.current[i] = el;
              }}
              className="h-1.5 w-6 rounded-full bg-forest/20"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
