import { Bandage, Binoculars, Crosshair, Slice } from 'lucide-react';
import type { ReactElement } from 'react';
import { Boussole } from './boussole/Boussole';
import { GardeRobe } from './garde-robe/GardeRobe';
import { Hud } from './hud/Hud';
import { InfoVehicule } from './info-vehicule/InfoVehicule';
import { Pause } from './pause/Pause';
import type { Emplacement } from './roulette/roue';
import { Roulette } from './roulette/Roulette';

const RIEN = () => undefined;

const EMPLACEMENTS: readonly Emplacement[] = [
  { nom: 'jumelles', libelle: 'Jumelles', categorie: 'Outil', icone: <Binoculars strokeWidth={1.6} /> },
  { nom: 'bandage', libelle: 'Bandage', categorie: 'Soins', icone: <Bandage strokeWidth={1.6} />, quantite: 6 },
  { nom: 'couteau', libelle: 'Couteau', categorie: 'Corps à corps', icone: <Slice strokeWidth={1.6} /> },
  null,
  null,
  {
    nom: 'pistolet',
    libelle: 'Pistolet',
    categorie: 'Arme de poing',
    icone: <Crosshair strokeWidth={1.6} />,
    munitions: { chargeur: 15, reserve: 84 },
  },
  null,
];

export interface Ecran {
  readonly cle: string;
  readonly libelle: string;
  readonly rendu: () => ReactElement;
}

export const ECRANS: readonly Ecran[] = [
  {
    cle: 'hud',
    libelle: 'HUD',
    rendu: () => (
      <>
        <Hud />
        <Boussole cap={357} destination={{ cap: 17, distance: 4750 }} />
      </>
    ),
  },
  { cle: 'boussole', libelle: 'Boussole', rendu: () => <Boussole cap={357} destination={{ cap: 17, distance: 4750 }} /> },
  {
    cle: 'boussole-police',
    libelle: 'Boussole police',
    rendu: () => <Boussole cap={357} destination={{ cap: 17, distance: 4750 }} poursuite />,
  },
  { cle: 'pause', libelle: 'Menu pause', rendu: () => <Pause nouveautes={['boutique']} surChoix={RIEN} surFermeture={RIEN} /> },
  { cle: 'garde-robe', libelle: 'Garde-robe', rendu: () => <GardeRobe liquide={407} banque={2480} surFermeture={RIEN} /> },
  { cle: 'roulette', libelle: 'Roulette d’armes', rendu: () => <Roulette emplacements={EMPLACEMENTS} equipee={null} /> },
  {
    cle: 'info-vehicule',
    libelle: 'Info véhicule',
    rendu: () => (
      <InfoVehicule
        marque="Bravado"
        modele="Buffalo"
        annee={2019}
        lignes={[
          { libelle: 'Accès', valeur: 'Cloneur de clé', icone: 'cle' },
          { libelle: 'Sécurité', valeur: 'Avec alarme', icone: 'alarme' },
          { libelle: 'Traceur', valeur: 'Standard', icone: 'traceur' },
        ]}
      />
    ),
  },
];
