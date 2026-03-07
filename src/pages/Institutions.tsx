import institutionsData from '../data/institutions.json';
import type { Institution } from '../types';
import { InstitutionCard } from '../components/InstitutionCard';

const institutions = institutionsData as Institution[];

export const Institutions = () => (
  <main className="mx-auto max-w-6xl px-4 py-10 md:px-6">
    <h1 className="text-3xl font-semibold text-studia-dark">Instituciones aliadas</h1>
    <p className="mt-3 max-w-3xl text-slate-600">
      Trabajamos con instituciones que ofrecen programas de formación en tecnología y buscan conectar con
      profesionales que comparan antes de decidir.
    </p>

    <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {institutions.map((institution) => <InstitutionCard key={institution.id} institution={institution} />)}
    </div>

    <section className="mt-10 rounded-2xl bg-slate-50 p-8 text-center">
      <h2 className="text-2xl font-semibold text-studia-dark">¿Quieres sumar tu institución a Studia?</h2>
      <p className="mt-2 text-slate-600">Conecta tu oferta educativa con profesionales que comparan con intención de compra.</p>
    </section>
  </main>
);
