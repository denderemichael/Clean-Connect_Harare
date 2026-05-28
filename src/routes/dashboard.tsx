import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { CalendarCheck, Sparkles, MapPin, Phone, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
  head: () => ({ meta: [{ title: "My Dashboard — EcoScouts" }] }),
});

function Dashboard() {
  const { user, role, loading } = useAuth();
  const nav = useNavigate();
  const [bookings, setBookings] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (loading) return;
    if (!user) nav({ to: "/login" });
    else if (role === "cleaner") nav({ to: "/cleaner-dashboard" });
    else fetchBookings();
  }, [loading, user, role, nav]);

  async function fetchBookings() {
    setFetching(true);
    const { data } = await supabase
      .from("bookings")
      .select("*")
      .eq("customer_id", user?.id)
      .order("scheduled_at", { ascending: false });
    setBookings(data || []);
    setFetching(false);
  }

  async function cancelBooking(id: string) {
    if (!confirm("Are you sure you want to cancel this booking?")) return;
    const { error } = await supabase.from("bookings").delete().eq("id", id);
    if (error) alert(error.message);
    else fetchBookings();
  }

  if (loading || !user || role === "cleaner") {
    return <div className="mx-auto max-w-7xl px-4 py-16 text-muted-foreground">Loading…</div>;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-8">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <ShieldCheck className="h-3.5 w-3.5" /> Customer
          </span>
          <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
            Mhoro, {user.user_metadata?.full_name || "friend"} 👋
          </h1>
          <p className="text-muted-foreground">Manage your cleanings and book again in seconds.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/services" className="rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold transition-colors hover:bg-secondary">
            Services
          </Link>
          <Link to="/book" className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-transform hover:scale-[1.02]">
            Book a cleaner
          </Link>
        </div>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] lg:col-span-2">
          <h2 className="font-display text-lg font-bold">Your bookings</h2>
          <div className="mt-6">
            {fetching ? (
              <p className="text-sm text-muted-foreground">Fetching your history…</p>
            ) : bookings.length === 0 ? (
              <div className="grid place-items-center rounded-2xl bg-secondary/30 p-10 text-center border-2 border-dashed border-border">
                <CalendarCheck className="h-12 w-12 text-primary/40" />
                <p className="mt-4 font-semibold">No bookings found</p>
                <p className="mt-1 text-sm text-muted-foreground max-w-xs">
                  Your cleaning schedule is empty. Get started by booking a verified pro.
                </p>
                <Link to="/book" className="mt-6 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)]">
                  Make your first booking
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((b) => (
                  <div key={b.id} className="flex items-center justify-between rounded-xl border border-border bg-secondary/20 p-4 transition-colors hover:bg-secondary/30">
                    <div className="flex-1">
                      <p className="font-bold text-sm uppercase tracking-tight">{b.service_type}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(b.scheduled_at).toLocaleDateString("en-GB", { day: 'numeric', month: 'short' })} • {new Date(b.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide ${
                        b.status === 'pending' ? 'bg-amber-100 text-amber-700' : 
                        b.status === 'confirmed' ? 'bg-green-100 text-green-700' : 
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {b.status}
                      </span>
                      {b.status === 'pending' && (
                        <button 
                          onClick={() => cancelBooking(b.id)}
                          className="text-xs font-semibold text-destructive hover:underline"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>


        <div className="space-y-5">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <h3 className="font-semibold">Account</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> {user.user_metadata?.phone || "—"}</li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> {user.user_metadata?.suburb || "—"}</li>
              <li className="truncate">{user.email}</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-[image:var(--gradient-hero)] p-6 text-primary-foreground">
            <Sparkles className="h-6 w-6" />
            <h3 className="mt-2 font-display text-lg font-bold">Need help fast?</h3>
            <p className="mt-1 text-sm opacity-90">Chat with us on WhatsApp for instant booking.</p>
            <a href="https://wa.me/263770000000" className="mt-3 inline-block rounded-full bg-card px-4 py-2 text-xs font-semibold text-primary">
              Open WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
