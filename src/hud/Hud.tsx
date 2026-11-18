import { useEffect, useState } from 'react';
import { Argent } from './Argent';
import { CadreMinimap } from './CadreMinimap';
import { Gps } from './Gps';
import { type Presentation, PresentationVehicule } from './PresentationVehicule';
import { Recherche } from './Recherche';
import { Statuts } from './Statuts';
import { Voyants } from './Voyants';
import { ECART_GPS_VH, HAUTEUR_GPS_VH, ZONE_MINIMAP } from './zone';

const DEMO: Presentation = { marque: 'Dinka', modele: 'Enduro', annee: 1972, moteur: 88, essence: 100 };

export function Hud() {
  const [presentation, setPresentation] = useState<Presentation | null>(DEMO);

  useEffect(() => {
    let masquer = setTimeout(() => setPresentation(null), 4000);
    const boucle = setInterval(() => {
      setPresentation(DEMO);
      masquer = setTimeout(() => setPresentation(null), 4000);
    }, 6000);
    return () => {
      clearInterval(boucle);
      clearTimeout(masquer);
    };
  }, []);

  const decalage = HAUTEUR_GPS_VH + ECART_GPS_VH;
  return (
    <>
      <CadreMinimap zone={ZONE_MINIMAP} carte />
      <Statuts vie={49} endurance={100} concentration={100} />
      <Recherche niveau={2} />
      <Argent liquide={40} banque={1980} />
      <Gps zone={ZONE_MINIMAP} manoeuvre="gauche" distance={94} />
      {presentation === null && <Voyants zone={ZONE_MINIMAP} decalage={decalage} />}
      <PresentationVehicule zone={ZONE_MINIMAP} presentation={presentation} decalage={decalage} />
    </>
  );
}
