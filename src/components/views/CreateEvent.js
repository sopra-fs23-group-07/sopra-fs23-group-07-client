// EventName
// Sport
// DateTime
// Location
// Region
// MaxNumberOfParticipants

import React, { useState } from "react";
import BaseContainer from "components/ui/BaseContainer";
import { useHistory } from "react-router-dom";
import { api, handleError } from "helpers/api";
import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  InputLabel,
} from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import "styles/views/CreateLobby.scss";
import ErrorMessage from "../ui/ErrorMessage";
import SelectDateAndTime from "../../helpers/SelectDateAndTime";
import { DateTimePicker } from "@mui/x-date-pickers";
import AddLocation from "helpers/AddLocation";
import moment from "moment";
import dayjs from "dayjs";

const CreateEvent = () => {
  // Set up state variables for each input field.
  const [eventName, setEventName] = useState("");
  const [selectedSport, setSelectedSport] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [location, setLocation] = useState("");
  const [region, setRegion] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("");
  // Set up other variables
  const history = useHistory();
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("userId");

  const handleCreateEventClick = async () => {
    try {
      // Validate the input fields.
      if (
        !eventName ||
        !selectedSport ||
        // !eventDate ||
        // !location ||
        !region ||
        !maxParticipants ||
        isNaN(maxParticipants)
      ) {
        // console.log(JSON.stringify(eventDate)); // delete when done
        setError("Please fill in all fields with valid data.");
        return;
      }

      // send event to backend (TODO: Make sure all are strings )
      const requestBody = JSON.stringify({
        eventName: eventName,
        // eventLocation: location,

        eventLocationDTO: {
          address: "Bakerstreet 1, 8000 Zürich",
          longitude: 8.5483395,
          latitude: 47.368919500000004,
        },
        eventDate: eventDate,
        // eventDate: "2023-04-01T15:30:00",
        eventSport: selectedSport,
        eventRegion: region,
        eventMaxParticipants: maxParticipants, // integer
        eventCreator: userId, // long
      });

      const response = await api.post("/events", requestBody);

      // for debugging only delete afterwards
      console.log(response.data);

      // after event is generated bring user to event page.
      history.push(`/Events/${response.data.eventId}`);
    } catch (error) {
      setError(handleError(error));
    }
  };

  const sports = [
    "Basketball",
    "Soccer",
    "Tennis",
    "Swimming",
    "Golf",
    "Volleyball",
    "Cricket",
    "Rugby",
    "Hockey",
  ];

  const handleDateChange = (date) => {
    if (date !== null) {
      // Convert the date to the desired format
      // const formattedDate = date.toISOString().slice(0, 16);

      // const formattedDate = date;

      const formattedDate = moment(date).format("YYYY-MM-DDTHH:mm:ss");

      // const formattedDate = dayjs(date).format("YYYY-MM-DDTHH:mm:ss");
      console.log("Reached this POINT", formattedDate);

      // const year = date.getFullYear();
      // const month = (date.getMonth() + 1).toString().padStart(2, "0");
      // const day = date.getDate().toString().padStart(2, "0");
      // const hour = date.getHours().toString().padStart(2, "0");
      // const minute = date.getMinutes().toString().padStart(2, "0");
      // const formattedDate = `${year}-${month}-${day}T${hour}:${minute}`;

      // Store the formatted date in the eventDate state
      setEventDate(formattedDate);
    } else {
      setEventDate(null);
    }
  };

  return (
    <>
      <BaseContainer className="createLoby">
        <Grid item xs={12}>
          <Typography variant={"h3"}>Create Event</Typography>
        </Grid>
        <Paper
          sx={{
            paddingY: 10,
            paddingX: 4,
            mt: 2,
            maxWidth: 1200,
            flexGrow: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              margin: "0 auto",
            }}
          >
            {/* Event Name */}
            <Typography variant={"h5"}>Select Event Name:</Typography>
            <TextField
              sx={{ mt: 2, mb: 4 }}
              id="eventName"
              placeholder="Enter Event Name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />

            {/* Sport */}
            <Typography variant={"h5"}>Select Sport:</Typography>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel>Select a sport</InputLabel>
              <Select
                value={selectedSport}
                label="Select a sport"
                onChange={(e) => setSelectedSport(e.target.value)}
              >
                {sports.map((sport) => (
                  <MenuItem key={sport} value={sport}>
                    {sport}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Select Time */}
            {/* TODO: Implement time picking */}
            <Typography variant={"h5"}>Select Time:</Typography>
            {/* <DateTimePicker
              label="Select date and time"
              value={eventDate}
              onChange={handleDateChange}

              // onChange={(date) => setEventDate(date)}
              // dateFormat="MMMM d, yyyy h:mm aa"
              // renderInput={(params) => <TextField {...params} />}
            /> */}
            <DateTimePicker
              label="Select event date and time"
              // inputVariant="outlined"
              // ampm={false}
              // disablePast={true}
              // format="yyyy-MM-dd HH:mm"
              value={dayjs(eventDate)}
              onChange={handleDateChange}
              // onChange={(date) => setEventDate(date)}
            />

            {/* Region */}
            <Typography variant={"h5"}>Choose Region:</Typography>
            <Box sx={{ minWidth: 240 }}>
              <FormControl fullWidth>
                <InputLabel>Select a region</InputLabel>
                <Select
                  sx={{ mt: 2, mb: 4 }}
                  label="Select a region"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                >
                  <MenuItem value="Aargau">Aargau</MenuItem>
                  <MenuItem value="Appenzell Innerrhoden">
                    Appenzell Innerrhoden
                  </MenuItem>
                  <MenuItem value="Appenzell Ausserrhoden">
                    Appenzell Ausserrhoden
                  </MenuItem>
                  <MenuItem value="Bern">Bern</MenuItem>
                  <MenuItem value="Basel-Landschaft">Basel-Landschaft</MenuItem>
                  <MenuItem value="Basel-Stadt">Basel-Stadt</MenuItem>
                  <MenuItem value="Fribourg">Fribourg</MenuItem>
                  <MenuItem value="Geneva">Geneva</MenuItem>
                  <MenuItem value="Glarus">Glarus</MenuItem>
                  <MenuItem value="Graubünden">Graubünden</MenuItem>
                  <MenuItem value="Jura">Jura</MenuItem>
                  <MenuItem value="Luzern">Luzern</MenuItem>
                  <MenuItem value="Neuchâtel">Neuchâtel</MenuItem>
                  <MenuItem value="Nidwalden">Nidwalden</MenuItem>
                  <MenuItem value="Obwalden">Obwalden</MenuItem>
                  <MenuItem value="St. Gallen">St. Gallen</MenuItem>
                  <MenuItem value="Schaffhausen">Schaffhausen</MenuItem>
                  <MenuItem value="Solothurn">Solothurn</MenuItem>
                  <MenuItem value="Schwyz">Schwyz</MenuItem>
                  <MenuItem value="Thurgau">Thurgau</MenuItem>
                  <MenuItem value="Ticino">Ticino</MenuItem>
                  <MenuItem value="Uri">Uri</MenuItem>
                  <MenuItem value="Vaud">Vaud</MenuItem>
                  <MenuItem value="Valais">Valais</MenuItem>
                  <MenuItem value="Zug">Zug</MenuItem>
                  <MenuItem value="Zürich">Zürich</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* MaxParticipants */}
            <Typography variant={"h5"}>
              Enter maximum number of participants:
            </Typography>
            <TextField
              type={"number"}
              sx={{ mt: 2, mb: 4 }}
              id="maxParticipants"
              placeholder="Enter Maximum Number of Participants"
              value={maxParticipants}
              onChange={(e) => setMaxParticipants(e.target.value)}
            />

            {/* TODO: Add Choose Location */}
            <Typography variant={"h5"}>Select Location:</Typography>

            {/* Button to create event */}
            <Button
              variant="contained"
              sx={{ m: 2, p: 2, justifySelf: "center", alignSelf: "center" }}
              onClick={() => handleCreateEventClick()}
              startIcon={<AddBoxOutlinedIcon />}
            >
              Create Lobby
            </Button>
          </Box>

          <ErrorMessage error={error} onClose={() => setError(null)} />
        </Paper>
      </BaseContainer>
    </>
  );
};

export default CreateEvent;
