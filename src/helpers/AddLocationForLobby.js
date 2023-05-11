import React, {useEffect, useRef, useState} from "react";
import {Box, Button} from "@mui/material";
import ReactMapGL, {GeolocateControl, Marker, NavigationControl} from "react-map-gl";
import Geocoder from "./Geocoder";
import {api, handleError} from "./api";
import {toast} from "react-toastify";

const AddLocationForLobby = (props) => {

    const TOKEN = process.env.REACT_APP_MAP_TOKEN;
    //console.log("this are the props", props.locationDTO);
    //const {state:{location:{lng, lat}}, dispatch} = useValue();
    const [lng, setLng] = useState(8.232271068252828);  //Longitude Switzerland
    const [lat, setLat] = useState(46.78526040913516);

    const [lng2, setLng2] = useState(null);  //Longitude
    const [lat2, setLat2] = useState(null);  //Latitude
    const [LngLat, setLngLat] = useState(null);  //Latitude

    const [Address, setAddress] = useState(null);
    const [CorrectAddress, setCorrectAddress] = useState(false);

    const [UserConfirmedLocation, SetUserConfirmedLocation] = useState(false);

    const canton = props.canton;
    const canton_Full_name = props.cantonFullName;

    const lobbyId = localStorage.getItem("lobbyId");

    const list_of_coordinates = [];
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
            toast.warn("You already confirmed your location!")
        }

    };

    const transformCoordinatesToAddress = async (lngLat) => {
        try {
            const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lngLat.lng},${lngLat.lat}.json?access_token=${TOKEN}`);
            const data = await response.json();
            // Handle the data returned by the server
            // await setAddress(data.features[0].place_name);


            console.log("this is the data for mapbox coordinates into adress", data.features[0].place_name);


            if (data.features[0].context[2].short_code) {
                const shortCode = data.features[0].context[2].short_code.split("-")[1];
                console.log("there is a shortcode here", shortCode); // "SO"}

                if (shortCode !== props.canton) {
                    console.log("the short code is not the same as the canton code given")
                    toast.error("You are in the wrong canton");
                } else {
                    console.log("there is a short code and it is correct");
                    setCorrectAddress(true);
                    await setAddress(data.features[0].place_name);
                    toast.success("You successfully confirmed the location");
                }
            } else {
                console.log("there is no short code here only text with region");
                if (data.features[0].context[2].text === props.cantonFullName) {
                    console.log("the text is the same as the canton full name");
                    setCorrectAddress(true);
                    await setAddress(data.features[0].place_name);
                    toast.success("You successfully confirmed the location");
                } else {
                    console.log("the text is not the same as the canton full name");
                    toast.error("You are in the wrong canton");
                }
            }


        } catch (error) {
            // Handle any errors that occurred during the request
            console.error(error);
        }
    }

    useEffect(() => {
        if (Address && LngLat)
            SendLocationToServer(LngLat);
    }, [Address])


    // const exportImage = async (latitude, longitude) => {
    //     try {
    //         let url = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${longitude},${latitude},${viewport?.zoom},0/400x280?access_token=${TOKEN}`
    //         let url2 = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${process.env.REACT_APP_TOKEN}`
    //         const response = await axios.get(url, {
    //             responseType: "blob",
    //         });
    //         if (response) {
    //             var reader = new window.FileReader();
    //             reader.readAsDataURL(response.data);
    //             reader.onload = function () {
    //                 var imageDataUrl = reader.result;
    //                 setImages(imageDataUrl);
    //             };
    //         }
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    const SendLocationToServer = async (lngLat) => {

        try {

            if (UserConfirmedLocation === false) {

                const requestBody = JSON.stringify({
                    "memberId": props.memberId,
                    "address": Address,
                    "longitude": lngLat.lng,
                    "latitude": lngLat.lat
                });
                await api.post(`/lobbies/${lobbyId}/locations`, requestBody);
                SetUserConfirmedLocation(true);
            } else {
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
                onClick={props.hasLockedSelections ? null : handleMapClick}
            >
                {lat2 && lng2 && (
                    <Marker
                        latitude={lat2}
                        longitude={lng2}
                    >
                    </Marker>)}

                {props.locationDTO.map((coordinate, index) => (
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

export default AddLocationForLobby;