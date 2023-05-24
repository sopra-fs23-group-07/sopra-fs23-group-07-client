import React, { useEffect, useState } from "react";
import BaseContainer from "components/ui/BaseContainer";
import { Spinner } from "components/ui/Spinner";
import { useHistory } from "react-router-dom";
import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
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
    try {
      const requestBody = JSON.stringify({
        userId: userId,
        token: token,
      });
      await api.put(`/lobbies/${lobbyId}/join`, requestBody);

      localStorage.setItem("lobbyId", lobbyId);
      history.push("/Lobby/" + String(lobbyId));
    } catch (error) {
      if (error.response.status == 401 || error.response.status == 400) {
        localStorage.clear();
        window.dispatchEvent(new Event("localstorage-update"));
        await api.post(`/users/logout/${userId}`);
      }
      toast.error(handleError(error));
    }
  };

  // fetch data from backend (each second) and save all lobbies
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(`/lobbies`);

        setLobbies(response.data);
      } catch (error) {
        console.error(`Something went wrong while fetching the lobbies`);
        console.error("Details:", error);

        toast.error(handleError(error));
      }
    }

    fetchData().catch(err => console.log(err)); // Make initial request immediately

    const intervalId = setInterval(fetchData, 800); // Update data every second

    return () => clearInterval(intervalId); // Clear the interval when the component is unmounted
  }, []);

  return (
    <BaseContainer>
      {/* Title */}
      <Grid container sx={{ marginBottom: 4 }}>
        <Grid item md={8} xs={12}>
          <Typography
            variant="h3"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: { md: "left", xs: "center" },
              marginLeft: { md: 4, xs: 0},
              color: "white",
            }}
          >
            Lobbies
          </Typography>
        </Grid>
        <Grid
          item
          md={4}
          xs={12}
          sx={{
            display: "flex",
            justifyContent: { md: "flex-end", xs: "center" },
            paddingRight: {md:4, xs: 0 }
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
      </Grid>

      {/* Visible box */}
      <Grid
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          borderRadius: "20px",
          padding: 4,
          display: "flex",
          justifyContent: "space-between",
          gap: 4,
        }}
      >
        {/* Table Box */}
        <Grid
          item
          sx={{
            flexGrow: 1,
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.3)",
          }}
        >
          {/* Table */}

          <Table
            sx={{
              background: "white",
              minHeight: "100%",
              borderCollapse: "separate",
              borderSpacing: "0 16px",
            }}
          >
            <TableHead>
              <TableRow
                sx={{
                  "& td, & th": {
                    borderBottom: "0px black solid", // works
                  },
                }}
              >
                <TableCell sx={{ minWidth: 130, width: "25%" }}>
                  <Typography fontWeight="bold">Lobby Name</Typography>
                </TableCell>
                <TableCell sx={{ minWidth: 130, width: "25%" }}>
                  <Typography fontWeight="bold">Region</Typography>
                </TableCell>
                <TableCell sx={{ minWidth: 80, width: "15%" }}>
                  <PeopleAltIcon sx={{ sizeHeight: "1.5em" }} />
                </TableCell>
                <TableCell sx={{ minWidth: 80, width: "15%" }}>
                  <HourglassTopOutlinedIcon />
                </TableCell>
                <TableCell sx={{ minWidth: 130, width: "20%" }} />
              </TableRow>
            </TableHead>
            <TableBody>
                {lobbies && lobbies.length > 0 ? (
                    lobbies
                        .filter((lobby) => lobby.createdEventId === null)
                        .map((lobby) => {
                  return (
                    <TableRow
                      key={lobby.lobbyName}
                      sx={{
                        "& td, & th": {
                          background: "rgba(165, 109, 201, 0.1)",
                          borderTop: "1px black solid", // works
                          borderBottom: "1px black solid", // works
                        },
                      }}
                    >
                      <TableCell sx={{ borderLeft: "0px black solid" }}>
                        {lobby.lobbyName}
                      </TableCell>
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
                      <TableCell
                        sx={{
                          borderRight: "0px black solid",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          variant="contained"
                          endIcon={<PersonAddOutlinedIcon />}
                          onClick={() => handleJoinLobby(lobby.lobbyId)}
                        >
                          Join
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    sx={{
                      maxWidth: "300px",
                      textAlign: "center",
                      verticalAlign: "middle",
                      borderBottom: "0px black solid", // works
                      fontWeight: "bold",
                    }}
                  >
                    Currently no lobbies available! <br /> Click create Lobby to
                    create Your own lobby.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </BaseContainer>
  );
};

export default Lobbies;
