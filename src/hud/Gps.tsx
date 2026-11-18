import styled from '@emotion/styled';
import type { ReactNode } from 'react';
import { auDessus, ECART_GPS_VH, HAUTEUR_GPS_VH, type Zone } from './zone';

export type Manoeuvre = 'suivre' | 'gauche' | 'droite' | 'toutDroit' | 'serreGauche' | 'serreDroite' | 'calcul';

const Bandeau = styled.div`
  position: fixed;
  display: flex;
  height: ${HAUTEUR_GPS_VH}vh;
  pointer-events: none;
`;

const Texte = styled.div`
  display: flex;
  flex: 1;
  min-width: 0;
  flex-direction: column;
  justify-content: center;
  padding-left: 1.2vh;
  border-radius: 0.3vh 0 0 0.3vh;
  background: #20212c;
  color: #fafbff;
  font-family: 'Inter', sans-serif;
  line-height: 1.95vh;
  white-space: nowrap;
`;

const Consigne = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 700;
  font-size: 1.53vh;
`;

const Distance = styled.span`
  font-weight: 400;
  font-size: 1.5vh;
`;

const Fleche = styled.div`
  flex: none;
  width: 4.81vh;
  border-radius: 0 0.4vh 0.4vh 0;
  background: #31e7cd;

  & > svg {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

const NOIR = '#04161b';
const VOIE = 'rgba(4, 22, 27, 0.32)';

const CONSIGNES: Readonly<Record<Manoeuvre, string>> = {
  suivre: 'Suivez l’itinéraire',
  gauche: 'Tournez à gauche',
  droite: 'Tournez à droite',
  toutDroit: 'Continuez tout droit',
  serreGauche: 'Virage serré à gauche',
  serreDroite: 'Virage serré à droite',
  calcul: 'Calcul de l’itinéraire',
};

function Virage() {
  return (
    <>
      <path d="M33 8V19.5" stroke={VOIE} strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M33 38V29C33 24.5 30.5 21 27 18L21.5 13.3" stroke={NOIR} strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M15.5 8.5L23.8 9.3L18.2 16.3Z" fill={NOIR} />
    </>
  );
}

function VirageSerre() {
  return (
    <>
      <path d="M32 38V18C32 12 24 11 20 16L18.5 18.2" stroke={NOIR} strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M14.5 24L22.2 20.75L14.8 15.65Z" fill={NOIR} />
    </>
  );
}

function ToutDroit({ attenue = false }: { readonly attenue?: boolean }) {
  return (
    <g opacity={attenue ? 0.45 : 1}>
      <path d="M26 38V15" stroke={NOIR} strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M26 7.5L31.5 15.5H20.5Z" fill={NOIR} />
    </g>
  );
}

const MIROIR = 'translate(52 0) scale(-1 1)';

const ICONES: Readonly<Record<Manoeuvre, ReactNode>> = {
  suivre: <ToutDroit />,
  gauche: <Virage />,
  droite: (
    <g transform={MIROIR}>
      <Virage />
    </g>
  ),
  toutDroit: <ToutDroit />,
  serreGauche: <VirageSerre />,
  serreDroite: (
    <g transform={MIROIR}>
      <VirageSerre />
    </g>
  ),
  calcul: <ToutDroit attenue />,
};

export function formaterDistance(metres: number): string {
  if (metres < 1000) return `${Math.round(metres / 10) * 10} m`;
  return `${(metres / 1000).toFixed(1).replace('.', ',')} km`;
}

export function Gps(p: { readonly zone: Zone; readonly manoeuvre: Manoeuvre; readonly distance: number }) {
  return (
    <Bandeau style={auDessus(p.zone, ECART_GPS_VH)}>
      <Texte>
        <Consigne>{CONSIGNES[p.manoeuvre]}</Consigne>
        {p.manoeuvre !== 'calcul' && <Distance>{formaterDistance(p.distance)}</Distance>}
      </Texte>
      <Fleche>
        <svg viewBox="0 0 52 46" aria-hidden>
          {ICONES[p.manoeuvre]}
        </svg>
      </Fleche>
    </Bandeau>
  );
}
