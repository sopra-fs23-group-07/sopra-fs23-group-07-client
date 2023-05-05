import React, { useEffect, useState } from "react";
import BaseContainer from "components/ui/BaseContainer";
import { Spinner } from "components/ui/Spinner";
import { useHistory } from "react-router-dom";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import "styles/views/Events.scss";
import AddLocation from "helpers/AddLocation";
import { api, handleError } from "helpers/api";
import Grid from "@mui/material/Grid";
import moment from "moment/moment";
import ErrorMessage from "../ui/ErrorMessage";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

// page where all events are listed
const Events = () => {
  // initializing variables and hooks need
  const history = useHistory();
  const [events, setEvents] = useState(null);
  const [error, setError] = useState(null);
  const [flyToLocation, setFlyToLocation] = useState(null);

  const handleCreateEventClick = () => {
    if (
      !(localStorage.getItem("token") === "null") &&
      localStorage.getItem("token")
    ) {
      history.push("/CreateEvent");
    } else {
      setError("You need to be logged in to create an event");
    }
  };

  const handleViewEventClick = (eventId) => {
    history.push("/Events/" + String(eventId));
  };

  // if no event exist display disclaimer
  let noEventsDisclaimer = <Spinner />;
  if (!events || events.length === 0) {
    noEventsDisclaimer = (
      <p
        style={{
          fontWeight: "bold",
          textAlign: "center",
          fontSize: "1.2rem",
          color: "black",
        }}
      >
        Currently no events available! <br /> Go to Lobbies to start creating
        one.
      </p>
    );
  }

  // fetch data from backend (each second) and save all events
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(`/events`);

        setEvents(response.data);

        // logs for debugging can be deleted after proper testing
        // console.log("request to:", response.request.responseURL);
        // console.log("status code:", response.status);
        // console.log("status text:", response.statusText);
        // console.log("requested data:", response.data);
        // console.log(response);
      } catch (error) {
        console.error(`Something went wrong while fetching the event.`);
        setError(handleError(error));
      }
    }

    fetchData(); // Make initial request immediately

    const intervalId = setInterval(fetchData, 10000); // Update data every second

    return () => clearInterval(intervalId); // Clear the interval when the component is unmounted
  }, []);

  return (
    <BaseContainer className="lobby">
      <Grid container spacing={2}>
        {/* Header */}
        <Grid item xs={12}>
          <Typography variant={"h3"}>Events</Typography>
        </Grid>
        {/* Create Event Button */}
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Button
            variant="contained"
            startIcon={<AddBoxOutlinedIcon />}
            onClick={() => handleCreateEventClick()}
          >
            Create New Event
          </Button>
        </Grid>
        <Grid item xs={12} md={7}>
          {/* Table */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography fontWeight="bold">Event name</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold">Region</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold">Sport</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold">
                      Number of participants
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold">Date</Typography>
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {events &&
                  events.map((event) => {
                    return (
                      <TableRow key={event.eventName}>
                        <TableCell>{event.eventName}</TableCell>
                        <TableCell>{event.eventRegion}</TableCell>
                        <TableCell>{event.eventSport}</TableCell>
                        <TableCell>
                          {event.eventParticipantsCount}/
                          {event.eventMaxParticipants}
                        </TableCell>
                        <TableCell>
                          {moment(event.eventDate).format(
                            "MMMM DD, YYYY h:mm A"
                          )}
                        </TableCell>
                        <TableCell>
                          <Button
                            onClick={() => handleViewEventClick(event.eventId)}
                          >
                            View
                          </Button>
                          <Button
                            // fly to the location
                            onClick={() => {
                              setFlyToLocation({
                                latitude: event.eventLocationDTO.latitude,
                                longitude: event.eventLocationDTO.longitude,
                              });
                            }}
                          >
                            Show on Map
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          {noEventsDisclaimer /* only displayed if no events exist*/}
        </Grid>
        {/* Map */}
        <Grid item xs={12} md={5}>
          {events && (
            <AddLocation
              flyToLocation={flyToLocation}
              events_passed={events}
              EventPage={true}
            />
          )}
        </Grid>
      </Grid>
      <ErrorMessage error={error} onClose={() => setError(null)} />
    </BaseContainer>
  );
};

export default Events;
