import React from "react";
import { useHistory } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import "mapbox-gl/dist/mapbox-gl.css";
import "styles/ui/Map.scss";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Add } from "@mui/icons-material";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import group from "../../group.png";
import addGroup from "../../addGroup.png";
import Event from "../../Event.png";
import addEvent from "../../add-event.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";

const Home = () => {
  const history = useHistory();

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const [expanded1, setExpanded1] = React.useState(false);
  const [expanded2, setExpanded2] = React.useState(false);
  const [expanded3, setExpanded3] = React.useState(false);
  const [expanded4, setExpanded4] = React.useState(false);

  return (
    <BaseContainer>
      {/* Title */}
      <Grid
        container
        xs={12}
        md={12}
        sx={{
          marginY: 2,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid item xs={12} md={6}>
          <Box>
            <Box p={"5%"} sx={{ display: "flex", justifyContent: "center" }}>
              <Typography
                variant="h3"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  textAlign: "center",
                }}
              >
                Welcome to SpeetUp!
              </Typography>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "center", color: "white" }}
            >
              <Typography variant={"body1"} sx={{ textAlign: "center" }}>
                We believe that organizing sports events with friends and
                strangers should be easy, fun, and spontaneous. Our innovative
                web application provides a solution to the problem of
                coordinating sports activities by allowing users to create and
                join events seamlessly. With our platform, users can explore new
                sports, meet new people, and enjoy the benefits of a healthy and
                active lifestyle. Join us today and let's play!
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Subtitle */}
      <Grid container xs={12} sx={{ mt: 4 }}>
        <Grid item xs={12} md={12}>
          <Typography
            variant="h4"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
            }}
          >
            How to use our services
          </Typography>
        </Grid>
      </Grid>

      {/* Explaination Cards */}
      <Grid container xs={12} sx={{ my: 5,  }}>
        <Grid item xs={12} md={6} xl={3} sx={{ padding: 3 }}>
          <Card>
            <CardHeader title="Join existing lobby" />
            <CardMedia
              component="img"
              src={group}
              alt="Lobbies Icon"
              sx={{ paddingX: "25%" }}
            />
            <CardContent>
              <Typography paragraph variant="body1">
                If you are new to this website, this is the easiest way to
                explore our offerings!
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <Button
                variant={"contained"}
                p={2}
                startIcon={<SearchOutlinedIcon />}
                onClick={() => history.push("/Lobbies/")}
                sx={{ mt: 3 }}
              >
                Join existing lobby
              </Button>
              <ExpandMore
                expand={expanded1}
                onClick={() => setExpanded1(!expanded1)}
                aria-expanded={expanded1}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded1} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography variant={"h6"}>What is a lobby?</Typography>
                <Typography paragraph>
                  A lobby is a virtual room where you can chose your preferences
                  for the sports you want to play, when you are able and willing
                  to play and where you want to play. You can see what the
                  preferences of the other members of the lobby are in
                  real-time.
                </Typography>
                <Typography variant={"h6"}>How can I join a lobby?</Typography>
                <Typography paragraph>
                  There are several conditions that must be met in order for you
                  to join a lobby:
                  <ul>
                    <li>You must be logged in</li>
                    <li>
                      The number of members must be lower than the maximum
                    </li>
                  </ul>
                </Typography>
                <Typography variant={"h6"}>What else is important?</Typography>
                <Typography paragraph>
                  <ul>
                    <li>
                      To stay a member of the lobby you cannot leave the lobby
                      screen
                    </li>
                    <li>
                      You can leave the lobby by clicking on the "Leave Lobby"
                      button or by navigating to another page
                    </li>
                  </ul>
                </Typography>
                <Typography variant={"h6"}>
                  How long will the lobby exist?
                </Typography>
                <Typography paragraph>
                  The lobby exists until either the timer runs out or all
                  members of the lobby safe/lock their choices.
                </Typography>
                <Typography variant={"h6"}>
                  What happens after the lobby?
                </Typography>
                <Typography paragraph>
                  Afterwards an Event will be created which suits all or most of
                  the members of the lobbies. You will directly be added to the
                  Event and redirected to the respective event page.
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} xl={3} sx={{ padding: 3 }}>
          <Card >
            <CardHeader title="Create a new lobby" />
            <CardMedia
              component="img"
              src={addGroup}
              alt="add Group Icon"
              sx={{ paddingX: "25%" }}
            />
            <CardContent>
              <Typography paragraph variant="body1">
                If you want to organize a sports Event with your friends or with
                new people, this is the way to go!
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <Button
                variant={"contained"}
                p={2}
                startIcon={<Add />}
                onClick={() => history.push("/CreateLobby/")}
                sx={{ mt: 3 }}
              >
                Create New Lobby
              </Button>
              <ExpandMore
                expand={expanded2}
                onClick={() => setExpanded2(!expanded2)}
                aria-expanded={expanded2}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded2} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography variant={"h6"}>
                  How can I create a new lobby?
                </Typography>
                <Typography paragraph>
                  There are several conditions that must be met in order for you
                  to create a lobby:
                  <ul>
                    <li>You must be logged in</li>
                    <li>
                      You must define a name, the maximum number of lobby
                      members and the region where you want your event to be
                    </li>
                  </ul>
                </Typography>

                <Typography variant={"h6"}>
                  How can I invite my friends to the lobby?
                </Typography>
                <Typography paragraph>
                  You can invite your friends by sharing the link to the lobby
                  with them. Note, however, that your friends must have an
                  account and must be logged in!
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} xl={3} sx={{ padding: 3 }}>
          <Card >
            <CardHeader title="Join existing event" />
            <CardMedia
              component="img"
              src={Event}
              alt="Event Icon"
              sx={{ paddingX: "25%" }}
            />
            <CardContent>
              <Typography paragraph variant="body1">
                If you are flexible and open to meeting new people you can
                browse the already existing events and join directly!
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <Button
                variant={"contained"}
                p={5}
                startIcon={<SearchOutlinedIcon />}
                sx={{ mt: 3 }}
                onClick={() => history.push("/Events")}
              >
                Join existing Event
              </Button>

              <ExpandMore
                expand={expanded3}
                onClick={() => setExpanded3(!expanded3)}
                aria-expanded={expanded3}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded3} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography variant={"h6"}>What is an event?</Typography>
                <Typography paragraph>
                  An event is the result of a lobby. Sport, time and location
                  are all defined and fixed.
                </Typography>
                <Typography variant={"h6"}>
                  How can I join an event?{" "}
                </Typography>
                <Typography paragraph>
                  You can join an event by clicking on the "Join" button.
                </Typography>
                <Typography variant={"h6"}>Can I leave an event?</Typography>
                <Typography paragraph>
                  Yes, you can leave an event by clicking on the "Leave" button.
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} xl={3} sx={{ padding: 3 }}>
          <Card >
            <CardHeader title="Create a new event" />
            <CardMedia
              component="img"
              src={addEvent}
              alt="add Event Icon"
              sx={{ paddingX: "25%" }}
            />
            <CardContent>
              <Typography paragraph variant="body1">
                If you already know where, when and which sport to play with
                your friends or with new people, this is the way to go!
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <Button
                variant={"contained"}
                p={2}
                startIcon={<Add />}
                onClick={() => history.push("/CreateEvent/")}
                sx={{ mt: 3 }}
              >
                Create New Event
              </Button>
              <ExpandMore
                expand={expanded4}
                onClick={() => setExpanded4(!expanded4)}
                aria-expanded={expanded4}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded4} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography variant={"h6"}>
                  How can I create a new event?
                </Typography>
                <Typography paragraph>
                  There are several conditions that must be met in order for you
                  to create an event:
                  <ul>
                    <li>You must be logged in</li>
                    <li>
                      You must define the following:
                      <ol>
                        <li>Event name</li>
                        <li>Maximum number of participants</li>
                        <li>the sport you want to play</li>
                        <li>where exactly you want to play</li>
                        <li>when you want to play</li>
                      </ol>
                    </li>
                  </ul>
                </Typography>

                <Typography variant={"h6"}>
                  How can I invite my friends to the event?
                </Typography>
                <Typography paragraph>
                  You can invite your friends by sharing the link to the lobby
                  with them. Note, however, that your friends must have an
                  account and must be logged in!
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        </Grid>
      </Grid>
    </BaseContainer>
  );
};

export default Home;
