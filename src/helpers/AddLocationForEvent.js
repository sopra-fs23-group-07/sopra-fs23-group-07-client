import React, {useEffect, useRef, useState} from "react";
import {Box, Button} from "@mui/material";
import ReactMapGL, {GeolocateControl, Marker, NavigationControl} from "react-map-gl";
import Geocoder from "./Geocoder";

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


    const handleMapClick = (map) => {

        if (UserConfirmedLocation === false) {
            const {lngLat} = map;
            setLat2(lngLat.lat);
            setLng2(lngLat.lng);
            setLngLat(lngLat);
            console.log("this is the canton:", canton); // log the canton variable
            console.log("this is the canton full name new:", canton_Full_name); // log the canton variable

        } else {
            console.log("User already confirmed location");
            alert("You already confirmed your location!")
        }

    };

    const transformCoordinatesToAddress = async (lngLat) => {
        try {
            const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lngLat.lng},${lngLat.lat}.json?access_token=${TOKEN}`);
            const data = await response.json();
            // const canton = data.features[0].context.find(context => context.id.startsWith('region')).text;
            console.log("this is the canton full name:", canton_Full_name); // log the canton variable

            if (canton === "") {
                alert("Please select a canton first");
            } else {

                if (data.features[0].context[2].short_code) {
                    const shortCode = data.features[0].context[2].short_code.split("-")[1];
                    console.log("there is a shortcode here", shortCode); // "SO"}

                    if (shortCode !== props.canton) {
                        console.log("the short code is not the same as the canton code given")
                        alert("You are in the wrong canton");
                    } else {
                        console.log("there is a short code and it is correct");
                        setCorrectAddress(true);
                        await setAddress(data.features[0].place_name);
                        alert("You successfully confirmed the location");
                    }
                } else {
                    console.log("there is no short code here only text with region");
                    if (data.features[0].context[2].text === props.cantonFullName) {
                        console.log("the text is the same as the canton full name");
                        setCorrectAddress(true);
                        await setAddress(data.features[0].place_name);
                        alert("You successfully confirmed the location");
                    } else {
                        console.log("the text is not the same as the canton full name");
                        alert("You are in the wrong canton");
                    }
                }

            }


            // console.log("Canton shortcode:", cantonShortCode);
            // console.log("this is the data for mapbox coordinates into adress", data.features[0].place_name);
            // console.log("this is the canton:", canton); // log the canton variable
        } catch (error) {
            console.error(error);
            // if (error instanceof TypeError) {
            //     alert("You are in the wrong canton");
            //
            // }
        }
    }


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
            alert("You already confirmed your location!")
        }


    };


    const mapRef = useRef();


    return (
        <Box
            sx={{
                height: 350,
                position: 'relative'
            }}>
            <ReactMapGL
                ref={mapRef}
                mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
                initialViewState={{
                    longitude: lng,
                    latitude: lat,
                    zoom: 6,
                }}
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