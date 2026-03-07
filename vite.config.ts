import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1];

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // Dev/preview local: '/'
  // Build para GitHub Pages (Actions): '/<repo>/'
  base: command === 'build' && repoName ? `/${repoName}/` : '/',
}));
