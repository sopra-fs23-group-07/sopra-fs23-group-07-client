import React, {useEffect, useRef, useState} from "react";
import {Box} from "@mui/material";
import ReactMapGL, {GeolocateControl, Marker, NavigationControl} from "react-map-gl";
import Geocoder from "./Geocoder";

const AddLocation = (props) => {

    const [lng, setLng] = useState(8.232271068252828);  //Longitude Switzerland
    const [lat, setLat] = useState(46.78526040913516);  //Latitude Switzerland
    const list_of_coordinates = [];
    const mapRef = useRef();
    if (props.events_passed !== undefined) {

        const events_for_location = props.events_passed;

        for (let i = 0; i < events_for_location.length; i++) {
            list_of_coordinates.push(events_for_location[i].eventLocationDTO);
        }


    }

    const flyToLocation = props.flyToLocation;

    useEffect(() => {
        if (flyToLocation) {
            mapRef.current.getMap().flyTo({
                center: [flyToLocation.longitude, flyToLocation.latitude],
                zoom: 14,
                essential: true // this animation is considered essential with respect to prefers-reduced-motion
            });
        }


    }, [flyToLocation])


    return (
        <Box
            sx={{
                height: "100%",
                position: 'relative'
            }}>

            <ReactMapGL
                ref={mapRef}
                mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
                initialViewState={{
                    longitude: props.EventPage === true ? lng : props.eventLocationDTO.longitude,
                    latitude: props.EventPage === true ? lat : props.eventLocationDTO.latitude,
                    zoom: props.EventPage ? 6 : 12,
                }}

                mapStyle="mapbox://styles/mapbox/streets-v11"
                style={{ width: "100%", height: "100%" }}
            >

                {props.events_passed && list_of_coordinates.map((coordinate, index) => (
                    coordinate && <Marker
                        key={index}
                        latitude={coordinate.latitude}
                        longitude={coordinate.longitude}
                    >

                    </Marker>
                ))}


                {props.eventLocationDTO && <Marker
                    latitude={props.eventLocationDTO.latitude}
                    longitude={props.eventLocationDTO.longitude}
                >

                </Marker>}


                <NavigationControl position="bottom-right"/>
                <GeolocateControl //this allows to track the position of the user. With the track icon.
                    position="top-left"
                    trackUserLocation
                   
                />
                <Geocoder/>


            </ReactMapGL>

        </Box>
    )
};

export default AddLocation;