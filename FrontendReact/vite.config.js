// Kilde 1
// lage en lokal proxy for utviklingsserveren
// Koden endrer API-adressen https://app.ticketmaster.com/discovery/v2/events 
// til /api/discovery/v2/events. på den måten kan vi bruke /api/discovery/v2/eventsa i 
// fetch funksjonen for å hente data, isteden for å bruke selve API-adressen
// på denne måten unngår CORS-problemer når vi prøver å gjøre API-kall til 
// ticketmaster.com fra vår lokale frontend og Skjuler API-nøkkelen i 
// frontendkoden, ved å sende kall via /api.
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://app.ticketmaster.com/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
