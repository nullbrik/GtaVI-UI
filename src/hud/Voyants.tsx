import styled from '@emotion/styled';
import { auDessus, type Zone } from './zone';

const Rangee = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  gap: 0.55vh;
`;

const Rond = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.55vh;
  height: 2.55vh;
  border-radius: 50%;
  background: #2b2c2e;

  & > svg {
    display: block;
    width: 1.45vh;
    height: 1.45vh;
    fill: #e8e8e8;
  }
`;

export const ICONES_VOYANTS = {
  moteur: {
    chemin: 'M7 4v2h3v2H7l-2 2v3H3v-3H1v8h2v-3h2v3h3l2 2h8v-4h2v3h3V9h-3v3h-2V8h-6V6h3V4H7z',
    cadre: '0.28 0.73 24 24',
  },
  essence: {
    chemin:
      'M19.77 7.23l.01-.01-3.72-3.72L15 4.56l2.11 2.11c-.94.36-1.61 1.26-1.61 2.33 0 1.38 1.12 2.5 2.5 2.5.36 0 .69-.08 1-.21v7.21c0 .55-.45 1-1 1s-1-.45-1-1V14c0-1.1-.9-2-2-2h-1V5c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v16h10v-7.5h1.5v5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V9c0-.69-.28-1.32-.73-1.77zM12 10H6V5h6v5zm6 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z',
    cadre: '-0.36 0.61 24 24',
  },
} as const;

function Voyant({ chemin, cadre }: { readonly chemin: string; readonly cadre: string }) {
  return (
    <Rond>
      <svg viewBox={cadre} aria-hidden>
        <path d={chemin} />
      </svg>
    </Rond>
  );
}

export function Voyants({ zone, decalage = 0 }: { readonly zone: Zone; readonly decalage?: number }) {
  return (
    <Rangee style={auDessus(zone, 1.1 + decalage)}>
      <Voyant {...ICONES_VOYANTS.moteur} />
      <Voyant {...ICONES_VOYANTS.essence} />
    </Rangee>
  );
}
