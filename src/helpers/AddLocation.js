import React, {useEffect, useRef, useState} from "react";
import {Box} from "@mui/material";
import ReactMapGL, {GeolocateControl, Marker, NavigationControl} from "react-map-gl";
import Geocoder from "./Geocoder";

const AddLocation = (props) => {
    //const {state:{location:{lng, lat}}, dispatch} = useValue();

    // console.log("this are the props", props.events_passed);
    // console.log("this is the event", props.eventLocationDTO);

    const [marker, setMarker] = useState(null);
    // const [lng, setLng] = useState(8.541042);  //Longitude zurich
    // const [lat, setLat] = useState(47.374449);  //Latitude zurich


    const [lng, setLng] = useState(8.232271068252828);  //Longitude Switzerland
    const [lat, setLat] = useState(46.78526040913516);  //Latitude Switzerland

    const [lngEvent, setLngEvent] = useState(null);  //Longitude
    const [latEvent, setLatEvent] = useState(null);  //Latitude

    const [completeLocation, setCompleteLocation] = useState(null);  //Latitude

    // const eventLocations = props.events_passed.map(event => event.eventLocationDTO);
    const list_of_coordinates = [];


    const mapRef = useRef();

    // console.log("EventPage", props.EventPage);


    if (props.events_passed !== undefined) {

        const events_for_location = props.events_passed;

        for (let i = 0; i < events_for_location.length; i++) {
            list_of_coordinates.push(events_for_location[i].eventLocationDTO);
        }

        //
        // console.log("list of coordinates", list_of_coordinates);
        // console.log("props.eventLocationDTO", props.eventLocationDTO);


    }

    const flyToLocation = props.flyToLocation;

    useEffect(() => {
        if (flyToLocation) {
            mapRef.current.getMap().flyTo({
                center: [flyToLocation.longitude, flyToLocation.latitude],
                zoom: 12,
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
                    // console.log("this is the new list of coordinates", list_of_coordinates),
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
                    // onGeolocate={(e) =>
                    //     dispatch({
                    //         type: 'UPDATE_LOCATION',
                    //         payload: { lng: e.coords.longitude, lat: e.coords.latitude },
                    //     })
                    // }
                />
                <Geocoder/>


            </ReactMapGL>
            {/*<div ref={mapContainer} className="map-container" />*/}

        </Box>
    )
};

export default AddLocation;