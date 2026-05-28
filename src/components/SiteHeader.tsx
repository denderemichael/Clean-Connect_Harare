import { Link } from "@tanstack/react-router";
import { Sparkles, Menu, LogOut, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { user, role, signOut } = useAuth();
  const dashTo = role === "cleaner" ? "/cleaner-dashboard" : "/dashboard";

  const nav = [
    { to: "/", label: "Home" },
    ...(role !== "cleaner"
      ? [
          { to: "/services", label: "Services" },
          { to: "/cleaners", label: "Find Cleaners" },
        ]
      : []),
    ...(!user || role === "customer" ? [{ to: "/for-cleaners", label: "For Cleaners" }] : []),
    { to: "/about", label: "About" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[image:var(--gradient-hero)] text-primary-foreground shadow-[var(--shadow-soft)]">
            <Sparkles className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">EcoScouts</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              activeProps={{ className: "bg-secondary text-foreground" }}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Link
                to={dashTo}
                className="hidden items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold sm:inline-flex"
              >
                <LayoutDashboard className="h-4 w-4" /> Dashboard
              </Link>
              <button
                onClick={() => signOut()}
                aria-label="Sign out"
                className="hidden items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground sm:inline-flex"
              >
                <LogOut className="h-4 w-4" /> Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hidden rounded-full px-3 py-2 text-sm font-semibold text-foreground sm:inline-flex">
                Sign in
              </Link>
              <Link
                to="/signup"
                className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] sm:inline-flex"
              >
                Get started
              </Link>
            </>
          )}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="grid h-10 w-10 place-items-center rounded-lg border border-border md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-4 py-2">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-foreground hover:bg-secondary"
              >
                {n.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link to={dashTo} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-sm font-semibold text-foreground hover:bg-secondary">
                  Dashboard
                </Link>
                <button onClick={() => { setOpen(false); signOut(); }} className="mt-2 rounded-full bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground">
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-sm font-semibold text-foreground hover:bg-secondary">
                  Sign in
                </Link>
                <Link to="/signup" onClick={() => setOpen(false)} className="mt-2 rounded-full bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground">
                  Get started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
