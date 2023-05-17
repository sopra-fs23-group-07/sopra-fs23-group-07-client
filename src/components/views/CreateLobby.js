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
  Select,
  TextField,
  Typography,
} from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { toast } from "react-toastify";
import { CustomHeading } from "styles/development/CustomHeading";
import {InputSlider}  from "components/ui/InputSlider";

// On this page the host chooses different attributes of his lobby
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
        if(error.response.status == 401) {
            localStorage.clear();
            }
      toast.error(handleError(error));
    }
  };

  // displays the three input fields
  return (
    <>
      <BaseContainer>
        {/* Container of all content */}
        <Grid container direction="column" sx={{ alignItems: "center" }}>
          {/* title */}
          <Grid item xs={12}>
            {/* <Typography
              variant="h3"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                //   letterSpacing: "0.2em"
              }}
            >
              Create Lobby
            </Typography> */}
              <CustomHeading variant="h3">Create Lobby</CustomHeading>
          </Grid>
          {/* Visible Box */}
          <Grid
            item
            sx={{
              paddingY: 10,
              //   paddingX: 4,
              paddingX: 8,
              mt: 2,
              maxWidth: 600,
              flexGrow: 1,
              background: "rgba(255, 255, 255, 0.7)",
              borderRadius: "20px",
            }}
          >
            {/* All form fields */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "70%",
                minWidth: "340px", // this parameter controlls the width of the input field and therefore the width of the whole box
                margin: "0 auto",
                // ml: "100px",
                // mr: "100px"
              }}
            >
              <TextField
                label="Lobby Name"
                value={lobbyName}
                onChange={(e) => {
                  setLobbyNameError(false);
                  setLobbyName(e.target.value);
                }}
                sx={{ mt: 2 }}
                error={lobbyNameError}
              />

              <InputSlider
                maxParticipants={maxParticipants}
                setMaxParticipants={setMaxParticipants}
                maxPartError={maxPartError}
                setMaxPartError={setMaxPartError}
              />

              <Typography sx={{ mt: 2, mb: 0, alignSelf: "left" }}>
                Choose a region in the menu below
              </Typography>
              {/* <Box sx={{ minWidth: 240 }}> */}
              {/* <FormControl > */}
              <Select
                // labelId="createLobby-select"
                // id="createLobby-select"
                value={region}
                onChange={(e) => {
                  setRegionError(false);
                  const canton_Full_name2 = e.target.value.split(",")[0];
                  const shortCode1 = e.target.value.split(",")[1];
                  setRegion(e.target.value); // Set the entire value
                  setCanton_Full_name(canton_Full_name2);
                  setShortCodeForRegion(shortCode1);
                }}
                sx={{ mt: 2 }}
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
              {/* </FormControl> */}
              {/* </Box> */}
              <Button
                variant="contained"
                sx={{ m: 5, p: 2, justifySelf: "center", alignSelf: "center" }}
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
