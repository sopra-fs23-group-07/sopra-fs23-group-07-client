import React, {useEffect, useRef, useState, useReducer} from "react";
import { useHistory } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import { Button } from "components/ui/Button";
import {Box} from '@mui/material';
import 'mapbox-gl/dist/mapbox-gl.css'
import ReactMapGL, {
    GeolocateControl,
    Marker,
    NavigationControl,
} from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import route from "react-router-dom/es/Route";
import "styles/ui/Map.scss";
import Geocoder from "../../helpers/Geocoder";


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




const Home = () => {
  const history = useHistory();
  const handleLobbiesClick = () => {
    history.push("/Lobbies");
  };

  const handleEventsClick = () => {
    history.push("/Events");
  };

    const mapContainer = useRef(null);       //MapBox Container
    const map = useRef(null);                //MapBox rendered element
    const [lng, setLng] = useState(77.378);  //Longitude
    const [lat, setLat] = useState(28.624);  //Latitude
    const [zoom, setZoom] = useState(12);    //Zoom Level
    const start = [lng, lat];                //Initial Directions

    // mapboxgl.accessToken = process.env.REACT_APP_MAP_TOKEN;
    //
    //
    // useEffect(() => {
    //     if (map.current) return; // initialize map only once
    //     map.current = new mapboxgl.Map({
    //         container: mapContainer.current,
    //         style: 'mapbox://styles/mapbox/streets-v11',
    //         center: [lng, lat],
    //         zoom: zoom
    //     });
    //     map.current.on('move', () => {
    //         setLng(map.current.getCenter().lng.toFixed(4));
    //         setLat(map.current.getCenter().lat.toFixed(4));
    //         setZoom(map.current.getZoom().toFixed(2));
    //     });
    //     //route();
    //
    // }, [map.current]);

  return (
    <BaseContainer className="lobby">
      <h1>Home</h1>

      <Button onClick={() => handleEventsClick()}>Show all Events</Button>
      <Button onClick={() => handleLobbiesClick()}>Find Lobby</Button>
        {/*<div id="map"></div>*/}
        {/*<div ref={mapContainer} className="map-container" />*/}
        <AddLocation></AddLocation>
    </BaseContainer>
  );
};

export default Home;
