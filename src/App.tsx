import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';
import { ChevronUp } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import fond from './assets/fond-apercu.png';
import { ECRANS } from './ecrans';

const VERT = '46, 204, 113';
const SOMBRE = 'rgba(2, 2, 2, 0.45)';
const CLE = 'gtavi-ui:ecran';

const global = css`
  html,
  body,
  #root {
    margin: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  body {
    background: #121517 url('${fond}') center / cover no-repeat;
    color: #fff;
    font-family: 'Inter', sans-serif;
  }

  button {
    font: inherit;
  }
`;

const Barre = styled.div`
  position: fixed;
  bottom: 1.2vh;
  left: 0;
  right: 0;
  z-index: 2147483000;
  display: flex;
  justify-content: center;
  gap: 6px;
  pointer-events: none;
  font: 500 11px/1.4 'Inter', sans-serif;

  & > * {
    pointer-events: auto;
  }
`;

const Bouton = styled.button`
  height: 26px;
  padding: 0 10px;
  border: none;
  border-radius: 3px;
  background: rgba(${VERT}, 0.85);
  color: #fff;
  cursor: pointer;

  &:hover {
    filter: brightness(1.15);
  }
`;

const Menu = styled.div`
  position: relative;
  min-width: 200px;
`;

const Selecteur = styled.button<{ ouvert: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  height: 26px;
  padding: 0 10px;
  border: none;
  border-radius: ${({ ouvert }) => (ouvert ? '0 0 3px 3px' : '3px')};
  background: ${SOMBRE};
  color: #fff;
  cursor: pointer;

  & > svg {
    transform: rotate(${({ ouvert }) => (ouvert ? 180 : 0)}deg);
    transition: transform 0.2s ease;
  }
`;

const Options = styled.div`
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  padding: 4px 0;
  border-radius: 3px 3px 0 0;
  background: ${SOMBRE};
  backdrop-filter: blur(6px);
`;

const Option = styled.button<{ actif: boolean }>`
  padding: 4px 10px;
  border: none;
  background: ${({ actif }) => (actif ? `rgba(${VERT}, 0.45)` : 'transparent')};
  color: #fff;
  text-align: left;
  cursor: pointer;

  &:hover {
    background: rgb(${VERT});
  }
`;

function lire(): number {
  try {
    const i = ECRANS.findIndex((e) => e.cle === localStorage.getItem(CLE));
    return i < 0 ? 0 : i;
  } catch {
    return 0;
  }
}

function ecrire(index: number): void {
  try {
    localStorage.setItem(CLE, ECRANS[index]?.cle ?? '');
  } catch {
    return;
  }
}

export function App() {
  const [index, setIndex] = useState(lire);
  const [ouvert, setOuvert] = useState(false);
  const menu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ouvert) return undefined;
    const dehors = (e: MouseEvent) => {
      if (!menu.current?.contains(e.target as Node)) setOuvert(false);
    };
    window.addEventListener('mousedown', dehors);
    return () => window.removeEventListener('mousedown', dehors);
  }, [ouvert]);
  const aller = (i: number) => {
    const suivant = (i + ECRANS.length) % ECRANS.length;
    setIndex(suivant);
    ecrire(suivant);
  };
  const ecran = ECRANS[index] ?? ECRANS[0];
  return (
    <>
      <Global styles={global} />
      {ecran && <ecran.rendu key={ecran.cle} />}
      <Barre>
        <Bouton type="button" onClick={() => aller(index - 1)}>
          Retour
        </Bouton>
        <Menu ref={menu}>
          {ouvert && (
            <Options>
              {ECRANS.map((e, i) => (
                <Option
                  key={e.cle}
                  type="button"
                  actif={i === index}
                  onClick={() => {
                    aller(i);
                    setOuvert(false);
                  }}
                >
                  {e.libelle}
                </Option>
              ))}
            </Options>
          )}
          <Selecteur type="button" ouvert={ouvert} onClick={() => setOuvert((o) => !o)}>
            <span>{ecran?.libelle}</span>
            <ChevronUp size={14} />
          </Selecteur>
        </Menu>
        <Bouton type="button" onClick={() => aller(index + 1)}>
          Suivant
        </Bouton>
      </Barre>
    </>
  );
}
