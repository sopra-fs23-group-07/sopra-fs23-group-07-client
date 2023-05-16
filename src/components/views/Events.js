import React, { useEffect, useState} from "react";
import BaseContainer from "components/ui/BaseContainer";
import { useHistory } from "react-router-dom";
import {
  Button,
  Paper,
  Typography,
} from "@mui/material";
import AddLocation from "helpers/AddLocation";
import { api, handleError } from "helpers/api";
import Grid from "@mui/material/Grid";
import moment from "moment/moment";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import {toast} from "react-toastify";
import { DataGrid } from '@mui/x-data-grid';
import { RenderActions } from "components/ui/RenderActions";
import {CustomNoRowsOverlay} from "components/ui/CustomNoRowsOverlay";

// page where all events are listed
const Events = () => {
  // initializing variables and hooks need
  const history = useHistory();
  const [events, setEvents] = useState(null);
  const [flyToLocation, setFlyToLocation] = useState(null);

  const handleCreateEventClick = () => {
    if (
      (localStorage.getItem("token") !== "null") &&
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

      } catch (error) {
        toast.error(handleError(error));
      }
    }

    fetchData(); // Make initial request immediately

    const intervalId = setInterval(fetchData, 10000); // Update data every second

    return () => clearInterval(intervalId); // Clear the interval when the component is unmounted
  }, []);

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width:50
    },
    {
      field: 'eventName',
      headerName : 'Event Name',
      width:120,
      flex:1,
    },
    {
      field: 'eventRegion',
      headerName: 'Region',
      width:100,
      flex: 1
    },
    {
      field: 'eventSport',
      headerName: 'Sport',
      width:100
    },
    {
      field: 'eventParticipantsCount',
      headerName: 'Number of\nParticipants',
      width:100,
      flex: 1
    },
    {
      field: 'eventDate',
      headerName: 'Date',
      width :180,
      flex: 2
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
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
    rows = events.map(event => {
      return {
        id: event.eventId,
        eventName: event.eventName,
        eventRegion: event.eventRegion,
        eventSport: event.eventSport,
        eventParticipantsCount: String(event.eventParticipantsCount) + "/" + String(event.eventMaxParticipants),
        eventMaxParticipants: event.eventMaxParticipants,
        eventDate: moment(event.eventDate).format("MMMM DD, YYYY h:mm A"),
        eventLatitude: event.eventLocationDTO.latitude,
        eventLongitude: event.eventLocationDTO.longitude
      };
    });
  } else {
    rows = [];
  }


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
        <Grid item xs={12} md={8} >
          <Paper sx={{height:"100%"}}>
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
                "& .MuiDataGrid-columnHeaderTitle": {
                  whiteSpace: "normal",
                  lineHeight: "normal",
                  fontWeight: "bold"

                },
                "& .MuiDataGrid-columnHeader": {
                  // Forced to use important since overriding inline styles
                  height: "unset !important"
                },
                "& .MuiDataGrid-columnHeaders": {
                  // Forced to use important since overriding inline styles
                  maxHeight: "168px !important"
                }
              }}
              />
          </Paper>
        </Grid>
        {/* Map */}
        <Grid item xs={12} md={4}>
          {events && (
            <AddLocation
              flyToLocation={flyToLocation}
              events_passed={events}
              EventPage={true}
            />
          )}
        </Grid>
      </Grid>
    </BaseContainer>
  );
};

export default Events;
