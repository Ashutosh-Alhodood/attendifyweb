export default function Flows() {
  return (
    <section className="section">
      <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-6">
        <div className="card p-6">
          <p className="kicker">Employee</p>
          <h3 className="text-xl font-semibold mt-1">On-site experience</h3>
          <ul className="mt-3 text-neutral-600 list-disc pl-6 space-y-1">
            <li>Login → Assigned shift</li>
            <li>Geo-fence validation</li>
            <li>Clock-In/Out, notes, leave</li>
          </ul>
        </div>
        <div className="card p-6">
          <p className="kicker">Admin</p>
          <h3 className="text-xl font-semibold mt-1">Live control center</h3>
          <ul className="mt-3 text-neutral-600 list-disc pl-6 space-y-1">
            <li>Live map & status</li>
            <li>Approvals & overrides</li>
            <li>ERP sync & reports</li>
          </ul>
        </div>
      </div>
    </section>
  );
}