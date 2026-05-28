import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/cleaner-signup")({
  component: CleanerSignup,
  head: () => ({ meta: [{ title: "Apply as a Cleaner — EcoScouts" }] }),
});

function CleanerSignup() {
  const nav = useNavigate();
  const [form, setForm] = useState({ full_name: "", phone: "", suburb: "", email: "", password: "" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  function set<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        emailRedirectTo: `${window.location.origin}/cleaner-dashboard`,
        data: {
          full_name: form.full_name,
          phone: form.phone,
          suburb: form.suburb,
          role: "cleaner",
        },
      },
    });
    setLoading(false);
    if (error) {
      setErr(error.message);
      return;
    }
    nav({ to: "/cleaner-dashboard" });
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <div className="rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-card)]">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <Sparkles className="h-3.5 w-3.5" /> Cleaner application
        </span>
        <h1 className="mt-3 font-display text-2xl font-bold">Earn with EcoScouts</h1>
        <p className="text-sm text-muted-foreground">Verification within 48 hours. Free to apply.</p>

        <form onSubmit={onSubmit} className="mt-5 space-y-3">
          <input required placeholder="Full name" value={form.full_name} onChange={(e) => set("full_name", e.target.value)} className="w-full rounded-xl border border-border bg-background px-3 py-3 text-sm outline-none" />
          <input required placeholder="WhatsApp number" value={form.phone} onChange={(e) => set("phone", e.target.value)} className="w-full rounded-xl border border-border bg-background px-3 py-3 text-sm outline-none" />
          <input required placeholder="Suburb you serve" value={form.suburb} onChange={(e) => set("suburb", e.target.value)} className="w-full rounded-xl border border-border bg-background px-3 py-3 text-sm outline-none" />
          <input required type="email" placeholder="Email" value={form.email} onChange={(e) => set("email", e.target.value)} className="w-full rounded-xl border border-border bg-background px-3 py-3 text-sm outline-none" />
          <input required type="password" minLength={6} placeholder="Password" value={form.password} onChange={(e) => set("password", e.target.value)} className="w-full rounded-xl border border-border bg-background px-3 py-3 text-sm outline-none" />
          {err && <p className="text-sm text-destructive">{err}</p>}
          <button disabled={loading} className="w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60">
            {loading ? "Submitting…" : "Submit application"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          Looking to book a clean? <Link to="/signup" className="font-semibold text-primary">Customer signup</Link>
        </p>
      </div>
    </div>
  );
}

