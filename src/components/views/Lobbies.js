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
    Typography
} from "@mui/material";
import "styles/views/Lobbies.scss";
import AddLocation from "../../helpers/AddLocation";

const generateTableData = (lobbies) => {
    const tableData = [];

    // Calculate the number of columns needed based on the number of users
    const numColumns = lobbies.length;

    // Generate table data for each column
    for (let i = 0; i < numColumns; i++) {
        const columnData = [];

        // Add header row with the user's playername
        columnData.push(lobbies[i].lobbyName);

        // Add row for Sports
        columnData.push(users[i].canton);

        // Add row for Time
        columnData.push(users[i].sport);

        columnData.push(users[i].numPlayers);

        tableData.push(columnData);
    }

    return tableData;
}

const Lobbies = () => {
  const history = useHistory();

  const handleCreateLobbyClick = () => {
    history.push("/CreateLobby");
  };
    const sportLobbies = [
        {
            lobbyName: "Lausanne Marathon",
            canton: "Vaud",
            sport: "Running",
            numPlayers: "7/10"
        },
        {
            lobbyName: "Swiss Basketball Cup Final",
            canton: "Fribourg",
            sport: "Basketball",
            numPlayers: "4/5"
        },
        {
            lobbyName: "Zurich International Chess Festival",
            canton: "Zurich",
            sport: "Chess",
            numPlayers: "1/2"
        }
    ];
  return (
      <BaseContainer className="lobbies table-map-container">
          <h1>Lobbies</h1>
              <div className="lobbies table-container">
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
                              </TableRow>
                          </TableHead>
                          <TableBody>
                              {sportLobbies.map((sportLobby) => (
                                  <TableRow key={sportLobby.lobbyName}>
                                      <TableCell>{sportLobby.lobbyName}</TableCell>
                                      <TableCell>{sportLobby.canton}</TableCell>
                                      <TableCell>{sportLobby.sport}</TableCell>
                                      <TableCell>{sportLobby.numPlayers}</TableCell>
                                      <TableCell><Button>View</Button></TableCell>
                                  </TableRow>
                              ))}
                          </TableBody>
                      </Table>
                  </TableContainer>
              </div>
              <div className="lobbies map-container">
                  <AddLocation />
              </div>
          <Button variant="contained"  style={{ margin: '20px' }} onClick={() => handleCreateLobbyClick()}>Create New Lobby</Button>
      </BaseContainer>
  );
};

export default Lobbies;

