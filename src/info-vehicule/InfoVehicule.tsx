import type { ReactNode } from 'react';
import {
  Bloc,
  BoutonB,
  Carte,
  Contour,
  Corps,
  Embleme,
  Entete,
  Ligne,
  Marque,
  Modele,
  Pagination,
  Pastille,
  Point,
  Retour,
  Touche,
  Valeur,
} from './styles';

export type IconeInfo = 'cle' | 'alarme' | 'traceur';

export interface LigneInfo {
  readonly libelle: string;
  readonly valeur: string;
  readonly icone: IconeInfo;
}

export interface ProprietesInfoVehicule {
  readonly marque: string;
  readonly modele: string;
  readonly annee?: number | null;
  readonly lignes: readonly LigneInfo[];
  readonly page?: number;
  readonly pages?: number;
}

const ROUGE = '#e8414b';
const JAUNE = '#f2b630';

const GLYPHES: Readonly<Record<IconeInfo, ReactNode>> = {
  cle: (
    <g fill="none" stroke={ROUGE} strokeWidth="1.5" strokeLinecap="round">
      <path d="M-1.6 5.4L1.9 1.9" strokeWidth="2.2" />
      <path d="M-3.4 3.6L-1.6 5.4" strokeWidth="2.2" />
      <circle cx="3.2" cy="0.6" r="1.6" fill={ROUGE} stroke="none" />
      <path d="M-1.4 -2.4A4.4 4.4 0 0 1 4.4 -3.6" />
      <path d="M-3.6 -4.6A7.6 7.6 0 0 1 6.4 -6.2" />
    </g>
  ),
  alarme: (
    <g>
      <path d="M0 -6.2L5 -4.2V0C5 3.2 2.8 5.4 0 6.4C-2.8 5.4 -5 3.2 -5 0V-4.2Z" fill={ROUGE} />
      <path d="M0 -2.8V1" stroke="#2a2a2d" strokeWidth="1.5" strokeLinecap="round" />
      <circle cy="3.1" r="0.85" fill="#2a2a2d" />
    </g>
  ),
  traceur: (
    <g>
      <path
        d="M0 -6C-2.6 -6 -4.4 -4.1 -4.4 -1.7C-4.4 1.2 0 4.2 0 4.2C0 4.2 4.4 1.2 4.4 -1.7C4.4 -4.1 2.6 -6 0 -6ZM0 0.2A1.7 1.7 0 1 1 0 -3.2A1.7 1.7 0 1 1 0 0.2Z"
        fill={JAUNE}
        fillRule="evenodd"
      />
      <path
        d="M-5.4 3.2C-6.6 3.8 -6.6 5.6 0 5.9C6.6 5.6 6.6 3.8 5.4 3.2"
        fill="none"
        stroke={JAUNE}
        strokeWidth="1.4"
      />
    </g>
  ),
};

function Icone({ type }: { readonly type: IconeInfo }) {
  return (
    <Pastille viewBox="-10 -10 20 20" aria-hidden>
      <circle r="9.3" fill="#2a2a2d" stroke="#1d1b1c" strokeWidth="1" />
      {GLYPHES[type]}
    </Pastille>
  );
}

function EmblemeTaureau() {
  return (
    <Embleme viewBox="-50 -50 100 100" aria-hidden>
      <circle r="46" fill="none" stroke="#fff" strokeWidth="3" />
      <path
        d="M-30 -30C-26 -18 -18 -12 -10 -12H10C18 -12 26 -18 30 -30C34 -16 28 -2 18 2C16 14 8 26 0 30C-8 26 -16 14 -18 2C-28 -2 -34 -16 -30 -30Z"
        fill="#fff"
      />
    </Embleme>
  );
}

export function InfoVehicule({ marque, modele, annee = null, lignes, page = 1, pages = 2 }: ProprietesInfoVehicule) {
  return (
    <Bloc>
      <Pagination>
        {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
          <Point key={n} actif={n === page} />
        ))}
        <Touche>R</Touche>
      </Pagination>
      <Carte>
        <Entete>
          <EmblemeTaureau />
          <Marque>{marque}</Marque>
          <Modele>
            {modele}
            {annee !== null && ` (${annee})`}
          </Modele>
        </Entete>
        <Corps>
          {lignes.map((l) => (
            <Ligne key={l.libelle}>
              <Contour>{l.libelle}</Contour>
              <Valeur>
                <Contour>{l.valeur}</Contour>
                <Icone type={l.icone} />
              </Valeur>
            </Ligne>
          ))}
        </Corps>
      </Carte>
      <Retour>
        <Contour>Retour</Contour>
        <BoutonB>B</BoutonB>
      </Retour>
    </Bloc>
  );
}
