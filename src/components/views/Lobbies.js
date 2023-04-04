import React from "react";
import BaseContainer from "components/ui/BaseContainer";
import { useHistory } from "react-router-dom";
import {
  Button,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  TableHead,
  Typography,
} from "@mui/material";
import "styles/views/Lobbies.scss";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import Schedule from "@mui/icons-material/Schedule"; // Alternative icons could be AccessAlarm, Timer, Hourglass
import CountDownTimer from "helpers/CountDownTimer";

// TODO: Can we delete this?
// const generateTableData = (lobbies) => {
//   const tableData = [];

//   // Calculate the number of columns needed based on the number of users
//   const numColumns = lobbies.length;

//   // Generate table data for each column
//   for (let i = 0; i < numColumns; i++) {
//     const columnData = [];

//     // Add header row with the user's playername
//     columnData.push(lobbies[i].lobbyName);

//     // Add row for Sports
//     columnData.push(users[i].canton);

//     // Add row for Time
//     columnData.push(users[i].sport);

//     columnData.push(users[i].numPlayers);

//     tableData.push(columnData);
//   }

//   return tableData;
// };

const Lobbies = () => {
  const history = useHistory();

  const handleCreateLobbyClick = () => {
    history.push("/CreateLobby");
  };

  const handleViewLobby = (lobbyId) => {
    history.push("/Lobbies/" + String(lobbyId));
    // TODO: send information which user join to the backend
  };

  const sportLobbies = [
    {
      lobbyId: 1,
      lobbyName: "Lausanne Marathon",
      canton: "Vaud",
      sport: "Running",
      numPlayers: "7/10",
      timeleft: "542", // time left until lobby autofinishs in seconds
    },
    {
      lobbyId: 2,
      lobbyName: "Swiss Basketball Cup Final",
      canton: "Fribourg",
      sport: "Basketball",
      numPlayers: "4/5",
      timeleft: "67",
    },
    {
      lobbyId: 3,
      lobbyName: "Zurich International Chess Festival",
      canton: "Zurich",
      sport: "Chess",
      numPlayers: "1/2",
      timeleft: "180",
    },
  ];

  return (
    <BaseContainer>
      <h1>Lobbies</h1>
      <div align="right" style={{ marginBottom: "1em" }}>
        <Button
          variant="contained"
          startIcon={<AddBoxOutlinedIcon />}
          onClick={() => handleCreateLobbyClick()}
        >
          Create New Lobby
        </Button>
      </div>
      <div className="lobbies-table-container">
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
                  <Typography fontWeight="bold">Sport</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight="bold">Number of users</Typography>
                </TableCell>
                <TableCell>
                  <Schedule />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sportLobbies.map((sportLobby) => (
                <TableRow key={sportLobby.lobbyName}>
                  <TableCell>{sportLobby.lobbyName}</TableCell>
                  <TableCell>{sportLobby.canton}</TableCell>
                  <TableCell>{sportLobby.sport}</TableCell>
                  <TableCell>{sportLobby.numPlayers}</TableCell>
                  <TableCell>
                    <CountDownTimer initialSeconds={sportLobby.timeleft} />
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleViewLobby(sportLobby.lobbyId)}>
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </BaseContainer>
  );
};

export default Lobbies;
