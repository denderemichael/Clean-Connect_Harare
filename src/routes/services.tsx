import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Home, Sparkles, Truck, Building2, Brush, Hammer, ArrowRight, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/services")({
  component: Services,
  head: () => ({
    meta: [
      { title: "Cleaning Services in Harare — EcoScouts" },
      { name: "description", content: "Home, deep, office, carpet, move-in/out and post-construction cleaning across Harare." },
    ],
  }),
});

const services = [
  { icon: Home, title: "Home Cleaning", price: "from $15", desc: "Weekly or one-off tidy for busy households.", inc: ["Dusting & surfaces", "Floors & vacuuming", "Kitchen wipe-down", "Bathroom refresh"] },
  { icon: Sparkles, title: "Deep Cleaning", price: "from $45", desc: "Top-to-bottom refresh including hidden corners.", inc: ["Inside appliances", "Skirting & vents", "Windows interior", "Detailed bathrooms"] },
  { icon: Truck, title: "Move In / Out", price: "from $60", desc: "Spotless handover for tenants and landlords.", inc: ["Cabinets inside", "Walls spot-clean", "Full bathroom scrub", "Final inspection"] },
  { icon: Building2, title: "Office Cleaning", price: "from $35", desc: "Daily, weekly or one-off office cleans.", inc: ["Desks & boardrooms", "Bins & restocking", "Restrooms", "Common areas"] },
  { icon: Brush, title: "Carpet & Upholstery", price: "from $40", desc: "Stain removal and steam refresh.", inc: ["Spot treatment", "Steam clean", "Deodorise", "Quick-dry finish"] },
  { icon: Hammer, title: "Post-Construction", price: "from $80", desc: "Dust and debris cleanup after building.", inc: ["Heavy dust removal", "Paint & adhesive", "Window detailing", "Final polish"] },
];

function Services() {
  const { user, role, loading } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) nav({ to: "/login" });
    else if (role === "cleaner") nav({ to: "/cleaner-dashboard" });
  }, [loading, user, role, nav]);

  if (loading || !user || role === "cleaner") {
    return <div className="mx-auto max-w-7xl px-4 py-16 text-muted-foreground">Loading…</div>;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-20">
      <p className="text-sm font-semibold text-primary">Our services</p>
      <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">Pick what you need cleaned</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">Transparent pricing. Verified cleaners. Same-day availability across Harare suburbs.</p>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <article key={s.title} className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-[image:var(--gradient-hero)] text-primary-foreground">
              <s.icon className="h-6 w-6" />
            </span>
            <div className="mt-5 flex items-baseline justify-between">
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <span className="text-sm font-semibold text-primary">{s.price}</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
            <ul className="mt-4 space-y-2 text-sm">
              {s.inc.map((i) => (
                <li key={i} className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary" /> {i}
                </li>
              ))}
            </ul>
            <Link to="/book" className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary py-2.5 text-sm font-semibold text-primary-foreground">
              Book this service <ArrowRight className="h-4 w-4" />
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
