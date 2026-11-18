import { useEffect, useRef, useState } from 'react';
import { Anneau, Cadre, Calque, DEMI_PISTE_VH, Destination, Distance, Lettre, Piste, RAYON_VH, Repere } from './styles';

const INTERVALLE_MIN_MS = 25;
const INTERVALLE_MAX_MS = 150;
const CARDINAUX = [
  { cap: 0, libelle: 'N' },
  { cap: 90, libelle: 'E' },
  { cap: 180, libelle: 'S' },
  { cap: 270, libelle: 'O' },
] as const;

export interface CibleBoussole {
  readonly cap: number;
  readonly distance: number;
}

export function ecart(cap: number, vers: number): number {
  return ((((vers - cap) % 360) + 540) % 360) - 180;
}

export function position(cap: number, vers: number): number | null {
  const delta = ecart(cap, vers);
  if (Math.abs(delta) >= 90) return null;
  return RAYON_VH * Math.sin((delta * Math.PI) / 180);
}

export function positionBornee(cap: number, vers: number): number {
  const p = position(cap, vers);
  if (p !== null) return Math.max(-DEMI_PISTE_VH, Math.min(DEMI_PISTE_VH, p));
  return ecart(cap, vers) < 0 ? -DEMI_PISTE_VH : DEMI_PISTE_VH;
}

export function formaterDistance(metres: number): string {
  if (metres < 1000) return `${Math.round(metres / 10) * 10} m`;
  return `${(metres / 1000).toFixed(2).replace('.', ',')} km`;
}

function useCapLisse(cap: number): number {
  const [affiche, setAffiche] = useState(cap);
  const courant = useRef(cap);
  const trajet = useRef({ depart: cap, arrivee: cap, debut: 0, duree: 1 });
  const dernierMessage = useRef(0);

  useEffect(() => {
    const maintenant = performance.now();
    const intervalle = dernierMessage.current === 0 ? INTERVALLE_MIN_MS : maintenant - dernierMessage.current;
    dernierMessage.current = maintenant;
    const depart = courant.current;
    trajet.current = {
      depart,
      arrivee: depart + ecart(depart, cap),
      debut: maintenant,
      duree: Math.min(INTERVALLE_MAX_MS, Math.max(INTERVALLE_MIN_MS, intervalle)),
    };
  }, [cap]);

  useEffect(() => {
    let image = 0;
    const peindre = (maintenant: number) => {
      const { depart, arrivee, debut, duree } = trajet.current;
      const t = Math.min(1, Math.max(0, (maintenant - debut) / duree));
      const suivant = (((depart + (arrivee - depart) * t) % 360) + 360) % 360;
      if (Math.abs(suivant - courant.current) > 0.01) {
        courant.current = suivant;
        setAffiche(suivant);
      }
      image = requestAnimationFrame(peindre);
    };
    image = requestAnimationFrame(peindre);
    return () => cancelAnimationFrame(image);
  }, []);

  return affiche;
}

function Fleche() {
  return (
    <Repere viewBox="-8 -8 16 16" aria-hidden>
      <circle r="7.4" fill="#f9feff" stroke="rgba(20, 35, 55, 0.9)" strokeWidth="0.9" />
      <path d="M0 -3.6L3.3 3.2L0 1.5L-3.3 3.2Z" fill="#35373d" strokeLinejoin="round" />
    </Repere>
  );
}

function Cible({ distance }: { readonly distance: number }) {
  return (
    <>
      <Anneau viewBox="-18 -18 36 36" aria-hidden>
        <circle
          r="16.5"
          fill="none"
          stroke="#4ce6d3"
          strokeWidth="2"
          strokeDasharray="17.28 8.64"
          strokeDashoffset="8.64"
          transform="rotate(-90)"
        />
        <rect x="-10" y="-10.5" width="20" height="21" rx="4" fill="#9dabd1" stroke="#12203f" strokeWidth="1.2" />
        <path
          d="M0 -6.2C-2.6 -6.2 -4.4 -4.3 -4.4 -1.9C-4.4 1.2 0 6.2 0 6.2C0 6.2 4.4 1.2 4.4 -1.9C4.4 -4.3 2.6 -6.2 0 -6.2ZM0 0.1A1.9 1.9 0 1 1 0 -3.7A1.9 1.9 0 1 1 0 0.1Z"
          fill="#12203f"
          fillRule="evenodd"
        />
      </Anneau>
      <Distance>{formaterDistance(distance)}</Distance>
    </>
  );
}

export function Boussole({
  cap,
  destination,
  poursuite = false,
}: {
  readonly cap: number;
  readonly destination: CibleBoussole | null;
  readonly poursuite?: boolean;
}) {
  const affiche = useCapLisse(cap);
  return (
    <Calque>
      <Cadre>
        <Piste className={poursuite ? 'poursuite' : undefined} />
        {CARDINAUX.map((c) => {
          const x = position(affiche, c.cap);
          return x === null ? null : (
            <Lettre key={c.libelle} style={{ left: `${x}vh` }}>
              {c.libelle}
            </Lettre>
          );
        })}
        <Fleche />
        {destination !== null && (
          <Destination style={{ left: `${positionBornee(affiche, destination.cap)}vh` }}>
            <Cible distance={destination.distance} />
          </Destination>
        )}
      </Cadre>
    </Calque>
  );
}
