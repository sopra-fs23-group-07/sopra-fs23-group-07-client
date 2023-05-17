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
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import HourglassTopOutlinedIcon from "@mui/icons-material/HourglassTopOutlined";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { api, handleError } from "../../helpers/api";
import { toast } from "react-toastify";
import { letterSpacing, sizeHeight, width } from "@mui/system";

// page where all lobbies are listed
const Lobbies = () => {
  // initializing variables and hooks need
  const history = useHistory();
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const [lobbies, setLobbies] = useState();

  const handleCreateLobbyClick = () => {
    if (
      localStorage.getItem("token") !== "null" &&
      localStorage.getItem("token")
    ) {
      history.push("/CreateLobby");
    } else {
      toast.error("You need to be logged in to create a lobby");
    }
  };

  const handleJoinLobby = async (lobbyId) => {
    console.log("this is lobby id: " + lobbyId);
    try {
      console.log("this is lobby id: " + lobbyId);
      const requestBody = JSON.stringify({
        userId: userId,
        token: token,
      });
      await api.put(`/lobbies/${lobbyId}/join`, requestBody);

      localStorage.setItem("lobbyId", lobbyId);
      history.push("/Lobby/" + String(lobbyId));
    } catch (error) {
      if(error.response.status == 401 || error.response.status == 400) {
        localStorage.clear(); window.dispatchEvent(new Event("localstorage-update"))}
      toast.error(handleError(error));
    }
  };

  // if no lobby exist display disclaimer
  let noLobbiesDisclaimer = <Spinner />;
  if (!lobbies || lobbies.length === 0) {
    noLobbiesDisclaimer = (
      <p
        sx={{
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

  // fetch data from backend (each second) and save all lobbies
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(`/lobbies`);

        setLobbies(response.data);

        // logs for debugging can be deleted after proper testing
        // console.log("request to:", response.request.responseURL);
        // console.log("status code:", response.status);
        // console.log("status text:", response.statusText);
        // console.log("requested data:", response.data);
        // console.log(response);
      } catch (error) {
        console.error(`Something went wrong while fetching the lobbies`);
        console.error("Details:", error);

        toast.error(handleError(error));
      }
    }

    fetchData(); // Make initial request immediately

    const intervalId = setInterval(fetchData, 800); // Update data every second

    return () => clearInterval(intervalId); // Clear the interval when the component is unmounted
  }, []);

  return (
    <BaseContainer>
      <Grid container spacing={2}>
        {/* Header */}
        <Grid item xs={12} sm={8}>
          <Typography
            variant="h3" /* </Grid>sx={{ color: 'yellow', writingMode: "vertical-rl", letterSpacing: "0.2em"}}*/
          >
            Lobbies
          </Typography>
        </Grid>

        {/* Create Lobby Button */}
        <Grid
          item
          xs={12}
          sm={4}
          sx={{
            direction: "row",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            startIcon={<AddBoxOutlinedIcon />}
            onClick={() => handleCreateLobbyClick()}
          >
            Create New Lobby
          </Button>
        </Grid>

        {/* Table */}
        <Grid item xs={12}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ justifyContent: "flex-start" }}>
                  <TableCell style={{width:"flex"}}>
                    <Typography fontWeight="bold">Lobby name</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold">Region</Typography>
                  </TableCell>
                  <TableCell>
                    <PeopleAltIcon sx={{ sizeHeight: "1.5em" }} />
                  </TableCell>
                  <TableCell>
                    <HourglassTopOutlinedIcon />
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody
                sx={{
                  "& > .MuiTableRow-root": {
                    border: "2px solid black",
                    background: "rgba(0, 0, 0, 0.1)",
                  },
                }}
              >
                {lobbies &&
                  lobbies.map((lobby) => (
                    <TableRow
                      key={lobby.lobbyName}
                      sx={{
                        "& td, & th": {
                          padding: "8px",
                        },
                      }}
                    >
                      <TableCell>{lobby.lobbyName}</TableCell>
                      <TableCell>{lobby.lobbyRegion}</TableCell>
                      <TableCell>
                        {lobby.lobbyMembersCount}/{lobby.lobbyMaxMembers}
                      </TableCell>
                      <TableCell>
                        <div>
                          {String(
                            Math.floor(lobby.timeRemaining / 60000)
                          ).padStart(2, "0")}
                          :
                          {String(
                            Math.floor((lobby.timeRemaining % 60000) / 1000)
                          ).padStart(2, "0")}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
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
