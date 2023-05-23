import React, { useEffect, useState } from "react";
import BaseContainer from "components/ui/BaseContainer";
import { useHistory } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";
import AddLocation from "helpers/AddLocation";
import { api, handleError } from "helpers/api";
import moment from "moment/moment";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";
import { RenderActions } from "components/ui/RenderActions";
import { CustomNoRowsOverlay } from "components/ui/CustomNoRowsOverlay";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Spinner from "../ui/Spinner";

// page where all events are listed
const Events = () => {
  // initializing variables and hooks need
  const history = useHistory();
  const [events, setEvents] = useState(null);
  const [flyToLocation, setFlyToLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  const handleCreateEventClick = () => {
    if (
      localStorage.getItem("token") !== "null" &&
      localStorage.getItem("token")
    ) {
      history.push("/CreateEvent");
    } else {
      toast.error("You need to be logged in to create an event");
    }
  };

  // fetch data from backend (each second) and save all events
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(`/events`);
        setEvents(response.data);
        setIsLoading(false);

      } catch (error) {
        setIsLoading(false);
        toast.error(handleError(error));
      }
    }

    fetchData().catch((err) => console.log(err)); // Make initial request immediately

    const intervalId = setInterval(fetchData, 10000); // Update data every second

    return () => clearInterval(intervalId); // Clear the interval when the component is unmounted
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 50,
    },
    {
      field: "eventName",
      headerName: "Event Name",
      width: 120,
      flex: 1,
    },
    {
      field: "eventRegion",
      headerName: "Region",
      width: 100,
      flex: 1,
    },
    {
      field: "eventSport",
      headerName: "Sport",
      width: 100,
      flex: 1,
    },
    {
      field: "eventParticipantsCount",
      headerName: <PeopleAltIcon sx={{ sizeHeight: "1.5em" }} />,
      width: 100,
      flex: 1,
    },
    {
      field: "eventDate",
      headerName: "Date",
      width: 180,
      flex: 2,
      valueGetter: (params) => moment(params.row.eventDate).format("MMMM DD, YYYY HH:mm"),
      sortable: false,
      filterable: false,
    },
    {
      field: "actions",
      headerName: " ",
      width: 100,
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: (props) => {
        return (
          <RenderActions
            eventId={props.id}
            flyToLocation={flyToLocation}
            setFlyToLocation={setFlyToLocation}
            latitude={props.row.eventLatitude}
            longitude={props.row.eventLongitude}
          />
        );
      },
    },
  ];

  let rows;

  if (events) {
    rows = events.map((event) => {
      return {
        id: event.eventId,
        eventName: event.eventName,
        eventRegion: event.eventRegion,
        eventSport: event.eventSport,
        eventParticipantsCount:
          String(event.eventParticipantsCount) +
          "/" +
          String(event.eventMaxParticipants),
        eventMaxParticipants: event.eventMaxParticipants,
        eventDate: event.eventDate,
        eventLatitude: event.eventLocationDTO.latitude,
        eventLongitude: event.eventLocationDTO.longitude,
      };
    });
  } else {
    rows = [];
  }

  return (
    <BaseContainer>
      {/* Title */}
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
            Events
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
          <Button
            variant="contained"
            startIcon={<AddBoxOutlinedIcon />}
            onClick={() => handleCreateEventClick()}
          >
            Create New Event
          </Button>
        </Grid>
      </Grid>

      {/* Visible Box */}
      <Grid
        container
        xs={12}
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          borderRadius: "20px",
          padding: 4,
          minHeight: "400px",
        }}
      >
        {/* Table Box */}
        <Grid
          item
          md={8}
          xs={12}
          sx={{
            paddingRight: { md: 2, xs: 0 },
            paddingBottom: { md: 0, xs: 2 },
          }}
        >
          {/* Table */}
          {isLoading ? <Spinner /> :
            <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
              columns: {
                columnVisibilityModel: {
                  id: false,
                },
              },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
            slots={{
              noRowsOverlay: CustomNoRowsOverlay,
            }}
            //sx only used for text wrapping and header styling
            sx={{
              background: "white",
              height: "375px",
              boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.3)",

              "& .MuiDataGrid-columnHeaderTitle": {
                whiteSpace: "normal",
                lineHeight: "normal",
                fontWeight: "bold",
              },
              "& .MuiDataGrid-columnHeader": {
                borderBottom: "1px black solid !important",
              },
              "& .MuiDataGrid-columnHeaders": {
                border: "0px solid black !important",
                maxHeight: "168px !important",
              },
              '& .MuiDataGrid-cell': {
                background: 'rgba(165, 109, 201, 0.1) !important',
                borderTop: '0px black solid !important',
                borderBottom: '1px black solid !important',
              },
            }}
          />}
        </Grid>

        {/* Map */}
        <Grid
          item
          md={4}
          xs={12}
          sx={{
            maxHeight: { md: "500px", xs: "500px" },
            height: { md: "auto", xs: "500px" },
            paddingLeft: { md: 2, xs: 0 },
            paddingTop: { md: 0, xs: 2 },
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

export default Events;
