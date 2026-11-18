import styled from '@emotion/styled';
import type { ReactNode } from 'react';

interface Teinte {
  readonly plein: string;
  readonly vide: string;
  readonly contour: string;
}

const ROSE: Teinte = { plein: '#f8b2ca', vide: '#8a7079', contour: '#2a1c26' };
const MENTHE: Teinte = { plein: '#71f0da', vide: '#49897f', contour: '#0b2f2a' };
const MAUVE: Teinte = { plein: '#aa8afa', vide: '#665490', contour: '#2e2148' };

const Bloc = styled.div`
  position: fixed;
  top: 4.3vh;
  left: 1.7vw;
  display: flex;
  flex-direction: column;
  gap: 0.42vh;
`;

const Ligne = styled.div`
  display: flex;
  align-items: center;
  gap: 0.37vh;
`;

const Pastille = styled.svg`
  display: block;
  flex: none;
  width: 1.9vh;
  height: 1.9vh;
`;

const Piste = styled.div`
  position: relative;
  box-sizing: border-box;
  height: 1.2vh;
  border: 1px solid;
  overflow: hidden;
`;

const Plein = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  transition: width 0.25s ease;
`;

const Trait = styled.span`
  position: absolute;
  width: 1px;
  height: 36%;
`;

const borner = (valeur: number) => Math.max(0, Math.min(100, valeur));

function Barre(p: { readonly teinte: Teinte; readonly largeur: number; readonly valeur: number; readonly encoche?: number }) {
  const v = borner(p.valeur);
  return (
    <Piste style={{ width: `${p.largeur}vh`, background: p.teinte.vide, borderColor: p.teinte.contour }}>
      <Plein
        style={{
          width: `${v}%`,
          background: p.teinte.plein,
          boxShadow: v < 100 ? `1px 0 0 ${p.teinte.contour}, 2px 0 0 rgba(255, 255, 255, 0.45)` : 'none',
        }}
      />
      {p.encoche !== undefined && (
        <>
          <Trait style={{ left: `${p.encoche}%`, top: 0, background: p.teinte.contour }} />
          <Trait style={{ left: `${p.encoche}%`, bottom: 0, background: p.teinte.contour }} />
        </>
      )}
    </Piste>
  );
}

function Rond({ fond, bord, children }: { readonly fond: string; readonly bord: string; readonly children: ReactNode }) {
  return (
    <Pastille viewBox="-10 -10 20 20" aria-hidden>
      <circle r="9.6" fill={fond} stroke={bord} strokeWidth="0.8" />
      {children}
    </Pastille>
  );
}

function IconeConcentration() {
  return (
    <Pastille viewBox="-10 -10 20 20" aria-hidden>
      <circle r="9" fill="none" stroke="#9a8ed4" strokeWidth="1.4" />
      <path
        d="M-5.6 0C-3.9 -2.9 -2 -3.9 0 -3.9C2 -3.9 3.9 -2.9 5.6 0C3.9 2.9 2 3.9 0 3.9C-2 3.9 -3.9 2.9 -5.6 0Z"
        fill="none"
        stroke="#a99bf2"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle r="1.9" fill="#a99bf2" />
    </Pastille>
  );
}

export interface ProprietesStatuts {
  readonly vie: number;
  readonly endurance: number;
  readonly concentration: number;
}

export function Statuts({ vie, endurance, concentration }: ProprietesStatuts) {
  return (
    <Bloc>
      <Ligne>
        <Rond fond="#414244" bord="rgba(0, 0, 0, 0.55)">
          <path
            d="M-0.3 -2.2C-1.5 -4.4 -6.1 -4.4 -6.1 -0.9C-6.1 1.8 -2.6 3.8 -0.3 5.4C2 3.8 5.5 1.8 5.5 -0.9C5.5 -4.4 0.9 -4.4 -0.3 -2.2Z"
            fill="#f5b8cb"
          />
        </Rond>
        <Barre teinte={ROSE} largeur={13.98} valeur={vie} />
      </Ligne>
      <Ligne>
        <Rond fond="#414244" bord="rgba(0, 0, 0, 0.55)">
          <path d="M1.8 -5.8L1 -1.9L6.2 -1.2L-0.6 5.8L-0.9 1.9L-6.2 1.4Z" fill="#80f2da" />
        </Rond>
        <Barre teinte={MENTHE} largeur={9.81} valeur={endurance} />
      </Ligne>
      <Ligne>
        <IconeConcentration />
        <Barre teinte={MAUVE} largeur={13.15} valeur={concentration} encoche={68} />
      </Ligne>
    </Bloc>
  );
}
