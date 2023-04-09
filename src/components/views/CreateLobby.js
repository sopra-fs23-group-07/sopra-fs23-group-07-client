import React, { useState } from "react";
import BaseContainer from "components/ui/BaseContainer";
import { useHistory } from "react-router-dom";
import { api, handleError } from "helpers/api";
import InputLabel from '@mui/material/InputLabel';
import {Button, Select, MenuItem, FormControl, Box} from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import 'styles/views/CreateLobby.scss'


// On this page the host chooses different attributes of his lobby
// TODO: Make sure that only loggedin users can open this page. (Guard)
const CreateLobby = () => {
  const history = useHistory();
  // Set up state variables for each input field.
  const [lobbyName, setLobbyName] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("");
  const [region, setRegion] = useState("");
  const [lobby, setLobby] = useState(null);

  const handleLobbyClick = async () => {
    try {
      // Validate the input fields.
      if (!lobbyName || !maxParticipants || isNaN(maxParticipants) || !region) {
        alert("Please fill in all fields with valid data.");
        return;
      }

      const userId = localStorage.getItem("userId");

      // send lobby to backend
      const requestBody = JSON.stringify({
        lobbyName: lobbyName,
        lobbyRegion: region,
        lobbyMaxMembers: maxParticipants,
        lobbyTimeLimit: "100",
        hostMemberId: userId,
      });

      const response = await api.post("/lobbies", requestBody);
      console.log(response.data)
      setLobby(response.data);

      localStorage.setItem("lobbyId", response.data.lobbyId);
      // TODO: Make sure that always a new lobby with the correct Id is created. Probably get LobbyId from Backend response.

        history.push(`/Lobby/${response.data.lobbyId}`);

    } catch (error) {
      alert(
        `Something went wrong during lobby creation (Check if you filled in all fields): \n${handleError(
          error
        )}`
      );
    }
  };

  // displays the three input fields
  return (
    <BaseContainer className="createLobby container">
      <h1>Create a new Lobby </h1>
      <div className="createLobby label">
        <h3>Select lobby name:</h3>
        <input
            className="createLobby input"
            type="text"
            id="lobbyName"
            placeholder="Enter Lobby Name"
            value={lobbyName}
            onChange={(e) => setLobbyName(e.target.value)}
        />
      </div>
      <div className="createLobby label">
        <h3> Enter maximum number of participants:</h3>
        <input
            className="createLobby input"
            type="text"
            id="maxParticipants"
              placeholder="Enter Maximum Number of Participants"

              value={maxParticipants}
            onChange={(e) => setMaxParticipants(e.target.value)}
        />
      </div>
      <div className="createLobby label">
        <h3>Choose Region:</h3>
        <Box sx={{ minWidth: 240 }}>
          <FormControl fullWidth>
            <Select
                className="createLobby input"
                labelId="createLobby-select"
                id="createLobby-select"
                value={region}
                label="Region"
                onChange={(e) => setRegion(e.target.value)}
            >
              <MenuItem value="AG">Aargau</MenuItem>
              <MenuItem value="AI">Appenzell Innerrhoden</MenuItem>
              <MenuItem value="AR">Appenzell Ausserrhoden</MenuItem>
              <MenuItem value="BE">Bern</MenuItem>
              <MenuItem value="BL">Basel-Landschaft</MenuItem>
              <MenuItem value="BS">Basel-Stadt</MenuItem>
              <MenuItem value="FR">Fribourg</MenuItem>
              <MenuItem value="GE">Geneva</MenuItem>
              <MenuItem value="GL">Glarus</MenuItem>
              <MenuItem value="GR">Graubünden</MenuItem>
              <MenuItem value="JU">Jura</MenuItem>
              <MenuItem value="LU">Luzern</MenuItem>
              <MenuItem value="NE">Neuchâtel</MenuItem>
              <MenuItem value="NW">Nidwalden</MenuItem>
              <MenuItem value="OW">Obwalden</MenuItem>
              <MenuItem value="SG">St. Gallen</MenuItem>
              <MenuItem value="SH">Schaffhausen</MenuItem>
              <MenuItem value="SO">Solothurn</MenuItem>
              <MenuItem value="SZ">Schwyz</MenuItem>
              <MenuItem value="TG">Thurgau</MenuItem>
              <MenuItem value="TI">Ticino</MenuItem>
              <MenuItem value="UR">Uri</MenuItem>
              <MenuItem value="VD">Vaud</MenuItem>
              <MenuItem value="VS">Valais</MenuItem>
              <MenuItem value="ZG">Zug</MenuItem>
              <MenuItem value="ZH">Zürich</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      <div className="createLobby button-container">
      <Button
          onClick={() => handleLobbyClick()}
          variant="contained"
      startIcon={<AddBoxOutlinedIcon/>}>
        Create Lobby
      </Button>
      </div>
    </BaseContainer>
  );
};

export default CreateLobby;
