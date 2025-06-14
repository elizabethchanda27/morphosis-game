"use client";

import { useState } from "react";
import styled, { keyframes } from "styled-components";
import Instructions from "./Instructions";
import Level1 from "./Level1";
import Level2 from "./Level2";
import FinalChoice from "./FinalChoice";
import EndCredits from "./EndCredits";

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const MenuContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  background-image: url("/images/3.gif");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1;
  }
`;

const TitleImage = styled.img`
  width: min(80vw, 600px);
  height: auto;
  position: relative;
  z-index: 2;
  margin-bottom: 1rem;
  animation: ${float} 3s ease-in-out infinite;
`;

const Button = styled.button<{ $color: string }>`
  font-family: "Press Start 2P", cursive;
  background-color: ${(props) => props.$color};
  color: black;
  border: none;
  padding: clamp(1rem, 3vw, 1.5rem) clamp(2rem, 5vw, 3rem);
  font-size: clamp(0.8rem, 2vw, 1.2rem);
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  z-index: 2;
  backdrop-filter: blur(2px);
  width: min(80vw, 400px);
  border-radius: 50px;

  &:hover {
    transform: translateY(-2px);
    background-color: white;
    color: black;
  }

  &:active {
    transform: translateY(2px);
  }

  &::before {
    content: "";
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    border: 2px solid #fff;
    pointer-events: none;
    transition: all 0.3s ease;
    border-radius: 50px;
  }

  &:hover::before {
    border-color: black;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 3vw, 1.5rem);
  position: relative;
  z-index: 2;
  width: 100%;
  align-items: center;
  margin-top: -2rem;
`;

interface MenuProps {
  onStart: () => void;
  onInstructions?: () => void;
}

export default function Menu({ onStart, onInstructions }: MenuProps) {
  const [showInstructions, setShowInstructions] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [showLevel2, setShowLevel2] = useState(false);
  const [showFinalChoice, setShowFinalChoice] = useState(false);
  const [showEndCredits, setShowEndCredits] = useState(false);

  const handleInstructions = () => {
    setShowInstructions(true);
  };

  const handleBack = () => {
    setShowInstructions(false);
  };

  const handleStart = () => {
    setShowGame(true);
    setShowLevel2(false);
    setShowFinalChoice(false);
    setShowEndCredits(false);
  };

  const handleLevel1Complete = () => {
    setShowGame(false);
    setShowLevel2(true);
  };

  const handleLevel2Complete = () => {
    setShowLevel2(false);
    setShowFinalChoice(true);
  };

  const handleFinalChoiceComplete = () => {
    setShowFinalChoice(false);
    setShowEndCredits(true);
  };

  if (showGame) {
    return <Level1 onLevelComplete={handleLevel1Complete} />;
  }

  if (showLevel2) {
    return <Level2 onLevelComplete={handleLevel2Complete} />;
  }

  if (showFinalChoice) {
    return <FinalChoice onComplete={handleFinalChoiceComplete} />;
  }

  if (showEndCredits) {
    return <EndCredits />;
  }

  if (showInstructions) {
    return <Instructions onBack={handleBack} />;
  }

  return (
    <MenuContainer>
      <TitleImage src="/images/title.PNG" alt="MORPHOSIS" />
      <ButtonContainer>
        <Button onClick={handleStart} $color="#B5C78E">
          START GAME
        </Button>
        <Button onClick={onInstructions || handleInstructions} $color="#F7F0B3">
          INSTRUCTIONS
        </Button>
      </ButtonContainer>
    </MenuContainer>
  );
}
