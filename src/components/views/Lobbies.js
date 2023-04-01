import React from "react";
import BaseContainer from "components/ui/BaseContainer";
import { useHistory } from "react-router-dom";
import {Button} from "@mui/material";

const Lobbies = () => {
  const history = useHistory();

  const handleCreateLobbyClick = () => {
    history.push("/CreateLobby");
  };

  return (
    <BaseContainer className="lobby">
      <h1>Lobbies</h1>
      <Button variant="contained"  style={{ margin: '20px' }} onClick={() => handleCreateLobbyClick()}>Create New Lobby</Button>
    </BaseContainer>
  );
};

export default Lobbies;
