import React from "react";
import { useHistory } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import { Button } from "components/ui/Button";

const Home = () => {
  const history = useHistory();
  const handleLobbiesClick = () => {
    history.push("/Lobbies");
  };

  const handleEventsClick = () => {
    history.push("/Events");
  };

  return (
    <BaseContainer className="lobby">
      <h1>Home</h1>
      <Button onClick={() => handleEventsClick()}>Show all Events</Button>
      <Button onClick={() => handleLobbiesClick()}>Find Lobby</Button>
    </BaseContainer>
  );
};

export default Home;
