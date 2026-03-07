import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import programsData from '../data/programs.json';
import type { Program } from '../types';
import { SearchBar } from '../components/SearchBar';
import { FiltersBar } from '../components/FiltersBar';
import { ProgramCard } from '../components/ProgramCard';
import { useDebounce } from '../lib/useDebounce';
import { filterPrograms } from '../lib/programs';

const allPrograms = programsData as Program[];

export const Explore = () => {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get('q') ?? '');

  const filters = {
    type: params.get('type') ?? '',
    modality: params.get('modality') ?? '',
    minPrice: params.get('minPrice') ?? '',
    maxPrice: params.get('maxPrice') ?? '',
    minHours: params.get('minHours') ?? '',
    maxHours: params.get('maxHours') ?? '',
    sortBy: (params.get('sortBy') as 'relevance' | 'price' | 'hours' | null) ?? 'relevance',
  };

  const debouncedQuery = useDebounce(query, 350);

  const results = useMemo(() => {
    return filterPrograms(allPrograms, {
      query: debouncedQuery,
      type: filters.type,
      modality: filters.modality,
      minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
      maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
      minHours: filters.minHours ? Number(filters.minHours) : undefined,
      maxHours: filters.maxHours ? Number(filters.maxHours) : undefined,
      sortBy: filters.sortBy,
    });
  }, [debouncedQuery, filters]);

  const updateParam = (field: string, value: string) => {
    const next = new URLSearchParams(params);
    if (!value) next.delete(field);
    else next.set(field, value);
    setParams(next);
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <h1 className="text-3xl font-semibold text-studia-dark">Explorar programas</h1>
      <p className="mt-2 text-slate-600">Encuentra la mejor opción según tu perfil, objetivos y presupuesto.</p>

      <div className="mt-6">
        <SearchBar
          value={query}
          onChange={(value) => {
            setQuery(value);
            updateParam('q', value);
          }}
        />
      </div>

      <div className="mt-4">
        <FiltersBar {...filters} onChange={updateParam} />
      </div>

      <p className="mt-4 text-sm text-slate-500">{results.length} resultados</p>

      {results.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-studia-soft bg-slate-50 p-10 text-center text-slate-600">
          No encontramos programas con esos filtros. Prueba ajustar tu búsqueda.
        </div>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {results.map((program) => <ProgramCard key={program.id} program={program} />)}
        </div>
      )}
    </main>
  );
};
