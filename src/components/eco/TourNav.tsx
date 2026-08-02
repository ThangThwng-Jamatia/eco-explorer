import { motion, useScroll } from "motion/react";
import { Leaf } from "lucide-react";

const links = [
  { href: "#intro", label: "Intro" },
  { href: "#shop", label: "Shop" },
  { href: "#solar", label: "Solar" },
  { href: "#rainwater", label: "Water" },
  { href: "#waste", label: "Waste" },
  { href: "#practices", label: "Practices" },
  { href: "#benefits", label: "Benefits" },
  { href: "#impact", label: "Impact" },
  { href: "#quiz", label: "Game" },
];

export function TourNav() {
  const { scrollYProgress } = useScroll();
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3">
        <a href="#home" className="flex items-center gap-2 text-sm font-bold text-forest">
          <span className="bg-leaf-gradient flex h-7 w-7 items-center justify-center rounded-lg text-primary-foreground">
            <Leaf className="h-4 w-4" />
          </span>
          EcoWear
        </a>
        <nav className="flex flex-1 gap-1 overflow-x-auto text-xs font-medium text-muted-foreground">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-1.5 whitespace-nowrap transition-colors hover:bg-secondary hover:text-forest"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
      <motion.div
        className="bg-leaf-gradient h-1 origin-left"
        style={{ scaleX: scrollYProgress }}
      />
    </header>
  );
}
