import { Camera, CircleHelp, type LucideIcon, Map as IconeCarte, Save, SlidersVertical, Tag } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Calque, Flou, Ligne, Liste, Logo, Panneau, Pastille } from './styles';

export type OptionPause = 'carte' | 'partie' | 'boutique' | 'aide' | 'studio' | 'parametres';

const ENTREES: readonly { readonly option: OptionPause; readonly libelle: string; readonly icone: LucideIcon }[] = [
  { option: 'carte', libelle: 'Carte', icone: IconeCarte },
  { option: 'partie', libelle: 'Partie', icone: Save },
  { option: 'boutique', libelle: 'Boutique', icone: Tag },
  { option: 'aide', libelle: 'Aide', icone: CircleHelp },
  { option: 'studio', libelle: 'Studio photo', icone: Camera },
  { option: 'parametres', libelle: 'Paramètres', icone: SlidersVertical },
];

export function Pause({
  nouveautes,
  surChoix,
  surFermeture,
}: {
  readonly nouveautes: readonly OptionPause[];
  readonly surChoix: (option: OptionPause) => void;
  readonly surFermeture: () => void;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const surTouche = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') setIndex((i) => (i + 1) % ENTREES.length);
      else if (e.key === 'ArrowUp') setIndex((i) => (i - 1 + ENTREES.length) % ENTREES.length);
      else if (e.key === 'Enter') {
        const entree = ENTREES[index];
        if (entree) surChoix(entree.option);
      } else if (e.key === 'Escape' || e.key === 'Backspace') surFermeture();
    };
    window.addEventListener('keydown', surTouche);
    return () => window.removeEventListener('keydown', surTouche);
  }, [index, surChoix, surFermeture]);

  return (
    <Calque initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
      <Panneau initial={{ x: '-4vh' }} animate={{ x: 0 }} exit={{ x: '-4vh' }} transition={{ duration: 0.22 }}>
        <Logo viewBox="-1 0 97 71" aria-hidden>
          <g fill="none" stroke="#d4789d" strokeWidth="2" strokeLinejoin="miter">
            <path d="M0 1H24L33.5 23L44 1H67L33.5 69Z" />
            <rect x="70" y="1" width="24" height="68" />
          </g>
        </Logo>
        <Liste>
          {ENTREES.map((entree, i) => {
            const Icone = entree.icone;
            return (
              <Ligne
                key={entree.option}
                type="button"
                actif={i === index}
                onMouseEnter={() => setIndex(i)}
                onClick={() => surChoix(entree.option)}
              >
                <Icone strokeWidth={2} />
                {nouveautes.includes(entree.option) && <Pastille />}
                {entree.libelle}
              </Ligne>
            );
          })}
        </Liste>
      </Panneau>
      <Flou onClick={surFermeture} />
    </Calque>
  );
}
