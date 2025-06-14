import React from "react";
import styled from "styled-components";

const EndCredits = () => (
  <CreditsContainer>
    <Title>End Credits</Title>
    <CreditsText>
      Thank you for playing Morphosis!
      <br />
      <br />
      <br />
      Game Design & Development: Elizabeth Chanda
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <span style={{ fontSize: "1.2rem" }}>
        🌈 Changing doesn't have to be so scary. Just continue to learn about
        who you would like to be. 🌈
      </span>
    </CreditsText>
    <ReplayButton onClick={() => window.location.reload()}>Replay</ReplayButton>
  </CreditsContainer>
);

const CreditsContainer = styled.div`
  min-height: 100vh;
  color: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Press Start 2P", system-ui;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const CreditsText = styled.div`
  font-size: 1.1rem;
  text-align: center;
  max-width: 600px;
`;

const ReplayButton = styled.button`
  position: fixed;
  left: 3vw;
  bottom: 3vw;
  background: #000;
  color: #fff;
  border: 2px solid #fff;
  border-radius: 24px;
  padding: 0.7rem 2.2rem;
  font-family: "Press Start 2P", system-ui;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: background 0.2s;
  z-index: 10001;
`;

export default EndCredits;
