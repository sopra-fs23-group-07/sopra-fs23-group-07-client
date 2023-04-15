import React, {useEffect, useRef, useState} from "react";
import {Box, Button} from "@mui/material";
import ReactMapGL, {GeolocateControl, Marker, NavigationControl} from "react-map-gl";
import Geocoder from "./Geocoder";
import Home from "../components/views/Home";
import {api, handleError} from "./api";

const AddLocationForLobby = (props) => {
    console.log("this are the props", props.locationDTO);
    //const {state:{location:{lng, lat}}, dispatch} = useValue();
    const [lng, setLng] = useState(8.541042);  //Longitude
    const [lat, setLat] = useState(47.374449);  //Latitude

    const [lng2, setLng2] = useState(null);  //Longitude
    const [lat2, setLat2] = useState(null);  //Latitude
    const [LngLat, setLngLat] = useState(null);  //Latitude

    const [UserConfirmedLocation, SetUserConfirmedLocation] = useState(false);

    const lobbyId = localStorage.getItem("lobbyId");

    const list_of_coordinates = [];


    const handleMapClick = (map, ) => {

        if(UserConfirmedLocation === false) {
        const { lngLat } = map;
        setLat2(lngLat.lat);
        setLng2(lngLat.lng);
        setLngLat(lngLat);

    }
        else {
            console.log("User already confirmed location");
            alert("You already confirmed your location!")
        }

    };

    const SendLocationToServer = async (lngLat) => {
        try {

            if (UserConfirmedLocation === false) {

                const requestBody = JSON.stringify({
                    "memberId": props.memberId,
                    "address": "test",
                    "longitude": lngLat.lng,
                    "latidude": lngLat.lat
                });
                // console.log(requestBody);
                await api.post(`/lobbies/${lobbyId}/locations`, requestBody);
                SetUserConfirmedLocation(true);
            }
            else {
                alert("You already confirmed your location!")
            }


        } catch (error) {
            alert(`Something went wrong when joining the lobby: \n${handleError(error)}`);
        }

    };
    //
    // if(props.locationDTO !== undefined) {
    //
    //     const locationDTO = props.locationDTO;
    //
    //     for (let i = 0; i < locationDTO.length; i++) {
    //         list_of_coordinates.push(locationDTO[i].locationDTO);
    //     }
    //
    //     console.log("list of coordinates", list_of_coordinates);
    //
    //
    // }


    const mapRef = useRef();



    return (
        <Box
            sx={{
                height:350,
                position:'relative'
            }}>
            <ReactMapGL
                ref={mapRef}
                mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
                initialViewState={{
                    longitude: lng,
                    latitude: lat,
                    zoom: 12,
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

                {props.locationDTO.map((coordinate, index) => (
                    console.log("this is the new list of coordinates", list_of_coordinates),
                        <Marker
                            key={index}
                            latitude={coordinate.latitude}
                            longitude={coordinate.longitude}
                        >

                        </Marker>
                ))}




                <NavigationControl position="bottom-right"/>
                <GeolocateControl //this allows to track the position of the user. With the track icon.
                    position="top-left"
                    trackUserLocation

                />
                <Geocoder />



            </ReactMapGL>
            <Button variant="contained" onClick={() => SendLocationToServer(LngLat)}>
                Confirm Location
            </Button>


        </Box>
    )
};

export default AddLocationForLobby;