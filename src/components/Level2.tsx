import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";

const pixelColors = ["#FFFACD", "#FFD1DC", "#B0E0E6", "#C1E1C1"];

const birthControlPairs = [
  {
    term: "NuvaRing",
    definition:
      "A small flexible ring put inside the vagina that releases hormones to prevent pregnancy.",
  },
  {
    term: "Internal Condom",
    definition:
      "A pouch worn inside the vagina that blocks sperm from reaching an egg.",
  },
  {
    term: "Cervical Cap",
    definition:
      "A small silicone cup that fits over the cervix to block sperm.",
  },
  {
    term: "Diaphragm",
    definition:
      "A dome-shaped silicone cup that covers the cervix and is used with spermicide.",
  },
  {
    term: "Vasectomy",
    definition:
      "A permanent procedure that cuts the tubes carrying sperm in a man.",
  },
  {
    term: "Spermicide",
    definition:
      "A chemical that kills sperm, used with other methods like condoms or sponges.",
  },
  {
    term: "IUD (Intrauterine Device)",
    definition:
      "A small T-shaped device put into the uterus to prevent pregnancy for years.",
  },
  {
    term: "Birth Control Pills",
    definition:
      "Pills taken daily that use hormones to prevent ovulation (egg release).",
  },
];

const orientationPairs = [
  {
    term: "Heterosexual",
    definition:
      "A person who is mainly attracted to people of a different gender.",
  },
  {
    term: "Homosexual",
    definition:
      "A person who is mainly attracted to people of the same gender.",
  },
  {
    term: "Bisexual",
    definition: "A person who is attracted to more than one gender.",
  },
  {
    term: "Pansexual",
    definition: "A person who is attracted to people of all genders.",
  },
  {
    term: "Asexual",
    definition:
      "A person who does not feel sexual attraction or feels little to none.",
  },
  {
    term: "Demisexual",
    definition:
      "A person who only feels sexual attraction after forming a close emotional bond.",
  },
  {
    term: "Queer",
    definition:
      "A broad, flexible term for people who don't fit into traditional labels of gender or sexuality.",
  },
];

type CardType = {
  id: string;
  type: "term" | "definition";
  value: string;
  match: string;
  color: string;
};

function shuffle<T>(array: T[]): T[] {
  let arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function createCards(
  pairs: { term: string; definition: string }[]
): CardType[] {
  // Each pair becomes two cards: one term, one definition
  let cards: CardType[] = [];
  pairs.forEach((pair, i) => {
    cards.push({
      id: `term-${i}`,
      type: "term",
      value: pair.term,
      match: pair.definition,
      color: pixelColors[Math.floor(Math.random() * pixelColors.length)],
    });
    cards.push({
      id: `def-${i}`,
      type: "definition",
      value: pair.definition,
      match: pair.term,
      color: pixelColors[Math.floor(Math.random() * pixelColors.length)],
    });
  });
  return shuffle(cards);
}

const Level2 = ({ onLevelComplete }: { onLevelComplete?: () => void }) => {
  const [round, setRound] = useState(1);
  const [cards, setCards] = useState<CardType[]>(() =>
    createCards(birthControlPairs)
  );
  const [flipped, setFlipped] = useState<string[]>([]); // array of card ids
  const [matched, setMatched] = useState<string[]>([]); // array of card ids
  const [busy, setBusy] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [showFinalContinue, setShowFinalContinue] = useState(false);

  useEffect(() => {
    if (matched.length === cards.length) {
      setShowContinue(true);
    }
  }, [matched, cards]);

  const handleContinue = () => {
    setShowContinue(false);
    if (round === 1) {
      setTimeout(() => {
        setRound(2);
        setCards(createCards(orientationPairs));
        setFlipped([]);
        setMatched([]);
      }, 300);
    } else {
      setShowCongrats(true);
      setShowFinalContinue(true);
    }
  };

  const handleFlip = (id: string) => {
    if (busy || flipped.includes(id) || matched.includes(id)) return;
    if (flipped.length === 1) {
      setFlipped([flipped[0], id]);
      setBusy(true);
      const first = cards.find((c) => c.id === flipped[0]);
      const second = cards.find((c) => c.id === id);
      if (first && second && first.match === second.value) {
        setTimeout(() => {
          setMatched((m) => [...m, first.id, second.id]);
          setFlipped([]);
          setBusy(false);
        }, 800);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setBusy(false);
        }, 1000);
      }
    } else {
      setFlipped([id]);
    }
  };

  const handleFinalContinue = () => {
    setShowFinalContinue(false);
    if (onLevelComplete) onLevelComplete();
  };

  return (
    <GameContainer>
      <TitleRow>
        <Title>
          Level 2: {round === 1 ? "Birth Control Match" : "Orientation Match"}
        </Title>
        {showContinue && (
          <ContinueButtonInline onClick={handleContinue}>
            Continue
          </ContinueButtonInline>
        )}
      </TitleRow>
      <Grid>
        {cards.map((card: CardType) => (
          <Card
            key={card.id}
            color={card.color}
            flipped={flipped.includes(card.id) || matched.includes(card.id)}
            onClick={() => handleFlip(card.id)}
          >
            <CardInner
              flipped={flipped.includes(card.id) || matched.includes(card.id)}
            >
              <CardFront />
              <CardBack>{card.value}</CardBack>
            </CardInner>
          </Card>
        ))}
      </Grid>
      {showCongrats && (
        <FadeOverlay>
          <CongratsMessage>
            Congratulations, you have learned the knowledge needed to transform
            into who you will be.
          </CongratsMessage>
          {showFinalContinue && (
            <ContinueButtonFinal onClick={handleFinalContinue}>
              Continue
            </ContinueButtonFinal>
          )}
        </FadeOverlay>
      )}
    </GameContainer>
  );
};

const GameContainer = styled.div`
  min-height: 100vh;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 70px;
  width: 100vw;
  box-sizing: border-box;
`;

const Title = styled.h2`
  color: #222;
  font-family: "Press Start 2P", system-ui;
  font-size: 1.5rem;
  margin-bottom: 3.5rem;
`;

const TitleRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 98vw;
  max-width: 1200px;
  margin: 0 auto 2rem auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3vw;
  width: 98vw;
  max-width: 1200px;
  justify-items: center;
  box-sizing: border-box;
  padding-bottom: 3vw;
  overflow-x: hidden;

  @media (max-width: 900px) {
    width: 100vw;
    gap: 2vw;
    max-width: 100vw;
    padding-bottom: 5vw;
  }
`;

const flip = keyframes`
  from { transform: rotateY(0); }
  to { transform: rotateY(180deg); }
`;

const Card = styled.div<{ color: string; flipped: boolean }>`
  background: ${(p) => p.color};
  border: 4px solid #333;
  border-radius: 12px;
  box-shadow: 0 4px 0 #888, 0 8px 0 #444;
  font-family: "Press Start 2P", system-ui;
  font-size: 0.7rem;
  width: 90%;
  height: 100%;
  min-width: 120px;
  min-height: 120px;
  max-width: 260px;
  max-height: 220px;
  cursor: pointer;
  perspective: 800px;
  position: relative;
  transition: box-shadow 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  &:active {
    box-shadow: 0 2px 0 #888, 0 4px 0 #444;
  }
`;

const CardInner = styled.div<{ flipped: boolean }>`
  width: 100%;
  height: 100%;
  transition: transform 0.5s;
  transform-style: preserve-3d;
  ${(p) =>
    p.flipped
      ? css`
          transform: rotateY(180deg);
        `
      : ""}
`;

const CardFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
  color: #222;
  padding: 8px;
  text-align: center;
  word-break: break-word;
  line-height: 1.15;
  transform: rotateY(180deg);
  box-sizing: border-box;
`;

const FadeOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 1);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
  `} 0.7s ease;
`;

const CongratsMessage = styled.div`
  color: #fff;
  font-family: "Press Start 2P", system-ui;
  font-size: 1.3rem;
  text-align: center;
  max-width: 700px;
  margin-bottom: 3rem;
`;

const ContinueButtonInline = styled.button`
  background: #b3ffd8;
  color: #222;
  border: 2px solid #222;
  border-radius: 24px;
  padding: 0.7rem 2.2rem;
  font-family: "Press Start 2P", system-ui;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: background 0.2s;
  z-index: 10;
  margin-left: 2rem;
`;

const ContinueButtonFinal = styled.button`
  position: fixed;
  left: 3vw;
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

export default Level2;
