import React, { useEffect, useState } from "react";
import BaseContainer from "components/ui/BaseContainer";
import { Spinner } from "components/ui/Spinner";
import { useHistory } from "react-router-dom";
import { api, handleError } from "helpers/api";
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
  Grid,
} from "@mui/material";
import AddLocation from "helpers/AddLocation";
import ErrorMessage from "../ui/ErrorMessage";
import moment from "moment/moment";

const MyEvents = () => {
  // initializing variables and hooks need
  const history = useHistory();
  const userId = localStorage.getItem(`userId`);
  const [events, setEvents] = useState(null);
  const [error, setError] = useState(null);
  const [flyToLocation, setFlyToLocation] = useState(null);

  // fetch data from backend and save events in which the user is participating of in events
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(`/users/` + userId);

        const userEvents = response.data.eventGetDTOs;

        setEvents(userEvents);

        // logs for debugging can be deleted after proper testing
        // console.log("request to:", response.request.responseURL);
        // console.log("status code:", response.status);
        // console.log("status text:", response.statusText);
        // console.log("requested data:", response.data);
        // console.log(response);
      } catch (error) {
        console.error(`Something went wrong while fetching the events.`);
        setError(handleError(error));
      }
    }

    fetchData(); // Make initial request immediately
  }, []);

  const handleViewEventClick = (eventId) => {
    history.push("/Events/" + String(eventId));
  };

  // if user didn't join any event display disclaimer
  let noMyEventsDisclaimer = <Spinner />;
  if (!events || events.length === 0) {
    noMyEventsDisclaimer = (
      <p
        style={{
          fontWeight: "bold",
          textAlign: "center",
          fontSize: "1.2rem",
          color: "black",
        }}
      >
        Looks like you haven't joined any events yet. Don't miss out on the fun,
        browse and join existing events or create your own lobby to start an
        event!
      </p>
    );
  }

  return (
    <BaseContainer className="lobby">
      <Grid container spacing={2}>
        {/* Header */}
        <Grid item xs={12}>
          <Typography variant={"h3"}>My Events</Typography>
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
                            // fly to the location (TODO: Check as soon as Backend has implemented eventLocationDTO in EventGetDTO)
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
          {
            noMyEventsDisclaimer /* only displayed if for no events registered */
          }
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

export default MyEvents;
