import React, {useRef, useState} from "react";
import {useHistory} from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import 'mapbox-gl/dist/mapbox-gl.css'
import "styles/ui/Map.scss";
import AddLocation from "helpers/AddLocation";
import {Box, Button, Grid, Typography} from "@mui/material";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import ErrorMessage from "../ui/ErrorMessage";
import soccer from '../../soccer.jpg';
import GroupIcon from '@mui/icons-material/Group';
import {Add, GroupAdd} from "@mui/icons-material";
import EventIcon from '@mui/icons-material/Event';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';




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
            <Grid container xs={12}>
                <Grid item xs={12} md={6}>
                    <Box p={"5%"}>
                        <Box paddingY={"5%"}>
                            <Typography variant={'h3'}>Welcome to SpeetUp!</Typography>
                        </Box>
                        <Box>
                            <Typography>We believe that organizing sports events with friends and strangers should be easy, fun, and spontaneous. Our innovative web application provides a solution to the problem of coordinating sports activities by allowing users to create and join events seamlessly. With our platform, users can explore new sports, meet new people, and enjoy the benefits of a healthy and active lifestyle. Join us today and let's play! </Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box>
                        <Box>
                            <img src={soccer} alt={"soccer"} style={{ maxWidth: "80%" }}/>
                        </Box>
                    </Box>
                </Grid>

            </Grid>

            <Grid container item xs={12} sx={{mt:5}}>
                <Grid xs={12} md={12} paddingY={5} >
                    <Typography variant={"h4"}>
                        How to use our services
                    </Typography>
                </Grid>
                <Grid item xs={12} md={5} textAlign={"center"}>
                    <Box p={5} boxShadow={2} style={{ height: "100%" }} >
                        <GroupIcon/>
                        <Typography variant={"h5"}>Discover and join Lobbies</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={7} textAlign={"center"}>
                    <Box p={5} boxShadow={2} style={{ height: "100%" }}>
                        <Typography display={"block"}>If you want to create a new event from scratch with your friends, you can first create a lobby. You can do this by navigating to the Lobbies page and then clicking on the create new lobby button. You can directly navigate to the Lobbies page by clicking on the following button:</Typography>
                        <Button variant={"contained"}
                                p={5}
                                startIcon={<SearchOutlinedIcon/>}
                                onClick={() => history.push("/Lobbies/")}
                                sx={{mt:3}}
                        >
                            Discover open Lobbies
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            <Grid container item xs={12} sx={{mt:5}}>
                <Grid item xs={12} md={5} textAlign={"center"}>
                    <Box p={5} boxShadow={2} style={{ height: "100%" }}>
                        <GroupAdd/>
                        <Typography variant={"h5"}>Create new Lobby</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={7} textAlign={"center"}>
                    <Box p={5} boxShadow={2} style={{ height: "100%" }}>
                        <Typography>Description on how to Create new Lobby</Typography>
                        <Button variant={"contained"}
                                p={5}
                                startIcon={<Add/>}
                                sx={{mt:3}}
                                onClick={() => history.push("/CreateLobby")}
                        >
                            Create new Lobby
                        </Button>
                    </Box>
                </Grid>
            </Grid>

            <Grid container item xs={12} sx={{mt:5}}>
                <Grid item xs={12} md={5} textAlign={"center"}>
                    <Box p={5} boxShadow={2} style={{ height: "100%" }}>
                        <EventIcon/>
                        <Typography variant={"h5"}>Join existing Event</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={7} textAlign={"center"} justifyContent={"center"}>
                    <Box p={5} boxShadow={2} style={{ height: "100%" }}>
                        <Typography>Description on how to  Join existing Event</Typography>
                        <Button startIcon={<SearchOutlinedIcon/>}
                                variant={"contained"}
                                sx={{mt:3}}
                                onClick={() => history.push("/Events")}
                        >
                            Discover existing events
                        </Button>
                    </Box>
                </Grid>
            </Grid>

            <ErrorMessage error={error} onClose={() => setError(null)}/>

        </BaseContainer>
    );
};

export default Home;
