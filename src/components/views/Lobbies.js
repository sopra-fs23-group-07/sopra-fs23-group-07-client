import React, { useEffect, useState } from "react";
import BaseContainer from "components/ui/BaseContainer";
import { Spinner } from "components/ui/Spinner";
import { useHistory } from "react-router-dom";
import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import "styles/views/Lobbies.scss";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import HourglassTopOutlinedIcon from "@mui/icons-material/HourglassTopOutlined";
import { api, handleError } from "../../helpers/api";
import ErrorMessage from "../ui/ErrorMessage";

const Lobbies = () => {
  const history = useHistory();
  const userId = localStorage.getItem("userId");
  const [error, setError] = useState(null);

  const handleCreateLobbyClick = () => {
    history.push("/CreateLobby");
  };

  const handleJoinLobby = async (lobbyId) => {
    console.log("this is lobby id: " + lobbyId);
    try {
      console.log("this is lobby id: " + lobbyId);
      const requestBody = JSON.stringify({
        userId: userId,
      });
      await api.put(`/lobbies/${lobbyId}/join`, requestBody);

      localStorage.setItem("lobbyId", lobbyId);
      history.push("/Lobby/" + String(lobbyId));
    } catch (error) {
      setError(handleError(error));
    }
  };

  const [lobbies, setLobbies] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(`/lobbies`);

        setLobbies(response.data);

        console.log("request to:", response.request.responseURL);
        console.log("status code:", response.status);
        console.log("status text:", response.statusText);
        console.log("requested data:", response.data);

        console.log(response);
      } catch (error) {
        console.error(
          `Something went wrong while fetching the lobby: \n${handleError(
            error
          )}`
        );
        console.error("Details:", error);
        setError(
          "Something went wrong while fetching the lobbies! See the console for details."
        );
      }
    }

    fetchData(); // Make initial request immediately
    const intervalId = setInterval(fetchData, 800); // Update data every second
    return () => clearInterval(intervalId); // Clear the interval when the component is unmounted
  }, []);

  let noLobbiesDisclaimer = <Spinner />;
  // if no lobby exist display disclaimer
  if (!lobbies || lobbies.length === 0) {
    noLobbiesDisclaimer = (
      <p
        style={{
          fontWeight: "bold",
          textAlign: "center",
          fontSize: "1.2rem",
          color: "black",
        }}
      >
        Currently no lobbies available! <br /> Click create Lobby to create Your
        own lobby.
      </p>
    );
  }

  return (
    <BaseContainer>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h3">Lobbies</Typography>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Button
            variant="contained"
            startIcon={<AddBoxOutlinedIcon />}
            onClick={() => handleCreateLobbyClick()}
          >
            Create New Lobby
          </Button>
        </Grid>
        <Grid item xs={12}>
          <ErrorMessage error={error} onClose={() => setError(null)} />
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography fontWeight="bold">Lobby name</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold">Canton</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold">Number of users</Typography>
                  </TableCell>
                  <TableCell>
                    <HourglassTopOutlinedIcon />
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {lobbies &&
                  lobbies.map((lobby) => (
                    <TableRow key={lobby.lobbyName}>
                      <TableCell>{lobby.lobbyName}</TableCell>
                      <TableCell>{lobby.lobbyRegion}</TableCell>
                      <TableCell>
                        {lobby.lobbyMembersCount}/{lobby.lobbyMaxMembers}
                      </TableCell>
                      <TableCell>
                        <div>
                          {Math.floor(lobby.timeRemaining / 60000)}:
                          {Math.floor((lobby.timeRemaining % 60000) / 1000)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          endIcon={<PersonAddOutlinedIcon />}
                          onClick={() => handleJoinLobby(lobby.lobbyId)}
                        >
                          Join
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          {noLobbiesDisclaimer /* only displayed if no lobby exist*/}
        </Grid>
      </Grid>
    </BaseContainer>
  );
};

export default Lobbies;
