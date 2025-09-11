export default function ERP() {
  const logos = ["SAP", "Oracle", "Tally", "QuickBooks", "Zoho"];
  return (
    <section className="section bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4">
        <p className="kicker">Integrations</p>
        <h2 className="h2 mt-2">Plug into your ERP</h2>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
          {logos.map(l => (
            <div key={l} className="card p-6 text-center text-neutral-500">{l}</div>
          ))}
        </div>
      </div>
    </section>
  );
}