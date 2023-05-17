import React, {useEffect, useRef, useState} from "react";
import {Box, Button} from "@mui/material";
import ReactMapGL, {GeolocateControl, Marker, NavigationControl} from "react-map-gl";
import Geocoder from "./Geocoder";
import {toast} from "react-toastify";

const AddLocationForEvent = (props) => {

    const TOKEN = process.env.REACT_APP_MAP_TOKEN;
    //console.log("this are the props", props.locationDTO);
    //const {state:{location:{lng, lat}}, dispatch} = useValue();
    const [lng, setLng] = useState(8.232271068252828);  //Longitude Switzerland
    const [lat, setLat] = useState(46.78526040913516);

    const [lng2, setLng2] = useState(null);  //Longitude
    const [lat2, setLat2] = useState(null);  //Latitude
    const [LngLat, setLngLat] = useState(null);  //Latitude
    const [shortCode, setShortCode] = useState(null);
    const [CorrectAddress, setCorrectAddress] = useState(false);

    const [Address, setAddress] = useState(null);

    const [UserConfirmedLocation, SetUserConfirmedLocation] = useState(false);

    const canton = props.canton;
    const canton_Full_name = props.cantonFullName;

    const locationError = props.locationError;
    const setLocationError = props.setLocationError;

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


    const handleMapClick = (map) => {

        if (UserConfirmedLocation === false) {
            const {lngLat} = map;
            setLat2(lngLat.lat);
            setLng2(lngLat.lng);
            setLngLat(lngLat);
            // console.log("this is the canton:", canton); // log the canton variable
            // console.log("this is the canton full name new:", canton_Full_name); // log the canton variable

        } else {
            // console.log("User already confirmed location");
            toast.warn("You already confirmed your location!")

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
            toast.success("You successfully suggested a location");
        } else {
            toast.error("Choose a region first and put a marker in that region only");
        }
    };

    const transformCoordinatesToAddress = async (lngLat) => {
        try {
            const response = await fetch(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${lngLat.lng},${lngLat.lat}.json?access_token=${TOKEN}`
            );
            const data = await response.json();

            processLocation(data, props.canton, props.cantonFullName);

        } catch (error) {
            toast.error("Choose a location in the region of: " + props.cantonFullName);
        }
    };


    useEffect(() => {
        if (Address && LngLat)
            SendLocationToServer(LngLat);
        // if (shortCode) {
        //     console.log("this is the shortCode in UseEffect:", shortCode);
        //     if (shortCode !== props.canton) {
        //         alert("You are in the wrong canton");
        //     } else {
        //         setCorrectAddress(true);
        //         console.log("setCorrectAddress value is ", CorrectAddress)
        //     }
        // }
    }, [Address, shortCode])


    const SendLocationToServer = (lngLat) => {
        if (UserConfirmedLocation === false) {

            props.handleLocationChange(lngLat.lng, lngLat.lat, Address);
            SetUserConfirmedLocation(true);
        } else {
            toast.warn("You already confirmed your location!")
        }


    };


    const mapRef = useRef();


    return (
        <Box
            sx={{
                height: 350,
                position: 'relative',
                border: 3,
                borderColor: locationError ? 'red' : 'transparent',
            }}>
            <ReactMapGL
                ref={mapRef}
                mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
                {...viewState}
                onMove={evt => setViewState(evt.viewState)}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                onClick={handleMapClick}
            >
                {lat2 && lng2 && (
                    <Marker
                        latitude={lat2}
                        longitude={lng2}
                    >
                    </Marker>)}


                <NavigationControl position="bottom-right"/>
                <GeolocateControl //this allows to track the position of the user. With the track icon.
                    position="top-left"
                    trackUserLocation

                />
                <Geocoder/>


            </ReactMapGL>
            <div className="my-1">
                <Button variant="contained" disabled={props.hasLockedSelections}
                        onClick={() => transformCoordinatesToAddress(LngLat)}>
                    Confirm Location
                </Button>
            </div>

        </Box>
    )
};

export default AddLocationForEvent;