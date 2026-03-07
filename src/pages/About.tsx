export const About = () => (
  <main className="mx-auto max-w-5xl px-4 py-10 md:px-6">
    <section className="rounded-3xl bg-slate-50 px-6 py-12 md:px-10">
      <h1 className="text-3xl font-semibold text-studia-dark">Sobre Studia</h1>
      <p className="mt-4 max-w-3xl text-slate-700">
        Studia nace para ayudar a profesionales de Latinoamérica a tomar mejores decisiones educativas.
        Reunimos información clave de programas de formación tecnológica para que comparar sea más fácil,
        más claro y más estratégico.
      </p>
    </section>

    <section className="mt-8 grid gap-4 md:grid-cols-3">
      <article className="rounded-2xl border border-studia-soft bg-white p-5 shadow-soft">
        <h2 className="text-lg font-semibold text-studia-dark">Misión</h2>
        <p className="mt-2 text-sm text-slate-600">
          Facilitar decisiones de formación más inteligentes con criterios comparables y datos reales.
        </p>
      </article>
      <article className="rounded-2xl border border-studia-soft bg-white p-5 shadow-soft">
        <h2 className="text-lg font-semibold text-studia-dark">Visión</h2>
        <p className="mt-2 text-sm text-slate-600">
          Ser la plataforma de referencia en LATAM para comparar formación tecnológica con transparencia.
        </p>
      </article>
      <article className="rounded-2xl border border-studia-soft bg-white p-5 shadow-soft">
        <h2 className="text-lg font-semibold text-studia-dark">Propuesta de valor</h2>
        <p className="mt-2 text-sm text-slate-600">
          Un comparador premium que prioriza claridad, velocidad y enfoque data-driven sobre promesas.
        </p>
      </article>
    </section>
  </main>
);
