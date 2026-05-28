import { createFileRoute } from "@tanstack/react-router";
import { Heart, ShieldCheck, Sparkles, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About EcoScouts — Trusted Cleaning in Zimbabwe" },
      { name: "description", content: "EcoScouts organizes Zimbabwe's informal cleaning industry into a safe, verified marketplace." },
    ],
  }),
});

function About() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:py-24">
      <p className="text-sm font-semibold text-primary">About EcoScouts</p>
      <h1 className="mt-2 font-display text-4xl font-extrabold sm:text-5xl">Cleaning, organised the Zimbabwean way.</h1>
      <p className="mt-5 text-lg text-muted-foreground">
        EcoScouts is a digital service platform that connects households and businesses with verified house cleaners and cleaning contractors in Zimbabwe. We don't replace the informal economy — we organize, verify and empower it.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {[
          { icon: ShieldCheck, t: "Trust first", d: "ID checks, references and community vouching." },
          { icon: Sparkles, t: "Quality service", d: "Specialized cleaning with clear pricing." },
          { icon: Users, t: "WhatsApp friendly", d: "Built for how Zimbabwe really uses the internet." },
          { icon: Heart, t: "Worker empowerment", d: "Training, savings groups and steady income." },
        ].map((v) => (
          <div key={v.t} className="rounded-2xl border border-border bg-card p-6">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
              <v.icon className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-semibold">{v.t}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{v.d}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-3xl bg-[image:var(--gradient-hero)] p-8 text-primary-foreground">
        <h2 className="font-display text-2xl font-bold">Our vision</h2>
        <p className="mt-2 text-primary-foreground/90">
          To become Zimbabwe's most trusted home services platform — transforming informal work into secure, professional, and technology-enabled employment opportunities.
        </p>
      </div>
    </div>
  );
}
