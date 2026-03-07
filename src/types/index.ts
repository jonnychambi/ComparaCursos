export type ProgramType = 'Curso' | 'Bootcamp' | 'Diplomado' | 'Maestría';
export type Modality = 'Síncrono' | 'Asíncrono' | 'Híbrido';

export interface Program {
  id: string;
  title: string;
  institution: string;
  type: ProgramType;
  modality: Modality;
  hours: number;
  price: number;
  currency: 'USD';
  instructorName: string;
  instructorBio: string;
  tags: string[];
  summary: string;
  contentBullets: string[];
  highlights: string[];
}

export interface Institution {
  id: string;
  name: string;
  country: string;
  programCount: number;
  description: string;
  categories: string[];
}

export type StartTimeline =
  | 'En el próximo mes'
  | 'En 1 a 3 meses'
  | 'En más de 3 meses'
  | 'Solo estoy explorando';

export interface Lead {
  id: string;
  name: string;
  email: string;
  country: string;
  phone?: string;
  program: string;
  timeline: StartTimeline;
  score: number;
  createdAt: string;
}
