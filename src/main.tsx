import ReactDOM from 'react-dom/client';
import { App } from './App';
import './styles/index.css';
import { downloadLeadsCsv } from './lib/leads';

declare global {
  interface Window {
    studiaExportLeads?: () => boolean;
  }
}

window.studiaExportLeads = downloadLeadsCsv;

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
