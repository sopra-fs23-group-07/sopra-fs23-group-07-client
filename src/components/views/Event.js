import React, { useEffect, useRef, useState } from "react";
import BaseContainer from "components/ui/BaseContainer";
import {
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { api, handleError } from "../../helpers/api";
import { useHistory, useParams } from "react-router-dom";
import AddLocation from "../../helpers/AddLocation";
import Grid from "@mui/material/Grid";
import moment from "moment";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { toast } from "react-toastify";
import ShareButtons from "../ui/ShareButtons";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Fireworks from "components/ui/Fireworks";


const Event = () => {
  const eventId = useParams().eventId;
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const history = useHistory(); // needed for linking

  const [event, setEvent] = useState([]);
  const [eventLocationDTO, setEventLocationDTO] = useState(null);
  const [isParticipant, setIsParticipant] = useState(false);
  const [isNewEvent, setIsNewEvent] = useState(false);

  const [open, setOpen] = useState(false); // state for the pop-up
  const urlRef = useRef(null); // ref for the URL input
  const [isCopied, setIsCopied] = useState(false);
  const [openLeaveDialog, setOpenLeaveDialog] = useState(false);

  const handleCopyClick = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(urlRef.current.value).catch(err => console.log(err));
      toast.success("Link copied");
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 5000); // Reset message after 5 seconds
    } else {
      urlRef.current.select();
      document.execCommand("copy");
      toast.success("Link copied");
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 5000); // Reset message after 5 seconds
    }
  };

  const handleJoinEvent = async () => {
    try {
      const requestBody = JSON.stringify({
        userId: userId,
        token: token,
      });
      await api.put(`/events/${eventId}/join`, requestBody);
      setIsParticipant(true);
    } catch (error) {
      if (error.response.status == 401) {
        localStorage.clear();
        window.dispatchEvent(new CustomEvent("localstorage-update"));
      }

      if (error.response.status === 500) {
        toast.error("Please log in before you join an event.");
      } else if (error.response.status === 404) {
        toast.error(handleError(error));
      } else {
        toast.error(handleError(error));
      }
    }
  };

  const handleLeaveEvent = async () => {
    if (
      event.eventParticipantsCount === 1 &&
      event.participantDTOs.some((p) => p.userId === Number(userId))
    ) {
      setOpenLeaveDialog(true);
    } else {
      leaveEvent().catch(err => console.log(err));
    }
  };

  const leaveEvent = async () => {
    try {
      const requestBody = JSON.stringify({
        userId: userId,
        token: token,
      });

      if (
        event.eventParticipantsCount === 1 &&
        event.participantDTOs.some((p) => p.userId === Number(userId))
      ) {
        // Call to delete the event
        await api.delete(`/events/${eventId}/delete`);
        history.push("/events");
      } else {
        await api.put(`/events/${eventId}/leave`, requestBody);
      }

      setIsParticipant(false);
    } catch (error) {
      if (error.response.status == 401) {
        localStorage.clear();
        window.dispatchEvent(new CustomEvent("localstorage-update"));
      }

      if (error.response.status === 500) {
        toast.error("Please log in before you leave an event.");
      } else if (error.response.status === 404) {
        toast.error(handleError(error));
      } else {
        toast.error(handleError(error));
      }
    }
  };

  useEffect(() => {
    let errorCounter = 0; // initialize error counter
    const fetchData = async () => {


      try {
        const response = await api.get("/events/" + eventId);
        setEvent(response.data);
        setEventLocationDTO(response.data.eventLocationDTO);
        setIsNewEvent(response.data.isNewEvent);

        const userIds = response.data.participantDTOs.map(
          (participant) => participant.userId
        );
        setIsParticipant(userIds.includes(Number(userId)));
      } catch (error) {
        if (error.response.status === 404) {
          errorCounter++; // increment the error counter if the error is 404
          if (errorCounter > 3) {
            toast.error("This event does not exist anymore.");
            history.push("/events");
          }
        }  else {
          toast.error(handleError(error));
        }
      }
    };
    fetchData().catch(err => console.log(err));;

    const intervalId = setInterval(fetchData, 1000); // Update data every second

    return () => clearInterval(intervalId); // Clear the interval when the component is unmounted
  }, [eventId]);


  return (
    <BaseContainer>
      {/* Title */}
      {isNewEvent && <Fireworks/>}
      <Grid container sx={{ marginBottom: 4 }}>
        <Grid item md={8} xs={12}>
          <Typography
            variant="h3"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: { md: "left", xs: "center" },
              marginLeft: { md: 4, xs: 0 },
              color: "white",
            }}
          >
            Event Details
          </Typography>
        </Grid>
        <Grid
          item
          md={4}
          xs={12}
          sx={{
            display: "flex",
            justifyContent: { md: "flex-end", xs: "center" },
            paddingRight: { md: 4, xs: 0 },
          }}
        >
          <Button variant="contained" onClick={() => setOpen(true)}>
            {/* Invite friends */}
            Share Event with your Friends!
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
          sx={{ flexGrow: 1, boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.3)" }}
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
                    background: "rgba(165, 109, 201, 0.1)",
                    borderTop: "1px black solid", // works
                    borderBottom: "1px black solid", // works
                  },
                }}
              >
                <TableCell>
                  <Typography fontWeight="bold">Event Name</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{event.eventName}</Typography>
                </TableCell>
              </TableRow>
              <TableRow
                sx={{
                  "& td, & th": {
                    background: "rgba(165, 109, 201, 0.1)",
                    borderTop: "1px black solid", // works
                    borderBottom: "1px black solid", // works
                  },
                }}
              >
                <TableCell>
                  <Typography fontWeight="bold">Sport</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{event.eventSport}</Typography>
                </TableCell>
              </TableRow>
              <TableRow
                sx={{
                  "& td, & th": {
                    background: "rgba(165, 109, 201, 0.1)",
                    borderTop: "1px black solid", // works
                    borderBottom: "1px black solid", // works
                  },
                }}
              >
                <TableCell>
                  <Typography fontWeight="bold">Date</Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {moment(event.eventDate).format("MMMM DD, YYYY h:mm A")}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow
                sx={{
                  "& td, & th": {
                    background: "rgba(165, 109, 201, 0.1)",
                    borderTop: "1px black solid", // works
                    borderBottom: "1px black solid", // works
                  },
                }}
              >
                <TableCell>
                  <Typography fontWeight="bold">Region</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{event.eventRegion}</Typography>
                </TableCell>
              </TableRow>
              <TableRow
                sx={{
                  "& td, & th": {
                    background: "rgba(165, 109, 201, 0.1)",
                    borderTop: "1px black solid", // works
                    borderBottom: "1px black solid", // works
                  },
                }}
              >
                <TableCell>
                  <Typography fontWeight="bold">Location</Typography>
                </TableCell>
                <TableCell>
                  {event && event.eventLocationDTO && (
                    <Typography>{event.eventLocationDTO.address}</Typography>
                  )}
                </TableCell>
              </TableRow>
              <TableRow
                sx={{
                  "& td, & th": {
                    background: "rgba(165, 109, 201, 0.1)",
                    borderTop: "1px black solid", // works
                    borderBottom: "1px black solid", // works
                  },
                }}
              >
                <TableCell>
                  <Typography fontWeight="bold">Participants</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={"bold"}>
                    {event.eventParticipantsCount}/{event.eventMaxParticipants}
                  </Typography>
                  {event.participantDTOs &&
                    event.participantDTOs.map((participantDTO) => (
                      <Typography>
                        <Link
                            href={`/Profile/${participantDTO.userId}`}
                            title={"This opens the profile page in a new tab"}
                            sx={{
                              color: "black",
                              textDecoration: "none",
                            }}
                            onClick={(e) => {
                              if (!userId || !token) {
                                e.preventDefault();
                                toast.error('Please login to check this profile');
                              }
                            }}
                        >
                          <AccountCircleIcon fontSize={"inherit"} />
                          {" " + participantDTO.username}
                        </Link>

                      </Typography>
                    ))}
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </Grid>

        {/* Map */}
        <Grid
          item
          sx={{
            width: { lg: "30%", xs: "100%" },
            maxHeight: { lg: "500px", xs: "500px" },
            height: { lg: "auto", xs: "500px" },
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.3)",
            position: "relative",
          }}
        >
          {eventLocationDTO && (
            <AddLocation
              eventLocationDTO={eventLocationDTO}
              EventPage={false}
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            />
          )}
        </Grid>
      </Grid>

      {/* Join and Leave Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 8,
          marginTop: 2,
          marginBottom: 4,
        }}
      >
        <Button
          variant="contained"
          color="success"
          size="large"
          className="event button"
          onClick={() => handleJoinEvent()}
          disabled={
            isParticipant ||
            event.eventParticipantsCount >= event.eventMaxParticipants
          }
        >
          Join
        </Button>
        <Button
          variant="contained"
          color="error"
          size="large"
          className="event button"
          onClick={() => handleLeaveEvent()}
          disabled={!isParticipant}
        >
          Leave
        </Button>
      </Box>

      {/* pop-up */}
      <Dialog
        maxWidth="md"
        fullWidth
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle>
          <Typography>Invite Friends</Typography>
          <Typography sx={{ ml: 1 }}>Copy URL</Typography>
        </DialogTitle>
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
          <ShareButtons/>
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

      <Dialog open={openLeaveDialog} onClose={() => setOpenLeaveDialog(false)}>
        <DialogTitle>
          As you are the only participant the event will be deleted if you
          leave. Are you sure you want to leave the event?
        </DialogTitle>
        <DialogActions>
          <Button variant="contained" onClick={() => setOpenLeaveDialog(false)}>
            No
          </Button>
          <Button variant="contained" onClick={leaveEvent}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </BaseContainer>
  );
};

export default Event;
