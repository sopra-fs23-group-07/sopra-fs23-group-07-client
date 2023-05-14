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
import { toast } from "react-toastify";

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
  const [canton_Full_name, setCanton_Full_name] = useState("");
  const [shortCodeForRegion, setShortCodeForRegion] = useState("");

  const handleLobbyClick = async () => {
    try {
      setLobbyNameError(false);
      setMaxPartError(false);
      setRegionError(false);
      if (!lobbyName) {
        setLobbyNameError(true);
      }
      if (!maxParticipants || isNaN(maxParticipants)) {
        setMaxPartError(true);
      }
      if (!region) {
        setRegionError(true);
      }
      // Validate the input fields.
      if (!lobbyName || !maxParticipants || isNaN(maxParticipants) || !region) {
        toast.error("Please fill in all fields with valid data.");
        return;
      }

      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      console.log(token);

      // send lobby to backend
      const requestBody = JSON.stringify({
        lobbyName: lobbyName,
        lobbyRegion: canton_Full_name,
        lobbyMaxMembers: maxParticipants,
        lobbyTimeLimit: "100",
        hostMemberId: userId,
        hostMemberToken: token,
        lobbyRegionShortCode: shortCodeForRegion,
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
      <BaseContainer>
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <Typography
              variant="h3"
              sx={{
                color: "white",
              }}
            >
              Create Lobby
            </Typography>
          </Grid>
          <Grid
            item
            justifyContent="center"
            sx={{
              paddingY: 10,
              paddingX: 4,
              mt: 2,
              maxWidth: 1200,
              flexGrow: 1,
              background: "rgba(255, 255, 255, 0.5)",
              border: "2px black solid",
              borderRadius: "20px",
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
              <Typography variant={"h5"}>Lobby Name</Typography>
              <TextField
                sx={{ mt: 2, mb: 4 }}
                id="lobbyName"
                placeholder="LOBBY NAME"
                value={lobbyName}
                onChange={(e) => setLobbyName(e.target.value)}
                error={lobbyNameError}
              />
              <Typography variant={"h5"}>
                Maximum number of participants
              </Typography>
              <TextField
                type={"number"}
                sx={{ mt: 2, mb: 4 }}
                id="maxParticipants"
                placeholder="MAX NR OF PARTICIPANTS"
                value={maxParticipants}
                onChange={(e) => setMaxParticipants(e.target.value)}
                error={maxPartError}
              />
              <Typography variant={"h5"}>Region</Typography>
              <Box sx={{ minWidth: 240 }}>
                <FormControl fullWidth>
                  <Select
                    sx={{ mt: 2, mb: 4 }}
                    labelId="createLobby-select"
                    id="createLobby-select"
                    value={region}
                    onChange={(e) => {
                      const canton_Full_name2 = e.target.value.split(",")[0];
                      const shortCode1 = e.target.value.split(",")[1];
                      setRegion(e.target.value); // Set the entire value
                      setCanton_Full_name(canton_Full_name2);
                      setShortCodeForRegion(shortCode1);
                      console.log("shortCode:", shortCodeForRegion);
                      console.log("canton_Full_name:", canton_Full_name2);
                    }}
                    error={regionError}
                  >
                    <MenuItem value="Aargau,AG">Aargau</MenuItem>
                    <MenuItem value="Appenzell Innerrhoden,AI">
                      Appenzell Innerrhoden
                    </MenuItem>
                    <MenuItem value="Appenzell Ausserrhoden,AR">
                      Appenzell Ausserrhoden
                    </MenuItem>
                    <MenuItem value="Bern,BE">Bern</MenuItem>
                    <MenuItem value="Basel-Landschaft,BL">
                      Basel-Landschaft
                    </MenuItem>
                    <MenuItem value="Basel,BS">Basel-Stadt</MenuItem>
                    <MenuItem value="Fribourg,FR">Fribourg</MenuItem>
                    <MenuItem value="Geneva,GE">Geneva</MenuItem>
                    <MenuItem value="Glarus,GL">Glarus</MenuItem>
                    <MenuItem value="Graubünden,GR">Graubünden</MenuItem>
                    <MenuItem value="Jura,JU">Jura</MenuItem>
                    <MenuItem value="Luzern,LU">Luzern</MenuItem>
                    <MenuItem value="Neuchâtel,NE">Neuchâtel</MenuItem>
                    <MenuItem value="Nidwalden,NW">Nidwalden</MenuItem>
                    <MenuItem value="Obwalden,OW">Obwalden</MenuItem>
                    <MenuItem value="St. Gallen,SG">St. Gallen</MenuItem>
                    <MenuItem value="Schaffhausen,SH">Schaffhausen</MenuItem>
                    <MenuItem value="Solothurn,SO">Solothurn</MenuItem>
                    <MenuItem value="Schwyz,SZ">Schwyz</MenuItem>
                    <MenuItem value="Thurgau,TG">Thurgau</MenuItem>
                    <MenuItem value="Ticino,TI">Ticino</MenuItem>
                    <MenuItem value="Uri,UR">Uri</MenuItem>
                    <MenuItem value="Vaud,VD">Vaud</MenuItem>
                    <MenuItem value="Valais,VS">Valais</MenuItem>
                    <MenuItem value="Zug,ZG">Zug</MenuItem>
                    <MenuItem value="Zürich,ZH">Zürich</MenuItem>
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
          </Grid>
        </Grid>
      </BaseContainer>
    </>
  );
};

export default CreateLobby;
