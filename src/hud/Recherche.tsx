import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import type { ReactNode } from 'react';

export type EtatRecherche = 'creuse' | 'blanche' | 'clignotante' | 'rouge';
export type Indice = 'arme' | 'personne' | 'tenue' | 'duo' | 'camera' | 'vehicule';

const CLES = ['e1', 'e2', 'e3', 'e4', 'e5', 'e6'] as const;
const ETOILE =
  'M12 2.05L14.72 9.31L22.46 9.65L16.39 14.48L18.47 21.95L12 17.67L5.53 21.95L7.61 14.48L1.54 9.65L9.28 9.31Z';
const CONTOUR = '#303030';

const clignote = keyframes`
  0%,
  49% {
    fill: #ffffff;
  }
  50%,
  100% {
    fill: #b3b3b3;
  }
`;

const Bloc = styled.div`
  position: fixed;
  top: 1.6vh;
  right: 1.7vh;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.6vh;
  transform: scale(1.3);
  transform-origin: top right;
`;

const Ligne = styled.div`
  display: flex;
  gap: 0.39vh;
`;

const Etoile = styled.svg`
  display: block;
  width: 2.3vh;
  height: 2.3vh;
  overflow: visible;

  .clignote {
    animation: ${clignote} 1s infinite;
  }
`;

const Badges = styled.div`
  display: flex;
  gap: 0.56vh;
`;

const Badge = styled.div`
  display: grid;
  place-items: center;
  box-sizing: border-box;
  width: 1.95vh;
  height: 1.95vh;
  border-radius: 50%;
  background: #781918;
  border: 0.14vh solid #3a1a20;

  & > svg {
    display: block;
    width: 1.2vh;
    height: 1.2vh;
  }
`;

function EtoileTerne() {
  return (
    <Etoile viewBox="0 0 24 24" aria-hidden>
      <path d={ETOILE} fill="rgba(0, 0, 0, 0.23)" style={{ filter: 'blur(0.35px)' }} />
    </Etoile>
  );
}

function EtoileActive({ etat }: { readonly etat: EtatRecherche }) {
  const remplissage = etat === 'rouge' ? '#8e171d' : '#ffffff';
  return (
    <Etoile viewBox="0 0 24 24" aria-hidden>
      <path
        d={ETOILE}
        fill={remplissage}
        stroke={CONTOUR}
        strokeWidth="1.15"
        strokeLinejoin="round"
        className={etat === 'clignotante' ? 'clignote' : undefined}
      />
      {etat === 'creuse' && (
        <path d={ETOILE} fill={CONTOUR} transform="translate(12 12.9) scale(0.55) translate(-12 -12.9)" />
      )}
    </Etoile>
  );
}

const BUSTE = (
  <>
    <path d="M12 2.4C9.1 2.4 7.4 4.9 7.4 8.4C7.4 11.6 8.9 14 10.6 14.8V15.8H13.4V14.8C15.1 14 16.6 11.6 16.6 8.4C16.6 4.9 14.9 2.4 12 2.4Z" />
    <path d="M5.6 18.6C5.6 17.6 6.4 17 7.4 17H16.6C17.6 17 18.4 17.6 18.4 18.6V21.4H5.6Z" />
  </>
);

const PICTOGRAMMES: Readonly<Record<Indice, ReactNode>> = {
  arme: (
    <path d="M2.6 6.4H21.4V11.2H12.4L11.6 13.4H9.6L8.4 18.6H3.4L5.2 11.2H2.6ZM10.2 11.2L9.9 12.2H11L11.4 11.2Z" fillRule="evenodd" />
  ),
  personne: BUSTE,
  tenue: (
    <path
      d="M10.2 5.6A1.9 1.9 0 1 1 12 8.2V9.6M12 9.6L3.4 17.4H20.6Z"
      fill="none"
      stroke="#fff"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  duo: (
    <>
      <g transform="translate(3.4 -1.2) scale(0.8)" opacity="0.92">
        {BUSTE}
      </g>
      <g transform="translate(-1.6 1.4) scale(0.86)" stroke="#781918" strokeWidth="1.4">
        {BUSTE}
      </g>
    </>
  ),
  camera: (
    <>
      <path d="M3.4 6.6L16.6 4.2L17.6 9.8L4.4 12.2Z" />
      <path d="M17.4 6.4L21 5.8L21.6 9.2L18 9.8Z" />
      <path d="M8.2 12.6H10.4V16.6H5.4V19.8H3.2V13.6H5.4V14.6H8.2Z" />
    </>
  ),
  vehicule: (
    <path
      d="M5.6 9.4L7.1 5.6C7.4 4.8 8.2 4.2 9.1 4.2H14.9C15.8 4.2 16.6 4.8 16.9 5.6L18.4 9.4C19.6 9.7 20.4 10.8 20.4 12V17.4C20.4 17.9 20 18.3 19.5 18.3H18C17.5 18.3 17.1 17.9 17.1 17.4V16.4H6.9V17.4C6.9 17.9 6.5 18.3 6 18.3H4.5C4 18.3 3.6 17.9 3.6 17.4V12C3.6 10.8 4.4 9.7 5.6 9.4ZM7.5 9.2H16.5L15.4 6.4C15.3 6.1 15 5.9 14.7 5.9H9.3C9 5.9 8.7 6.1 8.6 6.4ZM7 14.3A1.3 1.3 0 1 0 7 11.7A1.3 1.3 0 1 0 7 14.3ZM17 14.3A1.3 1.3 0 1 0 17 11.7A1.3 1.3 0 1 0 17 14.3Z"
      fillRule="evenodd"
    />
  ),
};

export interface ProprietesRecherche {
  readonly niveau: number;
  readonly etat?: EtatRecherche;
  readonly indices?: readonly Indice[];
}

export function Recherche({ niveau, etat = 'blanche', indices = ['tenue', 'personne'] }: ProprietesRecherche) {
  return (
    <Bloc>
      <Ligne>
        {CLES.map((cle, i) =>
          i >= CLES.length - niveau ? <EtoileActive key={cle} etat={etat} /> : <EtoileTerne key={cle} />,
        )}
      </Ligne>
      {indices.length > 0 && (
        <Badges>
          {indices.map((indice) => (
            <Badge key={indice}>
              <svg viewBox="0 0 24 24" fill="#fff" aria-hidden>
                {PICTOGRAMMES[indice]}
              </svg>
            </Badge>
          ))}
        </Badges>
      )}
    </Bloc>
  );
}
