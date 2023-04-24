import React, {useEffect, useRef, useState} from "react";
import BaseContainer from "components/ui/BaseContainer";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    FormGroup,
    Link,
    Paper,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import "styles/views/TestLobby.scss";
import MultipleSelectChip from "helpers/SelectSport";
import Schedule from "@mui/icons-material/Schedule"; // Alternative icons could be AccessAlarm, Timer, Hourglass
import {api, handleError} from "../../helpers/api";

import {useHistory} from "react-router-dom";
import "styles/views/Lobby.scss";
import SelectDateAndTime from "../../helpers/SelectDateAndTime";
import moment from "moment/moment";
import AddLocationForLobby from "../../helpers/AddLocationForLobby";
import VotingForLocations from "../../helpers/VotingForLocations";
import ErrorMessage from "../ui/ErrorMessage";
import LaunchIcon from '@mui/icons-material/Launch';


const generateTableData = (users) => {
    const tableData = [];

    // Calculate the number of columns needed based on the number of users
    const numColumns = users.length;

    // Generate table data for each column
    for (let i = 0; i < numColumns; i++) {
        const columnData = [];

        // Add header row with the user's playername
        columnData.push(users[i].playername);

        // Add row for Sports
        columnData.push(users[i].sports);

        // Add row for Time
        columnData.push(users[i].time);

        tableData.push(columnData);
    }

    return tableData;
};
const Lobby = () => {

    const history = useHistory(); // needed for linking
    const lobbyId = localStorage.getItem("lobbyId");
    const userId = localStorage.getItem("userId");

    const [lobby, setLobby] = useState([]);
    const [ChoiceLocked, setChoiceLocked] = useState(false);
    const [selectedSports, setSelectedSports] = React.useState([]);
    const [error, setError] = useState(null);


    const handleSelectedSports = (sports) => {
        setSelectedSports(sports);
    };

    const timeleft = "350";

    const [open, setOpen] = useState(false); // state for the pop-up
    const urlRef = useRef(null); // ref for the URL input


    const handleCopyClick = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(urlRef.current.value);
        } else {
            urlRef.current.select();
            document.execCommand("copy");
        }
    };

    const handleLock = (memberId) => {
        if (ChoiceLocked) {
            setChoiceLocked(false);
            unlockChoice(memberId);
        } else {
            setChoiceLocked(true);
            lockChoice(memberId);
        }
    }


    const lockChoice = async (memberId) => {
        try {

            const requestBody = JSON.stringify({
                "memberId": memberId,
            });
            await api.put(`/lobbies/${lobbyId}/lock`, requestBody);
            console.log("Choice locked was sent to the backend");

        } catch (error) {
            setError(handleError(error));
        }

    };

    const unlockChoice = async (memberId) => {
        try {

            const requestBody = JSON.stringify({
                "memberId": memberId,
            });
            await api.put(`/lobbies/${lobbyId}/unlock`, requestBody);
            console.log("Choice unlocked was sent to the backend");

        } catch (error) {
            setError(handleError(error));
        }

    };


    const [time, setTime] = useState(false); // state for the pop-up
    const [members, setMembers] = useState([]); // state for the pop-up
    const [locationDTO, setLocationDTO] = useState([]); // state for the pop-up

    const [eventId, setEventId] = useState(null);
    const [hasExecuted, setHasExecuted] = useState(false);
    const [timerStarted, setTimerStarted] = useState(false);

    useEffect(() => {


        async function fetchData() {
            try {
                if (eventId !== null && !hasExecuted) {
                    console.log("if condition was met");
                    const LobbyState = true;
                    setHasExecuted(true);
                    handleLeaveLobby(LobbyState);
                } else {
                    const response = await api.get("/lobbies/" + lobbyId);
                    setLobby(response.data);
                    setMembers(response.data.memberDTOs);
                    setLocationDTO(response.data.lobbyLocationDTOs);
                    setEventId(response.data.createdEventId || null);
                }
            } catch (error) {
                setError(handleError(error));
            }
        }

        fetchData(); // Make initial request immediately
        const intervalId = setInterval(fetchData, 1000); // Update data every second
        return () => clearInterval(intervalId); // Clear the interval when the component is unmounted
    }, [eventId]); // Add eventId as a dependency


    const handleLeaveLobby = async (LobbyState) => {
        try {
            if (LobbyState) {
                console.log("handleLeaveLobby was called");
                const requestBody = JSON.stringify({userId});
                await api.put("/lobbies/" + lobbyId + "/leave", requestBody);
                localStorage.removeItem("lobbyId");
                history.push("/Events/" + eventId);
            } else {
                const requestBody = JSON.stringify({userId});
                await api.put("/lobbies/" + lobbyId + "/leave", requestBody);
                localStorage.removeItem("lobbyId");
                history.push(`/Lobbies`);
            }
        } catch (error) {
            setError(handleError(error));
        }
    };


    return (
        <>
            <BaseContainer className="lobby">
                <div className="flex space-x-10">
                    <div className="w-[80%]">
                        <Schedule/>
                        {/*<CountDownTimer initialSeconds={lobby.timeRemaining} />*/}
                        <div>{Math.floor(lobby.timeRemaining / 60000)}:{Math.floor((lobby.timeRemaining % 60000) / 1000)} </div>

                        <TableContainer className="table-container" component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <Typography fontWeight="bold">Players</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography fontWeight="bold">Sports</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography fontWeight="bold">Time</Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {members.map((user) => (
                                        <TableRow key={user.username}>
                                            <TableCell>

                                                {user.userId == userId ?
                                                    <p>{user.username}</p> :

                                                    <Link href={`/Profile/${user.userId}`} target="_blank"
                                                          title={"This opens the profile page in a new tab"}
                                                    >
                                                        <LaunchIcon fontSize={"inherit"}/> {user.username}
                                                    </Link>
                                                }

                                            </TableCell>
                                            <TableCell>
                                                {/*{user.sports}*/}
                                                {user.userId == userId ?
                                                    <MultipleSelectChip onSelectedSports={handleSelectedSports}
                                                                        memberId={user.memberId}/> :

                                                    user.selectedSports.map((sport) => (
                                                        <span style={{
                                                            display: 'block',
                                                            color: lobby.lobbyDecidedSport.includes(sport) ? 'blue' : 'black'
                                                        }}>
                              {sport}
                              </span>
                                                    ))
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {/*{user.time}*/}
                                                {/*<DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />*/}
                                                {user.userId == userId ?
                                                    <SelectDateAndTime memberId={user.memberId}></SelectDateAndTime> :

                                                    user.selectedDates.map((time) => (
                                                        <p>{moment(time).format("MMMM DD, YYYY h:mm A")}</p>))}
                                                {/*{chosenDate.map((date) => (*/}
                                                {/*    <div key={date} className="flex items-center space-x-2">*/}
                                                {/*      <p className="flex-grow">{moment(date).format("MMMM DD, YYYY h:mm A")}</p>*/}
                                                {/*      <IconButton*/}
                                                {/*          aria-label="delete"*/}
                                                {/*          onClick={() => removeDate(date)}*/}
                                                {/*      >*/}
                                                {/*        <ClearIcon />*/}
                                                {/*      </IconButton>*/}
                                                {/*    </div>*/}
                                                {/*))}*/}
                                            </TableCell>
                                            <TableCell>
                                                {" "}
                                                <FormGroup>
                                                    {/*TO DO: check if the user.id I get from backend is the same id as in the local storage!
                        And then also check if it should be disabled or not depending on the choice of the user*/}
                                                    {user.userId == userId ? (
                                                        <FormControlLabel
                                                            control={<Switch/>}
                                                            label="Lock your choice"
                                                            onChange={() => handleLock(user.memberId)}
                                                        />
                                                    ) : (
                                                        <FormControlLabel
                                                            disabled
                                                            control={<Switch/>}
                                                            label={user.hasLockedSelections ? "User is ready" : "User is not ready"}
                                                            checked={user.hasLockedSelections}
                                                        />
                                                    )}


                                                </FormGroup>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <Button variant="contained" onClick={() => setOpen(true)}>
                            Invite friends to lobby
                        </Button>

                        {/* pop-up */}
                        <Dialog
                            maxWidth="md"
                            fullWidth
                            open={open}
                            onClose={() => setOpen(false)}
                        >
                            <DialogTitle>Copy Lobby URL</DialogTitle>
                            <DialogContent>
                                <input
                                    type="text"
                                    value={window.location.href}
                                    ref={urlRef}
                                    readOnly
                                    style={{width: "100%", padding: "8px"}}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button variant="contained" onClick={handleCopyClick}>
                                    Copy
                                </Button>
                                <Button variant="contained" onClick={() => setOpen(false)}>
                                    Close
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleLeaveLobby()}
                        >
                            Leave Lobby
                        </Button>
                    </div>

                    <div className="w-[30%]">

                        {members.map((user) => (
                            user.userId == userId ?
                                <AddLocationForLobby memberId={user.memberId} key={user.username}
                                                     locationDTO={locationDTO}/> : null
                        ))}


                        {locationDTO.map((location) => (
                            <React.Fragment key={location.id}>
                                {members.map((user) => (
                                    user.userId == userId && (
                                        <div className="my-12" key={`${location.id}-${user.username}`}>
                                            <VotingForLocations
                                                memberId={user.memberId}
                                                address={location.address}
                                                locationId={location.locationId}
                                                memberVotes={location.memberVotes}
                                                key={location.id}
                                            />
                                        </div>
                                    )
                                ))}
                            </React.Fragment>
                        ))}

                    </div>
                </div>

            </BaseContainer>
        <ErrorMessage error={error} onClose={() => setError(null)}/>
    </>
    );
};

export default Lobby;
