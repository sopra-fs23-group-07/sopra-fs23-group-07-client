import React, {useRef, useState} from "react";
import {useHistory} from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import 'mapbox-gl/dist/mapbox-gl.css'
import "styles/ui/Map.scss";
import AddLocation from "helpers/AddLocation";
import {Button, Grid, Typography} from "@mui/material";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import ErrorMessage from "../ui/ErrorMessage";


const Home = () => {
    const history = useHistory();
    const [error, setError] = useState(null);

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
            <Grid item xs={12}>
                <Typography variant={'h3'}>Home</Typography>
            </Grid>
            <ErrorMessage error={error} onClose={() => setError(null)}/>
            <Button variant="contained"
                    startIcon={<EventNoteOutlinedIcon/>}
                    style={{margin: '20px'}}
                    onClick={() => handleEventsClick()}>
                Show all Events
            </Button>
            <Button variant="contained"
                    startIcon={<SearchOutlinedIcon/>}
                    style={{margin: '20px'}}
                    onClick={() => handleLobbiesClick()}>
                Find Lobby
            </Button>
            {/*<div id="map"></div>*/}
            {/*<div ref={mapContainer} className="map-container" />*/}
            <AddLocation EventPage={true}></AddLocation>
        </BaseContainer>
    );
};

export default Home;
