import { Link } from 'react-router-dom';
import type { Program } from '../types';

interface ProgramCardProps {
  program: Program;
}

export const ProgramCard = ({ program }: ProgramCardProps) => (
  <article className="rounded-2xl border border-studia-soft bg-white p-5 shadow-soft transition hover:-translate-y-1">
    <div className="flex flex-wrap items-center justify-between gap-2">
      <h3 className="text-lg font-semibold text-studia-dark">{program.title}</h3>
      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">{program.type}</span>
    </div>
    <p className="mt-1 text-sm text-slate-600">{program.institution}</p>
    <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-slate-700">
      <p>Modalidad: <span className="font-medium">{program.modality}</span></p>
      <p>Horas: <span className="font-medium">{program.hours}</span></p>
      <p>Precio: <span className="font-medium">{program.currency} {program.price}</span></p>
    </div>
    <div className="mt-4 flex flex-wrap gap-2">
      {program.tags.map((tag) => (
        <span key={tag} className="rounded-full border border-studia-soft px-2 py-1 text-xs text-slate-600">#{tag}</span>
      ))}
    </div>
    <ul className="mt-4 space-y-1 text-sm text-slate-700">
      {program.highlights.slice(0, 2).map((item) => <li key={item}>• {item}</li>)}
    </ul>
    <Link to={`/programa/${program.id}`} className="mt-5 inline-block rounded-full bg-studia-mint px-4 py-2 text-sm font-semibold text-studia-dark">
      Ver Programa
    </Link>
  </article>
);
