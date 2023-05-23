import React, { useEffect, useState } from "react";
import BaseContainer from "components/ui/BaseContainer";
import { useHistory } from "react-router-dom";
import { api, handleError } from "helpers/api";
import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import dayjs from "dayjs";
import AddLocationForEvent from "../../helpers/AddLocationForEvent";
import { toast } from "react-toastify";
import { InputSlider } from "components/ui/InputSlider";

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
      if (!eventName) {
        setEventNameError(true);
      }
      if (!eventDate) {
        setEventTimeError(true);
      }
      if (!selectedSport) {
        setEventSportError(true);
      }
      if (!canton_Full_name) {
        setEventRegionError(true);
      }
      if (!location) {
        setEventLocationError(true);
      }
      if (!maxParticipants || isNaN(maxParticipants)) {
        setEventMaxPartError(true);
      }
      // Validate the input fields.
      if (
        !eventName ||
        !selectedSport ||
        !eventDate ||
        (location && !canton_Full_name) ||
        !maxParticipants ||
        isNaN(maxParticipants)
      ) {
        toast.error("Please fill in all fields with valid data.");
        return;
      }

      if (!location) {
        toast.error(
          "Please click on the map to add a location in the region you chose"
        );
      }

      const requestBody = JSON.stringify({
        eventName: eventName,
        eventLocationDTO: location,
        eventDate: eventDate,
        eventSport: selectedSport,
        eventRegion: canton_Full_name,
        eventMaxParticipants: maxParticipants, // integer
        eventCreator: userId, // long
        token: token,
      });

      const response = await api.post("/events", requestBody);


      // after event is generated braing user to event page.
      history.push(`/Events/${response.data.eventId}`);
    } catch (error) {
      console.log(error.response);
      if (error.response.status == 401 || error.response.status == 404) {
        localStorage.clear();
        window.dispatchEvent(new Event("localstorage-update"));
        await api.post(`/users/logout/${userId}`);
        toast.error(handleError(error));
      }
      else {
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

 
  const handleDateChange = (date) => {
    setEventTimeError(false);
    if (date !== null) {
      const formattedDate = dayjs(date).format("YYYY-MM-DDTHH:mm:ss");
      setEventDate(formattedDate);
    } else {
      setEventDate(null);
    }
  };

  return (
    <>
      <BaseContainer>
        <Grid container direction="column" alignItems="center">
          {/* title */}
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
            {/* Visible Box */}
            <Grid
              item
              justifyContent="center"
              sx={{
                paddingY: 10,
                paddingX: 4,
                mt: 2,
                maxWidth: 800,
                flexGrow: 1,
                background: "rgba(255, 255, 255, 0.7)",
                borderRadius: "20px",
              }}
            >
              {/* All form fields */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "70%",
                  margin: "0 auto",
                }}
              >
                {/* Event Name */}
                {/* <Typography variant={"h5"}>Event Name</Typography> */}
                <TextField
                  sx={{ mt: 2 }}
                  // id="eventName"
                  label="Event Name"
                  value={eventName}
                  onChange={(e) => {
                    setEventNameError(false);
                    setEventName(e.target.value);
                  }}
                  error={eventNameError}
                />

                {/* Region */}
                <Typography
                  variant={"h5"}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    my: 2,
                  }}
                >
                  Region
                </Typography>
                <Box sx={{ minWidth: 240 }}>
                  <FormControl sx={{ width: "100%" }}>
                    <Select
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
                {/* <Typography variant={"h5"}>
                  Maximum number of participants
                </Typography> */}
                <InputSlider
                  maxParticipants={maxParticipants}
                  setMaxParticipants={setMaxParticipants}
                  maxPartError={eventMaxPartError}
                  setMaxPartError={setEventMaxPartError}
                />

                {/* Sport */}
                <Typography
                  variant={"h5"}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    my: 2,
                  }}
                >
                  Sport
                </Typography>
                <FormControl>
                  <Select
                    value={selectedSport}
                    onChange={(e) => {
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
                <Typography
                  variant={"h5"}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    my: 2,
                  }}
                >
                  Time
                </Typography>
                <DesktopDateTimePicker
                  value={dayjs(eventDate)}
                  onChange={handleDateChange}
                  error={eventTimeError}
                  disablePast
                  shouldDisableTime={(timeValue, viewType) => {
                    if (viewType === "hours") {
                      const now = dayjs();
                      const selectedDate = dayjs(eventDate).set(
                        "hour",
                        timeValue
                      );

                      if (selectedDate.isSame(now, "day")) {
                        return timeValue < now.hour();
                      }
                    }
                    return false;
                  }}
                />

                {/* Location */}
                <Typography
                  variant={"h5"}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    my: 2,
                  }}
                >
                  Location
                </Typography>
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
                    marginTop: 8,
                    p: 2,
                    display: "flex",
                    justifySelf: "center",
                    alignSelf: "center",
                  }}
                  onClick={() => handleCreateEventClick()}
                  startIcon={<AddBoxOutlinedIcon />}
                >
                  Create Event
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </BaseContainer>
    </>
  );
};

export default CreateEvent;
