import { Link } from 'react-router-dom';

export const Footer = () => (
  <footer className="mt-20 border-t border-studia-soft bg-slate-50">
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3 md:px-6">
      <div>
        <p className="text-xl font-semibold text-studia-dark">Studia</p>
        <p className="mt-2 text-sm text-slate-600">
          Comparador inteligente de programas tech para decisiones educativas más estratégicas.
        </p>
      </div>
      <div className="flex flex-col gap-2 text-sm">
        <Link to="/explorar" className="text-slate-600 hover:text-studia-primary">Explorar</Link>
        <Link to="/nosotros" className="text-slate-600 hover:text-studia-primary">Nosotros</Link>
        <Link to="/instituciones" className="text-slate-600 hover:text-studia-primary">Instituciones aliadas</Link>
      </div>
      <div className="text-sm text-slate-500 md:text-right">© {new Date().getFullYear()} Studia. Todos los derechos reservados.</div>
    </div>
  </footer>
);
