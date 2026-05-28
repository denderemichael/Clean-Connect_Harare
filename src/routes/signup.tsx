import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Home } from "lucide-react";

export const Route = createFileRoute("/signup")({
  component: Signup,
  head: () => ({ meta: [{ title: "Sign up as a Customer — EcoScouts" }] }),
});

function Signup() {
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
        emailRedirectTo: `${window.location.origin}/dashboard`,
        data: {
          full_name: form.full_name,
          phone: form.phone,
          suburb: form.suburb,
          role: "customer",
        },
      },
    });
    setLoading(false);
    if (error) {
      setErr(error.message);
      return;
    }
    nav({ to: "/dashboard" });
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <div className="rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-card)]">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <Home className="h-3.5 w-3.5" /> Customer signup
        </span>
        <h1 className="mt-3 font-display text-2xl font-bold">Book trusted cleaners</h1>
        <p className="text-sm text-muted-foreground">Create an account to book and manage your cleanings.</p>

        <form onSubmit={onSubmit} className="mt-5 space-y-3">
          <input required placeholder="Full name" value={form.full_name} onChange={(e) => set("full_name", e.target.value)} className="w-full rounded-xl border border-border bg-background px-3 py-3 text-sm outline-none" />
          <input required placeholder="WhatsApp number" value={form.phone} onChange={(e) => set("phone", e.target.value)} className="w-full rounded-xl border border-border bg-background px-3 py-3 text-sm outline-none" />
          <input required placeholder="Suburb (e.g. Borrowdale)" value={form.suburb} onChange={(e) => set("suburb", e.target.value)} className="w-full rounded-xl border border-border bg-background px-3 py-3 text-sm outline-none" />
          <input required type="email" placeholder="Email" value={form.email} onChange={(e) => set("email", e.target.value)} className="w-full rounded-xl border border-border bg-background px-3 py-3 text-sm outline-none" />
          <input required type="password" minLength={6} placeholder="Password" value={form.password} onChange={(e) => set("password", e.target.value)} className="w-full rounded-xl border border-border bg-background px-3 py-3 text-sm outline-none" />
          {err && <p className="text-sm text-destructive">{err}</p>}
          <button disabled={loading} className="w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60">
            {loading ? "Creating account…" : "Create customer account"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account? <Link to="/login" className="font-semibold text-primary">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
