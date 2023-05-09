import React, { useEffect, useRef, useState } from "react";
import BaseContainer from "components/ui/BaseContainer";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import "styles/views/Event.scss";
import { api, handleError } from "../../helpers/api";
import { useParams } from "react-router-dom";
import AddLocation from "../../helpers/AddLocation";
import Grid from "@mui/material/Grid";
import moment from "moment";
import LaunchIcon from "@mui/icons-material/Launch";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {toast} from "react-toastify";

const Event = () => {
  const eventId = useParams().eventId;
  const userId = localStorage.getItem("userId");

  const [event, setEvent] = useState([]);
  const [eventLocationDTO, setEventLocationDTO] = useState(null);
  const [isParticipant, setIsParticipant] = useState(false);

  const [open, setOpen] = useState(false); // state for the pop-up
  const urlRef = useRef(null); // ref for the URL input
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(urlRef.current.value);
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
      });
      await api.put(`/events/${eventId}/join`, requestBody);
      setIsParticipant(true);
    } catch (error) {
      // setError(handleError(error));
      //   console.log(error);

      if (error.response.status === 500) {
        toast.error("Please log in before you join an event.");
      } else if (error.response.status === 404) {
        toast.error("You already joined this event.");
      } else {
        toast.error("Something went wrong.");
      }
    }
  };

  const handleLeaveEvent = async () => {
    try {
      const requestBody = JSON.stringify({
        userId: userId,
      });
      await api.put(`/events/${eventId}/leave`, requestBody);
      setIsParticipant(false);
    } catch (error) {
      // setError(handleError(error));
      //   console.log(error);
      if (error.response.status === 500) {
        toast.error("Please log in before you leave an event.");
      } else if (error.response.status === 404) {
        toast.error("You already left this event.");
      } else {
        toast.error("Something went wrong.");
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/events/" + eventId);
        setEvent(response.data);
        setEventLocationDTO(response.data.eventLocationDTO);

        console.log("eventLocationDTO: ", eventLocationDTO); // This will log the old value
        console.log("request to:", response.request.responseURL);
        console.log("status code:", response.status);
        console.log("status text:", response.statusText);
        console.log("requested data:", response.data);
        console.log(response);

        // Log the updated value of eventLocationDTO
        console.log(
          "updated eventLocationDTO: ",
          response.data.eventLocationDTO
        );
        const userIds = response.data.participantDTOs.map(
          (participant) => participant.userId
        );
        console.log(userIds);
        setIsParticipant(userIds.includes(String(userId)));
      } catch (error) {
        toast.error(handleError(error));
      }
    };
    fetchData();

    const intervalId = setInterval(fetchData, 1000); // Update data every second

    return () => clearInterval(intervalId); // Clear the interval when the component is unmounted
  }, [eventId]);

  return (
    <BaseContainer className="event">
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Typography variant="h2">Event Details</Typography>
        </Grid>
        <Grid item xs={12} md={7}>
          <TableContainer className="table-container" component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography fontWeight="bold">Event Name</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{event.eventName}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography fontWeight="bold">Sport</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{event.eventSport}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography fontWeight="bold">Date</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>
                      {moment(event.eventDate).format("MMMM DD, YYYY h:mm A")}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography fontWeight="bold">Region</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{event.eventRegion}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography fontWeight="bold">Location</Typography>
                  </TableCell>
                  <TableCell>
                    {event && event.eventLocationDTO && (
                      <Typography>{event.eventLocationDTO.address}</Typography>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography fontWeight="bold">Participants</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={"bold"}>
                      {event.eventParticipantsCount}/
                      {event.eventMaxParticipants}
                    </Typography>
                    {event.participantDTOs &&
                      event.participantDTOs.map((participantDTO) => (
                        <Typography>
                          <Link
                            href={`/Profile/${participantDTO.userId}`}
                            target={"_blank"}
                            title={"This opens the profile page in a new tab"}
                          >
                            <LaunchIcon fontSize={"inherit"} />
                            {participantDTO.username}
                          </Link>
                        </Typography>
                      ))}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody></TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} md={5}>
          {eventLocationDTO && (
            <AddLocation
              eventLocationDTO={eventLocationDTO}
              EventPage={false}
            />
          )}
        </Grid>

        <Grid container xs={7} md={7} direction="row" justifyContent={"center"}>
          <Button
            variant="contained"
            color="success"
            size="large"
            className="event button"
            onClick={() => handleJoinEvent()}
            // disabled={isParticipant || event.eventParticipantsCount === event.eventMaxParticipants}
          >
            Join
          </Button>
          <Button
            variant="contained"
            color="error"
            size="large"
            className="event button"
            onClick={() => handleLeaveEvent()}
            // disabled={!isParticipant}
          >
            Leave
          </Button>
        </Grid>

        <Grid container xs={5} md={5} direction="row" justifyContent="center">
          <Button variant="contained" onClick={() => setOpen(true)}>
            Share Event with your Friends!
          </Button>
          {/* pop-up */}
          <Dialog
            maxWidth="md"
            fullWidth
            open={open}
            onClose={() => setOpen(false)}
          >
            <DialogTitle>Copy Event URL</DialogTitle>
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
        </Grid>
      </Grid>
    </BaseContainer>
  );
};

export default Event;
