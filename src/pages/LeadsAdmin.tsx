import { useMemo } from 'react';
import { downloadLeadsCsv, getLeads } from '../lib/leads';

export const LeadsAdmin = () => {
  const leads = useMemo(() => getLeads(), []);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-semibold text-studia-dark">Leads captados (local)</h1>
        <button onClick={() => downloadLeadsCsv()} className="rounded-full bg-studia-mint px-4 py-2 font-semibold text-studia-dark">
          Exportar CSV
        </button>
      </div>

      {!leads.length ? (
        <p className="mt-6 text-slate-600">Aún no hay leads registrados en localStorage.</p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-studia-soft">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-studia-dark">
              <tr>
                <th className="px-3 py-2">Nombre</th>
                <th className="px-3 py-2">Email</th>
                <th className="px-3 py-2">País</th>
                <th className="px-3 py-2">Programa</th>
                <th className="px-3 py-2">Timeline</th>
                <th className="px-3 py-2">Score</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-t border-studia-soft">
                  <td className="px-3 py-2">{lead.name}</td>
                  <td className="px-3 py-2">{lead.email}</td>
                  <td className="px-3 py-2">{lead.country}</td>
                  <td className="px-3 py-2">{lead.program}</td>
                  <td className="px-3 py-2">{lead.timeline}</td>
                  <td className="px-3 py-2">{lead.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="mt-4 text-sm text-slate-500">Tip: también puedes exportar desde consola con <code>window.studiaExportLeads()</code>.</p>
    </main>
  );
};
