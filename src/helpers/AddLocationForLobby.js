import React, { useEffect, useRef, useState } from "react";
import { Box, Button } from "@mui/material";
import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
} from "react-map-gl";
import Geocoder from "./Geocoder";
import { api, handleError } from "./api";
import { toast } from "react-toastify";

const AddLocationForLobby = (props) => {
  const TOKEN = process.env.REACT_APP_MAP_TOKEN;
  const [lng, setLng] = useState(8.232271068252828); //Longitude Switzerland
  const [lat, setLat] = useState(46.78526040913516);

  const [lng2, setLng2] = useState(null); //Longitude
  const [lat2, setLat2] = useState(null); //Latitude
  const [LngLat, setLngLat] = useState(null); //Latitude

  const [Address, setAddress] = useState(null);
  const [CorrectAddress, setCorrectAddress] = useState(false);

  const UserConfirmedLocation = props.locationDTO.some(location => location.memberId === props.memberId);

  const canton = props.canton;
  const canton_Full_name = props.cantonFullName;

  const lobbyId = localStorage.getItem("lobbyId");

  const flyToLocation = props.flyToLocation;

  const [viewState, setViewState] = useState({
    longitude: lng,
    latitude: lat,
    zoom: 6,
  });


  const cantonCoordinates = {
    'Zürich': {
      longitude: 8.541694,
      latitude: 47.376887,
    },
    'Aargau': {
      longitude: 8.0511,
      latitude: 47.3872,
    },
    'Appenzell Innerrhoden': {
      longitude: 9.4096,
      latitude: 47.3162,
    },
    'Appenzell Ausserrhoden': {
      longitude: 9.2792,
      latitude: 47.3663,
    },
    'Bern': {
      longitude: 7.4474,
      latitude: 46.9479,
    },
    'Basel-Landschaft': {
      longitude: 7.7331,
      latitude: 47.4417,
    },
    'Basel': {
      longitude: 7.5903,
      latitude: 47.5596,
    },
    'Fribourg': {
      longitude: 7.1610,
      latitude: 46.8022,
    },
    'Geneva': {
      longitude: 6.1432,
      latitude: 46.2044,
    },
    'Glarus': {
      longitude: 9.0672,
      latitude: 47.0404,
    },
    'Graubünden': {
      longitude: 9.5309,
      latitude: 46.6560,
    },
    'Jura': {
      longitude: 7.3274,
      latitude: 47.3446,
    },
    'Luzern': {
      longitude: 8.3086,
      latitude: 47.0502,
    },
    'Neuchâtel': {
      longitude: 6.9293,
      latitude: 46.9896,
    },
    'Nidwalden': {
      longitude: 8.3889,
      latitude: 46.9260,
    },
    'Obwalden': {
      longitude: 8.2426,
      latitude: 46.8983,
    },
    'St. Gallen': {
      longitude: 9.3767,
      latitude: 47.4239,
    },
    'Schaffhausen': {
      longitude: 8.6348,
      latitude: 47.6973,
    },
    'Solothurn': {
      longitude: 7.5292,
      latitude: 47.2074,
    },
    'Schwyz': {
      longitude: 8.6537,
      latitude: 47.0207,
    },
    'Thurgau': {
      longitude: 9.1084,
      latitude: 47.5761,
    },
    'Ticino': {
      longitude: 8.9635,
      latitude: 46.3145,
    },
    'Uri': {
      longitude: 8.6444,
      latitude: 46.8804,
    },
    'Vaud': {
      longitude: 6.6358089,
      latitude: 46.5247936,
    },
    'Valais': {
      longitude: 7.4589,
      latitude: 46.1905,
    },
    'Zug': {
      longitude: 8.5174,
      latitude: 47.1662,
    },
  };

  useEffect(() => {
    if (props.cantonFullName) {
      console.log("props", props.cantonFullName)
      // Update the view state based on the cantonFullName prop
      const coordinates = cantonCoordinates[props.cantonFullName];
      if (coordinates) {
        setViewState({
          ...coordinates,
          zoom: 10, // Adjust the zoom level as needed
        });
      }
    }
  }, [props.cantonFullName]);


  useEffect(() => {
    if (flyToLocation) {
      mapRef.current.getMap().flyTo({
        center: [flyToLocation.longitude, flyToLocation.latitude],
        zoom: 14,
        essential: true, // this animation is considered essential with respect to prefers-reduced-motion
      });
    }
  }, [flyToLocation]);

  const handleMapClick = (map) => {
    if (UserConfirmedLocation === false) {
      const { lngLat } = map;
      setLat2(lngLat.lat);
      setLng2(lngLat.lng);
      setLngLat(lngLat);
      console.log("this is the canton:", canton); // log the canton variable
      console.log("this is the canton full name new:", canton_Full_name); // log the canton variable
    } else {
      console.log("User already confirmed location");
      toast.warn("You already added a location!");
    }
  };

  const isCantonMatch = (context, canton, cantonFullName) => {
    for (const item of context) {
      if (item.short_code && item.short_code.split("-")[1] === canton) {
        return true;
      }
      if (item.text === cantonFullName) {
        return true;
      }
    }
    return false;
  };

  const processLocation = async (data, canton, cantonFullName) => {
    if (isCantonMatch(data.features[0].context, canton, cantonFullName)) {
      setCorrectAddress(true);
      await setAddress(data.features[0].place_name);
      sendLocationToServer(data.features[0].place_name);
      toast.success("You successfully added a location");
    } else {
      toast.error("Add a location in the region of " + cantonFullName);
    }
  };

  const transformCoordinatesToAddress = async (lngLat) => {
    try {
      const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${lngLat.lng},${lngLat.lat}.json?access_token=${TOKEN}`
      );
      const data = await response.json();

      processLocation(data, props.canton, props.cantonFullName).catch(err => console.log(err));

    } catch (error) {
      toast.error("Add a location in the region of " + props.cantonFullName);
    }
  };


  useEffect(() => {
    if (Address && LngLat) {
      SendLocationToServer(LngLat).catch(err => console.log(err));
    }
  }, [Address]);


  const SendLocationToServer = async (lngLat) => {
    try {
      if (UserConfirmedLocation === false) {
        const requestBody = JSON.stringify({
          memberId: props.memberId,
          address: Address,
          longitude: lngLat.lng,
          latitude: lngLat.lat,
        });
        await api.post(`/lobbies/${lobbyId}/locations`, requestBody);
      } else {
        toast.error("You already added a location!");
      }
    } catch (error) {

      if(!(error.response.status === 404 && error.response.data === "The lobbyId provided was not found"))

      {
        toast.error(
            `Something went wrong when adding a location: \n${handleError(error)}`
        );
      }

    }
  };

  const unConfirmLocation = async () => {
    try {
      if (UserConfirmedLocation === true) {
        const requestBody = JSON.stringify({
          memberId: props.memberId,
        });
        await api.delete(`/lobbies/${lobbyId}/locations`, { data: requestBody });

        // Reset states
        setLat2(null);
        setLng2(null);
        setLngLat(null);
        setAddress(null);
        setCorrectAddress(false);

      } else {
        toast.error("You did not add a location yet!");
      }
    } catch (error) {

      if(!(error.response.status === 404 && error.response.data === "The lobbyId provided was not found"))

      {
        toast.error(
            `Something went wrong while removing your location: \n${handleError(error)}`
        );
      }


    }
  };




 

  const mapRef = useRef();

  return (
    <Box
      sx={{
        height: 350,
        position: "relative",
      }}
    >
      <ReactMapGL
          ref={mapRef}
          mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
          {...viewState}
          onMove={evt => setViewState(evt.viewState)}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          onClick={props.hasLockedSelections ? null : handleMapClick}
      >
        {lat2 && lng2 && <Marker latitude={lat2} longitude={lng2}></Marker>}

        {props.locationDTO.map((coordinate, index) => (
          <Marker
            key={index}
            latitude={coordinate.latitude}
            longitude={coordinate.longitude}
          ></Marker>
        ))}

        <NavigationControl position="bottom-right" />
        <GeolocateControl //this allows to track the position of the user. With the track icon.
          position="top-left"
          trackUserLocation
        />
        <Geocoder />
      </ReactMapGL>

      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 2, marginTop: "10px", }}
      >
        <Button
          variant="contained"
          sx={{width: "40%"}}
          disabled={
              props.hasLockedSelections ||
              props.locationDTO.some(location => location.memberId === props.memberId)
          }
          onClick={() => transformCoordinatesToAddress(LngLat)}
        >
          Add Location
        </Button>

        <Button
            variant="contained"
            sx={{width: "40%"}}
            disabled={
                props.hasLockedSelections ||
                !props.locationDTO.some(location => location.memberId === props.memberId)
            }
            onClick={() => unConfirmLocation()}
        >
          Remove Location
        </Button>

      </Box>
    </Box>
  );
};

export default AddLocationForLobby;
