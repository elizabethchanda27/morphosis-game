import styled from "styled-components";

const MenuContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

const Title = styled.h1`
  font-family: "Press Start 2P", cursive;
  color: #fff;
  font-size: 2.5rem;
  text-shadow: 4px 4px 0px #000;
  margin-bottom: 2rem;
  text-align: center;
`;

const Button = styled.button`
  font-family: "Press Start 2P", cursive;
  background-color: #4a4a4a;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  cursor: pointer;
  position: relative;
  transition: transform 0.1s;

  &:hover {
    transform: translateY(-2px);
    background-color: #5a5a5a;
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
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

function Menu({ onStart, onInstructions }) {
  return (
    <MenuContainer>
      <Title>MORPHOSIS</Title>
      <ButtonContainer>
        <Button onClick={onStart}>START GAME</Button>
        <Button onClick={onInstructions}>INSTRUCTIONS</Button>
      </ButtonContainer>
    </MenuContainer>
  );
}

export default Menu;
