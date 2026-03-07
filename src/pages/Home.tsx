import { Link } from 'react-router-dom';
import programs from '../data/programs.json';
import type { Program } from '../types';
import { HeroSearch } from '../components/HeroSearch';
import { ProgramCard } from '../components/ProgramCard';

const featured = (programs as Program[]).slice(0, 3);

export const Home = () => (
  <main>
    <HeroSearch />

    <section className="mx-auto mt-14 max-w-6xl px-4 md:px-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-studia-dark">Exploración destacada</h2>
        <Link to="/explorar" className="text-sm font-semibold text-studia-primary">Ver todos</Link>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {featured.map((program) => <ProgramCard key={program.id} program={program} />)}
      </div>
    </section>

    <section className="mx-auto mt-16 max-w-6xl px-4 md:px-6">
      <h2 className="text-2xl font-semibold text-studia-dark">Cómo funciona</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          { title: '1. Busca', text: 'Encuentra programas por nombre, institución o tecnología.' },
          { title: '2. Compara', text: 'Revisa modalidad, horas, precio y enfoque en segundos.' },
          { title: '3. Solicita información', text: 'Deja tus datos y te ayudamos a decidir con claridad.' },
        ].map((step) => (
          <article key={step.title} className="rounded-2xl border border-studia-soft bg-white p-5 shadow-soft">
            <h3 className="text-lg font-semibold text-studia-dark">{step.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{step.text}</p>
          </article>
        ))}
      </div>
    </section>

    <section className="mx-auto mt-16 max-w-6xl rounded-3xl bg-slate-50 px-6 py-12 text-center md:px-10">
      <h2 className="text-2xl font-semibold text-studia-dark">¿No sabes cuál elegir? Déjanos tus datos y te orientamos.</h2>
      <Link to="/explorar" className="mt-6 inline-block rounded-full bg-studia-mint px-6 py-3 font-semibold text-studia-dark">
        Explorar programas
      </Link>
    </section>
  </main>
);
