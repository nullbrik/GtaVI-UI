import styled from '@emotion/styled';
import type { ReactNode } from 'react';

const Bloc = styled.div`
  position: fixed;
  top: 8.7vh;
  right: 1.7vh;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.2vh;
`;

const Ligne = styled.div`
  display: flex;
  align-items: center;
  gap: 0.74vh;
`;

const Montant = styled.span`
  padding-top: 0.4vh;
  font-family: 'Teko', sans-serif;
  font-weight: 700;
  font-size: 2.55vh;
  line-height: 1;
  letter-spacing: 0.01em;
  color: #fff;
  text-shadow:
    1px 0 0 #141414,
    -1px 0 0 #141414,
    0 1px 0 #141414,
    0 -1px 0 #141414,
    1px 1px 0 #141414,
    -1px -1px 0 #141414,
    1px -1px 0 #141414,
    -1px 1px 0 #141414,
    0 0 0.3vh rgba(0, 0, 0, 0.5);
`;

const Rond = styled.svg`
  display: block;
  flex: none;
  width: 2.7vh;
  height: 2.7vh;
  overflow: visible;
`;

function Pastille({ children, arc = false }: { readonly children: ReactNode; readonly arc?: boolean }) {
  return (
    <Rond viewBox="-14.5 -14.5 29 29" aria-hidden>
      <circle r="12.25" fill="#363637" stroke="rgba(22, 24, 28, 0.7)" strokeWidth="4.5" />
      {arc && <path d="M-0.44 -12.49A12.5 12.5 0 0 1 7.52 -9.98" fill="none" stroke="#3fe6cc" strokeWidth="2.6" />}
      {children}
    </Rond>
  );
}

const formater = (montant: number) => `$${Math.round(montant).toLocaleString('en-US')}`;

export interface ProprietesArgent {
  readonly liquide: number;
  readonly banque: number;
  readonly haut?: string;
}

export function Argent({ liquide, banque, haut }: ProprietesArgent) {
  return (
    <Bloc style={haut === undefined ? undefined : { top: haut }}>
      <Ligne>
        <Montant>{formater(liquide)}</Montant>
        <Pastille>
          <rect x="-5.5" y="-3.6" width="11" height="7.2" rx="1" fill="#85e789" />
          <rect x="2.6" y="-1.3" width="2.9" height="2.6" rx="0.6" fill="#233d21" />
        </Pastille>
      </Ligne>
      <Ligne>
        <Montant>{formater(banque)}</Montant>
        <Pastille arc>
          <path d="M0 -6.2L5.2 -2.4V6.2H-5.2V-2.4Z" fill="#31f4d8" />
          <text x="0" y="3.6" textAnchor="middle" fontFamily="Anton, sans-serif" fontSize="7.4" fill="#075a4e">
            $
          </text>
        </Pastille>
      </Ligne>
    </Bloc>
  );
}
