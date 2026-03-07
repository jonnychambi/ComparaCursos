import type { Institution } from '../types';

export const InstitutionCard = ({ institution }: { institution: Institution }) => (
  <article className="rounded-2xl border border-studia-soft bg-white p-5 shadow-soft">
    <h3 className="text-lg font-semibold text-studia-dark">{institution.name}</h3>
    <p className="mt-1 text-sm text-slate-600">{institution.country}</p>
    <p className="mt-3 text-sm text-slate-700">{institution.description}</p>
    <p className="mt-3 text-sm text-slate-700">Programas publicados: <strong>{institution.programCount}</strong></p>
    <div className="mt-3 flex flex-wrap gap-2">
      {institution.categories.map((category) => (
        <span key={category} className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600">{category}</span>
      ))}
    </div>
  </article>
);
