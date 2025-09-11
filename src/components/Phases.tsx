export default function Phases() {
  const rows = [
    { n: "01", title: "Core MVP — Attendance", points: ["Geo-fence → Clock-In/Out", "Live admin dashboard", "CSV reports"] },
    { n: "02", title: "Productivity + Leave", points: ["Active/idle timers", "Leave & holidays", "Daily summaries"] },
    { n: "03", title: "ERP + Security + Automation", points: ["ERP sync/webhooks", "Offline → Sync", "Anti-spoof, biometric, device binding"] },
    { n: "04", title: "SaaS & White-Label", points: ["Multi-tenant", "Branding per client", "Usage-based billing"] },
  ];
  return (
    <section id="phases" className="section bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4">
        <p className="kicker">Phases</p>
        <h2 className="h2 mt-2">Roadmap to scale</h2>
        <div className="mt-8 grid gap-4">
          {rows.map(r => (
            <div key={r.n} className="card p-5 flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <span className="text-neutral-400">{r.n}</span>
                <h3 className="font-semibold">{r.title}</h3>
              </div>
              <ul className="mt-3 md:mt-0 text-neutral-600 list-disc pl-6 grid md:grid-cols-3 gap-x-8">
                {r.points.map(p => <li key={p}>{p}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}