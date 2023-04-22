import React, {useState} from "react";
import BaseContainer from "components/ui/BaseContainer";
import {useHistory} from "react-router-dom";
import {api, handleError} from "helpers/api";
import {Box, Button, FormControl, Grid, MenuItem, Paper, Select, TextField, Typography} from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import 'styles/views/CreateLobby.scss'
import ErrorMessage from "../ui/ErrorMessage";



// On this page the host chooses different attributes of his lobby
// TODO: Make sure that only loggedin users can open this page. (Guard)
const CreateLobby = () => {
  const history = useHistory();
  // Set up state variables for each input field.
  const [lobbyName, setLobbyName] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("");
  const [region, setRegion] = useState("");
  const [lobby, setLobby] = useState(null);
  const [error, setError] = useState(null);

  const handleLobbyClick = async () => {
    try {
      // Validate the input fields.
      if (!lobbyName || !maxParticipants || isNaN(maxParticipants) || !region) {
        setError('Please fill in all fields with valid data.');;
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
      setError(handleError(error));
    }
  };

  // displays the three input fields
  return (
      <>
      <BaseContainer className="createLobby">
        <Grid item xs={12}>
          <Typography variant={'h3'}>Create Lobby</Typography>
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
          <Box sx={{display: 'flex', flexDirection: 'column', width: '100%', margin: '0 auto'}}>

            <Typography variant={'h5'}>Select Lobby Name:</Typography>
            <TextField
                sx={{mt: 2, mb: 4}}
                id="lobbyName"
                placeholder="Enter Lobby Name"
                value={lobbyName}
                onChange={(e) => setLobbyName(e.target.value)}
            />
            <Typography variant={'h5'}>Enter maximum number of participants:</Typography>
            <TextField
                type={"number"}
                sx={{mt: 2, mb: 4}}
                id="maxParticipants"
                placeholder="Enter Maximum Number of Participants"
                value={maxParticipants}
                onChange={(e) => setMaxParticipants(e.target.value)}
            />
            <Typography variant={'h5'}>Choose Region:</Typography>
            <Box sx={{minWidth: 240}}>
              <FormControl fullWidth>
                <Select
                    sx={{mt: 2, mb: 4}}
                    labelId="createLobby-select"
                    id="createLobby-select"
                    value={region}
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
            <Button
                variant="contained"
                sx={{m: 2, p: 2, justifySelf: 'center', alignSelf: 'center'}}
                onClick={() => handleLobbyClick()}
                startIcon={<AddBoxOutlinedIcon/>}
            >
              Create Lobby
            </Button>
          </Box>
          <ErrorMessage error={error} onClose={() => setError(null)} />

        </Paper>

      </BaseContainer>


      </>
  );
};

export default CreateLobby;
