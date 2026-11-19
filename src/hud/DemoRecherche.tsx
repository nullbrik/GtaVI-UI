import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { type EtatRecherche, Recherche } from './Recherche';

const ETATS: readonly { readonly etat: EtatRecherche; readonly libelle: string }[] = [
  { etat: 'creuse', libelle: 'Signalé' },
  { etat: 'blanche', libelle: 'Poursuite' },
  { etat: 'clignotante', libelle: 'Recherche' },
  { etat: 'rouge', libelle: 'Zone chaude' },
];

const Legende = styled.div`
  position: fixed;
  top: 12vh;
  right: 1.7vh;
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 600;
  font-size: 2vh;
  text-transform: uppercase;
  color: #fff;
  text-shadow: 0 0.1vh 0.3vh rgba(0, 0, 0, 0.6);
`;

export function DemoRecherche() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const boucle = setInterval(() => setIndex((i) => (i + 1) % ETATS.length), 3000);
    return () => clearInterval(boucle);
  }, []);
  const courant = ETATS[index] ?? ETATS[0];
  return (
    <>
      <Recherche
        niveau={3}
        etat={courant?.etat ?? 'blanche'}
        indices={['arme', 'personne', 'tenue', 'duo', 'camera', 'vehicule']}
      />
      <Legende>{courant?.libelle}</Legende>
    </>
  );
}
