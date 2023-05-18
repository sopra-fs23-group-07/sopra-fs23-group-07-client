import React, { useEffect, useState } from "react";
import BaseContainer from "components/ui/BaseContainer";
import { Spinner } from "components/ui/Spinner";
import { useHistory } from "react-router-dom";
import { api, handleError } from "helpers/api";
import {
  Button,
  Paper,
  Box,
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
import moment from "moment/moment";
import { toast } from "react-toastify";

const MyEvents = () => {
  // initializing variables and hooks need
  const history = useHistory();
  const userId = localStorage.getItem(`userId`);
  const [events, setEvents] = useState(null);
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
        toast.error(handleError(error));
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
            My Events
          </Typography>
        </Grid>

        <Grid item xs={4}>
           {/* Stats */}
           <Typography
           variant="h6"
           sx={{
             display: "flex",
             alignItems: "center",
             justifyContent: "right",
             paddingRight: 4,
             paddingTop: 2,
             color: "white",
           }}
           >
            You are currently part of {events ? events.length : 0} events
          </Typography>
        </Grid>
      </Grid>

      {/* Visible Box */}
      <Box
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          borderRadius: "20px",
          padding: 4,
          display: "flex",
          justifyContent: "space-between",
          gap: 4,
        }}
      >
        {/* Table Box */}
        <Box sx={{ flexGrow: 1, boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.3)" }}>
          {/* Table */}
          <Table sx={{ background: "white" }}>
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
                        {moment(event.eventDate).format("MMMM DD, YYYY h:mm A")}
                      </TableCell>

                      <TableCell>
                        <Button
                          onClick={() => handleViewEventClick(event.eventId)}
                        >
                          View
                        </Button>
                        <Button
                        variant="contained"
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
              {
                noMyEventsDisclaimer /* only displayed if for no events registered */
              }
            </TableBody>
          </Table>
        </Box>

        {/* Map */}
        <Box
          sx={{
            width: "30%",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.3)",
            position: "relative",
          }}
        >
          {events && (
            <AddLocation
              flyToLocation={flyToLocation}
              events_passed={events}
              EventPage={true}
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            />
          )}
        </Box>
      </Box>
    </BaseContainer>
  );
};

export default MyEvents;
