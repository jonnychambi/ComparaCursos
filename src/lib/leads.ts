import { LEADS_STORAGE_KEY } from './constants';
import type { Lead, StartTimeline } from '../types';

export const timelineOptions: StartTimeline[] = [
  'En el próximo mes',
  'En 1 a 3 meses',
  'En más de 3 meses',
  'Solo estoy explorando',
];

export const scoreByTimeline: Record<StartTimeline, number> = {
  'En el próximo mes': 100,
  'En 1 a 3 meses': 70,
  'En más de 3 meses': 40,
  'Solo estoy explorando': 10,
};

export const getLeads = (): Lead[] => {
  const raw = localStorage.getItem(LEADS_STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as Lead[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const saveLead = (lead: Omit<Lead, 'id' | 'createdAt' | 'score'>): Lead => {
  const leads = getLeads();

  const newLead: Lead = {
    ...lead,
    id: crypto.randomUUID(),
    score: scoreByTimeline[lead.timeline],
    createdAt: new Date().toISOString(),
  };

  localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify([newLead, ...leads]));
  return newLead;
};

export const leadsToCsv = (leads: Lead[]): string => {
  const headers = ['id', 'nombre', 'email', 'pais', 'telefono', 'programa', 'timeline', 'score', 'fecha'];
  const rows = leads.map((lead) => [
    lead.id,
    lead.name,
    lead.email,
    lead.country,
    lead.phone ?? '',
    lead.program,
    lead.timeline,
    String(lead.score),
    lead.createdAt,
  ]);

  return [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(','))
    .join('\n');
};

export const downloadLeadsCsv = (): boolean => {
  const leads = getLeads();
  if (!leads.length) return false;

  const csv = leadsToCsv(leads);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `studia-leads-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  return true;
};
