import './theme/polices';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

const racine = document.getElementById('root');
if (racine) {
  createRoot(racine).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
