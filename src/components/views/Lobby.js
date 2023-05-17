import React, { useEffect, useRef, useState } from "react";
import BaseContainer from "components/ui/BaseContainer";
import {
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Grid,
  Link,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import MultipleSelectChip from "helpers/SelectSport";
import { api, handleError } from "../../helpers/api";
import { useHistory } from "react-router-dom";
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
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import InfoIcon from "@mui/icons-material/Info";
import { toast } from "react-toastify";
import { CustomHeading } from "styles/development/CustomHeading";
import { CustomGrid } from "styles/development/CustomGrid";
import HourglassTopOutlinedIcon from "@mui/icons-material/HourglassTopOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { styled } from "@mui/system";

const Lobby = () => {
  const history = useHistory(); // needed for linking
  const lobbyId = localStorage.getItem("lobbyId");
  const userId = localStorage.getItem("userId");

  const [lobby, setLobby] = useState([]);

  const [selectedSports, setSelectedSports] = React.useState([]);
  const [members, setMembers] = useState([]); // state for the pop-up
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState(null);
  const [flyToLocation, setFlyToLocation] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const [canton_Full_name, setCanton_Full_name] = useState("");
  const [shortCodeForRegion, setShortCodeForRegion] = useState("");

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
      toast.success("Link copied.");
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 5000); // Reset message after 5 seconds
    } else {
      urlRef.current.select();
      document.execCommand("copy");
      toast.success("Link copied.");
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
      await api.post(
        `/lobbies/${lobbyId}/users/${localStorage.getItem("userId")}/messages`,
        requestBody
      );
      console.log("Chat Message was sent to the backend");
      setMessage("");
    } catch (error) {
      toast.error(handleError(error));
    }
  };

  const handleMessageKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage(message);
    }
  };

  const handleMinimizeChat = () => {
    document.getElementById("ChatWindow").style.display = "none";
  };

  const handleMaximizeChat = () => {
    document.getElementById("ChatWindow").style.display = "block";
  };

  const setEnterMessageBoxRelative = () => {
    var el = document.getElementById("EnterMessageBox");
    el.style.position = "relative";
    el.style.left = "0";
    el.style.right = "0";
  };

  const updateScroll = async () => {
    var element = document.getElementById("ChatWindow");
    element.scrollTop = element.scrollHeight;
  };

  const [time, setTime] = useState(false); // state for the pop-up
  const [locationDTO, setLocationDTO] = useState([]); // state for the pop-up

  const [eventId, setEventId] = useState(null);
  const [hasExecuted, setHasExecuted] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);
  var oldChatLength = 0;

  useEffect(() => {
    async function fetchData() {
      try {
        if (eventId !== null && !hasExecuted) {
          console.log("if condition was met");
          const LobbyState = true;
          setHasExecuted(true);
          await handleLeaveLobby(LobbyState);
        } else {
          const response = await api.get("/lobbies/" + lobbyId);
          setLobby(response.data);
          setMembers(response.data.memberDTOs);
          setLocationDTO(response.data.lobbyLocationDTOs);
          setEventId(response.data.createdEventId || null);
          setShortCodeForRegion(response.data.lobbyRegionShortCode);
          setCanton_Full_name(response.data.lobbyRegion);

          setChat(response.data.lobbyMessageDTOs);

          if (response.data.lobbyMessageDTOs.length >= 4) {
            setEnterMessageBoxRelative();
          }

          if (response.data.lobbyMessageDTOs.length != oldChatLength) {
            await updateScroll();
          }
          oldChatLength = response.data.lobbyMessageDTOs.length;
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
      toast.error(handleError(error));
      localStorage.removeItem("lobbyId");
      history.push(`/Lobbies`);
    }
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
    wordWrap: "break-word",
    maxWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
  }));

  return (
    <>
      <BaseContainer>
        {/* Title */}
        <Grid container sx={{ marginBottom: 2 }}>
          <Grid
            item
            xs={8}
            sx={
              {
                // backgroundColor: "red"
              }
            }
          >
            <Typography
              variant="h3"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "left",
                marginLeft: 4,
                color: "white",
              }}
            >
              Lobby: {lobby.lobbyName}
            </Typography>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              // backgroundColor: "green",
              paddingRight: 4,
            }}
          >
            <Button variant="contained" onClick={() => setOpen(true)}>
              Invite friends
            </Button>
          </Grid>
        </Grid>

        {/* Visible Box */}
        <Grid
          container
          sx={{
            backgroundColor: "blue",
            // pt: 2,
            // pb: 4,
            // paddingX: 4,
            p: 4,
            background: "rgba(255, 255, 255, 0.7)",
            borderRadius: "20px",
            marginBottom: 2,
          }}
        >
          {/* make it responsive */}
          {/* <Grid sx={{ marginTop: 2 }}> */}
          {/* Table */}

          {/* Table */}
          <Grid
            item
            xs={8}
            // sx={{ alignItems: "center", backgroundColor: "yellow" }}
          >
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {/* Table cells usefull */}
                    <StyledTableCell sx={{ minWidth: 100, width: "15%" }}>
                      Player
                    </StyledTableCell>
                    <StyledTableCell sx={{ minWidth: 200, width: "30%" }}>
                      Sport
                    </StyledTableCell>
                    <StyledTableCell sx={{ minWidth: 150, width: "20%" }}>
                      Time
                    </StyledTableCell>
                    <StyledTableCell sx={{ minWidth: 80, width: "15%" }}>
                      {String(Math.floor(lobby.timeRemaining / 60000)).padStart(
                        2,
                        "0"
                      )}
                      :
                      {String(
                        Math.floor((lobby.timeRemaining % 60000) / 1000)
                      ).padStart(2, "0")}
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {members.map((user) => (
                    <TableRow key={user.username}>
                      {/* Player */}
                      <StyledTableCell>
                        {user.userId === parseInt(userId) ? (
                          <p>{user.username}</p>
                        ) : (
                          <Link
                            href={`/Profile/${user.userId}`}
                            target="_blank"
                            title={"This opens the profile page in a new tab"}
                            sx={{
                              color: "black",
                              textDecoration: "none",
                            }}
                          >
                            <AccountCircleIcon fontSize={"inherit"} />{" "}
                            {user.username}
                          </Link>
                        )}
                      </StyledTableCell>
                      {/* Sport Selection */}
                      {/* <StyledTableCell> */}
                      <TableCell
                        sx={{
                          borderColor: "black",
                          borderWidth: 1,
                          borderStyle: "solid",
                          wordWrap: "break-word",
                          maxWidth: 0,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
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
                            <Typography
                              sx={{
                                display: "inline",

                                color: lobby.lobbyDecidedSport.includes(sport)
                                  ? "blue"
                                  : "black",
                              }}
                            >
                              {sport + " "}
                            </Typography>
                          ))
                        )}
                      {/* </StyledTableCell> */}
                      </TableCell>
                      {/* Time Selection */}
                      {/* <StyledTableCell> */}
                      {/* Why the hell does StyledTableCell not work here? work around with sx */}
                      <TableCell
                        sx={{
                          borderColor: "black",
                          borderWidth: 1,
                          borderStyle: "solid",
                          wordWrap: "break-word",
                          maxWidth: 0,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
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
                        {/* </StyledTableCell> */}
                      </TableCell>
                      <StyledTableCell>
                        <FormGroup>
                          {/*TO DO: check if the user.id I get from backend is the same id as in the local storage!
                        And then also check if it should be disabled or not depending on the choice of the user*/}
                          {user.userId === parseInt(userId) ? (
                            <FormControlLabel
                              control={<Switch />}
                              label="Save"
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
                              // label={
                              //   user.hasLockedSelections
                              //     ? "User is ready"
                              //     : "User is not ready"
                              // }
                              checked={user.hasLockedSelections}
                            />
                          )}
                        </FormGroup>
                      </StyledTableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          {/* Location */}
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              // backgroundColor: "orange",
              padding: 2,
            }}
          >
            <Grid
              item
              sx={{
                padding: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // backgroundColor: "purple",
              }}
            >
              <Typography variant="h5">Location </Typography>
            </Grid>
            <Grid
              item
              sx={{
                display: "flex",
                justifyContent: "left",
                // backgroundColor: "pink",
                padding: 1,
              }}
            >
              <Typography>Region: {lobby.lobbyRegion} </Typography>
            </Grid>
            {/* Map and Confirm Button */}
            <Grid
              item
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // backgroundColor: "lightblue",
              }}
            >
              <div
                style={{
                  width: "100%",
                }}
              >
                {members.map((user) =>
                  user.userId === parseInt(userId) ? (
                    <AddLocationForLobby
                      memberId={user.memberId}
                      key={user.username}
                      locationDTO={locationDTO}
                      hasLockedSelections={user.hasLockedSelections}
                      flyToLocation={flyToLocation}
                      canton={shortCodeForRegion}
                      cantonFullName={canton_Full_name}
                    />
                  ) : null
                )}
              </div>
            </Grid>

            {/* Placeholder for Confirm Button */}
            <Grid
              item
              sx={{
                display: "flex",
                justifyContent: "center",
                height: "70px",
                // backgroundColor: "lightgreen",
              }}
            ></Grid>

            {/* Location Voting */}
            <Grid
              item
              sx={{
                display: "flex",
                justifyContent: "left",
                height: "50px",
                // backgroundColor: "lightpink",
              }}
            >
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
            </Grid>
          </Grid>
          {/* </Grid> */}
        </Grid>

        {/* Centered elements below  */}
        <Grid
          container
          direction="column"
          justifyContent="center"
          // sx={{ backgroundColor: "lightgray" }}
        >
          {/* Leave Button */}
          <Grid
            item
            container
            xs={4}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              // backgroundColor: "teal",
              paddingLeft: "15px",
            }}
          >
            <Grid item>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleLeaveLobbyByButton()}
                sx={{
                  width: "fit-content",
                  paddingLeft: "30px",
                  paddingRight: "30px",
                  // alignSelf: "flex-start",
                  // justifySelf: "",
                }}
              >
                Leave
              </Button>
            </Grid>
            <Grid item>
              <InfoIcon />
            </Grid>
          </Grid>

          {/* dev version of Leave Button & InfoIcon */}
          {/* <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderRight: "solid 5px yellow", // Add left border on the same height as the yellow box
              backgroundColor: "teal",
              paddingLeft: "5px", // Adjust padding to align the button with the border
            }}
          >
            <Button variant="contained" sx={{ width: "fit-content" }}>
              Leave (Centered)
            </Button>
            <Button sx={{ marginRight: "5px" }}>
              <InfoIcon />
            </Button>
          </Grid> */}

          {/* Accordion short tutorial  */}
          <Grid item xs={4} sx={{ backgroundColor: "coral" }}>
            <Accordion>
              <AccordionSummary
                expandIcon={<InfoIcon />}
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
          </Grid>

          {/* Accordion long tutorial */}
          <Grid item xs={4} sx={{ backgroundColor: "lime" }}>
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
                        You can select multiple sports and you should choose all
                        sports you like to do. So you can find a sport that you
                        have common with the other users in the lobby.
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
                          If you have already voted but want to change your vote
                          you first have to unvote before you can vote for a
                          different location.
                        </li>
                      </ul>
                    </ul>

                    <li>
                      <strong style={{ color: "blue" }}>
                        Lock your choice:{" "}
                      </strong>
                      If you are happy with all your choices lock them. After
                      you locked your choice you can't edit your preferences for
                      sport, timeslot and location anymore. If you change your
                      mind about one of the preferences you can unlock and then
                      edit your choices.
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
          </Grid>
        </Grid>

        {/* Chat */}
        <Grid
          container
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            backgroundColor: "brown",
            // zIndex: 9999, // Ensure the chat is on top of other elements
            // height: "200px", // Set the desired height
            // width: "25%", // Set the desired width
          }}
        >
          <Grid
            item
            sx={{
              width: "fit-content",
              backgroundColor: "darkcyan",
              color: "white",
            }}
          >
            {/* Open Chat Button */}
            <Button
              onClick={() => handleMaximizeChat()}
              style={{
                cursor: "pointer",
                width: "10px",
                height: "auto",
                backgroundColor: "#00A8EA",
                color: "#fff",
                border: "solid 1px #0095cc",
                textAlign: "center",
                position: "fixed",
                right: "30px",
                top: "950px",
                padding: "0px",
                borderRadius: "3px",
              }}
            >
              Open Chat
            </Button>

            {/* Chat Window Container */}
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
                position: "fixed",
                bottom: "10px",
                right: "10px",
                overflow: "auto",
                display: "block",
              }}
            >
              {/* Close Chat Button X */}
              <Button
                onClick={() => handleMinimizeChat()}
                style={{
                  cursor: "pointer",
                  width: "10px",
                  height: "auto",
                  backgroundColor: "#00A8EA",
                  color: "#fff",
                  border: "solid 1px #0095cc",
                  textAlign: "center",
                  position: "fixed",
                  right: "30px",
                  top: "810px",
                  padding: "0px",
                  borderRadius: "3px",
                }}
              >
                X
              </Button>

              {/* Chat Messages Display */}
              <div id="ChatBox" className="ChatBox">
                {chat.map((message) => (
                  <h1
                    align="left"
                    style={{
                      color: "#000000",
                      fontSize: "16px",
                    }}
                  >
                    {message.username}: {message.message}
                  </h1>
                ))}
              </div>

              {/* Styling inside Box */}
              <div
                id="EnterMessageBox"
                className="EnterMessageBox"
                style={{
                  backgroundColor: "#FFFFFF", // should be equal to #86d4ee and rbga(0,0,0,0.2)
                  position: "absolute",
                  bottom: "10px",
                  left: "10px",
                }}
              >
                {/* Chat input field */}
                <TextField
                  type={"string"}
                  id="message"
                  placeholder="Enter Message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => {
                    handleMessageKeyPress(e);
                  }}
                  size="small"
                  style={{ width: "78%" }}
                />

                {/* Chat Send Button */}
                <Button
                  variant="contained"
                  onClick={() => handleSendMessage(message)}
                  style={{ height: "39px", width: "15%" }}
                >
                  Send
                </Button>
              </div>
            </div>
          </Grid>
        </Grid>
      </BaseContainer>

      {/* 


Old Code below


*/}
      <BaseContainer className="lobby">
        <div className="flex space-x-10">
          <div className="w-[80%]">
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
                  color={isCopied ? "success" : "primary"}
                  startIcon={isCopied ? <ContentCopyIcon /> : null}
                >
                  {isCopied ? "Copied" : "Copy"}
                </Button>
                <Button variant="contained" onClick={() => setOpen(false)}>
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </BaseContainer>
    </>
  );
};

export default Lobby;
