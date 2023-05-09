import React, { useState } from "react";
import BaseContainer from "components/ui/BaseContainer";
import { useHistory } from "react-router-dom";
import { api, handleError } from "helpers/api";
import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import "styles/views/CreateLobby.scss";
import {toast} from "react-toastify";

// On this page the host chooses different attributes of his lobby
// TODO: Make sure that only loggedin users can open this page. (Guard)
const CreateLobby = () => {
  const history = useHistory();
  // Set up state variables for each input field.
  const [lobbyName, setLobbyName] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("");
  const [region, setRegion] = useState("");
  const [lobby, setLobby] = useState(null);
  const [lobbyNameError, setLobbyNameError] = useState(false);
  const [maxPartError, setMaxPartError] = useState(false);
  const [regionError, setRegionError] = useState(false);

  const handleLobbyClick = async () => {
    try {
      setLobbyNameError(false);
      setMaxPartError(false);
      setRegionError(false);
      if (!lobbyName){
        setLobbyNameError(true);
      }
      if (!maxParticipants || isNaN(maxParticipants)){
        setMaxPartError(true);
      }
      if (!region){
        setRegionError(true);
      }
      // Validate the input fields.
      if (!lobbyName || !maxParticipants || isNaN(maxParticipants) || !region) {
        toast.error("Please fill in all fields with valid data.");
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
      console.log(response.data);
      setLobby(response.data);

      localStorage.setItem("lobbyId", response.data.lobbyId);
      // TODO: Make sure that always a new lobby with the correct Id is created. Probably get LobbyId from Backend response.

      history.push(`/Lobby/${response.data.lobbyId}`);
    } catch (error) {
      toast.error(handleError(error));
    }
  };

  // displays the three input fields
  return (
    <>
      <BaseContainer className="createLobby">
        <Grid item xs={12}>
          <Typography variant={"h3"}>Create Lobby</Typography>
        </Grid>
        <Paper
          sx={{
            paddingY: 10,
            paddingX: 4,
            mt: 2,
            maxWidth: 1200,
            flexGrow: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              margin: "0 auto",
            }}
          >
            <Typography variant={"h5"}>Select Lobby Name:</Typography>
            <TextField
              sx={{ mt: 2, mb: 4 }}
              id="lobbyName"
              placeholder="Enter Lobby Name"
              value={lobbyName}
              onChange={(e) => setLobbyName(e.target.value)}
              error={lobbyNameError}
            />
            <Typography variant={"h5"}>
              Enter maximum number of participants:
            </Typography>
            <TextField
              type={"number"}
              sx={{ mt: 2, mb: 4 }}
              id="maxParticipants"
              placeholder="Enter Maximum Number of Participants"
              value={maxParticipants}
              onChange={(e) => setMaxParticipants(e.target.value)}
              error={maxPartError}
            />
            <Typography variant={"h5"}>Choose Region:</Typography>
            <Box sx={{ minWidth: 240 }}>
              <FormControl fullWidth>
                <Select
                  sx={{ mt: 2, mb: 4 }}
                  labelId="createLobby-select"
                  id="createLobby-select"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  error={regionError}
                >
                  <MenuItem value="Aargau">Aargau</MenuItem>
                  <MenuItem value="Appenzell Innerrhoden">
                    Appenzell Innerrhoden
                  </MenuItem>
                  <MenuItem value="Appenzell Ausserrhoden">
                    Appenzell Ausserrhoden
                  </MenuItem>
                  <MenuItem value="Bern">Bern</MenuItem>
                  <MenuItem value="Basel-Landschaft">Basel-Landschaft</MenuItem>
                  <MenuItem value="Basel-Stadt">Basel-Stadt</MenuItem>
                  <MenuItem value="Fribourg">Fribourg</MenuItem>
                  <MenuItem value="Geneva">Geneva</MenuItem>
                  <MenuItem value="Glarus">Glarus</MenuItem>
                  <MenuItem value="Graubünden">Graubünden</MenuItem>
                  <MenuItem value="Jura">Jura</MenuItem>
                  <MenuItem value="Luzern">Luzern</MenuItem>
                  <MenuItem value="Neuchâtel">Neuchâtel</MenuItem>
                  <MenuItem value="Nidwalden">Nidwalden</MenuItem>
                  <MenuItem value="Obwalden">Obwalden</MenuItem>
                  <MenuItem value="St. Gallen">St. Gallen</MenuItem>
                  <MenuItem value="Schaffhausen">Schaffhausen</MenuItem>
                  <MenuItem value="Solothurn">Solothurn</MenuItem>
                  <MenuItem value="Schwyz">Schwyz</MenuItem>
                  <MenuItem value="Thurgau">Thurgau</MenuItem>
                  <MenuItem value="Ticino">Ticino</MenuItem>
                  <MenuItem value="Uri">Uri</MenuItem>
                  <MenuItem value="Vaud">Vaud</MenuItem>
                  <MenuItem value="Valais">Valais</MenuItem>
                  <MenuItem value="Zug">Zug</MenuItem>
                  <MenuItem value="Zürich">Zürich</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Button
              variant="contained"
              sx={{ m: 2, p: 2, justifySelf: "center", alignSelf: "center" }}
              onClick={() => handleLobbyClick()}
              startIcon={<AddBoxOutlinedIcon />}
            >
              Create Lobby
            </Button>
          </Box>
        </Paper>
      </BaseContainer>
    </>
  );
};

export default CreateLobby;
