import styled from '@emotion/styled';
import masque from '../assets/mask_map_dune.png';
import { cadreZone, type Zone } from './zone';

const Carte = styled.img`
  position: fixed;
  pointer-events: none;
`;

const Cadre = styled.div`
  position: fixed;
  box-sizing: border-box;
  border-radius: 0.25vh;
  border: 1px solid rgba(255, 255, 255, 0.2);
  pointer-events: none;
`;

const Icone = styled.svg`
  position: absolute;
  top: 0.35vh;
  left: 0.7vh;
  width: 2.4vh;
  height: 2.4vh;
  opacity: 0.25;
`;

function IconeNourriture() {
  return (
    <Icone viewBox="0 0 24 24" aria-hidden>
      <defs>
        <clipPath id="hud-fruits">
          <rect x="0" y="0" width="24" height="11.2" />
        </clipPath>
      </defs>
      <path d="M11.2 7.6C12.6 4.8 15.6 2.9 19.6 2.4" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" />
      <g clipPath="url(#hud-fruits)" fill="#fff">
        <circle cx="7.9" cy="10.4" r="3.6" />
        <circle cx="15.4" cy="10.4" r="3.4" />
      </g>
      <rect x="2.4" y="11.8" width="19.2" height="1.5" rx="0.3" fill="#fff" />
      <path d="M3 14.1H21A9 8 0 0 1 3 14.1Z" fill="#fff" />
    </Icone>
  );
}

export function CadreMinimap({ zone, carte = false }: { readonly zone: Zone; readonly carte?: boolean }) {
  const style = cadreZone(zone);
  return (
    <>
      {carte && <Carte src={masque} alt="" style={style} />}
      <Cadre style={style}>
        <IconeNourriture />
      </Cadre>
    </>
  );
}
