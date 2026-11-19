import styled from '@emotion/styled';
import type { ReactNode } from 'react';

const RAYON_ARC = 12.6;
const CIRCONFERENCE = 2 * Math.PI * RAYON_ARC;
const SOMBRE = '#171a21';

const Bloc = styled.div`
  position: fixed;
  top: 8.7vh;
  right: 1.7vh;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.2vh;
`;

const Ligne = styled.div`
  display: flex;
  align-items: center;
  gap: 0.74vh;
`;

const Montant = styled.span`
  padding-top: 0.4vh;
  font-family: 'Teko', sans-serif;
  font-weight: 700;
  font-size: 2.55vh;
  line-height: 1;
  letter-spacing: 0.01em;
  color: #fff;
  text-shadow:
    1px 0 0 #141414,
    -1px 0 0 #141414,
    0 1px 0 #141414,
    0 -1px 0 #141414,
    1px 1px 0 #141414,
    -1px -1px 0 #141414,
    1px -1px 0 #141414,
    -1px 1px 0 #141414,
    0 0 0.3vh rgba(0, 0, 0, 0.5);
`;

const Rond = styled.svg`
  display: block;
  flex: none;
  width: 2.7vh;
  height: 2.7vh;
  overflow: visible;
`;

const borner = (valeur: number) => Math.max(0, Math.min(1, valeur));

function Pastille({ couleur, jauge, children }: { readonly couleur: string; readonly jauge: number; readonly children: ReactNode }) {
  return (
    <Rond viewBox="-14.5 -14.5 29 29" aria-hidden>
      <circle r="14" fill="#303030" />
      <circle r={RAYON_ARC} fill="none" stroke={SOMBRE} strokeWidth="2.1" />
      <circle
        r={RAYON_ARC}
        fill="none"
        stroke={couleur}
        strokeWidth="2.1"
        strokeDasharray={`${CIRCONFERENCE * borner(jauge)} ${CIRCONFERENCE}`}
        transform="rotate(-90)"
      />
      <g transform="translate(-7.2 -7.2) scale(0.6)">{children}</g>
    </Rond>
  );
}

const VIOLET = '#c77ffc';
const VERT = '#90df86';
const BLEU = '#31f4d8';

const BUCKME = (
  <g fill="none" strokeLinecap="round" strokeLinejoin="round">
    <g stroke={SOMBRE} strokeWidth="4.6">
      <path d="M10.4 3.4C9.2 3.4 8.6 4.2 8.6 5.4V17.2C8.6 18.6 10.2 19.8 12.8 19.8C16 19.8 18 17.6 18 14.8C18 12 16 10 13.4 10C11.8 10 10.4 10.8 9.6 12" />
      <path d="M2.8 9.6H6M3.6 12.6H6M4.4 15.6H6" />
    </g>
    <g stroke={VIOLET} strokeWidth="2.6">
      <path d="M10.4 3.4C9.2 3.4 8.6 4.2 8.6 5.4V17.2C8.6 18.6 10.2 19.8 12.8 19.8C16 19.8 18 17.6 18 14.8C18 12 16 10 13.4 10C11.8 10 10.4 10.8 9.6 12" />
      <path d="M2.8 9.6H6M3.6 12.6H6M4.4 15.6H6" />
    </g>
  </g>
);

const PORTEFEUILLE = (
  <>
    <rect x="3" y="5.6" width="18" height="13" rx="2.4" fill={VERT} stroke={SOMBRE} strokeWidth="1.3" />
    <path d="M6.2 8.4H15.4" stroke={SOMBRE} strokeWidth="1.3" strokeLinecap="round" />
    <path d="M21 10.2H17.4C16.3 10.2 15.4 11.1 15.4 12.2C15.4 13.3 16.3 14.2 17.4 14.2H21" fill="none" stroke={SOMBRE} strokeWidth="1.3" />
    <circle cx="17.6" cy="12.2" r="0.9" fill={SOMBRE} />
  </>
);

const PLANQUE = (
  <>
    <path d="M12 2.6L20.4 9V21.4H3.6V9Z" fill={BLEU} stroke={SOMBRE} strokeWidth="1.3" strokeLinejoin="round" />
    <text x="12" y="18.4" textAnchor="middle" fontFamily="Anton, sans-serif" fontSize="10" fill="#075a4e">
      $
    </text>
  </>
);

const formater = (montant: number) => `$${Math.round(montant).toLocaleString('en-US')}`;

export interface ProprietesArgent {
  readonly banque: number;
  readonly liquide: number;
  readonly planque?: number | null;
  readonly jauges?: { readonly banque?: number; readonly liquide?: number; readonly planque?: number };
  readonly haut?: string;
}

export const LIQUIDE_MAX = 20000;

export function Argent({ banque, liquide, planque = null, jauges = {}, haut }: ProprietesArgent) {
  return (
    <Bloc style={haut === undefined ? undefined : { top: haut }}>
      <Ligne>
        <Montant>{formater(banque)}</Montant>
        <Pastille couleur={VIOLET} jauge={jauges.banque ?? 0.46}>
          {BUCKME}
        </Pastille>
      </Ligne>
      <Ligne>
        <Montant>{formater(liquide)}</Montant>
        <Pastille couleur={VERT} jauge={jauges.liquide ?? liquide / LIQUIDE_MAX}>
          {PORTEFEUILLE}
        </Pastille>
      </Ligne>
      {planque !== null && (
        <Ligne>
          <Montant>{formater(planque)}</Montant>
          <Pastille couleur="#3fe6cc" jauge={jauges.planque ?? 0.12}>
            {PLANQUE}
          </Pastille>
        </Ligne>
      )}
    </Bloc>
  );
}
