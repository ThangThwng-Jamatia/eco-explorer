import { createFileRoute } from "@tanstack/react-router";
import { TourNav } from "@/components/eco/TourNav";
import { Hero } from "@/components/eco/Hero";
import { Intro } from "@/components/eco/Intro";
import { InteractiveShop } from "@/components/eco/InteractiveShop";
import { Solar } from "@/components/eco/Solar";
import { Rainwater } from "@/components/eco/Rainwater";
import { WasteGame } from "@/components/eco/WasteGame";
import { Practices } from "@/components/eco/Practices";
import { Benefits } from "@/components/eco/Benefits";
import { ImpactDashboard } from "@/components/eco/ImpactDashboard";
import { Timeline } from "@/components/eco/Timeline";
import { Quiz } from "@/components/eco/Quiz";
import { Conclusion } from "@/components/eco/Conclusion";

const title = "Green Business Model — EcoWear Interactive Exhibition";
const description =
  "Scan, explore and learn: an interactive tour of the EcoWear green business model — solar energy, rainwater harvesting, waste management and eco-friendly practices.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main>
      <TourNav />
      
      <Hero />
      <Intro />
      <InteractiveShop />
      <Solar />
      <Rainwater />
      <WasteGame />
      <Practices />
      <Benefits />
      <ImpactDashboard />
      <Timeline />
      <Quiz />
      <Conclusion />
      <footer className="border-t border-border bg-secondary/60 py-8 text-center text-xs text-muted-foreground">
        Green Business Model · EcoWear Clothes Rental Shop · Sustainable Today, Better Tomorrow
      </footer>
    </main>
  );
}
