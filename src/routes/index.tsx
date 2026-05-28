import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  Sparkles,
  MessageCircle,
  Star,
  ArrowRight,
  Wallet,
  MapPin,
  CheckCircle2,
  Home,
  Building2,
  Truck,
  Brush,
  Hammer,
  Search,
} from "lucide-react";
import heroCleaner from "@/assets/hero-cleaner.jpg";
import cleanHome from "@/assets/clean-home.jpg";
import deepClean from "@/assets/deep-clean.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "EcoScouts — Trusted Cleaning Services in Harare" },
      { name: "description", content: "Book verified house cleaners in Harare. Easy WhatsApp booking, EcoCash payments, and trusted professionals across Zimbabwe." },
    ],
  }),
});

const services = [
  { icon: Home, title: "Home Cleaning", desc: "Regular tidy-up for busy households." },
  { icon: Sparkles, title: "Deep Cleaning", desc: "Top-to-bottom refresh that shines." },
  { icon: Truck, title: "Move In / Out", desc: "Spotless handovers, no stress." },
  { icon: Building2, title: "Office Cleaning", desc: "Reliable cleaning for SMEs & shops." },
  { icon: Brush, title: "Carpet & Upholstery", desc: "Stain removal and freshening." },
  { icon: Hammer, title: "Post-Construction", desc: "Dust, debris and finish-cleans." },
];

const cleaners = [
  { name: "Tendai M.", area: "Borrowdale", rating: 4.9, jobs: 142, price: "$15" },
  { name: "Rumbidzai S.", area: "Avondale", rating: 4.8, jobs: 98, price: "$18" },
  { name: "Blessing N.", area: "Mount Pleasant", rating: 5.0, jobs: 67, price: "$20" },
];

function Index() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[image:var(--gradient-soft)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:py-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
              <ShieldCheck className="h-3.5 w-3.5" /> Verified cleaners across Harare
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">
              A cleaner home,<br />
              <span className="bg-[image:var(--gradient-hero)] bg-clip-text text-transparent">a calmer life.</span>
            </h1>
            <p className="mt-5 max-w-lg text-base text-muted-foreground sm:text-lg">
              EcoScouts connects you with trusted, background-checked house cleaners — book in seconds via WhatsApp or web, pay with EcoCash, cash or transfer.
            </p>



            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="https://wa.me/263770000000"
                className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-3 text-sm font-semibold text-whatsapp-foreground shadow-[var(--shadow-soft)]"
              >
                <MessageCircle className="h-4 w-4" /> Book on WhatsApp
              </a>
              <Link to="/services" className="text-sm font-semibold text-foreground hover:text-primary">
                Browse services →
              </Link>
            </div>

            {/* Real-time stats could be fetched here */}
            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-6">
              {[
                { k: "150+", v: "Verified cleaners" },
                { k: "2.4k+", v: "Jobs completed" },
                { k: "4.8★", v: "Avg. rating" },
              ].map((s) => (
                <div key={s.v}>
                  <dt className="font-display text-2xl font-bold text-foreground">{s.k}</dt>
                  <dd className="text-xs text-muted-foreground">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-[image:var(--gradient-hero)] opacity-20 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-[var(--shadow-soft)]">
              <img
                src={heroCleaner}
                alt="Verified EcoScouts cleaner ready to serve your home"
                width={1280}
                height={1280}
                className="h-[480px] w-full object-cover sm:h-[560px]"
              />
              {/* Floating cards */}
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-xl bg-card/95 px-3 py-2 shadow-[var(--shadow-card)] backdrop-blur">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span className="text-xs font-semibold">ID Verified</span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-card/95 p-4 shadow-[var(--shadow-card)] backdrop-blur">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold">Tendai Moyo</p>
                    <p className="text-xs text-muted-foreground">Borrowdale • Deep Cleaning</p>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-accent-foreground">
                    <Star className="h-3 w-3 fill-current" /> 4.9
                  </span>
                </div>
                <Link
                  to="/book"
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-2 text-sm font-semibold text-primary-foreground"
                >
                  Book now <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          {[
            { icon: ShieldCheck, t: "Verified & vetted", d: "ID + reference checks" },
            { icon: MessageCircle, t: "WhatsApp friendly", d: "No app download needed" },
            { icon: Wallet, t: "Flexible payment", d: "EcoCash, cash, transfer" },
            { icon: Star, t: "Rated by neighbours", d: "Real community reviews" },
          ].map((f) => (
            <div key={t(f.t)} className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <f.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold">{f.t}</p>
                <p className="text-xs text-muted-foreground">{f.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-primary">What we clean</p>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Services built for Zimbabwean homes & businesses</h2>
          </div>
          <Link to="/services" className="hidden text-sm font-semibold text-primary hover:underline sm:inline">See all →</Link>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div key={s.title} className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-[var(--shadow-card)]">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-[image:var(--gradient-hero)] text-primary-foreground">
                <s.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
              <Link to="/book" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                Book service <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-[image:var(--gradient-soft)]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative">
              <img
                src={cleanHome}
                alt="Bright clean living room after EcoScouts service"
                loading="lazy"
                width={1280}
                height={896}
                className="rounded-3xl border border-border object-cover shadow-[var(--shadow-card)]"
              />
              <img
                src={deepClean}
                alt="Detail of a deep cleaning service"
                loading="lazy"
                width={1024}
                height={1024}
                className="absolute -bottom-8 -right-4 hidden h-44 w-44 rounded-2xl border-4 border-background object-cover shadow-[var(--shadow-soft)] sm:block"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-primary">How EcoScouts works</p>
              <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Booking a trusted cleaner takes minutes.</h2>
              <ol className="mt-8 space-y-5">
                {[
                  { t: "Tell us what you need", d: "Pick your suburb, service and preferred time — on the web or via WhatsApp." },
                  { t: "Match with a verified cleaner", d: "Browse profiles, ratings and prices. Every cleaner is ID-verified." },
                  { t: "Confirm & relax", d: "Track the job, pay with EcoCash, cash or transfer, then leave a review." },
                ].map((step, i) => (
                  <li key={step.t} className="flex gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-semibold">{step.t}</h3>
                      <p className="text-sm text-muted-foreground">{step.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <Link to="/book" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)]">
                Book a cleaner now <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>



      {/* FOR CLEANERS CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:pb-24">
        <div className="overflow-hidden rounded-3xl bg-[image:var(--gradient-hero)] p-8 shadow-[var(--shadow-soft)] sm:p-12">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="text-primary-foreground">
              <h2 className="font-display text-3xl font-bold sm:text-4xl">Are you a cleaner? Earn more, every week.</h2>
              <p className="mt-3 max-w-md text-primary-foreground/90">
                Get a verified profile, steady job alerts in your area, and fast payment. Plus skill badges, training and Mukando savings.
              </p>
              <Link to="/for-cleaners" className="mt-6 inline-flex items-center gap-2 rounded-full bg-card px-6 py-3 text-sm font-semibold text-primary">
                Join EcoScouts free <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <ul className="grid grid-cols-2 gap-3 text-primary-foreground">
              {["Steady job pipeline", "Fast EcoCash payouts", "Build your reputation", "Free training", "Mukando savings", "Verified badge"].map((b) => (
                <li key={b} className="flex items-center gap-2 rounded-xl bg-card/10 px-3 py-3 text-sm backdrop-blur">
                  <CheckCircle2 className="h-4 w-4" /> {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

function t(s: string) { return s; }
