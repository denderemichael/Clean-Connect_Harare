import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Briefcase, Wallet, Award, MapPin, Phone, Clock, CalendarCheck } from "lucide-react";

export const Route = createFileRoute("/cleaner-dashboard")({
  component: CleanerDashboard,
  head: () => ({ meta: [{ title: "Cleaner Dashboard — EcoScouts" }] }),
});

function CleanerDashboard() {
  const { user, role, loading } = useAuth();
  const nav = useNavigate();
  const [availableJobs, setAvailableJobs] = useState<any[]>([]);
  const [myJobs, setMyJobs] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (loading) return;
    if (!user) nav({ to: "/login" });
    else if (role === "customer") nav({ to: "/dashboard" });
    else fetchJobs();
  }, [loading, user, role, nav]);

  async function fetchJobs() {
    setFetching(true);
    
    // Fetch available jobs (pending)
    const { data: available } = await supabase
      .from("bookings")
      .select("*")
      .eq("status", "pending")
      .order("scheduled_at", { ascending: true });
    
    // Fetch my jobs (confirmed and assigned to me)
    const { data: assigned } = await supabase
      .from("bookings")
      .select("*")
      .eq("cleaner_id", user?.id)
      .in("status", ["confirmed", "completed"])
      .order("scheduled_at", { ascending: false });

    setAvailableJobs(available || []);
    setMyJobs(assigned || []);
    setFetching(false);
  }

  async function acceptJob(jobId: string) {
    const { error } = await supabase
      .from("bookings")
      .update({ cleaner_id: user?.id, status: "confirmed" })
      .eq("id", jobId);
    
    if (error) alert(error.message);
    else fetchJobs();
  }

  async function completeJob(jobId: string) {
    const { error } = await supabase
      .from("bookings")
      .update({ status: "completed" })
      .eq("id", jobId);
    
    if (error) alert(error.message);
    else fetchJobs();
  }

  if (loading || !user || role === "customer") {
    return <div className="mx-auto max-w-7xl px-4 py-16 text-muted-foreground">Loading…</div>;
  }

  const stats = [
    { icon: Briefcase, label: "Alerts", value: availableJobs.length.toString() },
    { icon: Clock, label: "My Jobs", value: myJobs.filter(j => j.status === 'confirmed').length.toString() },
    { icon: Wallet, label: "Earnings", value: `$${myJobs.filter(j => j.status === 'completed').length * 20}` }, // Mock math
    { icon: Award, label: "Status", value: "Verified" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      {/* Welcome Banner */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-8">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-foreground">
            <Award className="h-3.5 w-3.5" /> Verified Cleaner
          </span>
          <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
            Mhoro, {user.user_metadata?.full_name || "pro"} 👋
          </h1>
          <p className="text-muted-foreground">Manage your schedule and accept new job alerts.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
              <s.icon className="h-5 w-5" />
            </span>
            <p className="mt-3 text-xs uppercase tracking-wide text-muted-foreground">{s.label}</p>
            <p className="font-display text-2xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Dashboard Main Grid - 3 Columns */}
      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Left/Main Column - Jobs Schedule and Alerts (Spans 2 columns) */}
        <div className="space-y-8 lg:col-span-2">
          {/* Job Alerts */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <h2 className="font-display text-lg font-bold flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" /> Job alerts
            </h2>
            <div className="mt-6 space-y-4">
              {fetching ? (
                <p className="text-sm text-muted-foreground">Checking for new jobs…</p>
              ) : availableJobs.length === 0 ? (
                <div className="grid place-items-center rounded-2xl bg-secondary/30 p-10 text-center">
                  <Clock className="h-10 w-10 text-muted-foreground/40" />
                  <p className="mt-3 text-sm text-muted-foreground">No new alerts right now.</p>
                </div>
              ) : (
                availableJobs.map((j) => (
                  <div key={j.id} className="rounded-2xl border border-border bg-secondary/20 p-5">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold text-primary uppercase tracking-wider">
                        {j.service_type}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(j.scheduled_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="mt-2 font-bold">{j.suburb}</p>
                    <p className="text-xs text-muted-foreground">{j.address}</p>
                    <button 
                      onClick={() => acceptJob(j.id)}
                      className="mt-4 w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] hover:opacity-90 transition-opacity cursor-pointer"
                    >
                      Accept job
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* My Schedule */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <h2 className="font-display text-lg font-bold flex items-center gap-2">
              <CalendarCheck className="h-5 w-5 text-primary" /> My schedule
            </h2>
            <div className="mt-6 space-y-4">
              {fetching ? (
                <p className="text-sm text-muted-foreground">Fetching your schedule…</p>
              ) : myJobs.length === 0 ? (
                <div className="grid place-items-center rounded-2xl bg-secondary/30 p-10 text-center">
                  <p className="text-sm text-muted-foreground">You haven't accepted any jobs yet.</p>
                </div>
              ) : (
                myJobs.map((j) => (
                  <div key={j.id} className={`rounded-2xl border border-border p-5 ${j.status === 'completed' ? 'opacity-60 bg-secondary/10' : 'bg-secondary/20'}`}>
                    <div className="flex items-center justify-between">
                      <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        j.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {j.status}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(j.scheduled_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="mt-2 font-bold">{j.suburb}</p>
                    <p className="text-xs text-muted-foreground mb-4">{j.address}</p>
                    
                    {j.status === 'confirmed' && (
                      <button 
                        onClick={() => completeJob(j.id)}
                        className="w-full rounded-xl border border-primary text-primary py-2.5 text-sm font-semibold hover:bg-primary hover:text-white transition-all cursor-pointer"
                      >
                        Mark as completed
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Profile & Savings Sidebar (Spans 1 column) */}
        <div className="space-y-5">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <h3 className="font-semibold">My profile</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" /> {user.user_metadata?.phone || "—"}
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" /> Serves {user.user_metadata?.suburb || "—"}
              </li>
              <li className="truncate">{user.email}</li>
            </ul>
          </div>
          
          <div className="rounded-2xl border border-border bg-[image:var(--gradient-hero)] p-6 text-primary-foreground">
            <Wallet className="h-6 w-6" />
            <h3 className="mt-2 font-display text-lg font-bold">Mukando savings</h3>
            <p className="mt-1 text-sm opacity-90">Join a peer savings group after your first job.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
