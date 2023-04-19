import React, {useEffect, useState} from "react";
import BaseContainer from "components/ui/BaseContainer";
import {useHistory} from "react-router-dom";
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
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import HourglassTopOutlinedIcon from '@mui/icons-material/HourglassTopOutlined';
import {api, handleError} from "../../helpers/api";
import ErrorMessage from "../ui/ErrorMessage";


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
    const [error, setError] = useState(null);

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
            setError(handleError(error));
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
                setError("Something went wrong while fetching the lobbies! See the console for details.");
            }
        }

        fetchData(); // Make initial request immediately
        const intervalId = setInterval(fetchData, 800); // Update data every second
        return () => clearInterval(intervalId); // Clear the interval when the component is unmounted

    }, []);


    return (
        <BaseContainer>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h3">
                        Lobbies
                    </Typography>
                </Grid>
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                >
                    <Button
                        variant="contained"
                        startIcon={<AddBoxOutlinedIcon/>}
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
                                        <HourglassTopOutlinedIcon/>
                                    </TableCell>
                                    <TableCell/>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {lobbies && lobbies.map((lobby) => (
                                    <TableRow key={lobby.lobbyName}>
                                        <TableCell><Typography
                                            onClick={() => history.push("/Lobby/" + String(lobby.lobbyId))}>{lobby.lobbyName}</Typography></TableCell>
                                        <TableCell>{lobby.lobbyRegion}</TableCell>
                                        <TableCell>{lobby.lobbyMembersCount}/{lobby.lobbyMaxMembers}</TableCell>
                                        <TableCell>
                                            <div>{Math.floor(lobby.timeRemaining / 60000)}:{Math.floor((lobby.timeRemaining % 60000) / 1000)}</div>
                                        </TableCell>
                                        <TableCell>

                                            <Button
                                                variant="outlined"
                                                endIcon={<PersonAddOutlinedIcon/>}
                                                onClick={() => handleJoinLobby(lobby.lobbyId)}>
                                                Join

                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </BaseContainer>
    );
};

export default Lobbies;
