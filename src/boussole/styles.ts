import styled from '@emotion/styled';

export const RAYON_VH = 17.8;
export const DEMI_PISTE_VH = 21.9;

export const Calque = styled.div`
  position: fixed;
  inset: 0;
  z-index: 8900;
  user-select: none;
  pointer-events: none;
`;

export const Cadre = styled.div`
  position: absolute;
  top: 2.27vh;
  left: 50%;
  width: 0;
  height: 0;
  transform: scale(1.1);
  transform-origin: 0 0;
`;

export const Piste = styled.div`
  position: absolute;
  left: -${DEMI_PISTE_VH}vh;
  top: -0.35vh;
  width: ${DEMI_PISTE_VH * 2}vh;
  height: 0.7vh;
  border-radius: 0.35vh;
  background: rgba(10, 15, 25, 0.22);
`;

export const Repere = styled.svg`
  position: absolute;
  left: -0.875vh;
  top: -0.875vh;
  width: 1.75vh;
  height: 1.75vh;
  overflow: visible;
`;

export const Lettre = styled.span`
  position: absolute;
  top: 1.57vh;
  translate: -50% -50%;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.95vh;
  line-height: 1;
  color: rgba(255, 255, 255, 0.42);
  white-space: nowrap;
`;

export const Destination = styled.div`
  position: absolute;
  top: 1.9vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  translate: -50% -1.67vh;
`;

export const Anneau = styled.svg`
  display: block;
  width: 3.34vh;
  height: 3.34vh;
`;

export const Distance = styled.span`
  margin-top: 0.15vh;
  font-family: 'Barlow Condensed', 'Barlow', sans-serif;
  font-weight: 600;
  font-size: 1.65vh;
  line-height: 1;
  color: #fff;
  text-shadow: 0 0.1vh 0.3vh rgba(0, 0, 0, 0.55);
  white-space: nowrap;
`;
