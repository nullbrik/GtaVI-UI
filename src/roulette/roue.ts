import type { ReactNode } from 'react';

export const EMPLACEMENTS_ROUE = 7;
export const POSITION_MAIN = 2;
export const DEPART_EMPLACEMENTS = 3;
const HYSTERESIS_DEGRES = 6;

function secteurVise(x: number, y: number, total: number, actuel: number | null): number {
  const angle = ((Math.atan2(y, x) * 180) / Math.PI + 90 + 360) % 360;
  const pas = 360 / total;
  if (actuel !== null) {
    const ecart = Math.abs(((angle - actuel * pas + 540) % 360) - 180);
    if (ecart < pas / 2 + HYSTERESIS_DEGRES) return actuel;
  }
  return Math.round(angle / pas) % total;
}

export interface Munitions {
  readonly chargeur: number;
  readonly reserve: number;
}

export interface ElementRoue {
  readonly nom: string;
  readonly libelle: string;
  readonly image?: string | undefined;
  readonly icone?: ReactNode;
  readonly munitions?: Munitions | undefined;
  readonly quantite?: number | undefined;
  readonly categorie?: string | undefined;
  readonly rarete?: Rarete | undefined;
}

export type Rarete = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export interface CaseDisposee {
  readonly element: Emplacement;
  readonly numero: number | null;
}

export type Emplacement = ElementRoue | null;

export const EMPLACEMENTS = EMPLACEMENTS_ROUE;
export const ZONE_MORTE = 0.45;

export const POSITIONS_VH: readonly { readonly x: number; readonly y: number }[] = [
  { x: 0, y: -25.4 },
  { x: 21.7, y: -15.2 },
  { x: 27.3, y: 0 },
  { x: 21.7, y: 15.1 },
  { x: 0, y: 25.4 },
  { x: -21.7, y: 15.1 },
  { x: -27.3, y: 0 },
  { x: -21.7, y: -15.2 },
];

export function disposer(emplacements: readonly Emplacement[], main: ElementRoue): readonly CaseDisposee[] {
  const total = EMPLACEMENTS + 1;
  const cases: CaseDisposee[] = Array.from({ length: total }, () => ({ element: null, numero: null }));
  cases[POSITION_MAIN] = { element: main, numero: null };
  for (let k = 0; k < EMPLACEMENTS; k++) {
    cases[(DEPART_EMPLACEMENTS + k) % total] = { element: emplacements[k] ?? null, numero: k + 1 };
  }
  return cases;
}

export function voisine(index: number | null, sens: 1 | -1, total: number): number {
  if (index === null) return sens === 1 ? 0 : total - 1;
  return (index + sens + total) % total;
}

export function caseVisee(
  dx: number,
  dy: number,
  rayon: number,
  total: number,
  actuelle: number | null = null,
): number | null {
  if (Math.hypot(dx, dy) < rayon * ZONE_MORTE) return actuelle;
  return secteurVise(dx, dy, total, actuelle);
}
