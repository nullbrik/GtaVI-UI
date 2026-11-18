import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const fondu = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const POLICE = "'Barlow Condensed', 'Barlow', sans-serif";

export const Calque = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9000;
  color: #fff;
  user-select: none;
  background: radial-gradient(circle at center, rgba(0, 0, 0, 0.32) 0%, rgba(0, 0, 0, 0.18) 70%);
  animation: ${fondu} 140ms ease-out;
`;

export const Entete = styled.div`
  position: absolute;
  top: 5.2vh;
  left: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.85vh;
  translate: -50% 0;
`;

export const Pastille = styled.span`
  display: grid;
  place-items: center;
  box-sizing: border-box;
  min-width: 2.6vh;
  height: 1.75vh;
  padding: 0 0.4vh;
  border-radius: 0.55vh;
  background: #f4f3f6;
  color: #22212c;
  font-family: ${POLICE};
  font-weight: 600;
  font-size: 1.3vh;
  line-height: 1;
`;

export const Onglets = styled.div`
  display: flex;
  height: 3.25vh;
  font-family: ${POLICE};
  font-weight: 600;
  font-size: 2.15vh;
  letter-spacing: 0.02em;
  line-height: 1;
`;

export const Onglet = styled.span<{ actif: boolean; cote: 'gauche' | 'droite' }>`
  display: grid;
  place-items: center;
  padding: 0 ${({ cote }) => (cote === 'gauche' ? '1.6vh 0 1.4vh' : '1.4vh 0 1.6vh')};
  margin-left: ${({ cote }) => (cote === 'droite' ? '-0.55vh' : '0')};
  background: ${({ actif }) => (actif ? '#f9f9fb' : '#2b2a33')};
  color: ${({ actif }) => (actif ? '#22212c' : '#f4f4f6')};
  clip-path: ${({ cote }) =>
    cote === 'gauche'
      ? 'polygon(0 0, 100% 0, calc(100% - 0.55vh) 100%, 0 100%)'
      : 'polygon(0.55vh 0, 100% 0, 100% 100%, 0 100%)'};
`;

export const Roue = styled.div`
  position: absolute;
  top: 48.9%;
  left: 50%;
  width: 70vh;
  height: 70vh;
  translate: -50% -50%;
  cursor: pointer;
`;

export const Cercle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 52.4vh;
  height: 52.4vh;
  translate: -50% -50%;
  border: 0.22vh solid rgba(0, 0, 0, 0.14);
  filter: blur(0.04vh);
  border-radius: 50%;
  pointer-events: none;
`;

export const Carte = styled('div', { target: 'roulette-carte' })`
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 17.75vh;
  height: 11.4vh;
  translate: -50% -50%;
  border: 1px solid rgba(0, 0, 0, 0.6);
  background: rgba(255, 255, 255, 0.07);
  pointer-events: none;
  transition:
    scale 120ms ease-out,
    background 120ms;

  &.vide {
    background: rgba(18, 18, 20, 0.3);
  }

  &.visee {
    scale: 1.035;
    border: 0.28vh solid #fff;
    background: rgba(150, 146, 140, 0.32);
  }
`;

export const Image = styled.div`
  position: relative;
  display: grid;
  flex: 1;
  place-items: center;
  overflow: hidden;

  & > img {
    position: relative;
    width: 7vh;
    height: 5vh;
    object-fit: contain;
    filter: grayscale(1) brightness(0.8) drop-shadow(0 0.15vh 0.3vh rgba(0, 0, 0, 0.6));
  }

  .visee & > img {
    filter: drop-shadow(0 0.15vh 0.3vh rgba(0, 0, 0, 0.6));
  }

  & > svg {
    position: relative;
    width: 4.6vh;
    height: 4.6vh;
    color: rgba(215, 215, 215, 0.8);
    filter: drop-shadow(0 0.15vh 0.3vh rgba(0, 0, 0, 0.6));
  }

  .visee & > svg {
    color: #fff;
  }
`;

export const Lueur = styled.span<{ teinte: 'rose' | 'menthe' }>`
  position: absolute;
  left: 8%;
  right: 8%;
  height: 2.6vh;
  ${({ teinte }) => (teinte === 'rose' ? 'top: -1.3vh;' : 'bottom: -1.3vh;')}
  border-radius: 50%;
  background: ${({ teinte }) => (teinte === 'rose' ? 'rgba(244, 120, 176, 0.75)' : 'rgba(64, 232, 205, 0.8)')};
  filter: blur(0.9vh);
`;

export const Barre = styled.div`
  display: flex;
  flex: none;
  align-items: center;
  justify-content: center;
  gap: 0.6vh;
  height: 2.9vh;
  background: rgba(24, 23, 30, 0.88);
  font-family: ${POLICE};
  font-weight: 600;
  font-size: 2.05vh;
  line-height: 1;
  font-variant-numeric: tabular-nums;

  & > span:last-of-type:not(:first-of-type) {
    color: rgba(255, 255, 255, 0.55);
  }
`;

export const Gachette = styled(Pastille)`
  position: absolute;
  top: 50%;
  translate: 0 -50%;
  height: 2.6vh;
  border-radius: 0.45vh 0.45vh 0.45vh 1.1vh;
  font-size: 1.45vh;
`;

export const Coeur = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.55vh;
  translate: -50% -50%;
  font-family: ${POLICE};
  font-weight: 600;
  line-height: 1;
  text-align: center;
  text-transform: uppercase;
  white-space: nowrap;
  text-shadow: 0 0.1vh 0.4vh rgba(0, 0, 0, 0.6);
  pointer-events: none;
`;

export const Nom = styled.span`
  font-size: 2.4vh;
  letter-spacing: 0.02em;
`;

export const Categorie = styled.span`
  font-size: 1.95vh;
  letter-spacing: 0.03em;
  color: rgba(255, 255, 255, 0.62);
`;
