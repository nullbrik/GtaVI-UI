import styled from '@emotion/styled';

const POLICE = "'Barlow Condensed', 'Barlow', sans-serif";

export const Bloc = styled.div`
  position: fixed;
  right: 3vh;
  bottom: 18vh;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.75vh;
  font-family: ${POLICE};
  font-weight: 600;
  line-height: 1;
  text-transform: uppercase;
  user-select: none;
  pointer-events: none;
`;

export const Pagination = styled.div`
  display: flex;
  align-items: center;
  gap: 0.45vh;
`;

export const Point = styled.span<{ actif: boolean }>`
  width: ${({ actif }) => (actif ? '1.2vh' : '0.95vh')};
  height: ${({ actif }) => (actif ? '1.2vh' : '0.95vh')};
  border-radius: 50%;
  background: ${({ actif }) => (actif ? '#f2f2f2' : 'rgba(210, 210, 210, 0.75)')};
`;

export const Touche = styled.span`
  display: grid;
  place-items: center;
  box-sizing: border-box;
  min-width: 2.1vh;
  height: 2vh;
  margin-left: 0.9vh;
  padding: 0 0.3vh;
  border-radius: 0.3vh 0.3vh 0.45vh 0.45vh;
  background: #fafafa;
  box-shadow: 0 0 0 0.15vh #1d1b1c;
  color: #1d1b1c;
  font-size: 1.45vh;
`;

export const Carte = styled.div`
  width: 38.6vh;
  overflow: hidden;
`;

export const Entete = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.45vh;
  box-sizing: border-box;
  height: 6.5vh;
  padding: 0 1.2vh;
  background: #343434;
  font-size: 2.05vh;
  overflow: hidden;
`;

export const Marque = styled.span`
  color: #a9a8a8;
`;

export const Modele = styled.span`
  color: #f4f4f2;
`;

export const Embleme = styled.svg`
  position: absolute;
  top: -1vh;
  right: 2.6vh;
  width: 11vh;
  height: 11vh;
  opacity: 0.09;
`;

export const Corps = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.3vh 0;
  background: rgba(232, 228, 196, 0.42);
`;

export const Ligne = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  height: 4.6vh;
  margin: 0 1.2vh;
  font-size: 2.05vh;

  & + & {
    border-top: 1px solid rgba(255, 255, 255, 0.28);
  }
`;

export const Contour = styled.span`
  color: #f8f8f6;
  -webkit-text-stroke: 0.3vh #1d1b1c;
  paint-order: stroke fill;
`;

export const Valeur = styled.span`
  display: flex;
  align-items: center;
  gap: 0.55vh;
`;

export const Pastille = styled.svg`
  flex: none;
  width: 2.85vh;
  height: 2.85vh;
`;

export const Retour = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8vh;
  margin-top: 2vh;
  margin-right: 1vh;
  font-size: 2.15vh;
`;

export const BoutonB = styled.span`
  display: grid;
  place-items: center;
  width: 2.5vh;
  height: 2.5vh;
  border-radius: 50%;
  background: #fafafa;
  box-shadow: 0 0 0 0.15vh #1d1b1c;
  color: #1d1b1c;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 1.35vh;
`;
