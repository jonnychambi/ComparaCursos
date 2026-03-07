import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Explore } from './pages/Explore';
import { ProgramDetail } from './pages/ProgramDetail';
import { About } from './pages/About';
import { Institutions } from './pages/Institutions';
import { LeadsAdmin } from './pages/LeadsAdmin';

export const App = () => (
  <HashRouter>
    <div className="min-h-screen bg-white font-sans">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explorar" element={<Explore />} />
        <Route path="/programa/:id" element={<ProgramDetail />} />
        <Route path="/nosotros" element={<About />} />
        <Route path="/instituciones" element={<Institutions />} />
        <Route path="/interno/leads" element={<LeadsAdmin />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </div>
  </HashRouter>
);
