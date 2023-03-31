import React from "react";
import BaseContainer from "components/ui/BaseContainer";
import { useHistory } from "react-router-dom";
import { Button } from "components/ui/Button";

const Lobbies = () => {
  const history = useHistory();

  const handleCreateLobbyClick = () => {
    history.push("/CreateLobby");
  };

  return (
    <BaseContainer className="lobby">
      <h1>Lobbies</h1>
      <Button onClick={() => handleCreateLobbyClick()}>Create New Lobby</Button>
    </BaseContainer>
  );
};

export default Lobbies;
