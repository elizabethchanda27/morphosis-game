import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";

const eggs = [
  {
    egg: "/images/blueegg.PNG",
    buttonColor: "#4A90E2",
    creature: "/images/otter.PNG",
    bg: "#4A90E2",
    name: "Rilo the Otter",
    message:
      "You received Rilo the Otter, a creature of fluid identity, playfulness, and connection. Otters teach us to embrace exploration, non-linear growth, and queer joy. Rilo celebrates how you've accepted change, embraced your evolving identity, and found connection in unexpected places.",
  },
  {
    egg: "/images/greenegg.PNG",
    buttonColor: "#7ED957",
    creature: "/images/dragon.PNG",
    bg: "#7ED957",
    name: "Kaia the Dragon",
    message:
      "You received Kaia the Dragon, a representation of sexual health knowledge, body confidence, and protective wisdom. Dragons in mythology are fierce guardians, and Kaia protects your right to know your body and take control of your health. You've mastered physical obstacles and embraced bodily autonomy.",
  },
  {
    egg: "/images/yellowegg.PNG",
    buttonColor: "#FFE066",
    creature: "/images/mooncat.PNG",
    bg: "#FFE066",
    name: "Mira the Cat",
    message:
      "You received Mira the Cat, a symbol of emotional resilience and boundary-setting. Like Mira, you have learned to observe carefully, rest intentionally, and protect your peace. Cats symbolize self-trust and independence—qualities that bloom when one navigates heartbreak, social pressure, and internal growth with care.",
  },
];

const FinalChoice = ({ onComplete }: { onComplete?: () => void }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [fade, setFade] = useState(false);
  const [showCreature, setShowCreature] = useState(false);

  const handleSelect = (idx: number) => {
    setSelected(idx);
    setFade(true);
    setTimeout(() => {
      setShowCreature(true);
    }, 700);
  };

  const handleContinue = () => {
    if (onComplete) onComplete();
  };

  return (
    <Container>
      {!showCreature && (
        <>
          <Title>Final Choice: Choose Your Egg</Title>
          <EggRow>
            {eggs.map((egg, idx) => (
              <EggCol key={egg.egg}>
                <EggImg src={egg.egg} alt="egg" />
                <EggButton
                  color={egg.buttonColor}
                  selected={selected === idx}
                  onClick={() => handleSelect(idx)}
                >
                  Click here
                </EggButton>
              </EggCol>
            ))}
          </EggRow>
        </>
      )}
      {fade && <FadeOverlay />}
      {showCreature && selected !== null && (
        <CreatureScreen bg={eggs[selected].bg}>
          <CreatureImg
            src={eggs[selected].creature}
            alt={eggs[selected].name}
          />
          <CreatureName>{eggs[selected].name}</CreatureName>
          <CreatureMsg>{eggs[selected].message}</CreatureMsg>
          <ContinueButtonFinal onClick={handleContinue}>
            Continue
          </ContinueButtonFinal>
        </CreatureScreen>
      )}
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  background: url("/public/images/10.gif") center/cover no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Press Start 2P", system-ui;
`;

const Title = styled.h2`
  color: #000;
  font-family: "Press Start 2P", system-ui;
  font-size: 1.5rem;
  margin-bottom: 3rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const EggRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  gap: 5vw;
  width: 100vw;
  max-width: 1200px;
`;

const EggCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EggImg = styled.img`
  width: 160px;
  height: auto;
  margin-bottom: 1.5rem;
`;

const EggButton = styled.button<{ color: string; selected: boolean }>`
  background: ${(p) => p.color};
  color: #222;
  border: 2px solid #222;
  border-radius: 24px;
  padding: 0.7rem 2.2rem;
  font-family: "Press Start 2P", system-ui;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: background 0.2s;
  &:hover {
    background: ${(p) => p.color}dd;
  }
  ${(p) => p.selected && "opacity: 0.5;"}
`;

const FadeOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #000;
  opacity: 1;
  z-index: 9999;
  animation: ${keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
  `} 0.7s ease;
`;

const CreatureScreen = styled.div<{ bg: string }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: ${(p) => p.bg};
  z-index: 10000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CreatureImg = styled.img`
  width: 700px;
  height: auto;
  margin-bottom: -10rem;
`;

const CreatureName = styled.div`
  color: #222;
  font-family: "Press Start 2P", system-ui;
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
`;

const CreatureMsg = styled.div`
  color: #222;
  font-family: "Press Start 2P", system-ui;
  font-size: 1rem;
  text-align: center;
  max-width: 700px;
  margin-bottom: 3rem;
`;

const ContinueButtonFinal = styled.button`
  position: fixed;
  right: 3vw;
  bottom: 3vw;
  background: #fff;
  color: #222;
  border: 2px solid #222;
  border-radius: 24px;
  padding: 0.7rem 2.2rem;
  font-family: "Press Start 2P", system-ui;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: background 0.2s;
  z-index: 10001;
`;

export default FinalChoice;
