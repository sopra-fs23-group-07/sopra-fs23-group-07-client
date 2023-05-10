import React, { useEffect, useRef, useState } from "react";
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
  Tooltip,
  Typography,
  TextField,
} from "@mui/material";
import "styles/views/TestLobby.scss";
import MultipleSelectChip from "helpers/SelectSport";
import { api, handleError } from "../../helpers/api";
import { useHistory } from "react-router-dom";
import "styles/views/Lobby.scss";
import SelectDateAndTime from "../../helpers/SelectDateAndTime";
import AddLocationForLobby from "../../helpers/AddLocationForLobby";
import VotingForLocations from "../../helpers/VotingForLocations";
import LaunchIcon from "@mui/icons-material/Launch";
import Schedule from "@mui/icons-material/Schedule";
import moment from "moment/moment";
import HelpOutline from "@mui/icons-material/HelpOutline";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {toast} from "react-toastify";

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

  const [selectedSports, setSelectedSports] = React.useState([]);
  const [members, setMembers] = useState([]); // state for the pop-up
  const [chat, setChat] =  useState([]);
  const [message, setMessage] = useState(null);
  const [flyToLocation, setFlyToLocation] = useState(null);
  const [isCopied, setIsCopied] = useState(false);

  //
  // members.map((user) => {
  //     if (user.userId === parseInt(userId)) {
  //         setChoiceLocked(user.hasLockedSelections)
  //
  //     }
  // });
  const handleSelectedSports = (sports) => {
    setSelectedSports(sports);
  };

  const timeleft = "350";

  const [open, setOpen] = useState(false); // state for the pop-up
  const urlRef = useRef(null); // ref for the URL input

  const handleCopyClick = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(urlRef.current.value);
      toast.success("Link copied.")
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 5000); // Reset message after 5 seconds
    } else {
      urlRef.current.select();
      document.execCommand("copy");
      toast.success("Link copied.")
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 5000); // Reset message after 5 seconds
    }
  };

  const handleLock = (memberId, hasLockedSelections) => {
    if (hasLockedSelections) {
      unlockChoice(memberId);
    } else {
      lockChoice(memberId);
    }
  };

  const lockChoice = async (memberId) => {
    try {
      const requestBody = JSON.stringify({
        memberId: memberId,
      });
      await api.put(`/lobbies/${lobbyId}/lock`, requestBody);
      console.log("Choice locked was sent to the backend");
    } catch (error) {
      toast.error(handleError(error));
    }
  };

  const unlockChoice = async (memberId) => {
    try {
      const requestBody = JSON.stringify({
        memberId: memberId,
      });
      await api.put(`/lobbies/${lobbyId}/unlock`, requestBody);
      console.log("Choice unlocked was sent to the backend");
    } catch (error) {
      toast.error(handleError(error));
    }
  };

  const handleSendMessage = async (message) => {
    try {
          const requestBody = JSON.stringify({
            message: message,
          });
          await api.post(`/lobbies/${lobbyId}/users/${localStorage.getItem("userId")}/messages`, requestBody);
          console.log("Chat Message was sent to the backend");
        } catch (error) {
          toast.error(handleError(error));
        }
  }

  const handleMinimizeChat = () => {
    document.getElementById("ChatWindow").style.display = "none";
  }

  const handleMaximizeChat = () => {
      document.getElementById("ChatWindow").style.display = "block";
    }

  const updateScroll = async () => {
    var element = document.getElementById("ChatBox")
    element.scrollTop = element.scrollHeight;
  }

  const [time, setTime] = useState(false); // state for the pop-up
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

          const oldChat = JSON.stringify(chat);
          setChat(response.data.lobbyMessageDTOs);

          updateScroll()

        }
      } catch (error) {
        toast.error(handleError(error));
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
        const requestBody = JSON.stringify({ userId });
        await api.put("/lobbies/" + lobbyId + "/leave", requestBody);
        localStorage.removeItem("lobbyId");
        history.push("/Events/" + eventId);
      } else {
        const requestBody = JSON.stringify({ userId });
        await api.put("/lobbies/" + lobbyId + "/leave", requestBody);
        localStorage.removeItem("lobbyId");
        history.push(`/Lobbies`);
      }
    } catch (error) {
      toast.error(handleError(error));
    }
  };

  return (
    <>
      <BaseContainer className="lobby">
        <div className="flex space-x-10">
          <div className="w-[80%]">
            {/* <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p style={{ margin: 0 }}>Lobby: {lobby.lobbyName}</p>
              <div>
                {Math.floor(lobby.timeRemaining / 60000)}:
                {Math.floor((lobby.timeRemaining % 60000) / 1000)}
              </div>
            </div> */}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h1 style={{ margin: 0 }}>Lobby: {lobby.lobbyName}</h1>
              <h3>
                <Schedule />
                {Math.floor(lobby.timeRemaining / 60000)}:
                {Math.floor((lobby.timeRemaining % 60000) / 1000)}
              </h3>
            </div>

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
                        {user.userId === parseInt(userId) ? (
                          <p>{user.username}</p>
                        ) : (
                          <Link
                            href={`/Profile/${user.userId}`}
                            target="_blank"
                            title={"This opens the profile page in a new tab"}
                          >
                            <LaunchIcon fontSize={"inherit"} /> {user.username}
                          </Link>
                        )}
                      </TableCell>
                      <TableCell>
                        {/*{user.sports}*/}
                        {user.userId === parseInt(userId) ? (
                          <MultipleSelectChip
                            onSelectedSports={handleSelectedSports}
                            memberId={user.memberId}
                            selectedSportsServer={user.selectedSports}
                            chosenSportServer={lobby.lobbyDecidedSport}
                            hasLockedSelections={user.hasLockedSelections}
                          />
                        ) : (
                          user.selectedSports.map((sport) => (
                            <span
                              style={{
                                display: "block",
                                color: lobby.lobbyDecidedSport.includes(sport)
                                  ? "blue"
                                  : "black",
                              }}
                            >
                              {sport}
                            </span>
                          ))
                        )}
                      </TableCell>
                      <TableCell>
                        {/*{user.time}*/}
                        {/*<DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />*/}
                        {user.userId == userId ? (
                          <SelectDateAndTime
                            selectedDatesServer={user.selectedDates}
                            chosenDateServer={lobby.lobbyDecidedDate}
                            memberId={user.memberId}
                            hasLockedSelections={user.hasLockedSelections}
                          ></SelectDateAndTime>
                        ) : (
                          user.selectedDates.map((time) => (
                            <span
                              style={{
                                display: "block",
                                color: lobby.lobbyDecidedDate.includes(time)
                                  ? "blue"
                                  : "black",
                              }}
                            >
                              {
                                <p>
                                  {moment(time).format("MMMM DD, YYYY h:mm A")}
                                </p>
                              }
                            </span>
                          ))
                        )}
                        {/*<p>{moment(time).format("MMMM DD, YYYY h:mm A")}</p>*/}
                        {/*// user.selectedDates.map((time) => (*/}
                        {/*//     <p>{moment(time).format("MMMM DD, YYYY h:mm A")}</p>))}*/}
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
                          {user.userId === parseInt(userId) ? (
                            <FormControlLabel
                              control={<Switch />}
                              label="Lock your choice"
                              onChange={() =>
                                handleLock(
                                  user.memberId,
                                  user.hasLockedSelections
                                )
                              }
                              checked={user.hasLockedSelections}
                            />
                          ) : (
                            <FormControlLabel
                              disabled
                              control={<Switch />}
                              label={
                                user.hasLockedSelections
                                  ? "User is ready"
                                  : "User is not ready"
                              }
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
                  style={{ width: "100%", padding: "8px" }}
                />
              </DialogContent>
              <DialogActions>
                <Button
                    variant="contained"
                    onClick={handleCopyClick}
                    color={isCopied ? "success":"primary"}
                    startIcon={isCopied ? <ContentCopyIcon/> : null}
                >
                  {isCopied ? "Copied" : "Copy"}
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


            <div style={{ padding: "5px" }}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Short Tutorial Lobby</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div
                    className="QuickExplaination"
                    style={{
                      border: "3px solid #333",
                      padding: "10px",
                      marginBottom: "20px",
                      backgroundColor: "#6BA9BE", // should be equal to #86d4ee and rbga(0,0,0,0.2)
                      position: "relative",
                    }}
                  >
                    <ol>
                      <Tooltip title="                For a more detailed description see at the bottom of the page ">
                        <HelpOutline
                          style={{ position: "absolute", top: 10, right: 10 }}
                        />
                      </Tooltip>
                      <li>Enter (in any order) your preferences for</li>
                      <ul>
                        <li>Sport</li>
                        <li>Time (First select and then press on the ✓)</li>
                        <li>Location (vote or suggest yourself)</li>
                      </ul>
                      <li>Lock your choices</li>
                      <li>Wait for other users to lock</li>
                      <ul>
                        <li>
                          or until timer <Schedule /> is up
                        </li>
                      </ul>
                    </ol>
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>

            <div style={{ padding: "5px" }}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Long Tutorial Lobby</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div
                    style={{
                      border: "3px solid #333",
                      padding: "10px",
                      marginBottom: "20px",
                      marginTop: "20px",
                      backgroundColor: "#6BA9BE", // should be equal to #86d4ee and rbga(0,0,0,0.2)
                      position: "relative",
                    }}
                  >
                    <ol>
                      <HelpOutline
                        style={{ position: "absolute", top: 10, right: 10 }}
                      />

                      <li>Enter your preferences for</li>
                      <ul>
                        <li>
                          <strong style={{ color: "blue" }}> Sport: </strong>
                          You can select multiple sports and you should choose
                          all sports you like to do. So you can find a sport
                          that you have common with the other users in the
                          lobby.
                        </li>
                        <li>
                          <strong style={{ color: "blue" }}>
                            {" "}
                            Time and Date:{" "}
                          </strong>
                          Here you can select multiple timeslots and you should
                          select like explained for sports above. To select a
                          timeslot you first have to press on it and afterwards
                          hit the checkmark.
                        </li>
                        <li>
                          <strong style={{ color: "blue" }}>Location:</strong>{" "}
                          Here you have two options.
                        </li>
                        <ul>
                          <li>
                            Option 1: Vote for locations someone else suggested.
                          </li>
                          <li>
                            Option 2: Suggest a location yourself by clicking on
                            the map where you want the event to take place. Then
                            press confirm location and vote for it.
                          </li>
                          <li>
                            If you have already voted but want to change your
                            vote you first have to unvote before you can vote
                            for a different location.
                          </li>
                        </ul>
                      </ul>

                      <li>
                        <strong style={{ color: "blue" }}>
                          Lock your choice:{" "}
                        </strong>
                        If you are happy with all your choices lock them. After
                        you locked your choice you can't edit your preferences
                        for sport, timeslot and location anymore. If you change
                        your mind about one of the preferences you can unlock
                        and then edit your choices.
                      </li>
                      <li>
                        <strong style={{ color: "blue" }}>
                          Wait for event to be created:
                        </strong>
                        Either when all users in the lobby have locked their
                        choices or when the timer <Schedule />
                        hits zero.
                      </li>
                    </ol>
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>

          <div className="w-[30%]">
            {members.map((user) =>
              user.userId === parseInt(userId) ? (
                <AddLocationForLobby
                  memberId={user.memberId}
                  key={user.username}
                  locationDTO={locationDTO}
                  hasLockedSelections={user.hasLockedSelections}
                  flyToLocation={flyToLocation}
                />
              ) : null
            )}

            {locationDTO.map((location) => (
              <React.Fragment key={location.id}>
                {members.map(
                  (user) =>
                    user.userId === parseInt(userId) && (
                      <div
                        className="my-12"
                        key={`${location.id}-${user.username}`}
                      >
                        <VotingForLocations
                          hasLockedSelections={user.hasLockedSelections}
                          memberId={user.memberId}
                          address={location.address}
                          locationId={location.locationId}
                          memberVotes={location.memberVotes}
                          key={location.id}
                          latitude={location.latitude}
                          longitude={location.longitude}
                          setFlyToLocation={setFlyToLocation}
                        />
                      </div>
                    )
                )}
              </React.Fragment>
            ))}
          </div>

          <Button
              onClick={() => handleMaximizeChat()}
              style={{
              cursor:"pointer",
              width: "10px",
              height: "auto",
              backgroundColor: "#00A8EA",
              color: "#fff",
              border: "solid 1px #0095cc",
              textAlign: "center",
              position: "fixed",
              right: "30px",
              top: "650px",
              padding: "0px",
              borderRadius: "3px",
              }}
          >
              Open Chat
          </Button>

          <div
                id="ChatWindow"
                className="ChatWindow"
                style={{
                    border: "3px solid #333",
                    width: "25%",
                    height: "200px",
                    padding: "10px",
                    marginBottom: "0px",
                    backgroundColor: "#FFFFFF", // should be equal to #86d4ee and rbga(0,0,0,0.2)
                    position: "absolute",
                    bottom: "10px",
                    right: "10px",
                    overflow: "auto",
                    display: "block",
                    }}
                >
                <Button
                    onClick={() => handleMinimizeChat()}
                    style={{
                      cursor:"pointer",
                      width: "10px",
                      height: "auto",
                      backgroundColor: "#00A8EA",
                      color: "#fff",
                      border: "solid 1px #0095cc",
                      textAlign: "center",
                      position: "fixed",
                      right: "30px",
                      top: "510px",
                      padding: "0px",
                      borderRadius: "3px",
                    }}
                >
                    X
                </Button>
                <div
                    id="ChatBox"
                    className="ChatBox"

                    >
                    {chat.map((message) =>
                        <h1 align="left" style={{color: "#000000", fontSize: "16px"}}>{message.username}: {message.message}</h1>
                        )}
                 </div>
                 <div className="EnterMessageBox"
                    style={{
                    backgroundColor: "#FFFFFF", // should be equal to #86d4ee and rbga(0,0,0,0.2)
                    position: "relative",
                    }}>
                    <TextField
                      type={"string"}
                      id="message"
                      placeholder="Enter Message..."
                      value = {message}
                      onChange={(e) => setMessage(e.target.value)}
                      size="small"
                      style={{width: "80%"}}
                      />
                     <Button
                        variant="contained"
                        onClick={() => handleSendMessage(message)}
                        style={{height: "39px", width: "20%"}}
                        >
                            Send
                     </Button>
                 </div>
             </div>
        </div>

      </BaseContainer>
    </>
  );
};

export default Lobby;
