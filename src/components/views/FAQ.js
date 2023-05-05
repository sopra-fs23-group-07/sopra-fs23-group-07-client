import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import BaseContainer from "../ui/BaseContainer";
import ButtonGroup from '@mui/material/ButtonGroup';
import {
    Button,
    Accordion,
    AccordionDetails,
    AccordionSummary
        } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

//TODO: add questions and answers
function ControlledAccordions() {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div>
            <Typography variant={"h5"} sx={{mt:4, mb:2}}>
                General
            </Typography>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        Question 1
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Answer 1
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        Question 2
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Answer 2
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Typography variant={"h5"} sx={{mt:4, mb:2}}>
                Lobbies
            </Typography>

            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        Question 3
                    </Typography>
                    </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Answer 3
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Typography variant={"h5"} sx={{mt:4, mb:2}}>
                Events
            </Typography>
            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        Question 4
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Answer 4
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
const FAQ = () => {

    return (
        <BaseContainer>
            <Grid container spacing={2}>
                <Grid item xs={12} >
                    <Typography variant="h3" sx={{mb:2}}>FAQ</Typography>
                </Grid>
                <Paper
                    sx={{
                        p:4,
                        maxWidth: 1200,
                        flexGrow: 1,
                    }}
                >
                <Grid item xs={12} md={12}>

                    <ButtonGroup size="large" aria-label="large button group" variant="contained">
                        <Button>Lobbies</Button>
                        <Button>Events</Button>
                        <Button>Profile</Button>
                    </ButtonGroup>

                </Grid>
                    {ControlledAccordions()}
                </Paper>
            </Grid>
        </BaseContainer>
    )
}

export default FAQ;