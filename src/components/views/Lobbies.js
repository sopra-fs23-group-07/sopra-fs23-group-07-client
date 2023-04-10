import React, {useEffect, useState} from "react";
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
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import Schedule from "@mui/icons-material/Schedule"; // Alternative icons could be AccessAlarm, Timer, Hourglass
import HourglassTopOutlinedIcon from '@mui/icons-material/HourglassTopOutlined';
import CountDownTimer from "helpers/CountDownTimer";
import {api, handleError} from "../../helpers/api";

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
  const userId = localStorage.getItem("userId");

  const handleCreateLobbyClick = () => {
    history.push("/CreateLobby");
  };



  const handleJoinLobby = async (lobbyId) => {
    console.log("this is lobby id: " + lobbyId);
    try {
      console.log("this is lobby id: " + lobbyId);
      const requestBody = JSON.stringify({
        "userId": userId
      });
      await api.put(`/lobbies/${lobbyId}/join`, requestBody);

      localStorage.setItem("lobbyId", lobbyId);
      history.push("/Lobby/" + String(lobbyId));

    } catch (error) {
      alert(`Something went wrong when joining the lobby: \n${handleError(error)}`);
    }

  };




  const [lobbies, setLobbies] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(`/lobbies`);

        setLobbies(response.data);

        console.log('request to:', response.request.responseURL);
        console.log('status code:', response.status);
        console.log('status text:', response.statusText);
        console.log('requested data:', response.data);

        console.log(response);
      } catch (error) {
        console.error(`Something went wrong while fetching the lobby: \n${handleError(error)}`);
        console.error("Details:", error);
        alert("Something went wrong while fetching the lobbies! See the console for details.");
      }
    }
    fetchData(); // Make initial request immediately
    const intervalId = setInterval(fetchData, 1000); // Update data every second
    return () => clearInterval(intervalId); // Clear the interval when the component is unmounted

  }, []);



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
                  <Typography fontWeight="bold">Number of users</Typography>
                </TableCell>
                <TableCell>
                  <HourglassTopOutlinedIcon />
                </TableCell>
                <TableCell/>
              </TableRow>
            </TableHead>
            <TableBody>
              {lobbies && lobbies.map((lobby) => (
                <TableRow key={lobby.lobbyName}>
                  <TableCell>{lobby.lobbyName}</TableCell>
                  <TableCell>{lobby.lobbyRegion}</TableCell>
                  {/* Todo: wait for backend to give us number of users registered*/}
                  <TableCell>{lobby.lobbyMembers}/{lobby.lobbyMaxMembers}</TableCell>
                  <TableCell>
                    <CountDownTimer initialSeconds={lobby.timeleft} />
                  </TableCell>
                  <TableCell>

                    <Button
                        variant="outlined"
                        endIcon={<PersonAddOutlinedIcon />}
                        onClick={() => handleJoinLobby(lobby.lobbyId)}>
                      Join

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
