import { useEffect, useRef, useState } from 'react';
import { Argent } from '../hud/Argent';
import {
  BarreOnglets,
  Calque,
  Compteur,
  Curseur,
  Defilement,
  Gachette,
  Libelle,
  Ligne,
  Liste,
  Losange,
  masqueListe,
  Onglet,
  Onglets,
  Titre,
  Vehicule,
} from './styles';

interface Article {
  readonly libelle: string;
  readonly nouveau?: boolean;
  readonly vehicule?: boolean;
}

interface Rubrique {
  readonly cle: string;
  readonly libelle: string;
  readonly nouveau?: boolean;
  readonly articles: readonly Article[];
}

const VISIBLES = 8;

export const RUBRIQUES: readonly Rubrique[] = [
  {
    cle: 'tenues',
    libelle: 'Tenues',
    articles: [
      { libelle: 'Tenues sauvegardées' },
      { libelle: 'Chemise militaire et jean' },
      { libelle: 'Chemise hawaïenne et short' },
      { libelle: 'Chemise en flanelle et jean' },
      { libelle: 'T-shirt et short de plage', vehicule: true },
      { libelle: 'Débardeur touriste et jean coupé' },
      { libelle: 'Tenue de sport', nouveau: true },
      { libelle: 'Maillot de bain', nouveau: true },
      { libelle: 'Sous-vêtements' },
      { libelle: 'Vêtements de nuit', nouveau: true },
    ],
  },
  {
    cle: 'hauts',
    libelle: 'Hauts',
    articles: [
      { libelle: 'Chemise militaire' },
      { libelle: 'Chemise hawaïenne' },
      { libelle: 'Chemise en flanelle' },
      { libelle: 'T-shirt blanc' },
      { libelle: 'Débardeur touriste' },
      { libelle: 'Sweat à capuche' },
    ],
  },
  {
    cle: 'bas',
    libelle: 'Bas',
    nouveau: true,
    articles: [
      { libelle: 'Jean droit' },
      { libelle: 'Short de plage' },
      { libelle: 'Jean coupé' },
      { libelle: 'Jogging', nouveau: true },
    ],
  },
  {
    cle: 'chaussures',
    libelle: 'Chaussures',
    articles: [{ libelle: 'Tongs' }, { libelle: 'Baskets blanches' }, { libelle: 'Bottes de chantier' }],
  },
  {
    cle: 'accessoires',
    libelle: 'Accessoires',
    nouveau: true,
    articles: [
      { libelle: 'Casquette à l’envers' },
      { libelle: 'Lunettes de soleil', nouveau: true },
      { libelle: 'Montre dorée' },
    ],
  },
];

function IconeVehicule() {
  return (
    <Vehicule viewBox="0 0 24 24" aria-hidden>
      <path
        d="M5.2 10.3L6.6 6.6C6.9 5.7 7.8 5.1 8.7 5.1H15.3C16.2 5.1 17.1 5.7 17.4 6.6L18.8 10.3C19.9 10.6 20.6 11.6 20.6 12.7V17.2C20.6 17.7 20.2 18.1 19.7 18.1H18.6C18.1 18.1 17.7 17.7 17.7 17.2V16.3H6.3V17.2C6.3 17.7 5.9 18.1 5.4 18.1H4.3C3.8 18.1 3.4 17.7 3.4 17.2V12.7C3.4 11.6 4.1 10.6 5.2 10.3ZM7 10.1H17L16 7.4C15.9 7.1 15.6 6.9 15.3 6.9H8.7C8.4 6.9 8.1 7.1 8 7.4ZM6.6 14.5A1.2 1.2 0 1 0 6.6 12.1A1.2 1.2 0 1 0 6.6 14.5ZM17.4 14.5A1.2 1.2 0 1 0 17.4 12.1A1.2 1.2 0 1 0 17.4 14.5Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </Vehicule>
  );
}

export function GardeRobe({
  liquide,
  banque,
  surFermeture,
}: {
  readonly liquide: number;
  readonly banque: number;
  readonly surFermeture: () => void;
}) {
  const [rubrique, setRubrique] = useState(0);
  const [index, setIndex] = useState(1);
  const courante = RUBRIQUES[rubrique] ?? RUBRIQUES[0];
  const articles = courante?.articles ?? [];
  const debut = Math.max(0, Math.min(index - 1, articles.length - VISIBLES));
  const visibles = articles.slice(debut, debut + VISIBLES);
  const [vus, setVus] = useState<ReadonlySet<string>>(new Set());
  const precedent = useRef<string | null>(null);
  const actuel = `${courante?.cle}:${articles[index]?.libelle ?? ''}`;

  useEffect(() => {
    const quitte = precedent.current;
    precedent.current = actuel;
    if (quitte !== null && quitte !== actuel) setVus((v) => new Set(v).add(quitte));
  }, [actuel]);

  const changerRubrique = (sens: number) => {
    setRubrique((r) => (r + sens + RUBRIQUES.length) % RUBRIQUES.length);
    setIndex(0);
  };

  useEffect(() => {
    const surTouche = (e: KeyboardEvent) => {
      const total = articles.length;
      if (e.key === 'ArrowDown') setIndex((i) => (i + 1) % total);
      else if (e.key === 'ArrowUp') setIndex((i) => (i - 1 + total) % total);
      else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'q') changerRubrique(-1);
      else if (e.key === 'ArrowRight' || e.key === 'e') changerRubrique(1);
      else if (e.key === 'Escape' || e.key === 'Backspace') surFermeture();
    };
    window.addEventListener('keydown', surTouche);
    return () => window.removeEventListener('keydown', surTouche);
  });

  return (
    <Calque>
      <Titre>GARDE-ROBE</Titre>
      <Argent liquide={liquide} banque={banque} haut="2.4vh" />
      <Onglets>
        <Gachette>LB</Gachette>
        <BarreOnglets>
          {RUBRIQUES.map((r, i) => (
            <Onglet
              key={r.cle}
              type="button"
              actif={i === rubrique}
              forme={i === 0 ? 'debut' : i === RUBRIQUES.length - 1 ? 'fin' : 'milieu'}
              onClick={() => {
                setRubrique(i);
                setIndex(0);
              }}
            >
              {r.nouveau && <Losange petit />}
              {r.libelle}
            </Onglet>
          ))}
        </BarreOnglets>
        <Gachette>RB</Gachette>
      </Onglets>
      <Liste style={{ maskImage: masqueListe(debut > 0, debut + VISIBLES < articles.length) }}>
        {visibles.map((a, i) => {
          const position = debut + i;
          const cle = `${courante?.cle}:${a.libelle}`;
          return (
            <Ligne key={a.libelle} type="button" actif={position === index} onMouseEnter={() => setIndex(position)}>
              {a.nouveau && !vus.has(cle) && <Losange />}
              <Libelle>{a.libelle}</Libelle>
              {a.vehicule && <IconeVehicule />}
            </Ligne>
          );
        })}
      </Liste>
      {articles.length > VISIBLES && (
        <Defilement>
          <Curseur
            style={{
              top: `${(debut / articles.length) * 100}%`,
              height: `${(VISIBLES / articles.length) * 100}%`,
            }}
          />
        </Defilement>
      )}
      <Compteur>
        <span>{index + 1}</span>
        <span>/</span>
        <span>{articles.length}</span>
      </Compteur>
    </Calque>
  );
}
