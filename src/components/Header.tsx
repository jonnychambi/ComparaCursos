import { Link, NavLink } from 'react-router-dom';

const navItems = [
  { label: 'Explorar', to: '/explorar' },
  { label: 'Sobre nosotros', to: '/nosotros' },
  { label: 'Instituciones aliadas', to: '/instituciones' },
];

export const Header = () => (
  <header className="sticky top-0 z-40 border-b border-studia-soft bg-white/95 backdrop-blur">
    <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
      <Link to="/" className="text-2xl font-semibold tracking-tight text-studia-dark">
        Studia
      </Link>
      <nav className="hidden items-center gap-6 md:flex">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `text-sm transition ${isActive ? 'text-studia-primary' : 'text-slate-600 hover:text-studia-dark'}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <Link
        to="/explorar"
        className="rounded-full bg-studia-mint px-4 py-2 text-sm font-semibold text-studia-dark transition hover:brightness-95"
      >
        Explorar programas
      </Link>
    </div>
  </header>
);
