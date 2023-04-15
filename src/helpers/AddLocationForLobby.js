import React, {useEffect, useRef, useState} from "react";
import {Box} from "@mui/material";
import ReactMapGL, {GeolocateControl, Marker, NavigationControl} from "react-map-gl";
import Geocoder from "./Geocoder";
import Home from "../components/views/Home";

const AddLocationForLobby = (props) => {
    //const {state:{location:{lng, lat}}, dispatch} = useValue();
    const [lng, setLng] = useState(8.541042);  //Longitude
    const [lat, setLat] = useState(47.374449);  //Latitude

    const [lng2, setLng2] = useState(null);  //Longitude
    const [lat2, setLat2] = useState(null);  //Latitude


    const handleMapClick = (map, ) => {
        const { lngLat } = map;
        setLat2(lngLat.lat);
        setLng2(lngLat.lng);
    };

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

                <Marker
                    latitude={lat2}
                    longitude={lng2}
                >
                </Marker>



                <NavigationControl position="bottom-right"/>
                <GeolocateControl //this allows to track the position of the user. With the track icon.
                    position="top-left"
                    trackUserLocation

                />
                <Geocoder />



            </ReactMapGL>


        </Box>
    )
};

export default AddLocationForLobby;