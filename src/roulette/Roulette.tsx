import { type MouseEvent, useEffect, useMemo, useRef, useState, type WheelEvent } from 'react';
import poing from '../assets/poing.png';
import { caseVisee, disposer, type ElementRoue, type Emplacement, POSITIONS_VH, voisine } from './roue';
import {
  Barre,
  Calque,
  Carte,
  Categorie,
  Cercle,
  Coeur,
  Entete,
  Gachette,
  Image,
  Lueur,
  Nom,
  Onglet,
  Onglets,
  Pastille,
  Roue,
} from './styles';

export const MAINS_NUES: ElementRoue = { nom: 'mains_nues', libelle: 'Aucune', categorie: 'En main' };
export const TOUCHE_OUVERTURE = 'Tab';
export const TOUCHES_ROULETTE = ['ArrowLeft', 'ArrowRight', 'Enter', ' ', TOUCHE_OUVERTURE] as const;

export interface ProprietesRoulette {
  readonly emplacements: readonly Emplacement[];
  readonly equipee: number | null;
  readonly choisir?: (emplacement: number | null) => void;
  readonly fermer?: () => void;
  readonly vise?: number | null;
  readonly mainsNues?: ElementRoue;
}

const DELAI_MOLETTE_MS = 110;

interface Zone {
  readonly x: number;
  readonly y: number;
  readonly rayon: number;
}

function imageDe(element: ElementRoue): string {
  return element.image ?? poing;
}

function Contenu({ element, visee }: { readonly element: Emplacement; readonly visee: boolean }) {
  if (element === null) return <Image>{visee && <Lueur teinte="rose" />}</Image>;
  const munitions = element.munitions;
  return (
    <>
      <Image>
        {visee && <Lueur teinte="rose" />}
        {munitions !== undefined && <Lueur teinte="menthe" />}
        {element.icone ?? <img src={imageDe(element)} alt="" decoding="async" draggable={false} />}
      </Image>
      {munitions !== undefined && (
        <Barre>
          <span>{munitions.chargeur}</span>
          <span>{munitions.reserve}</span>
        </Barre>
      )}
      {munitions === undefined && element.quantite !== undefined && (
        <Barre>
          <span>{element.quantite}</span>
        </Barre>
      )}
    </>
  );
}

export function Roulette({
  emplacements,
  equipee,
  choisir,
  fermer,
  vise: viseImpose,
  mainsNues = MAINS_NUES,
}: ProprietesRoulette) {
  const roue = useRef<HTMLDivElement>(null);
  const zone = useRef<Zone | null>(null);
  const dernierCran = useRef(0);
  const cases = useMemo(() => disposer(emplacements, mainsNues), [emplacements, mainsNues]);
  const total = cases.length;
  const indexEquipee = cases.findIndex((c) => (equipee === null ? c.element === mainsNues : c.numero === equipee));
  const [viseLocal, setVise] = useState<number | null>(indexEquipee < 0 ? null : indexEquipee);
  const pilotee = viseImpose !== undefined;
  const vise = pilotee ? viseImpose : viseLocal;

  useEffect(() => {
    if (pilotee) return undefined;
    const mesurer = () => {
      const rect = roue.current?.getBoundingClientRect();
      zone.current =
        rect === undefined
          ? null
          : { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2, rayon: rect.width / 2 };
    };
    mesurer();
    window.addEventListener('resize', mesurer);
    return () => window.removeEventListener('resize', mesurer);
  }, [pilotee]);

  const valider = () => {
    const visee = vise === null ? undefined : cases[vise];
    if (visee === undefined || visee.element === null) return fermer?.();
    choisir?.(visee.numero);
  };

  const validerRef = useRef(valider);
  validerRef.current = valider;
  useEffect(() => {
    if (pilotee) return undefined;
    const relache = (e: KeyboardEvent) => {
      if (e.key !== TOUCHE_OUVERTURE) return;
      e.preventDefault();
      validerRef.current();
    };
    window.addEventListener('keyup', relache);
    return () => window.removeEventListener('keyup', relache);
  }, [pilotee]);

  useEffect(() => {
    if (pilotee) return undefined;
    const appui = (e: KeyboardEvent) => {
      if (!(TOUCHES_ROULETTE as readonly string[]).includes(e.key) || e.key === TOUCHE_OUVERTURE) return;
      e.preventDefault();
      if (e.key === 'ArrowLeft') setVise((v) => voisine(v, -1, total));
      else if (e.key === 'ArrowRight') setVise((v) => voisine(v, 1, total));
      else validerRef.current();
    };
    window.addEventListener('keydown', appui);
    return () => window.removeEventListener('keydown', appui);
  }, [pilotee, total]);

  const viser = (e: MouseEvent<HTMLDivElement>) => {
    const z = zone.current;
    if (z === null) return;
    const dx = e.clientX - z.x;
    const dy = e.clientY - z.y;
    setVise((v) => caseVisee(dx, dy, z.rayon, total, v));
  };

  const molette = (e: WheelEvent<HTMLDivElement>) => {
    if (e.timeStamp - dernierCran.current < DELAI_MOLETTE_MS) return;
    dernierCran.current = e.timeStamp;
    setVise((v) => voisine(v, e.deltaY > 0 ? 1 : -1, total));
  };

  const affiche = vise === null ? (cases[indexEquipee]?.element ?? mainsNues) : (cases[vise]?.element ?? null);

  return (
    <Calque
      onMouseMove={pilotee ? undefined : viser}
      onWheel={pilotee ? undefined : molette}
      onClick={pilotee ? undefined : valider}
    >
      <Entete>
        <Pastille>RB</Pastille>
        <Onglets>
          <Onglet actif cote="gauche">
            ARMES
          </Onglet>
          <Onglet actif={false} cote="droite">
            OBJETS
          </Onglet>
        </Onglets>
      </Entete>
      <Roue ref={roue}>
        <Cercle />
        {cases.map((c, i) => {
          const position = POSITIONS_VH[i] ?? { x: 0, y: 0 };
          const visee = vise === i;
          return (
            <Carte
              key={c.numero ?? 'main'}
              className={visee ? 'visee' : c.element === null ? 'vide' : undefined}
              style={{ left: `calc(50% + ${position.x}vh)`, top: `calc(50% + ${position.y}vh)` }}
            >
              <Contenu element={c.element} visee={visee} />
              {visee && (
                <>
                  <Gachette style={{ left: '-4.1vh' }}>LT</Gachette>
                  <Gachette style={{ right: '-4.1vh' }}>RT</Gachette>
                </>
              )}
            </Carte>
          );
        })}
        <Coeur>
          <Nom>{affiche?.libelle ?? 'Emplacement libre'}</Nom>
          <Categorie>{affiche?.categorie ?? ''}</Categorie>
        </Coeur>
      </Roue>
    </Calque>
  );
}
