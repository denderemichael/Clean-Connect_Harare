import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, Clock, MapPin, MessageCircle, CheckCircle2, Wallet } from "lucide-react";

export const Route = createFileRoute("/book")({
  component: Book,
  head: () => ({
    meta: [
      { title: "Book a Cleaner — EcoScouts" },
      { name: "description", content: "Book a verified cleaner in Harare. Pay with EcoCash, cash or transfer." },
    ],
  }),
});

const services = ["Home Cleaning", "Deep Cleaning", "Move In / Out", "Office Cleaning", "Carpet & Upholstery", "Post-Construction"];
const times = ["08:00", "10:00", "12:00", "14:00", "16:00"];
const payments = [
  { id: "ecocash", label: "EcoCash" },
  { id: "cash", label: "Cash on completion" },
  { id: "transfer", label: "Bank transfer" },
];

function Book() {
  const { user, role, loading: authLoading } = useAuth();
  const nav = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [service, setService] = useState(services[0]);
  const [time, setTime] = useState(times[1]);
  const [pay, setPay] = useState(payments[0].id);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    date: "",
    address: "",
    fullName: "",
    phone: "",
    notes: ""
  });

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-primary/10 text-primary">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h1 className="mt-6 font-display text-3xl font-bold">Booking received!</h1>
        <p className="mt-2 text-muted-foreground">A verified EcoScouts cleaner will confirm your booking via WhatsApp shortly.</p>
        <Link to="/" className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">Back home</Link>
      </div>
    );
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) {
      nav({ to: "/login" });
      return;
    }
    setLoading(true);
    
    const scheduledAt = new Date(`${form.date}T${time}:00`).toISOString();

    const { error } = await supabase.from("bookings").insert({
      customer_id: user.id,
      service_type: service,
      scheduled_at: scheduledAt,
      suburb: form.address.split(",").pop()?.trim() || "Harare",
      address: form.address,
      notes: form.notes,
      payment_method: pay,
      status: "pending"
    });

    setLoading(false);
    if (error) {
      alert(error.message);
      return;
    }
    setSubmitted(true);
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.4fr_1fr] lg:py-16">
      <form
        onSubmit={onSubmit}
        className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8"
      >
        <h1 className="font-display text-3xl font-bold">Book a cleaner</h1>
        <p className="mt-1 text-sm text-muted-foreground">Fill in the details — confirmation in minutes.</p>

        <div className="mt-8 space-y-6">
          <Field label="Service">
            <div className="grid gap-2 sm:grid-cols-2">
              {services.map((s) => (
                <button type="button" key={s} onClick={() => setService(s)}
                  className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${service === s ? "border-primary bg-primary/5 text-foreground" : "border-border text-muted-foreground hover:border-primary/40"}`}>
                  {s}
                </button>
              ))}
            </div>
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Date">
              <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3">
                <Calendar className="h-4 w-4 text-primary" />
                <input 
                  required 
                  type="date" 
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full bg-transparent py-3 text-sm outline-none" 
                />
              </div>
            </Field>
            <Field label="Preferred time">
              <div className="flex flex-wrap gap-2">
                {times.map((t) => (
                  <button key={t} type="button" onClick={() => setTime(t)}
                    className={`inline-flex items-center gap-1 rounded-full border px-3 py-2 text-sm ${time === t ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground"}`}>
                    <Clock className="h-3.5 w-3.5" /> {t}
                  </button>
                ))}
              </div>
            </Field>
          </div>

          <Field label="Suburb / address">
            <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3">
              <MapPin className="h-4 w-4 text-primary" />
              <input 
                required 
                placeholder="e.g. 12 Acacia Rd, Borrowdale" 
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full bg-transparent py-3 text-sm outline-none" 
              />
            </div>
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name">
              <input 
                required 
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                className="w-full rounded-xl border border-border bg-background px-3 py-3 text-sm outline-none" 
              />
            </Field>
            <Field label="WhatsApp number">
              <input 
                required 
                placeholder="+263 ..." 
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full rounded-xl border border-border bg-background px-3 py-3 text-sm outline-none" 
              />
            </Field>
          </div>

          <Field label="Notes (optional)">
            <textarea 
              rows={3} 
              placeholder="Pets, gate code, areas to focus on..." 
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="w-full rounded-xl border border-border bg-background px-3 py-3 text-sm outline-none" 
            />
          </Field>

          <Field label="Payment method">
            <div className="grid gap-2 sm:grid-cols-3">
              {payments.map((p) => (
                <button type="button" key={p.id} onClick={() => setPay(p.id)}
                  className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium ${pay === p.id ? "border-primary bg-primary/5" : "border-border text-muted-foreground"}`}>
                  <Wallet className="h-4 w-4 text-primary" /> {p.label}
                </button>
              ))}
            </div>
          </Field>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="mt-8 w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] disabled:opacity-60"
        >
          {loading ? "Confirming..." : "Confirm booking"}
        </button>
      </form>

      <aside className="space-y-4">
        <div className="rounded-3xl border border-border bg-[image:var(--gradient-soft)] p-6">
          <h3 className="font-display text-lg font-bold">Booking summary</h3>
          <dl className="mt-4 space-y-3 text-sm">
            <Row k="Service" v={service} />
            <Row k="Time" v={time} />
            <Row k="Payment" v={payments.find((p) => p.id === pay)?.label || ""} />
            <Row k="Service fee" v="Free" />
          </dl>
          <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
            <span className="font-semibold">Estimated total</span>
            <span className="font-display text-xl font-bold text-primary">$25 – $60</span>
          </div>
        </div>
        <a href="https://wa.me/263770000000" className="flex items-center justify-center gap-2 rounded-2xl bg-whatsapp px-4 py-4 text-sm font-semibold text-whatsapp-foreground shadow-[var(--shadow-soft)]">
          <MessageCircle className="h-4 w-4" /> Prefer to book on WhatsApp?
        </a>
      </aside>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold">{label}</label>
      {children}
    </div>
  );
}
function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between"><dt className="text-muted-foreground">{k}</dt><dd className="font-medium">{v}</dd></div>
  );
}
