import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import programsData from '../data/programs.json';
import type { Program } from '../types';
import { LeadFormModal } from '../components/LeadFormModal';

const programs = programsData as Program[];

export const ProgramDetail = () => {
  const { id } = useParams();
  const [isModalOpen, setModalOpen] = useState(false);

  const program = useMemo(() => programs.find((item) => item.id === id), [id]);

  if (!program) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-12 md:px-6">
        <p className="text-slate-600">Programa no encontrado.</p>
        <Link to="/explorar" className="mt-4 inline-block text-studia-primary">Volver a explorar</Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 md:px-6">
      <p className="text-sm text-slate-500">{program.institution}</p>
      <h1 className="mt-2 text-3xl font-semibold text-studia-dark">{program.title}</h1>
      <p className="mt-4 text-slate-600">{program.summary}</p>

      <div className="mt-6 grid gap-3 rounded-2xl border border-studia-soft bg-white p-5 shadow-soft md:grid-cols-2">
        <p>Tipo: <strong>{program.type}</strong></p>
        <p>Modalidad: <strong>{program.modality}</strong></p>
        <p>Horas: <strong>{program.hours}</strong></p>
        <p>Precio: <strong>{program.currency} {program.price}</strong></p>
      </div>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-studia-dark">Contenido</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
          {program.contentBullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-studia-dark">Docente</h2>
        <p className="mt-3 font-medium text-studia-dark">{program.instructorName}</p>
        <p className="mt-1 text-slate-700">{program.instructorBio}</p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-studia-dark">¿Por qué considerar este programa?</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
          {program.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
        </ul>
      </section>

      <button
        onClick={() => setModalOpen(true)}
        className="mt-10 rounded-full bg-studia-mint px-6 py-3 font-semibold text-studia-dark"
      >
        Solicitar información
      </button>

      <LeadFormModal programTitle={program.title} isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
};
