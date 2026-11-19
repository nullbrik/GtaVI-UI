import styled from '@emotion/styled';

const POLICE = "'Barlow Condensed', sans-serif";

export const Calque = styled.div`
  position: fixed;
  top: 2.35vh;
  left: 4.4vh;
  display: flex;
  align-items: flex-start;
  font-family: ${POLICE};
  font-weight: 600;
  line-height: 1;
  text-transform: uppercase;
  color: #fff;
  user-select: none;
  text-shadow: 0 0.1vh 0.3vh rgba(0, 0, 0, 0.45);
`;

export const Modes = styled.div`
  display: grid;
  grid-template-columns: auto 2.7vh;
  grid-template-rows: repeat(3, 3.75vh);
  align-items: center;
  column-gap: 1.5vh;
  margin-top: 0.6vh;
`;

export const Mode = styled.span<{ actif: boolean }>`
  justify-self: end;
  font-size: ${({ actif }) => (actif ? '2.25vh' : '1.75vh')};
`;

export const Rail = styled.svg`
  grid-column: 2;
  grid-row: 1 / span 3;
  width: 2.7vh;
  height: 11.25vh;
  overflow: visible;
`;

export const Fleche = styled.span`
  align-self: center;
  margin: 0 1.1vh 0 1.4vh;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 2.2vh;
  color: #f2f2f2;
`;

export const Colonne = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Stations = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6vh;
  height: 10.9vh;
`;

export const Vignette = styled.div<{ fond: string; actif: boolean }>`
  position: relative;
  display: grid;
  place-items: center;
  box-sizing: border-box;
  width: ${({ actif }) => (actif ? '10.45vh' : '9.77vh')};
  height: ${({ actif }) => (actif ? '10.45vh' : '9.77vh')};
  border: ${({ actif }) => (actif ? '0.33vh solid #fafafa' : 'none')};
  background: ${({ fond }) => fond};
  overflow: hidden;
  text-shadow: none;
`;

export const Logo = styled.span<{ encre: string; taille: number }>`
  padding: 0 0.6vh;
  font-family: 'Anton', sans-serif;
  font-size: ${({ taille }) => taille}vh;
  line-height: 0.92;
  text-align: center;
  color: ${({ encre }) => encre};
  white-space: pre-line;
`;

export const Eteindre = styled.span`
  display: flex;
  align-items: center;
  gap: 0.9vh;
  margin-left: 0.35vh;
  font-size: 2.25vh;

  & > svg {
    width: 2.7vh;
    height: 2.7vh;
  }
`;

export const Lecture = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25vh;
  margin-top: 1.4vh;
`;

export const Curseur = styled.div`
  display: flex;
  align-items: center;
  gap: 1.9vh;
`;

export const Gachette = styled.span`
  display: grid;
  place-items: center;
  box-sizing: border-box;
  min-width: 2.45vh;
  height: 2.2vh;
  padding: 0 0.3vh;
  border-radius: 0.3vh 0.3vh 0.45vh 0.45vh;
  background: #fafafa;
  box-shadow: 0 0 0 0.15vh #111;
  color: #111;
  font-size: 1.45vh;
  text-shadow: none;
`;

export const Piste = styled.div`
  position: relative;
  width: 18vh;
  height: 0.33vh;
  border-radius: 0.2vh;
  background: rgba(255, 255, 255, 0.2);
`;

export const Repere = styled.span`
  position: absolute;
  top: 50%;
  width: 1.1vh;
  height: 0.55vh;
  translate: -50% -50%;
  border-radius: 0.1vh;
  background: #fff;
`;

export const Station = styled.span`
  font-size: 2.7vh;
`;

export const Titre = styled.span`
  margin-top: -0.5vh;
  font-size: 2.05vh;
  color: #e6e6e6;
`;
