export default function Testimonials() {
  const data = [
    { n: "Alex — Sales", q: "Live demos and field visits run smoother with precise clock-ins." },
    { n: "Sarah — HR", q: "Payroll close is faster; we trust the data." },
    { n: "John — IT", q: "Device binding killed buddy punching for us." },
  ];
  return (
    <section className="section">
      <div className="mx-auto max-w-7xl px-4">
        <p className="kicker">Testimonials</p>
        <h2 className="h2 mt-2">Loved by operations & HR</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {data.map(t => (
            <div key={t.n} className="card p-6">
              <div className="font-semibold">{t.n}</div>
              <p className="mt-3 text-neutral-700">“{t.q}”</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}