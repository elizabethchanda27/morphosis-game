"use client";

import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const GameContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background-color: #000;
  background-image: url("/images/12.gif");
  background-size: cover;
  background-position: center;
  font-family: "Press Start 2P", system-ui;
  margin-left: -30px; /* Adjust this value as needed */

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }
`;

const GameArea = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 2;
`;

const Player = styled.div`
  position: absolute;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: yellow;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  overflow: hidden;
`;

const AstronautImg = styled.img`
  width: 110px;
  height: 110px;
  object-fit: contain;
  pointer-events: none;
  border: 2px solid #222;
  background: #fff3; /* fallback background */
`;

const Rocket = styled.div`
  position: absolute;
  width: 80px;
  height: 80px;
  background-image: url("/images/15.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 0.8rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  text-shadow: 2px 2px 0 #000;
  font-family: "Press Start 2P", system-ui;
`;

const Monster = styled.div<{ $x: number; $y: number }>`
  position: absolute;
  width: 100px;
  height: 100px;
  background-image: url("/images/16.png");
  background-size: contain;
  background-repeat: no-repeat;
  transform: translate(${(props) => props.$x}px, ${(props) => props.$y}px);
`;

const Laser = styled.div<{ $x: number; $y: number }>`
  position: absolute;
  width: 20px;
  height: 40px;
  background-color: #00ff00;
  transform: translate(${(props) => props.$x}px, ${(props) => props.$y}px);
`;

const Score = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  color: white;
  font-size: 1.2rem;
  z-index: 10;
  text-shadow: 2px 2px 0 #000;
  font-family: "Press Start 2P", system-ui;
`;

const Lives = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  color: white;
  font-size: 1.2rem;
  z-index: 10;
  text-shadow: 2px 2px 0 #000;
  font-family: "Press Start 2P", system-ui;
`;

const Heart = styled.div<{ $active: boolean }>`
  color: ${(props) => (props.$active ? "#ff0000" : "#666666")};
  font-size: 30px;
  transition: color 0.3s ease;
`;

const VictoryMessage = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.8);
  padding: 2rem;
  border-radius: 10px;
  color: white;
  text-align: center;
  font-family: "Press Start 2P", cursive;
  z-index: 4;
  max-width: 80%;
  line-height: 1.5;

  h2 {
    color: #b5c78e;
    margin-bottom: 1rem;
  }

  p {
    font-size: 0.8rem;
  }
`;

const GameOverText = styled.h1`
  font-family: "Press Start 2P", cursive;
  font-size: 3rem;
  color: #ff0000;
  text-shadow: 4px 4px 0 #000;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const GameOverMessage = styled.p`
  font-family: "Press Start 2P", cursive;
  font-size: 1.2rem;
  color: white;
  margin-bottom: 3rem;
`;

const ReplayButton = styled.button`
  position: absolute;
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1.5rem 3rem;
  font-family: "Press Start 2P", cursive;
  font-size: 1.2rem;
  background: #b5c78e;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: white;
    transform: translate(-50%, -50%) scale(1.1);
  }
`;

const heartbreakTriggers = [
  "Old text messages",
  "Rejection letter",
  "Social media memory",
  "Sad song",
  "Missed call",
  "Lost photo",
  "Career troubles",
  "Family issues",
  "Body dysmorphia",
  "Financial troubles",
];

interface Position {
  x: number;
  y: number;
}

interface Rocket {
  id: number;
  position: Position;
  trigger: string;
}

interface Laser {
  id: number;
  position: Position;
}

interface Level1Props {
  onLevelComplete: () => void;
}

const Level1: React.FC<Level1Props> = ({ onLevelComplete }) => {
  const [playerPos, setPlayerPos] = useState<Position>({
    x: window.innerWidth / 2,
    y: window.innerHeight - 100,
  });
  const [rockets, setRockets] = useState<Rocket[]>([]);
  const [lasers, setLasers] = useState<Laser[]>([]);
  const [monsterPos, setMonsterPos] = useState<Position>({
    x: window.innerWidth / 2,
    y: 100,
  });
  const [score, setScore] = useState(0);
  const [victory, setVictory] = useState(false);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const lastLaserId = useRef(0);
  const lastRocketId = useRef(0);
  const monsterDirection = useRef(1);
  const rocketIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const laserIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const collisionIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastRocketPositions = useRef<number[]>([]);

  const handleReplay = () => {
    if (rocketIntervalRef.current) clearInterval(rocketIntervalRef.current);
    if (laserIntervalRef.current) clearInterval(laserIntervalRef.current);
    if (collisionIntervalRef.current)
      clearInterval(collisionIntervalRef.current);
    setPlayerPos({ x: window.innerWidth / 2, y: window.innerHeight - 100 });
    setRockets([]);
    setLasers([]);
    setMonsterPos({ x: window.innerWidth / 2, y: 100 });
    setScore(0);
    lastLaserId.current = 0;
    lastRocketId.current = 0;
    monsterDirection.current = 1;
    lastRocketPositions.current = [];
  };

  function clampPlayerPosition(x: number, y: number) {
    const clampedX = Math.max(0, Math.min(x, window.innerWidth - 100));
    const clampedY = Math.max(0, Math.min(y, window.innerHeight - 100));
    return { x: clampedX, y: clampedY };
  }

  const handleMouseMove = (e: MouseEvent) => {
    const rect = gameAreaRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left - 50;
    const y = e.clientY - rect.top - 50;
    setPlayerPos(clampPlayerPosition(x, y));
  };

  const handleClick = () => {
    const newLaser: Laser = {
      id: lastLaserId.current++,
      position: { x: playerPos.x + 40, y: playerPos.y },
    };
    setLasers((prev) => [...prev, newLaser]);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
    };
  }, [playerPos]);

  function getNonOverlappingX(): number {
    let x: number;
    do {
      x = Math.random() * (window.innerWidth - 80);
    } while (rockets.some((rocket) => Math.abs(rocket.position.x - x) < 100));
    return x;
  }

  function spawnRocket() {
    const x: number = getNonOverlappingX();
    const newRocket: Rocket = {
      id: Date.now(),
      position: { x, y: -100 },
      trigger:
        heartbreakTriggers[
          Math.floor(Math.random() * heartbreakTriggers.length)
        ],
    };
    setRockets((prev: Rocket[]) => [...prev, newRocket]);
  }

  useEffect(() => {
    rocketIntervalRef.current = setInterval(spawnRocket, 1500);
    return () => {
      if (rocketIntervalRef.current) clearInterval(rocketIntervalRef.current);
    };
  }, []);

  useEffect(() => {
    const moveRockets = () => {
      setRockets((prevRockets) =>
        prevRockets
          .filter((rocket) => rocket.position.y < window.innerHeight + 100)
          .map((rocket) => ({
            ...rocket,
            position: {
              x: rocket.position.x,
              y: rocket.position.y + 3,
            },
          }))
      );
    };

    rocketIntervalRef.current = setInterval(moveRockets, 16);
    return () => {
      if (rocketIntervalRef.current) clearInterval(rocketIntervalRef.current);
    };
  }, []);

  useEffect(() => {
    const moveLasers = () => {
      setLasers((prevLasers) =>
        prevLasers
          .filter((laser) => laser.position.y > -20)
          .map((laser) => ({
            ...laser,
            position: {
              x: laser.position.x,
              y: laser.position.y - 5,
            },
          }))
      );
    };

    laserIntervalRef.current = setInterval(moveLasers, 16);
    return () => {
      if (laserIntervalRef.current) clearInterval(laserIntervalRef.current);
    };
  }, []);

  useEffect(() => {
    const checkCollisions = () => {
      // Check laser-monster collisions
      setLasers((prevLasers) => {
        const newLasers = prevLasers.filter((laser) => {
          const distance = Math.sqrt(
            Math.pow(laser.position.x - monsterPos.x, 2) +
              Math.pow(laser.position.y - monsterPos.y, 2)
          );
          if (distance < 50) {
            setScore((prev) => {
              const newScore = prev + 8;
              if (newScore >= 80) {
                setVictory(true);
              }
              return newScore;
            });
            return false;
          }
          return true;
        });
        return newLasers;
      });

      // Check rocket-player collisions
      setRockets((prevRockets) => {
        const newRockets = prevRockets.filter((rocket) => {
          // Use axis-aligned bounding box (AABB) collision
          const playerLeft = playerPos.x;
          const playerRight = playerPos.x + 100;
          const playerTop = playerPos.y;
          const playerBottom = playerPos.y + 100;
          const rocketLeft = rocket.position.x;
          const rocketRight = rocket.position.x + 50; // assuming rocket is 50px wide
          const rocketTop = rocket.position.y;
          const rocketBottom = rocket.position.y + 50; // assuming rocket is 50px tall
          const isColliding =
            playerLeft < rocketRight &&
            playerRight > rocketLeft &&
            playerTop < rocketBottom &&
            playerBottom > rocketTop;
          if (isColliding) {
            setScore((prev) => prev - 5);
            return false;
          }
          return true;
        });
        return newRockets;
      });
    };

    collisionIntervalRef.current = setInterval(checkCollisions, 16);
    return () => {
      if (collisionIntervalRef.current)
        clearInterval(collisionIntervalRef.current);
    };
  }, [playerPos, monsterPos]);

  // Stop game loops when game is over or victory is achieved
  useEffect(() => {
    if (victory) {
      if (rocketIntervalRef.current) clearInterval(rocketIntervalRef.current);
      if (laserIntervalRef.current) clearInterval(laserIntervalRef.current);
      if (collisionIntervalRef.current)
        clearInterval(collisionIntervalRef.current);
    }
  }, [victory]);

  // Dynamically update monster position on window resize
  useEffect(() => {
    function updateMonsterPos() {
      setMonsterPos({
        x: window.innerWidth / 2 - 50, // perfectly centered
        y: 20,
      });
    }
    updateMonsterPos();
    window.addEventListener("resize", updateMonsterPos);
    return () => window.removeEventListener("resize", updateMonsterPos);
  }, []);

  if (victory) {
    return (
      <GameContainer>
        <GameOverScreen>
          <h2>Level Complete!</h2>
          <p>You've defeated the Heart Monster!</p>
          <ContinueButton onClick={() => onLevelComplete()}>
            Continue to Next Level
          </ContinueButton>
        </GameOverScreen>
      </GameContainer>
    );
  }

  return (
    <GameContainer>
      <GameArea ref={gameAreaRef}>
        <Score>Score: {score}/80</Score>
        <Player style={{ left: `${playerPos.x}px`, top: `${playerPos.y}px` }}>
          <AstronautImg
            src="/images/astronauts.png"
            alt="Astronaut"
            onError={(e) => {
              e.currentTarget.style.border = "2px solid red";
              e.currentTarget.style.background = "#fdd";
            }}
          />
        </Player>
        {rockets.map((rocket, index) => (
          <Rocket
            key={index}
            style={{
              left: `${rocket.position.x}px`,
              top: `${rocket.position.y}px`,
            }}
          >
            {rocket.trigger}
          </Rocket>
        ))}
        {lasers.map((laser, index) => (
          <Laser key={index} $x={laser.position.x} $y={laser.position.y} />
        ))}
        <Monster $x={monsterPos.x} $y={monsterPos.y} />
      </GameArea>
    </GameContainer>
  );
};

const GameOverScreen = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.8);
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
  color: white;
  z-index: 1000;
  font-family: "Press Start 2P", system-ui;

  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 0 #000;
  }

  p {
    font-size: 1rem;
    margin-bottom: 1.5rem;
    line-height: 1.5;
    text-shadow: 2px 2px 0 #000;
  }
`;

const PlayAgainButton = styled.button`
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
  transition: all 0.3s ease;
  font-family: "Press Start 2P", system-ui;
  text-shadow: 2px 2px 0 #000;

  &:hover {
    background: #ff5252;
    transform: scale(1.05);
  }
`;

const ContinueButton = styled.button`
  background: #4caf50;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
  transition: all 0.3s ease;
  font-family: "Press Start 2P", system-ui;
  text-shadow: 2px 2px 0 #000;

  &:hover {
    background: #45a049;
    transform: scale(1.05);
  }
`;

export default Level1;
