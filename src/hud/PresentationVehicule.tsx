import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { ICONES_VOYANTS } from './Voyants';
import { auDessus, type Zone } from './zone';

const RAYON = 11.6;
const CIRCONFERENCE = 2 * Math.PI * RAYON;

const Panneau = styled(motion.div)`
  position: fixed;
  display: flex;
  flex-direction: column;
  pointer-events: none;
`;

const Haut = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 7vh;
  background: rgba(18, 18, 32, 0.92);
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 600;
  font-size: 1.95vh;
  line-height: 2.07vh;
  text-transform: uppercase;
  white-space: nowrap;
`;

const Bas = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.37vh;
  height: 2.95vh;
  background: rgba(40, 38, 42, 0.74);
`;

const Jauge = styled.svg`
  display: block;
  width: 2.4vh;
  height: 2.4vh;
`;

const borner = (valeur: number) => Math.max(0, Math.min(100, valeur));

function Voyant(p: { readonly chemin: string; readonly cadre: string; readonly valeur: number }) {
  return (
    <Jauge viewBox="-13 -13 26 26" aria-hidden>
      <circle r="13" fill="#22252a" />
      <circle r={RAYON} fill="none" stroke="#2c3a31" strokeWidth="2.2" />
      <circle
        r={RAYON}
        fill="none"
        stroke="#4f9a5f"
        strokeWidth="2.2"
        strokeDasharray={`${(CIRCONFERENCE * borner(p.valeur)) / 100} ${CIRCONFERENCE}`}
        transform="rotate(-90)"
      />
      <svg x="-6" y="-6" width="12" height="12" viewBox={p.cadre} aria-hidden>
        <path d={p.chemin} fill="#57ab66" />
      </svg>
    </Jauge>
  );
}

export interface Presentation {
  readonly marque: string;
  readonly modele: string;
  readonly annee: number | null;
  readonly moteur: number;
  readonly essence: number;
}

export function PresentationVehicule(p: {
  readonly zone: Zone;
  readonly presentation: Presentation | null;
  readonly decalage?: number;
}) {
  const v = p.presentation;
  return (
    <AnimatePresence>
      {v !== null && (
        <Panneau
          key="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          style={auDessus(p.zone, 0.2 + (p.decalage ?? 0))}
        >
          <Haut>
            {v.marque !== '' && <span style={{ color: '#a9a7a7' }}>{v.marque}</span>}
            <span style={{ color: '#f2f2f2' }}>
              {v.modele}
              {v.annee !== null && ` (${v.annee})`}
            </span>
          </Haut>
          <Bas>
            <Voyant {...ICONES_VOYANTS.moteur} valeur={v.moteur} />
            <Voyant {...ICONES_VOYANTS.essence} valeur={v.essence} />
          </Bas>
        </Panneau>
      )}
    </AnimatePresence>
  );
}
