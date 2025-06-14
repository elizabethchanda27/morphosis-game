"use client";

import { useState } from "react";
import styled from "styled-components";
import Menu from "@/components/Menu";

const GameContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
`;

const Score = styled.div`
  font-family: "Press Start 2P", cursive;
  color: #fff;
  margin-top: 1rem;
  font-size: 1rem;
  text-align: center;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
`;

export default function Home() {
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState("menu"); // 'menu', 'game', 'instructions'

  const handleStart = () => {
    setGameState("game");
  };

  const handleInstructions = () => {
    setGameState("instructions");
  };

  const renderContent = () => {
    switch (gameState) {
      case "menu":
        return (
          <Menu onStart={handleStart} onInstructions={handleInstructions} />
        );
      case "game":
        return <div>Game content will go here</div>;
      case "instructions":
        return (
          <div
            style={{
              color: "#fff",
              padding: "2rem",
              fontFamily: "'Press Start 2P', cursive",
            }}
          >
            <h2>HOW TO PLAY</h2>
            <p>Instructions will go here...</p>
            <button
              onClick={() => setGameState("menu")}
              style={{
                fontFamily: "'Press Start 2P', cursive",
                padding: "1rem",
                marginTop: "2rem",
                cursor: "pointer",
                backgroundColor: "#4a4a4a",
                color: "white",
                border: "none",
                position: "relative",
              }}
            >
              BACK TO MENU
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <GameContainer>
      {renderContent()}
      {gameState === "game" && <Score>Score: {score}</Score>}
    </GameContainer>
  );
}
