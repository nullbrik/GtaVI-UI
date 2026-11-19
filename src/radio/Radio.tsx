import { useEffect, useState } from 'react';
import {
  Calque,
  Colonne,
  Curseur,
  Eteindre,
  Fleche,
  Gachette,
  Lecture,
  Logo,
  Mode,
  Modes,
  Piste,
  Rail,
  Repere,
  Station,
  Stations,
  Titre,
  Vignette,
} from './styles';

export type ModeRadio = 'vehicule' | 'radio' | 'demande';

export interface StationRadio {
  readonly nom: string;
  readonly titre: string;
  readonly logo: string;
  readonly fond: string;
  readonly encre: string;
  readonly taille?: number;
}

const MODES: readonly { readonly mode: ModeRadio; readonly libelle: string }[] = [
  { mode: 'vehicule', libelle: 'Véhicule' },
  { mode: 'radio', libelle: 'Radio' },
  { mode: 'demande', libelle: 'À la demande' },
];

function RailModes({ actif }: { readonly actif: ModeRadio }) {
  const index = MODES.findIndex((m) => m.mode === actif);
  const y = (i: number) => 1.875 + i * 3.75;
  return (
    <Rail viewBox="0 0 2.7 11.25" aria-hidden>
      <path d={`M1.35 ${y(0)}V${y(2)}`} stroke="#8c8f8e" strokeWidth="0.22" />
      {MODES.map((m, i) =>
        i === index ? (
          <g key={m.mode}>
            <circle cx="1.35" cy={y(i)} r="1.32" fill="#fdfdfd" stroke="#050505" strokeWidth="0.18" />
            <text
              x="1.35"
              y={y(i) + 0.55}
              textAnchor="middle"
              fontFamily="Barlow Condensed, sans-serif"
              fontWeight="600"
              fontSize="1.5"
              fill="#050505"
            >
              R
            </text>
          </g>
        ) : (
          <circle key={m.mode} cx="1.35" cy={y(i)} r="0.6" fill="#fdfdfd" />
        ),
      )}
    </Rail>
  );
}

export function Radio({
  stations,
  index,
  mode = 'radio',
  progression = 0.9,
}: {
  readonly stations: readonly StationRadio[];
  readonly index: number;
  readonly mode?: ModeRadio;
  readonly progression?: number;
}) {
  const courante = stations[index];
  return (
    <Calque>
      <Modes>
        {MODES.map((m, i) => (
          <Mode key={m.mode} actif={m.mode === mode} style={{ gridRow: i + 1 }}>
            {m.libelle}
          </Mode>
        ))}
        <RailModes actif={mode} />
      </Modes>
      <Fleche>‹</Fleche>
      <Colonne>
        <Stations>
          {stations.map((s, i) => (
            <Vignette key={s.nom} fond={s.fond} actif={i === index}>
              <Logo encre={s.encre} taille={s.taille ?? 2.6}>
                {s.logo}
              </Logo>
            </Vignette>
          ))}
          <Fleche style={{ margin: '0 0.2vh 0 0' }}>›</Fleche>
          <Eteindre>
            <svg viewBox="-10 -10 20 20" aria-hidden>
              <circle r="9.4" fill="#fafafa" />
              <path d="M-3.6 -3.6L3.6 3.6M3.6 -3.6L-3.6 3.6" stroke="#111" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Éteindre
          </Eteindre>
        </Stations>
        {courante !== undefined && (
          <Lecture
            style={{
              marginLeft: `calc(${index} * (9.77vh + 1.6vh) + 5.22vh - 13.4vh)`,
            }}
          >
            <Curseur>
              <Gachette>L1</Gachette>
              <Piste>
                <Repere style={{ left: `${Math.max(0, Math.min(1, progression)) * 100}%` }} />
              </Piste>
              <Gachette>R1</Gachette>
            </Curseur>
            <Station>{courante.nom}</Station>
            <Titre>{courante.titre}</Titre>
          </Lecture>
        )}
      </Colonne>
    </Calque>
  );
}

export const STATIONS_DEMO: readonly StationRadio[] = [
  { nom: 'Neon Bay FM', titre: 'Midnight Drive', logo: 'NEON\nBAY FM', fond: 'linear-gradient(135deg, #f06bd0, #8a7bff)', encre: '#ffe46b' },
  { nom: 'Rock 101', titre: 'Loud & Clear', logo: 'ROCK\n101', fond: '#9e1c22', encre: '#f4f0e6' },
  { nom: 'Talk 24', titre: 'Hit The Road', logo: 'TALK\n24', fond: '#f7f7f7', encre: '#1f3d8c' },
  { nom: 'Globe FM', titre: 'Around The World', logo: 'GLOBE\nFM', fond: '#ff6a12', encre: '#3b1d6e' },
  { nom: 'Roots FM', titre: 'Sunrise Riddim', logo: 'ROOTS\nFM', fond: '#f1ead2', encre: '#4a2c14' },
];

export function DemoRadio() {
  const [index, setIndex] = useState(2);
  const [progression, setProgression] = useState(0.88);
  useEffect(() => {
    const surTouche = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + STATIONS_DEMO.length) % STATIONS_DEMO.length);
      else if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % STATIONS_DEMO.length);
    };
    const avance = setInterval(() => setProgression((p) => (p >= 1 ? 0 : p + 0.004)), 100);
    window.addEventListener('keydown', surTouche);
    return () => {
      window.removeEventListener('keydown', surTouche);
      clearInterval(avance);
    };
  }, []);
  return <Radio stations={STATIONS_DEMO} index={index} progression={progression} />;
}
