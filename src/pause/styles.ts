import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const Calque = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 9990;
  display: flex;
  user-select: none;
  background: rgba(10, 10, 16, 0.12);
  backdrop-filter: blur(0.7vh);
`;

export const Panneau = styled(motion.div)`
  position: relative;
  flex: none;
  width: 50.3vh;
  height: 100%;
  background: linear-gradient(90deg, #22212c 0%, #22212c 50%, rgba(34, 33, 44, 0.8) 100%);
`;

export const Flou = styled.div`
  flex: 1;
`;

export const Logo = styled.svg`
  position: absolute;
  top: 4.5vh;
  left: 2.6vh;
  width: 11.53vh;
  height: 8.44vh;
  overflow: visible;
`;

export const Liste = styled.div`
  position: absolute;
  top: 20.2vh;
  left: 2.6vh;
  display: flex;
  flex-direction: column;
  gap: 0.75vh;
  width: 44.7vh;
`;

export const Ligne = styled.button<{ actif: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1.3vh;
  box-sizing: border-box;
  height: 5.95vh;
  padding: 0 0 0 1.66vh;
  border: none;
  border-radius: 0;
  background: ${({ actif }) => (actif ? 'linear-gradient(90deg, #f9f9f9 0%, #f9f9f9 54%, #5e5e64 100%)' : 'transparent')};
  box-shadow: ${({ actif }) => (actif ? 'inset 0 0 0 1px rgba(255, 255, 255, 0.45)' : 'none')};
  color: ${({ actif }) => (actif ? '#1e1f27' : '#f4f4f6')};
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 2.5vh;
  line-height: 1;
  text-align: left;
  cursor: pointer;
  outline: none;

  & > svg {
    flex: none;
    width: 2.3vh;
    height: 2.3vh;
  }
`;

export const Pastille = styled.span`
  position: absolute;
  top: 1.05vh;
  left: 1.35vh;
  width: 1.07vh;
  height: 1.07vh;
  border-radius: 50%;
  background: #f5c542;
`;
