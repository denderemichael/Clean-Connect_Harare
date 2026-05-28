import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Star, ShieldCheck, MapPin, Search } from "lucide-react";

export const Route = createFileRoute("/cleaners")({
  component: Cleaners,
  head: () => ({
    meta: [
      { title: "Find Verified Cleaners in Harare — EcoScouts" },
      { name: "description", content: "Browse trusted, ID-verified house cleaners and contractors near you in Harare." },
    ],
  }),
});

const data = [
  { name: "Tendai Moyo", area: "Borrowdale", rating: 4.9, jobs: 142, price: 15, skills: ["Home", "Deep"] },
  { name: "Rumbidzai Sibanda", area: "Avondale", rating: 4.8, jobs: 98, price: 18, skills: ["Office", "Carpet"] },
  { name: "Blessing Ncube", area: "Mount Pleasant", rating: 5.0, jobs: 67, price: 20, skills: ["Move in/out"] },
  { name: "Chipo Dube", area: "Greendale", rating: 4.7, jobs: 211, price: 14, skills: ["Home"] },
  { name: "Farai Chikomo", area: "Highlands", rating: 4.9, jobs: 88, price: 22, skills: ["Deep", "Post-construction"] },
  { name: "Nyasha Mhuri", area: "Belvedere", rating: 4.6, jobs: 54, price: 13, skills: ["Home", "Office"] },
];

function Cleaners() {
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
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
      <h1 className="font-display text-4xl font-bold sm:text-5xl">Verified cleaners near you</h1>
      <p className="mt-2 text-muted-foreground">Every cleaner is ID-verified, reference-checked and rated by real Harare neighbours.</p>

      <div className="mt-8 grid gap-3 rounded-2xl border border-border bg-card p-3 shadow-[var(--shadow-card)] sm:grid-cols-[1fr_1fr_auto]">
        <div className="flex items-center gap-2 rounded-xl bg-secondary/60 px-3">
          <MapPin className="h-4 w-4 text-primary" />
          <input className="w-full bg-transparent py-3 text-sm outline-none" placeholder="Suburb" />
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-secondary/60 px-3">
          <Search className="h-4 w-4 text-primary" />
          <input className="w-full bg-transparent py-3 text-sm outline-none" placeholder="Service e.g. deep clean" />
        </div>
        <button className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">Search</button>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((c) => (
          <article key={c.name} className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] transition hover:-translate-y-1">
            <div className="relative h-32 bg-[image:var(--gradient-hero)]">
              <div className="absolute -bottom-8 left-5 grid h-16 w-16 place-items-center rounded-2xl border-4 border-card bg-card font-display text-xl font-bold text-primary">
                {c.name.charAt(0)}
              </div>
              <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-card/95 px-2.5 py-1 text-xs font-semibold backdrop-blur">
                <ShieldCheck className="h-3 w-3 text-primary" /> Verified
              </span>
            </div>
            <div className="px-5 pb-5 pt-10">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{c.name}</h3>
                <span className="inline-flex items-center gap-1 text-sm font-semibold">
                  <Star className="h-4 w-4 fill-accent text-accent" /> {c.rating}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{c.area} • {c.jobs} jobs</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {c.skills.map((s) => (
                  <span key={s} className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">{s}</span>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span><span className="font-display text-lg font-bold">${c.price}</span><span className="text-sm text-muted-foreground">/visit</span></span>
                <Link to="/book" className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">Book</Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
