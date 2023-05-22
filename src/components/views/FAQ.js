import * as React from "react";

import BaseContainer from "../ui/BaseContainer";
import {
  Grid,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function ControlledAccordions() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    // Content of White Box
    <div>
      <Typography variant={"h5"} sx={{ mb: 2 }}>
        General
      </Typography>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        sx={{
          background: "rgba(165, 109, 201, 0.1)",
          border: "1px black solid",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            What is possible without registering or logging in?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Withour registering or logging in you are able to see what lobbies and events are currently open as well as view the details of an event. However you may not create or join and event or lobby without first registering and logging in</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
        sx={{
          background: "rgba(165, 109, 201, 0.1)",
          border: "1px black solid",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            What is the difference between a lobby and an event?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>In a lobby you can make selections for each category which will influence the final decision of the lobby. Once all selections are saved or the timer has run out, an event is created using the information from the lobby. An event is the final version of the lobby and cannot be changed.</Typography>
        </AccordionDetails>
      </Accordion>

      <Typography variant={"h5"} sx={{ mt: 4, mb: 2 }}>
        Lobbies
      </Typography>

      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
        sx={{background: "rgba(165, 109, 201, 0.1)", 
        border: "1px black solid",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            How does the location voting work in a lobby?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>First a location must be added before it can be voted for. To add a location place a marker on the map of the location you wish to add, keep in mind the location has to be consistent with the lobby region. Then press the "Add Location" button to add that location to the lobby. Now any member of the lobby may vote for that location by pressing the "Vote" button next to the location's address.</Typography>
        </AccordionDetails>
      </Accordion>

      <Typography variant={"h5"} sx={{ mt: 4, mb: 2 }}>
        Events
      </Typography>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
        sx={{background: "rgba(165, 109, 201, 0.1)", 
        border: "1px black solid",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            How do I create my own event?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>To create your own event first navigate to the Events page using the navigation bar on the top of the screen. Then press the "Create New Event" button and fill out the necessary information for the event. Upon pressing the "Create Event" button, an event will be created.</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
const FAQ = () => {
  return (
    <BaseContainer>
      {/* Title */}
      <Grid container sx={{ marginBottom: 4 }}>
        <Grid item xs={12}>
          <Typography
            variant="h3"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
            }}
          >
            FAQ
          </Typography>
        </Grid>
      </Grid>

      {/* Visible Box */}
      <Grid
        container
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          borderRadius: "20px",
          padding: 4,
          display: "flex",
          justifyContent: "space-between",
          gap: 4,
          minHeight: "400px",
        }}
      >
        <Grid
          item
          container
          xs={12}
          md={12}
          sx={{
            flexGrow: 1,
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.3)",
            background: "white",
            flexdirection: "row",
            display: "flex",
            justifyContent: "center",
            p: 2,
          }}
        >
         
          <Grid item xs={12}>
            {/* Content of Visible Box*/}
            {ControlledAccordions()}
          </Grid>
        </Grid>
      </Grid>
    </BaseContainer>
  );
};

export default FAQ;
