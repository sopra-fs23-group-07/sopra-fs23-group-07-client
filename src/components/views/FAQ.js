import * as React from "react";

import BaseContainer from "../ui/BaseContainer";
import ButtonGroup from "@mui/material/ButtonGroup";
import {
  Button,
  Grid,
  Box,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

//TODO: add questions and answers
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
            Question 1
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Answer 1</Typography>
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
            Question 2
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Answer 2</Typography>
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
            Question 3
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Answer 3</Typography>
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
            Question 4
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Answer 4</Typography>
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
              //   marginLeft: 4,
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
          {/* Unused Buttons */}
          {/* <Grid
            item
            xs={12}
            sx={{
              flexdirection: "column",
              display: "flex",
              justifyContent: "center",
              gap: 4,
            }}
          >
            <Button variant="contained">Lobbies</Button>
            <Button variant="contained">Events</Button>
            <Button variant="contained">Profile</Button>
          </Grid> */}
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
