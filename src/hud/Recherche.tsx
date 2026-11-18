import styled from '@emotion/styled';

const ETOILES = ['e1', 'e2', 'e3', 'e4', 'e5', 'e6'] as const;
const ETOILE =
  'M12 2.05L14.72 9.31L22.46 9.65L16.39 14.48L18.47 21.95L12 17.67L5.53 21.95L7.61 14.48L1.54 9.65L9.28 9.31Z';

const Bloc = styled.div`
  position: fixed;
  top: 1.6vh;
  right: 1.7vh;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.6vh;
  transform: scale(1.3);
  transform-origin: top right;
`;

const Ligne = styled.div`
  display: flex;
  gap: 0.39vh;
`;

const Etoile = styled.svg`
  display: block;
  width: 2.3vh;
  height: 2.3vh;
  overflow: visible;
`;

const Badges = styled.div`
  display: flex;
  gap: 0.56vh;
`;

const Badge = styled.div`
  display: grid;
  place-items: center;
  box-sizing: border-box;
  width: 1.95vh;
  height: 1.95vh;
  border-radius: 50%;
  background: #7a1a21;
  border: 0.14vh solid #4f221b;

  & > svg {
    display: block;
    width: 1.2vh;
    height: 1.2vh;
  }
`;

function EtoileTerne() {
  return (
    <Etoile viewBox="0 0 24 24" aria-hidden>
      <path d={ETOILE} fill="rgba(0, 0, 0, 0.23)" style={{ filter: 'blur(0.35px)' }} />
    </Etoile>
  );
}

function EtoileAllumee({ id }: { readonly id: string }) {
  return (
    <Etoile viewBox="0 0 24 24" aria-hidden>
      <defs>
        <clipPath id={id}>
          <path d={ETOILE} />
        </clipPath>
      </defs>
      <path d={ETOILE} fill="rgba(118, 115, 118, 0.78)" />
      <path d={ETOILE} fill="none" stroke="rgba(0, 0, 0, 0.28)" strokeWidth="5" clipPath={`url(#${id})`} />
      <path d={ETOILE} fill="none" stroke="rgba(0, 0, 0, 0.68)" strokeWidth="1.7" strokeLinejoin="round" />
    </Etoile>
  );
}

export function Recherche({ niveau }: { readonly niveau: number }) {
  return (
    <Bloc>
      <Ligne>
        {ETOILES.map((cle, i) =>
          i >= ETOILES.length - niveau ? <EtoileAllumee key={cle} id={`etoile-${cle}`} /> : <EtoileTerne key={cle} />,
        )}
      </Ligne>
      <Badges>
        <Badge>
          <svg viewBox="0 0 24 24" aria-hidden>
            <path
              d="M10.2 5.6A1.9 1.9 0 1 1 12 8.2V9.6M12 9.6L3.4 17.4H20.6Z"
              fill="none"
              stroke="#fff"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Badge>
        <Badge>
          <svg viewBox="0 0 24 24" aria-hidden>
            <path
              d="M12 2.4C9.1 2.4 7.4 4.9 7.4 8.4C7.4 11.6 8.9 14 10.6 14.8V15.8H13.4V14.8C15.1 14 16.6 11.6 16.6 8.4C16.6 4.9 14.9 2.4 12 2.4Z"
              fill="#fff"
            />
            <path d="M5.6 18.6C5.6 17.6 6.4 17 7.4 17H16.6C17.6 17 18.4 17.6 18.4 18.6V21.4H5.6Z" fill="#fff" />
          </svg>
        </Badge>
      </Badges>
    </Bloc>
  );
}
