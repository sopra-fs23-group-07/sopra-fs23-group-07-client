import React, { useEffect, useRef, useState } from "react";
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

const Events = () => {
  const history = useHistory();

  const urlRef = useRef(null); // ref for the URL input
  const [events, setEvents] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(`/events`);

        setEvents(response.data);

        console.log("request to:", response.request.responseURL);
        console.log("status code:", response.status);
        console.log("status text:", response.statusText);
        console.log("requested data:", response.data);

        console.log(response);
      } catch (error) {
        console.error(`Something went wrong while fetching the event.`);
        setError(handleError(error));
      }
    }

    fetchData(); // Make initial request immediately

    const intervalId = setInterval(fetchData, 10000); // Update data every second

    return () => clearInterval(intervalId); // Clear the interval when the component is unmounted
  }, []);

  const handleViewEventClick = (eventId) => {
    history.push("/Events/" + String(eventId));
  };

  let noEventsDisclaimer = <Spinner />;
  // if no event exist display disclaimer
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

  return (
    <BaseContainer className="lobby">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant={"h3"}>Events</Typography>
        </Grid>
        <Grid item xs={12} md={7}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography fontWeight="bold">Event name</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold">Canton</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold">Sport</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold">Number of users</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold">Date</Typography>
                  </TableCell>
                  {/*<TableCell>*/}
                  {/*    <Typography fontWeight="bold">Address</Typography>*/}
                  {/*</TableCell>*/}
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
                        {/*<TableCell>{event.eventLocationDTO.address}</TableCell>*/}
                        <TableCell>
                          <Button
                            onClick={() => handleViewEventClick(event.eventId)}
                          >
                            View
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
        <Grid item xs={12} md={5}>
          {events && <AddLocation events_passed={events} EventPage={true} />}
        </Grid>
      </Grid>
      <ErrorMessage error={error} onClose={() => setError(null)}/>
    </BaseContainer>
  );
};

export default Events;
