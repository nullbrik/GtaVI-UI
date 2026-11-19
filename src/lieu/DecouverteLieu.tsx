import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { auDessus, ZONE_MINIMAP, type Zone } from '../hud/zone';

const Bandeau = styled(motion.div)`
  position: fixed;
  display: grid;
  place-items: center;
  box-sizing: border-box;
  height: 3.15vh;
  padding: 0 2.2vh;
  border: 1px solid #303238;
  border-radius: 0.4vh;
  background: #22242e;
  color: #f4f4f8;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 1.79vh;
  line-height: 1;
  white-space: nowrap;
  pointer-events: none;
`;

export function DecouverteLieu({ nom, zone = ZONE_MINIMAP, ecart = 0.74 }: { readonly nom: string | null; readonly zone?: Zone; readonly ecart?: number }) {
  return (
    <AnimatePresence>
      {nom !== null && (
        <Bandeau
          key={nom}
          initial={{ opacity: 0, y: '0.8vh' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '0.8vh' }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          style={auDessus(zone, ecart)}
        >
          {nom}
        </Bandeau>
      )}
    </AnimatePresence>
  );
}

const LIEUX = ['Key Lento', 'Port Gellhorn', 'Grassrivers', 'Leonida Keys', 'Vice Beach'] as const;

export function DemoDecouverteLieu({ ecart = 0.74 }: { readonly ecart?: number }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    let masquer = setTimeout(() => setVisible(false), 4000);
    const boucle = setInterval(() => {
      setIndex((i) => (i + 1) % LIEUX.length);
      setVisible(true);
      masquer = setTimeout(() => setVisible(false), 4000);
    }, 5500);
    return () => {
      clearInterval(boucle);
      clearTimeout(masquer);
    };
  }, []);
  return <DecouverteLieu nom={visible ? (LIEUX[index] ?? null) : null} ecart={ecart} />;
}
