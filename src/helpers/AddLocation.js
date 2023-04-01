import React, {useEffect, useRef, useState} from "react";
import {Box} from "@mui/material";
import ReactMapGL, {GeolocateControl, NavigationControl} from "react-map-gl";
import Geocoder from "./Geocoder";
import Home from "../components/views/Home";

const AddLocation = () => {
    //const {state:{location:{lng, lat}}, dispatch} = useValue();

    const [lng, setLng] = useState(8.541042);  //Longitude
    const [lat, setLat] = useState(47.374449);  //Latitude


    const mapRef = useRef();

    /*
This is used to retrieve the city of the user with the help of the ip adress
 */
    useEffect(() => {
        if (!lng && !lat) {
            fetch('https://ipapi.co/json')
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    mapRef.current.flyTo({
                        center: [data.longitude, data.latitude],
                    });
                    // dispatch({
                    //     type: 'UPDATE_LOCATION',
                    //     payload: { lng: data.longitude, lat: data.latitude },
                    // });
                });
        }
    }, []);

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
            >

                {/*<Marker //initial state of the marker*/}
                {/*    latitude={lng}*/}
                {/*    longitude={lat}*/}
                {/*    draggable*/}
                {/*    // onDragEnd={(e) =>*/}
                {/*    //     dispatch({*/}
                {/*    //         type: 'UPDATE_LOCATION',*/}
                {/*    //         payload: { lng: e.lngLat.lng, lat: e.lngLat.lat },*/}
                {/*    //     })*/}
                {/*   // }*/}
                {/*/>*/}
                <NavigationControl position="bottom-right"/> //this is used for the zoom in and zoom out buttons
                <GeolocateControl //this allows to track the position of the user. With the track icon.
                    position="top-left"
                    trackUserLocation
                    // onGeolocate={(e) =>
                    //     dispatch({
                    //         type: 'UPDATE_LOCATION',
                    //         payload: { lng: e.coords.longitude, lat: e.coords.latitude },
                    //     })
                    // }
                />
                <Geocoder />
            </ReactMapGL>
            {/*<div ref={mapContainer} className="map-container" />*/}

        </Box>
    )
};

export default AddLocation;