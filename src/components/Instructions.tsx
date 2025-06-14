"use client";

import styled from "styled-components";

const InstructionsContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url("/images/6.gif");
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
    background: rgba(0, 0, 0, 0.7);
    z-index: 1;
  }
`;

const InstructionsContent = styled.div`
  position: relative;
  z-index: 2;
  color: white;
  font-family: "Press Start 2P", cursive;
  text-align: center;
  max-width: 800px;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  backdrop-filter: blur(5px);
`;

const Title = styled.h2`
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  margin-bottom: 2rem;
  color: #f7f0b3;
`;

const InstructionList = styled.ol`
  list-style-position: inside;
  text-align: left;
  font-size: clamp(0.8rem, 2vw, 1rem);
  line-height: 1.8;
  padding: 0 1rem;

  li {
    margin-bottom: 1.5rem;
  }
`;

const BackButton = styled.button`
  margin-top: 2rem;
  padding: clamp(1rem, 3vw, 1.5rem) clamp(2rem, 5vw, 3rem);
  font-size: clamp(0.8rem, 2vw, 1.2rem);
  border: none;
  border-radius: 50px;
  background: #ffd580;
  color: black;
  font-family: "Press Start 2P", system-ui;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  &:hover {
    background: #ffbc42;
    color: black;
    border: 2px solid black;
  }
`;

interface InstructionsProps {
  onBack: () => void;
}

export default function Instructions({ onBack }: InstructionsProps) {
  return (
    <InstructionsContainer>
      <InstructionsContent>
        <Title>Here is what you need to know to play:</Title>
        <InstructionList>
          <li>
            Avoid heartbreak triggers and collect healing tools to keep your
            astronaut healthy.
          </li>
          <li>
            Level 1: Click on the mouse pad to shoot lasers at the heart
            monster.
          </li>
          <li>
            Level 2: Match the right definitions with their correct terms to
            understand the necessary tools you will need in life.
          </li>
          <li>
            After transforming, you will learn new things about sexual health,
            physical conditions, and new things about yourself
          </li>
          <li>
            Instructions about each level will be given when you reach each
            level
          </li>
          <li>Good Luck!</li>
        </InstructionList>
        <BackButton onClick={onBack}>BACK</BackButton>
      </InstructionsContent>
    </InstructionsContainer>
  );
}
