import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/niche-ai-prompt-library/',
  plugins: [react()],
});
