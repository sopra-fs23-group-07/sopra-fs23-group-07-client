import React, {useEffect, useRef, useState} from "react";
import {Box} from "@mui/material";
import ReactMapGL, {GeolocateControl, Marker, NavigationControl} from "react-map-gl";
import Geocoder from "./Geocoder";
import Home from "../components/views/Home";

const AddLocation = (props) => {
    //const {state:{location:{lng, lat}}, dispatch} = useValue();

    console.log("this are the props", props.events_passed);

    const [marker, setMarker] = useState(null);
    const [lng, setLng] = useState(8.541042);  //Longitude
    const [lat, setLat] = useState(47.374449);  //Latitude

    const [lng2, setLng2] = useState(null);  //Longitude
    const [lat2, setLat2] = useState(null);  //Latitude

    const [completeLocation, setCompleteLocation] = useState(null);  //Latitude

    // const eventLocations = props.events_passed.map(event => event.eventLocationDTO);
    const list_of_coordinates = [];


    const mapRef = useRef();

// TODO: It should be enough to have two lists here instead of one
// this code will use the events it got from the events scren and then save the lng and lat in two lists and then put them back in one
    //list
if(props.events_passed !== undefined) {

    const events_for_location = props.events_passed;

    for (let i = 0; i < events_for_location.length; i++) {
        list_of_coordinates.push(events_for_location[i].eventLocationDTO);
    }

    console.log("list of coordinates", list_of_coordinates);


    // const list_of_longitude = [];
    // for (let i = 0; i < list_of_coordinates.length; i++) {
    //     list_of_longitude.push(list_of_coordinates[i][1]);
    //     list_of_longitude.push(list_of_coordinates[i][2]);
    // }
    //
    // console.log("list of longitude", list_of_longitude);
    //
    // const new_list = list_of_coordinates.map((coordinate) => [coordinate.longitude, coordinate.latitude]);


    // const list_of_latitude = [];
    // for (let i = 0; i < list_of_coordinates.length; i++) {
    //     list_of_latitude.push(list_of_coordinates[i].split(",")[1]);
    // }
    //
    // var new_list = [];
    // for (let i = 0; i < list_of_longitude.length; i++) {
    //     new_list.push([list_of_longitude[i],list_of_latitude[i] ]);
    // }
    //
    // console.log("test", new_list);


}


    // const test = [];
    // for(let i = 0; i < events_for_location.length; i++){
    //     list_of_coordinates.push(events_for_location[i].eventLocation);
    //     console.log("test", test);
    // }
    //
    /*
This is used to retrieve the city of the user with the help of the ip adress
 */
    // useEffect(() => {
    //     if (!lng && !lat) {
    //         fetch('https://ipapi.co/json')
    //             .then((response) => {
    //                 return response.json();
    //             })
    //             .then((data) => {
    //                 mapRef.current.flyTo({
    //                     center: [data.longitude, data.latitude],
    //                 });
    //                 // dispatch({
    //                 //     type: 'UPDATE_LOCATION',
    //                 //     payload: { lng: data.longitude, lat: data.latitude },
    //                 // });
    //             });
    //     }
    // }, []);
    //
    // console.log("this are the events", events_for_location);
   // console.log("this is the event location",events_for_location.eventLocation )





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

                {/*{console.log("this is the lng", lng)}*/}
                {/*{console.log("this is the lat", lat)}*/}
                    {/*<Marker*/}
                    {/*    latitude={lat2}*/}
                    {/*    longitude={lng2}*/}
                    {/*>*/}

                    {/*</Marker>*/}

                {/*{location && (*/}
                {/*    <Marker*/}
                {/*        draggable={false}*/}
                {/*        anchor="bottom"*/}
                {/*        offsetLeft={-20}*/}
                {/*        offsetTop={-10}*/}
                {/*        longitude={lng}*/}
                {/*        latitude={lat}*/}
                {/*    >*/}
                {/*    </Marker>*/}
                {/*)}*/}



                {/*{new_list && new_list.map((event_lng_lat, index) => (*/}
                {/*    console.log("this is the new list", new_list),*/}
                {/*    <Marker*/}
                {/*        key={index}*/}
                {/*        latitude={event_lng_lat[1]}*/}
                {/*        longitude={event_lng_lat[0]}*/}
                {/*    >*/}
                {/*    </Marker>*/}
                {/*))}*/}

                {list_of_coordinates.map((coordinate, index) => (
                    console.log("this is the new list of coordinates", list_of_coordinates),
                        <Marker
                            key={index}
                            latitude={coordinate.latitude}
                            longitude={coordinate.longitude}
                        >

                        </Marker>
                ))}


                {/*// <Marker*/}
                {/*//     longitude={lng}*/}
                {/*//     latitude={lat}*/}
                {/*//     draggable={false}*/}
                {/*//     onDragEnd={(event) => {*/}
                {/*//         const { lngLat } = event;*/}
                {/*//         if (!isNaN(lngLat[0]) && !isNaN(lngLat[1])) {*/}
                {/*//             setLng(lngLat[0]);*/}
                {/*//             setLat(lngLat[1]);*/}
                {/*//         }*/}
                {/*//     }}*/}
                {/*// />*/}
                {/*this is used for the zoom in and zoom out buttons*/}
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
                <Geocoder />



            </ReactMapGL>
            {/*<div ref={mapContainer} className="map-container" />*/}

        </Box>
    )
};

export default AddLocation;