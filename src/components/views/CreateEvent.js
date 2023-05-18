import React, { useEffect, useState } from "react";
import BaseContainer from "components/ui/BaseContainer";
import { useHistory } from "react-router-dom";
import { api, handleError } from "helpers/api";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { DateTimePicker } from "@mui/x-date-pickers";
import moment from "moment";
import dayjs from "dayjs";
import AddLocationForEvent from "../../helpers/AddLocationForEvent";
import { toast } from "react-toastify";
import {InputSlider}  from "components/ui/InputSlider";


const CreateEvent = () => {
  // Set up state variables for each input field.
  const [eventName, setEventName] = useState("");
  const [selectedSport, setSelectedSport] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [location, setLocation] = useState("");
  const [region, setRegion] = useState("");
  const [canton_Full_name, setCanton_Full_name] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("");
  const [eventNameError, setEventNameError] = useState(false);
  const [eventSportError, setEventSportError] = useState(false);
  const [eventTimeError, setEventTimeError] = useState(false);
  const [eventRegionError, setEventRegionError] = useState(false);
  const [eventMaxPartError, setEventMaxPartError] = useState(false);
  const [eventLocationError, setEventLocationError] = useState(false);

  // Set up other variables
  const history = useHistory();
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const [shortCodeForRegion, setShortCodeForRegion] = useState("");

  //method to handle the location change inside the AddLocationForEvent component
  const handleLocationChange = (lng, lat, address) => {
    setEventLocationError(false);
    const newLocation = {
      address: address,
      longitude: lng,
      latitude: lat,
    };
    setLocation(newLocation);
    console.log("this is the location", location);
  };

  useEffect(() => {
    console.log("this is the location", location);
  }, [location]);

  const handleCreateEventClick = async () => {
    try {
      if (!eventName){setEventNameError(true);}
      if (!eventDate){setEventTimeError(true);}
      if (!selectedSport){setEventSportError(true);}
      if (!canton_Full_name){setEventRegionError(true);}
      if (!location){setEventLocationError(true);}
      if (!maxParticipants || isNaN(maxParticipants)){setEventMaxPartError(true);}
      // Validate the input fields.
      if (
        !eventName ||
        !selectedSport ||
        !eventDate ||
        location &&
        !canton_Full_name ||
        !maxParticipants ||
        isNaN(maxParticipants)
      ) {
        // console.log(JSON.stringify(eventDate)); // delete when done
        toast.error("Please fill in all fields with valid data.");
        return;
      }

      if(
          !location
      ){
        toast.error("Please click on the map to add a location in the region you chose");
      }

      // send event to backend (TODO: Make sure all are strings )
      const requestBody = JSON.stringify({
        eventName: eventName,
        eventLocationDTO: location,

        // eventLocationDTO: {
        //     address: "Bakerstreet 1, 8000 Zürich",
        //     longitude: 8.5483395,
        //     latitude: 47.368919500000004,
        // },
        eventDate: eventDate,
        // eventDate: "2023-04-01T15:30:00",
        eventSport: selectedSport,
        eventRegion: canton_Full_name,
        eventMaxParticipants: maxParticipants, // integer
        eventCreator: userId, // long
        token: token,
      });

      const response = await api.post("/events", requestBody);

      // for debugging only delete afterwards
      console.log(response.data);
      console.log("this is the location", location);

      // after event is generated braing user to event page.
      history.push(`/Events/${response.data.eventId}`);
    } catch (error) {
      if(error.response.status == 401) { localStorage.clear(); window.dispatchEvent(new Event("localstorage-update"))}
      if(error.response.status == 400) {}
      else{
        toast.error(handleError(error));
      }

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

  // useEffect(() => {
  //     console.log("this is the shortCodeForRegion", shortCodeForRegion);
  // }, [shortCodeForRegion])
  //

  const handleDateChange = (date) => {
    setEventTimeError(false);
    if (date !== null) {
      // Convert the date to the desired format
      // const formattedDate = date.toISOString().slice(0, 16);

      // const formattedDate = date;

      const formattedDate = dayjs(date).format("YYYY-MM-DDTHH:mm:ss");

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
      <BaseContainer>
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <Typography
              variant={"h3"}
              sx={{
                color: "white",
              }}
            >
              Create Event
            </Typography>
          </Grid>
          <Grid item container justifyContent="center">
            <Grid
              item
              justifyContent="center"
              sx={{
                paddingY: 10,
                paddingX: 4,
                mt: 2,
                maxWidth: 1200,
                flexGrow: 1,
                background: "rgba(255, 255, 255, 0.7)",
                border: "2px black solid",
                borderRadius: "20px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "50%",
                  margin: "0 auto",
                }}
              >
                {/* Event Name */}
                <Typography variant={"h5"}>Event Name</Typography>
                <TextField
                  sx={{ mt: 2, mb: 4 }}
                  id="eventName"
                  placeholder="EVENT NAME"
                  value={eventName}
                  onChange={(e) => {
                    setEventNameError(false);
                    setEventName(e.target.value)
                  }}
                  error={eventNameError}
                />

                {/* Sport */}
                <Typography variant={"h5"}>Sport</Typography>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel>SPORT</InputLabel>
                  <Select
                    value={selectedSport}
                    label="Select a sport"
                    onChange={(e) =>{
                      setEventSportError(false);
                      setSelectedSport(e.target.value);
                    }}
                    error={eventSportError}
                  >
                    {sports.map((sport) => (
                      <MenuItem key={sport} value={sport}>
                        {sport}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Select Time */}

                <Typography variant={"h5"}>Time</Typography>
                <DateTimePicker
                    value={dayjs(eventDate)}
                    onChange={handleDateChange}
                    error={eventTimeError}
                    disablePast
                    shouldDisableTime={(timeValue, viewType) => {
                      if (viewType === 'hours') {
                        const now = dayjs();
                        const selectedDate = dayjs(eventDate).set('hour', timeValue);

                        if (selectedDate.isSame(now, 'day')) {
                          return timeValue < now.hour();
                        }
                      }
                      return false;
                    }}
                />

                {/* Region */}
                <Typography variant={"h5"}>Region</Typography>
                <Box sx={{ minWidth: 240 }}>
                  <FormControl fullWidth>
                    <InputLabel>REGION</InputLabel>
                    <Select
                      sx={{ mt: 2, mb: 4 }}
                      label="Select a region"
                      value={region}
                      onChange={(e) => {
                        setEventRegionError(false);
                        const canton_Full_name2 = e.target.value.split(",")[0];
                        const shortCode1 = e.target.value.split(",")[1];
                        setRegion(e.target.value); // Set the entire value
                        setCanton_Full_name(canton_Full_name2);
                        setShortCodeForRegion(shortCode1);
                        console.log("shortCode:", shortCodeForRegion);
                        console.log("canton_Full_name:", canton_Full_name2);
                      }}
                      error={eventRegionError}
                    >
                      <MenuItem value="Aargau,AG">Aargau</MenuItem>
                      <MenuItem value="Appenzell Innerrhoden,AI">
                        Appenzell Innerrhoden
                      </MenuItem>
                      <MenuItem value="Appenzell Ausserrhoden,AR">
                        Appenzell Ausserrhoden
                      </MenuItem>
                      <MenuItem value="Bern,BE">Bern</MenuItem>
                      <MenuItem value="Basel-Landschaft,BL">
                        Basel-Landschaft
                      </MenuItem>
                      <MenuItem value="Basel,BS">Basel-Stadt</MenuItem>
                      <MenuItem value="Fribourg,FR">Fribourg</MenuItem>
                      <MenuItem value="Geneva,GE">Geneva</MenuItem>
                      <MenuItem value="Glarus,GL">Glarus</MenuItem>
                      <MenuItem value="Graubünden,GR">Graubünden</MenuItem>
                      <MenuItem value="Jura,JU">Jura</MenuItem>
                      <MenuItem value="Luzern,LU">Luzern</MenuItem>
                      <MenuItem value="Neuchâtel,NE">Neuchâtel</MenuItem>
                      <MenuItem value="Nidwalden,NW">Nidwalden</MenuItem>
                      <MenuItem value="Obwalden,OW">Obwalden</MenuItem>
                      <MenuItem value="St. Gallen,SG">St. Gallen</MenuItem>
                      <MenuItem value="Schaffhausen,SH">Schaffhausen</MenuItem>
                      <MenuItem value="Solothurn,SO">Solothurn</MenuItem>
                      <MenuItem value="Schwyz,SZ">Schwyz</MenuItem>
                      <MenuItem value="Thurgau,TG">Thurgau</MenuItem>
                      <MenuItem value="Ticino,TI">Ticino</MenuItem>
                      <MenuItem value="Uri,UR">Uri</MenuItem>
                      <MenuItem value="Vaud,VD">Vaud</MenuItem>
                      <MenuItem value="Valais,VS">Valais</MenuItem>
                      <MenuItem value="Zug,ZG">Zug</MenuItem>
                      <MenuItem value="Zürich,ZH">Zürich</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                {/* MaxParticipants */}
                <Typography variant={"h5"}>
                  Maximum number of participants
                </Typography>
                <InputSlider
                    maxParticipants={maxParticipants}
                    setMaxParticipants={setMaxParticipants}
                    maxPartError={eventMaxPartError}
                    setMaxPartError={setEventMaxPartError}
                />

              </Box>
              {/* TODO: Add Choose Location */}
              <Typography variant={"h5"}>Location</Typography>
              {/* Map to put location */}
              <AddLocationForEvent
                handleLocationChange={handleLocationChange}
                canton={shortCodeForRegion}
                cantonFullName={canton_Full_name}
                locationError={eventLocationError}
                setLocationError={setEventLocationError}
              ></AddLocationForEvent>

              {/* Button to create event */}
              <Button
                variant="contained"
                sx={{
                  //   m: 80,
                  marginTop: "5000px",
                  p: 2,
                  display: "flex",
                  //   flexDirection: "column",
                  //   width: "30%",
                  margin: "0 auto",
                  justifySelf: "center",
                  alignSelf: "center",
                }}
                onClick={() => handleCreateEventClick()}
                startIcon={<AddBoxOutlinedIcon />}
              >
                Create Event
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </BaseContainer>
    </>
  );
};

export default CreateEvent;
