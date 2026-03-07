import type { Program } from '../types';

export interface ProgramFilters {
  query: string;
  type: string;
  modality: string;
  minPrice?: number;
  maxPrice?: number;
  minHours?: number;
  maxHours?: number;
  sortBy: 'relevance' | 'price' | 'hours';
}

export const filterPrograms = (programs: Program[], filters: ProgramFilters): Program[] => {
  const normalized = filters.query.trim().toLowerCase();

  const filtered = programs.filter((program) => {
    const matchesQuery =
      !normalized ||
      program.title.toLowerCase().includes(normalized) ||
      program.institution.toLowerCase().includes(normalized) ||
      program.tags.some((tag) => tag.toLowerCase().includes(normalized));

    const matchesType = !filters.type || program.type === filters.type;
    const matchesModality = !filters.modality || program.modality === filters.modality;

    const matchesPrice =
      (filters.minPrice === undefined || program.price >= filters.minPrice) &&
      (filters.maxPrice === undefined || program.price <= filters.maxPrice);

    const matchesHours =
      (filters.minHours === undefined || program.hours >= filters.minHours) &&
      (filters.maxHours === undefined || program.hours <= filters.maxHours);

    return matchesQuery && matchesType && matchesModality && matchesPrice && matchesHours;
  });

  return [...filtered].sort((a, b) => {
    if (filters.sortBy === 'price') return a.price - b.price;
    if (filters.sortBy === 'hours') return a.hours - b.hours;

    const queryScore = (program: Program): number => {
      if (!normalized) return 1;
      if (program.title.toLowerCase().includes(normalized)) return 3;
      if (program.institution.toLowerCase().includes(normalized)) return 2;
      return 1;
    };

    return queryScore(b) - queryScore(a);
  });
};
