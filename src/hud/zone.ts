export interface Zone {
  readonly gauche: number;
  readonly haut: number;
  readonly largeur: number;
  readonly hauteur: number;
}

export const ZONE_MINIMAP: Zone = { gauche: 0.0207, haut: 0.807, largeur: 0.152815625, hauteur: 0.1551 };

export const HAUTEUR_GPS_VH = 4.26;
export const ECART_GPS_VH = 0.74;

export function cadreZone(z: Zone) {
  return {
    left: `${z.gauche * 100}vw`,
    top: `${z.haut * 100}vh`,
    width: `${z.largeur * 100}vw`,
    height: `${z.hauteur * 100}vh`,
  };
}

export function auDessus(z: Zone, ecartVh: number) {
  return {
    left: `${z.gauche * 100}vw`,
    width: `${z.largeur * 100}vw`,
    bottom: `calc(${(1 - z.haut) * 100}vh + ${ecartVh}vh)`,
  };
}
