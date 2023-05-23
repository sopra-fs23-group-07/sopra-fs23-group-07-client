import React, { useEffect, useRef, useState } from "react";
import BaseContainer from "components/ui/BaseContainer";
import ShareButtons from "components/ui/ShareButtons";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  Table,
  TableBody,
  TableCell,
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
import Schedule from "@mui/icons-material/Schedule";
import moment from "moment/moment";
import HelpOutline from "@mui/icons-material/HelpOutline";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { toast } from "react-toastify";

const Lobby = () => {
  const history = useHistory(); // needed for linking
  const lobbyId = localStorage.getItem("lobbyId");
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const [lobby, setLobby] = useState([]);
  const [selectedSports, setSelectedSports] = React.useState([]);
  const [members, setMembers] = useState([]); // state for the pop-up
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState(null);
  const [flyToLocation, setFlyToLocation] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const [canton_Full_name, setCanton_Full_name] = useState("");
  const [shortCodeForRegion, setShortCodeForRegion] = useState("");

  const handleSelectedSports = (sports) => {
    setSelectedSports(sports);
  };

  const [open, setOpen] = useState(false); // state for the pop-up
  const urlRef = useRef(null); // ref for the URL input

  const handleCopyClick = () => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(urlRef.current.value)
        .catch((err) => console.log(err));
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
      unlockChoice(memberId).catch((err) => console.log(err));
    } else {
      lockChoice(memberId).catch((err) => console.log(err));
    }
  };

  const lockChoice = async (memberId) => {
    try {
      const requestBody = JSON.stringify({
        memberId: memberId,
      });
      const response = await api.put(`/lobbies/${lobbyId}/lock`, requestBody);
      if (response.data) {
        toast.warn(response.data);
      }
      console.log("Choice locked was sent to the backend");
    } catch (error) {
      if (
        !(
          error.response.status === 404 &&
          error.response.data === "The lobbyId provided was not found"
        )
      ) {
        toast.error(handleError(error));
      }
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
      if (
        !(
          error.response.status === 404 &&
          error.response.data === "The lobbyId provided was not found"
        )
      ) {
        toast.error(handleError(error));
      }
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
      if (
        !(
          error.response.status === 404 &&
          error.response.data === "The lobbyId provided was not found"
        )
      ) {
        toast.error(handleError(error));
      }
    }
  };

  const handleMessageKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage(message).catch((err) => console.log(err));
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

  const [locationDTO, setLocationDTO] = useState([]); // state for the pop-up

  const [eventId, setEventId] = useState(null);
  const [hasExecuted, setHasExecuted] = useState(false);
  var oldChatLength = 0;

  useEffect(() => {
    // Add a listener to show a warning when the user attempts to leave the page
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue =
        "Are you sure you want to leave? Any unsaved changes will be lost.";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Clean up the listener when the component is unmounted
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    return () => {
      // && history.location.pathname === "any specific path")
      if (history.action === "POP") {
        console.log("Back was clicked");
        handleLeaveLobbyByButton().catch((err) => console.log(err));
      }
    };
  }, [history]);

  useEffect(() => {
    async function fetchData() {
      try {
        if (eventId > 0 && !hasExecuted) {
          console.log("if condition was met");
          const LobbyState = true;
          setHasExecuted(true);
          await handleLeaveLobby(LobbyState);
        } else if (eventId === -1 && !hasExecuted) {
          console.log("event Id is -1");
          setHasExecuted(true);
          await handleLeaveTimerUp();
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
        if (
          !(
            error.response.status === 404 &&
            error.response.data === "The lobbyId provided was not found"
          )
        ) {
          toast.error(handleError(error));
        }
      }
    }

    fetchData().catch((err) => console.log(err)); // Make initial request immediately
    const intervalId = setInterval(fetchData, 1000); // Update data every second
    return () => clearInterval(intervalId); // Clear the interval when the component is unmounted
  }, [eventId]); // Add eventId as a dependency

  const handleLeaveLobby = async (LobbyState) => {
    try {
      if (LobbyState) {
        console.log("handleLeaveLobby was called");
        const requestBody = JSON.stringify({
          userId: userId,
          token: token,
        });
        await api.put("/lobbies/" + lobbyId + "/leave", requestBody);
        localStorage.removeItem("lobbyId");
        history.push("/Events/" + eventId);
      }
    } catch (error) {
      toast.error(handleError(error));
      localStorage.removeItem("lobbyId");
      if (error.response.status == 401) {
        localStorage.clear();
        window.dispatchEvent(new Event("localstorage-update"));
        await api.post(`/users/logout/${userId}`);
      }
      if (error.response.status != 500) {
        history.push(`/Lobbies`);
      }
    }
  };

  const handleLeaveLobbyByButton = async () => {
    try {
      const requestBody = JSON.stringify({
        userId: userId,
        token: token,
      });
      await api.put("/lobbies/" + lobbyId + "/leave", requestBody);
      localStorage.removeItem("lobbyId");
      history.push(`/Lobbies`);
    } catch (error) {
      toast.error(handleError(error));
      localStorage.removeItem("lobbyId");
      if (error.response.status == 401) {
        localStorage.clear();
        window.dispatchEvent(new Event("localstorage-update"));
        await api.post(`/users/logout/${userId}`);
      }
      history.push(`/Lobbies`);
    }
  };

  const handleLeaveTimerUp = async () => {
    try {
      const requestBody = JSON.stringify({
        userId: userId,
        token: token,
      });
      await api.put("/lobbies/" + lobbyId + "/leave", requestBody);
      localStorage.removeItem("lobbyId");
      toast.error(
        "The timer has run out. You have been removed from the lobby. " +
          "At least two users must save their choice for the event to be created"
      );

      history.push(`/Lobbies`);
    } catch (error) {
      toast.error(handleError(error));
      localStorage.removeItem("lobbyId");
      if (error.response.status == 401) {
        localStorage.clear();
        window.dispatchEvent(new Event("localstorage-update"));
      }
      history.push(`/Lobbies`);
    }
  };


  return (
    <>
      {/* Chat */}
      <Button
        onClick={() => handleMaximizeChat()}
        variant="contained"
        style={{
          textAlign: "center",
          position: "fixed",
          right: "1%",
          bottom: "1%",
          padding: "0.8%",
          zIndex: 998,
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
          width: "24%",
          height: "35%",
          padding: "0.5%",
          marginBottom: "0px",
          backgroundColor: "#FFFFFF", // should be equal to #86d4ee and rbga(0,0,0,0.2)
          position: "fixed",
          bottom: "1%",
          right: "0.5%",
          zIndex: 999,
          overflow: "auto",
          display: "block",
        }}
      >
        <Button
          onClick={() => handleMinimizeChat()}
          variant="contained"
          style={{
            cursor: "pointer",
            width: "10px",
            height: "auto",
            color: "#fff",
            textAlign: "center",
            position: "fixed",
            right: "1%",
            bottom: "31%",
            padding: "0px",
          }}
        >
          X
        </Button>
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
          <Button
            variant="contained"
            onClick={() => handleSendMessage(message)}
            style={{ height: "39px", width: "15%" }}
          >
            Send
          </Button>
        </div>
      </div>

      {/* Event + Lobby */}
      <BaseContainer>
        {/* Title */}
        <Grid container sx={{ marginBottom: 4 }}>
          <Grid item xs={8}>
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
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            borderRadius: "20px",
            padding: 4,
            display: "flex",
            justifyContent: "space-between",
            gap: 4,
            minHeight: "400px",
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
                    border: "2px solid black",

                    "& td, & th": {
                      borderBottom: "0px black solid", // works
                    },
                  }}
                >
                  <TableCell
                    sx={{
                      minWidth: 100,
                      width: "15%",
                      wordWrap: "break-word",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <Typography fontWeight="bold">
                      Player <InfoOutlinedIcon sx={{ color: "white" }} />
                    </Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      minWidth: 200,
                      width: "30%",
                      wordWrap: "break-word",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <Typography fontWeight="bold">
                      Sport
                      <Tooltip
                        arrow
                        title="To select a sport/s first click on the field labelled “Select Sports”. Then choose the sport/s you wish to select by clicking on them in the drop-down menu. To remove a selection, click on the sport/s again while in the drop-down menu. "
                      >
                        <InfoOutlinedIcon />
                      </Tooltip>
                    </Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      minWidth: 150,
                      width: "20%",
                      wordWrap: "break-word",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <Typography fontWeight="bold">
                      Time
                      <Tooltip
                        arrow
                        title="To add a time period first click on the field labelled “Select a date and time”. Second select the date in the calendar. Then select the time period from the scrollbar on the right. Finally click the “+” icon to add the time period to your selection. To remove a time period from your selection, click the “X” icon next to the time period you wish to remove. "
                      >
                        <InfoOutlinedIcon />
                      </Tooltip>
                    </Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      minWidth: 80,
                      width: "15%",
                      wordWrap: "break-word",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <Typography fontWeight="bold">
                      {String(Math.floor(lobby.timeRemaining / 60000)).padStart(
                        2,
                        "0"
                      )}
                      :
                      {String(
                        Math.floor((lobby.timeRemaining % 60000) / 1000)
                      ).padStart(2, "0")}
                      <Tooltip
                        arrow
                        title="When the timer hits 0 the lobby is closed and event is created based on the selection of people who locked their choice. To see what happens when less than two people locked their choice look at the FAQ."
                      >
                        <InfoOutlinedIcon />
                      </Tooltip>
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {members.map((user) => (
                  <TableRow
                    key={user.username}
                    sx={{
                      "& td, & th": {
                        background: "rgba(165, 109, 201, 0.1)",
                        borderTop: "2px black solid", // works
                        borderBottom: "2px black solid", // works
                      },
                    }}
                  >
                    {/* Player */}
                    <TableCell sx={{ borderLeft: "0px black solid" }}>
                      {user.username}
                    </TableCell>

                    {/* Sport Selection */}
                    <TableCell
                      sx={{
                        wordWrap: "break-word",
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
                    </TableCell>

                    {/* Time Selection */}
                    <TableCell
                      sx={{
                        wordWrap: "break-word",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {user.userId == userId ? (
                        <SelectDateAndTime
                          sx={{ maxWidth: "90%" }}
                          selectedDatesServer={user.selectedDates}
                          chosenDateServer={lobby.lobbyDecidedDate}
                          memberId={user.memberId}
                          hasLockedSelections={user.hasLockedSelections}
                        />
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
                    </TableCell>

                    {/* Save Button */}
                    <TableCell>
                      <FormGroup>
                        {user.userId === parseInt(userId) ? (
                          <FormControlLabel
                            control={<Switch />}
                            label={
                              <React.Fragment>
                                Save
                                <Tooltip
                                  arrow
                                  title="To save your selections, click the toggle switch labelled “Save”. This will lock your selections and you will not be able to change your selections. Once all members of the lobby have locked their selections the lobby will close, and an event will be created. If you would like to change a selection, first unlock by clicking the toggle switch labelled “Save” and you may change your selections. "
                                >
                                  <InfoOutlinedIcon />
                                </Tooltip>
                              </React.Fragment>
                            }
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
                            checked={user.hasLockedSelections}
                          />
                        )}
                      </FormGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>

          {/* Location */}
          <Grid
            item
            sx={{
              width: { xl: "30%", xs: "100%" },
              minHeight: { xl: "auto", xs: "600px" },
              boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.3)",
              position: "relative",
              background: "rgba(165, 109, 201, 0.1)",
              border: "2px black solid",
              overflow: "auto",
            }}
          >
            {/* Location title */}
            <Grid
              item
              sx={{
                padding: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h5" fontWeight={"bold"}>
                Location{" "}
                <Tooltip
                  arrow
                  title="Vote for a location below. If there is no Location to vote for you can suggest your own (first click on the map, then click on add Location)"
                >
                  <InfoOutlinedIcon />
                </Tooltip>
              </Typography>
            </Grid>

            {/* Region text */}
            <Grid
              item
              sx={{
                display: "flex",
                justifyContent: "left",
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
                flex: 1, 
              }}
            >
              <Grid
                style={{
                  width: "100%",
                  maxHeight: { lg: "500px", xs: "500px" },
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
              </Grid>
            </Grid>

            {/* Placeholder for Confirm Button */}
            <Grid
              item
              sx={{
                display: "flex",
                justifyContent: "center",
                height: "70px",
              }}
            ></Grid>

            {/* Location Voting */}
            <Grid
              item
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "left",
                mb: 2,
                ml: 1,
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
                            lobby={lobby}
                            members={members}
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
        </Grid>

        {/* Elements below  */}
        <Grid
          container
          direction="row"
          sx={{
            marginTop: 2,
            marginBottom: 16,
            display: "flex",
            justifyContent: "flex-end",
            gap: 6,
          }}
        >
          {/* Leave Button */}
          <Grid item>
            <Button
              variant="contained"
              onClick={() => handleLeaveLobbyByButton()}
              sx={{
                width: "fit-content",
                paddingLeft: "30px",
                paddingRight: "30px",
                height: "50px",
              }}
            >
              Leave
            </Button>
          </Grid>

          {/* Tutorial */}
          <Grid item xs={6}>
            <Accordion sx={{ color: "white", backgroundColor: "orange" }}>
              <AccordionSummary
                sx={{ height: "50px" }}
                expandIcon={<HelpOutline color="black" />}
              >
                <Typography> How to use this Lobby </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div
                  style={{
                    border: "3px solid #333",
                    padding: "10px",
                    marginBottom: "20px",
                    marginTop: "20px",
                    background: "secondary",
                    position: "relative",
                  }}
                >
                  <ol>
                    <HelpOutline
                      style={{ position: "absolute", top: 10, right: 10 }}
                    />

                    <li>Enter your preferences (in any order) for</li>
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
            <ShareButtons />
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
      </BaseContainer>
    </>
  );
};

export default Lobby;
