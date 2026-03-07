import type { Modality, ProgramType } from '../types';

interface FiltersBarProps {
  type: string;
  modality: string;
  minPrice: string;
  maxPrice: string;
  minHours: string;
  maxHours: string;
  sortBy: 'relevance' | 'price' | 'hours';
  onChange: (field: string, value: string) => void;
}

const programTypes: ProgramType[] = ['Curso', 'Bootcamp', 'Diplomado', 'Maestría'];
const modalities: Modality[] = ['Síncrono', 'Asíncrono', 'Híbrido'];

const inputClass = 'rounded-xl border border-studia-soft px-3 py-2 text-sm outline-none focus:border-studia-primary';

export const FiltersBar = ({
  type,
  modality,
  minPrice,
  maxPrice,
  minHours,
  maxHours,
  sortBy,
  onChange,
}: FiltersBarProps) => (
  <div className="grid gap-3 rounded-2xl border border-studia-soft bg-white p-4 shadow-soft md:grid-cols-4 lg:grid-cols-8">
    <select value={type} onChange={(e) => onChange('type', e.target.value)} className={inputClass}>
      <option value="">Tipo</option>
      {programTypes.map((item) => <option key={item}>{item}</option>)}
    </select>
    <select value={modality} onChange={(e) => onChange('modality', e.target.value)} className={inputClass}>
      <option value="">Modalidad</option>
      {modalities.map((item) => <option key={item}>{item}</option>)}
    </select>
    <input type="number" value={minPrice} onChange={(e) => onChange('minPrice', e.target.value)} placeholder="Precio min" className={inputClass} />
    <input type="number" value={maxPrice} onChange={(e) => onChange('maxPrice', e.target.value)} placeholder="Precio max" className={inputClass} />
    <input type="number" value={minHours} onChange={(e) => onChange('minHours', e.target.value)} placeholder="Horas min" className={inputClass} />
    <input type="number" value={maxHours} onChange={(e) => onChange('maxHours', e.target.value)} placeholder="Horas max" className={inputClass} />
    <select value={sortBy} onChange={(e) => onChange('sortBy', e.target.value)} className={inputClass}>
      <option value="relevance">Relevancia</option>
      <option value="price">Precio</option>
      <option value="hours">Horas</option>
    </select>
  </div>
);
