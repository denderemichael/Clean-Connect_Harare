import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/login")({
  component: Login,
  head: () => ({ meta: [{ title: "Login — EcoScouts" }] }),
});

function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setErr(error.message);
      return;
    }
    // Look up role to redirect
    const { data: rr } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", data.user!.id)
      .maybeSingle();
    nav({ to: rr?.role === "cleaner" ? "/cleaner-dashboard" : "/dashboard" });
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-200px)] max-w-md flex-col justify-center px-4 py-12">
      <div className="rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-card)]">
        <div className="mb-6 flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[image:var(--gradient-hero)] text-primary-foreground">
            <Sparkles className="h-5 w-5" />
          </span>
          <h1 className="font-display text-2xl font-bold">Welcome back</h1>
        </div>
        <form onSubmit={onSubmit} className="space-y-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full rounded-xl border border-border bg-background px-3 py-3 text-sm outline-none"
          />
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-xl border border-border bg-background px-3 py-3 text-sm outline-none"
          />
          {err && <p className="text-sm text-destructive">{err}</p>}
          <button
            disabled={loading}
            className="w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
        <div className="mt-6 space-y-2 text-center text-sm text-muted-foreground">
          <p>
            New customer?{" "}
            <Link to="/signup" className="font-semibold text-primary">Create account</Link>
          </p>
          <p>
            Are you a cleaner?{" "}
            <Link to="/cleaner-signup" className="font-semibold text-primary">Apply to join</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
