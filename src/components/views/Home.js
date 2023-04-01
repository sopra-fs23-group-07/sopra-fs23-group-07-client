import React, {useEffect, useRef, useState} from "react";
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


const AddLocation = () => {
    //const {state:{location:{lng, lat}}, dispatch} = useValue();
    return (
        <Box
            sx={{
                height:350,
                position:'relative'
            }}>
            <ReactMapGL
                mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
                initialViewState={{
                    longitude: -100,
                    latitude: 40,
                    zoom: 3.5,
                }}
                mapStyle="mapbox://styles/mapbox/streets-v11"
            >

                <Marker
                    latitude={0}
                    longitude={0}
                    draggable
                    onDragEnd={(e) =>
                        dispatch({
                            type: 'UPDATE_LOCATION',
                            payload: { lng: e.lngLat.lng, lat: e.lngLat.lat },
                        })
                    }
                />
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
