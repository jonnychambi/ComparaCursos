import { useNavigate } from 'react-router-dom';
import { SearchBar } from './SearchBar';
import { useState } from 'react';

export const HeroSearch = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const search = new URLSearchParams();
    if (query.trim()) search.set('q', query.trim());
    navigate(`/explorar?${search.toString()}`);
  };

  return (
    <section className="mx-auto max-w-6xl px-4 pt-12 md:px-6 md:pt-20">
      <span className="inline-flex rounded-full border border-studia-soft bg-white px-4 py-1 text-xs font-medium tracking-wide text-studia-primary">
        COMPARA PROGRAMAS TECH EN LATAM
      </span>
      <h1 className="mt-6 max-w-3xl text-3xl font-semibold leading-tight text-studia-dark md:text-5xl">
        Elige tu próximo programa con datos reales, no con promesas.
      </h1>
      <p className="mt-4 max-w-2xl text-base text-slate-600 md:text-lg">
        Analiza contenido, docentes, modalidad y precio en segundos.
      </p>
      <form onSubmit={onSubmit} className="mt-8 max-w-2xl">
        <SearchBar value={query} onChange={setQuery} />
      </form>
      <p className="mt-3 text-sm text-slate-500">Más de 100 programas para explorar</p>
    </section>
  );
};
