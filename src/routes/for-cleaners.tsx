import { createFileRoute, Link } from "@tanstack/react-router";
import { Wallet, Award, Users, TrendingUp, ShieldCheck, GraduationCap, ArrowRight, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/for-cleaners")({
  component: ForCleaners,
  head: () => ({
    meta: [
      { title: "Earn With EcoScouts — For Cleaners" },
      { name: "description", content: "Get verified, receive job alerts in your area, fast EcoCash payouts, training and Mukando savings." },
    ],
  }),
});

const benefits = [
  { icon: TrendingUp, t: "Steady jobs", d: "Get matched with nearby clients every week." },
  { icon: Wallet, t: "Fast payment", d: "EcoCash payouts after every completed job." },
  { icon: Award, t: "Skill badges", d: "Stand out with verified skills & ratings." },
  { icon: GraduationCap, t: "Free training", d: "Mini-certifications to grow your craft." },
  { icon: Users, t: "Mukando savings", d: "Join trusted savings groups with peers." },
  { icon: ShieldCheck, t: "Verified profile", d: "Build trust and book more clients." },
];

function ForCleaners() {
  return (
    <>
      <section className="bg-[image:var(--gradient-soft)]">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Users className="h-3.5 w-3.5" /> 500+ cleaners earning with EcoScouts
            </span>
            <h1 className="mt-4 font-display text-4xl font-extrabold sm:text-5xl">
              Turn your skill into a <span className="bg-[image:var(--gradient-hero)] bg-clip-text text-transparent">steady income.</span>
            </h1>
            <p className="mt-4 max-w-lg text-muted-foreground">
              EcoScouts gives independent cleaners and small contractors a verified profile, regular jobs, fast payment and a path to grow.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/cleaner-signup" className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)]">
                Apply as a cleaner
              </Link>
              <a href="https://wa.me/263770000000" className="rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold">
                Apply on WhatsApp
              </a>
            </div>
          </div>
          <div className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <h3 className="font-display text-lg font-bold">Quick application</h3>
            <p className="text-sm text-muted-foreground">Takes 2 minutes — verification within 48h.</p>
            <form className="mt-5 space-y-3">
              <input className="w-full rounded-xl border border-border bg-background px-3 py-3 text-sm outline-none" placeholder="Full name" />
              <input className="w-full rounded-xl border border-border bg-background px-3 py-3 text-sm outline-none" placeholder="WhatsApp number" />
              <input className="w-full rounded-xl border border-border bg-background px-3 py-3 text-sm outline-none" placeholder="Suburb / area you serve" />
              <select className="w-full rounded-xl border border-border bg-background px-3 py-3 text-sm outline-none">
                <option>Years of experience</option>
                <option>Less than 1 year</option>
                <option>1–3 years</option>
                <option>3+ years</option>
              </select>
              <button type="button" className="w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground">
                Submit application
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">Why cleaners choose EcoScouts</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b) => (
            <div key={b.t} className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                <b.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-semibold">{b.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:pb-24">
        <div className="rounded-3xl border border-border bg-[image:var(--gradient-hero)] p-8 sm:p-12">
          <h2 className="font-display text-3xl font-bold text-primary-foreground">How it works</h2>
          <ol className="mt-6 grid gap-4 text-primary-foreground/95 sm:grid-cols-3">
            {["Apply with your details and references", "Get verified and onboarded in 48 hours", "Receive job alerts and start earning"].map((s, i) => (
              <li key={s} className="rounded-2xl bg-card/10 p-5 backdrop-blur">
                <span className="font-display text-3xl font-bold">{i + 1}</span>
                <p className="mt-2 text-sm">{s}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8">
            <a href="https://wa.me/263770000000" className="inline-flex items-center gap-2 rounded-full bg-card px-6 py-3 text-sm font-semibold text-primary">
              Start now <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
