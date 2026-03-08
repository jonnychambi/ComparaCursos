import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Base relativa para que el build funcione en preview local y en GitHub Pages
  // sin depender de variables de entorno.
  base: './',
});
