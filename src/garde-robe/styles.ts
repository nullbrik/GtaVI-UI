import styled from '@emotion/styled';

export const Calque = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9980;
  user-select: none;
  background: linear-gradient(
    90deg,
    rgba(34, 33, 44, 0.92) 0%,
    rgba(34, 33, 44, 0.78) 2.5vh,
    rgba(34, 33, 44, 0.45) 22vh,
    rgba(34, 33, 44, 0) 44vh
  );

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, #22212c 0%, #22212c 11vh, rgba(34, 33, 44, 0) 22vh);
    mask-image: linear-gradient(90deg, #000 0, #000 18vh, transparent 36vh);
    pointer-events: none;
  }
`;

export const Titre = styled.h1`
  position: absolute;
  top: 2.2vh;
  left: 3.2vh;
  margin: 0;
  font-family: 'Barlow Condensed', 'Barlow', sans-serif;
  font-weight: 600;
  font-size: 3.2vh;
  line-height: 1;
  letter-spacing: 0.01em;
  color: #fafafc;
`;

export const Onglets = styled.div`
  position: absolute;
  top: 6.75vh;
  left: 3.08vh;
  display: flex;
  align-items: center;
  gap: 0.95vh;
`;

export const Gachette = styled.span`
  display: grid;
  place-items: center;
  box-sizing: border-box;
  min-width: 2.75vh;
  height: 1.5vh;
  padding: 0 0.4vh;
  border-radius: 0.75vh 0.75vh 0.3vh 0.3vh;
  background: #f4f3f6;
  box-shadow: 0 0 0 0.12vh rgba(20, 19, 26, 0.85);
  color: #22212c;
  font-family: 'Barlow Condensed', 'Barlow', sans-serif;
  font-weight: 600;
  font-size: 1.2vh;
  line-height: 1;
`;

const BIAIS = '0.75vh';

export type FormeOnglet = 'debut' | 'milieu' | 'fin';

const DECOUPES: Readonly<Record<FormeOnglet, string>> = {
  debut: `polygon(0 0, 100% 0, calc(100% - ${BIAIS}) 100%, 0 100%)`,
  milieu: `polygon(${BIAIS} 0, 100% 0, calc(100% - ${BIAIS}) 100%, 0 100%)`,
  fin: `polygon(${BIAIS} 0, 100% 0, 100% 100%, 0 100%)`,
};

export const BarreOnglets = styled.div`
  display: flex;
  height: 3.2vh;
`;

export const Onglet = styled.button<{ actif: boolean; forme: FormeOnglet }>`
  display: flex;
  align-items: center;
  gap: 0.75vh;
  height: 100%;
  margin-left: ${({ forme }) => (forme === 'debut' ? '0' : `calc(-${BIAIS} + 0.22vh)`)};
  padding: 0 ${({ forme }) => (forme === 'fin' ? '1.15vh' : '1.6vh')} 0
    ${({ forme }) => (forme === 'debut' ? '1.15vh' : '1.6vh')};
  border: none;
  background: ${({ actif }) => (actif ? '#f9f9fb' : 'rgba(52, 51, 62, 0.88)')};
  box-shadow: ${({ actif }) => (actif ? 'none' : 'inset 0 0 0 1px rgba(255, 255, 255, 0.12)')};
  clip-path: ${({ forme }) => DECOUPES[forme]};
  color: ${({ actif }) => (actif ? '#22212c' : '#f0eff4')};
  font-family: 'Barlow Condensed', 'Barlow', sans-serif;
  font-weight: 600;
  font-size: 2.15vh;
  line-height: 1;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  cursor: pointer;
  outline: none;
`;

export const Defilement = styled.div`
  position: absolute;
  top: 14.45vh;
  left: calc(3.08vh + 45.1vh + 1.2vh);
  width: 0.35vh;
  height: 46.4vh;
  pointer-events: none;
`;

export const Curseur = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  border-radius: 0.2vh;
  background: rgba(255, 255, 255, 0.3);
  transition: top 0.12s ease;
`;

export const Losange = styled.span<{ petit?: boolean }>`
  flex: none;
  width: ${({ petit }) => (petit ? '0.8vh' : '1.07vh')};
  height: ${({ petit }) => (petit ? '0.8vh' : '1.07vh')};
  rotate: 45deg;
  border-radius: 0.12vh;
  background: #fed570;
  box-shadow: 0 0 0 0.1vh rgba(25, 21, 6, 0.6);
`;

export const Liste = styled.div`
  position: absolute;
  top: 14.45vh;
  left: 3.08vh;
  width: 45.1vh;
`;

export function masqueListe(hautCoupe: boolean, basCoupe: boolean): string {
  const haut = hautCoupe ? 'rgba(0, 0, 0, 0.45) 0, #000 5.8vh' : '#000 0';
  const bas = basCoupe ? '#000 calc(100% - 5.8vh), rgba(0, 0, 0, 0.45) 100%' : '#000 100%';
  return `linear-gradient(180deg, ${haut}, ${bas})`;
}

export const Ligne = styled.button<{ actif: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.85vh;
  box-sizing: border-box;
  width: 100%;
  height: 5.8vh;
  padding: 0 1.4vh 0 1.54vh;
  border: none;
  border-bottom: 1px solid ${({ actif }) => (actif ? 'transparent' : 'rgba(255, 255, 255, 0.32)')};
  background: ${({ actif }) => (actif ? 'linear-gradient(90deg, #fafafa 0%, #fafafa 54%, #7a7675 100%)' : 'transparent')};
  color: ${({ actif }) => (actif ? '#22212c' : '#f6f6f8')};
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 2.12vh;
  line-height: 1;
  text-align: left;
  white-space: nowrap;
  cursor: pointer;
  outline: none;
`;

export const Libelle = styled.span`
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.35;
`;

export const Vehicule = styled.svg`
  flex: none;
  width: 2.3vh;
  height: 2.3vh;
  color: #3ff2d3;
`;

export const Compteur = styled.div`
  position: absolute;
  top: 64.3vh;
  left: 3.3vh;
  display: flex;
  gap: 0.9vh;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 2.12vh;
  line-height: 1;
  color: #f6f6f8;

  & > span:not(:first-of-type) {
    color: rgba(246, 246, 248, 0.5);
  }
`;
