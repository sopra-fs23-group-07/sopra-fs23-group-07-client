import React, { useEffect, useState } from "react";
import BaseContainer from "components/ui/BaseContainer";
import { useHistory } from "react-router-dom";
import { api, handleError } from "helpers/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Tooltip,
  Grid,
  IconButton,
} from "@mui/material";
import AddLocation from "helpers/AddLocation";
import moment from "moment/moment";
import { toast } from "react-toastify";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

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
      } catch (error) {
        console.error(`Something went wrong while fetching the events.`);
        toast.error(handleError(error));
      }
    }

    fetchData().catch((err) => console.log(err)); // Make initial request immediately
  }, []);
  const handleViewEventClick = (eventId) => {
    history.push("/Events/" + String(eventId));
  };

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
                  border: "1px solid black",

                  "& td, & th": {
                    borderBottom: "0px black solid", // works
                  },
                }}
              >
                <TableCell sx={{ minWidth: 130, width: "15%" }}>
                  <Typography fontWeight="bold">Event Name</Typography>
                </TableCell>
                <TableCell sx={{ minWidth: 120, width: "25%" }}>
                  <Typography fontWeight="bold">Region</Typography>
                </TableCell>
                <TableCell sx={{ minWidth: 100, width: "15%" }}>
                  <Typography fontWeight="bold">Sport</Typography>
                </TableCell>
                <TableCell sx={{ minWidth: 60, width: "10%" }}>
                  <PeopleAltIcon sx={{ sizeHeight: "1.5em" }} />
                </TableCell>
                <TableCell sx={{ minWidth: 180, width: "25%" }}>
                  <Typography fontWeight="bold">Date</Typography>
                </TableCell>

                <TableCell sx={{ minWidth: 50, width: "10%" }} />
              </TableRow>
            </TableHead>

            <TableBody>
              {events && events.length > 0 ? (
                events.map((event) => {
                  return (
                    <TableRow
                      key={event.eventName}
                      sx={{
                        "& td, & th": {
                          background: "rgba(165, 109, 201, 0.1)",
                          borderTop: "1px black solid", // works
                          borderBottom: "1px black solid", // works
                        },
                      }}
                    >
                      <TableCell sx={{ borderLeft: "0px black solid" }}>
                        {event.eventName}
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Show on Map">
                          <IconButton
                            variant="contained"
                            onClick={() => {
                              setFlyToLocation({
                                latitude: event.eventLocationDTO.latitude,
                                longitude: event.eventLocationDTO.longitude,
                              });
                            }}
                          >
                            <LocationOnIcon />
                          </IconButton>
                        </Tooltip>
                        {" " + event.eventRegion}
                      </TableCell>
                      <TableCell>{event.eventSport}</TableCell>
                      <TableCell>
                        {event.eventParticipantsCount}/
                        {event.eventMaxParticipants}
                      </TableCell>
                      <TableCell>
                        {moment(event.eventDate).format("MMMM DD, YYYY h:mm A")}
                      </TableCell>

                      <TableCell sx={{ borderRight: "0px black solid" }}>
                        <Tooltip title="View Event Details">
                          <IconButton
                            onClick={() => handleViewEventClick(event.eventId)}
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    sx={{
                      maxWidth: "300px",
                      textAlign: "center",
                      verticalAlign: "middle",
                      borderBottom: "0px black solid", // works
                      fontWeight: "bold",
                    }}
                  >
                    Looks like you haven't joined any events yet.
                    <br />
                    Don't miss out on the fun, browse and join existing events
                    or create your own lobby to start an event!
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Grid>

        {/* Map */}
        <Grid
          item
          sx={{
            width: { xl: "30%", xs: "100%" },
            maxHeight: { lg: "500px", xs: "500px" },
            height: { xl: "auto", xs: "500px" },
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
        </Grid>
      </Grid>
    </BaseContainer>
  );
};

export default MyEvents;
