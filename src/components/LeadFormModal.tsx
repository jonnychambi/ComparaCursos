import { useState } from 'react';
import { saveLead, timelineOptions } from '../lib/leads';

interface LeadFormModalProps {
  programTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

interface Errors {
  name?: string;
  email?: string;
  country?: string;
  timeline?: string;
  consent?: string;
}

export const LeadFormModal = ({ programTitle, isOpen, onClose }: LeadFormModalProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [timeline, setTimeline] = useState('En el próximo mes');
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [success, setSuccess] = useState('');

  if (!isOpen) return null;

  const validate = (): boolean => {
    const nextErrors: Errors = {};
    if (!name.trim()) nextErrors.name = 'Nombre es obligatorio';
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = 'Email inválido';
    if (!country.trim()) nextErrors.country = 'País es obligatorio';
    if (!timeline) nextErrors.timeline = 'Selecciona una opción';
    if (!consent) nextErrors.consent = 'Debes aceptar el consentimiento';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    saveLead({
      name: name.trim(),
      email: email.trim(),
      country: country.trim(),
      phone: phone.trim() || undefined,
      program: programTitle,
      timeline: timeline as (typeof timelineOptions)[number],
    });

    setSuccess('¡Gracias! Tu solicitud fue registrada.');
    setName('');
    setEmail('');
    setCountry('');
    setPhone('');
    setTimeline('En el próximo mes');
    setConsent(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-studia-dark/40 p-4">
      <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-soft">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-studia-dark">Solicitar información</h3>
          <button onClick={onClose} className="text-slate-500">Cerrar</button>
        </div>
        <p className="mt-1 text-sm text-slate-600">Programa de interés: <strong>{programTitle}</strong></p>

        <form onSubmit={handleSubmit} className="mt-4 grid gap-3">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" className="rounded-xl border border-studia-soft px-3 py-2" />
          {errors.name && <p className="text-xs text-red-600">{errors.name}</p>}
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="rounded-xl border border-studia-soft px-3 py-2" />
          {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
          <input value={country} onChange={(e) => setCountry(e.target.value)} placeholder="País" className="rounded-xl border border-studia-soft px-3 py-2" />
          {errors.country && <p className="text-xs text-red-600">{errors.country}</p>}
          <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Teléfono (opcional)" className="rounded-xl border border-studia-soft px-3 py-2" />

          <label className="text-sm text-slate-700">¿Cuándo planeas iniciar este programa?</label>
          <select value={timeline} onChange={(e) => setTimeline(e.target.value)} className="rounded-xl border border-studia-soft px-3 py-2">
            {timelineOptions.map((option) => <option key={option}>{option}</option>)}
          </select>

          <label className="flex items-start gap-2 text-sm text-slate-600">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1" />
            Acepto el uso de mis datos para recibir información educativa de Studia.
          </label>
          {errors.consent && <p className="text-xs text-red-600">{errors.consent}</p>}

          {success && <p className="rounded-lg bg-emerald-50 p-2 text-sm text-emerald-700">{success}</p>}

          <button type="submit" className="rounded-full bg-studia-mint px-4 py-2 font-semibold text-studia-dark">
            Enviar solicitud
          </button>
        </form>
      </div>
    </div>
  );
};
