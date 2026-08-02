import { motion } from "motion/react";
import { ShoppingBag, Ban, Truck, Sprout, Trees, Lightbulb } from "lucide-react";
import { Section, SectionHeading } from "./primitives";

const practices = [
  { icon: ShoppingBag, title: "Reusable Bags", body: "Cloth and recyclable paper bags instead of plastic." },
  { icon: Ban, title: "No Plastic", body: "We avoid single-use plastic across the whole shop." },
  { icon: Truck, title: "Eco Delivery", body: "Deliveries run on low-emission electric vehicles." },
  { icon: Sprout, title: "Plantation", body: "We plant trees regularly and encourage our team to do the same." },
  { icon: Trees, title: "Green Landscaping", body: "Gardens and planters keep the surroundings alive." },
  { icon: Lightbulb, title: "Energy Saving", body: "Efficient appliances and mindful energy habits." },
];

export function Practices() {
  return (
    <Section id="practices" tone="cream">
      <SectionHeading
        eyebrow="Eco-Friendly Practices"
        title="Small Steps, Big Change"
        subtitle="Every step of the EcoWear business is designed to protect the environment."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {practices.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.06, duration: 0.5 }}
            whileHover={{ y: -8 }}
            className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-soft transition-shadow hover:shadow-glow"
          >
            <span className="bg-leaf-gradient flex h-12 w-12 items-center justify-center rounded-2xl text-primary-foreground">
              <p.icon className="h-6 w-6" />
            </span>
            <h3 className="mt-4 text-lg text-forest">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            <motion.span
              className="text-leaf pointer-events-none absolute -right-2 -bottom-2 opacity-0 transition-opacity group-hover:opacity-100"
              animate={{ y: [0, -10, 0], rotate: [0, 12, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              aria-hidden
            >
              <Sprout className="h-16 w-16" />
            </motion.span>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
