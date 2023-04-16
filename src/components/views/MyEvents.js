import React from "react";
import BaseContainer from "components/ui/BaseContainer";
import {Grid, Typography} from "@mui/material";


const MyEvents = () => {
    return (
        <BaseContainer className="lobby">
            <Grid item xs={12}>
                <Typography variant={'h3'}>My Events</Typography>
            </Grid>
        </BaseContainer>
    );
};

export default MyEvents;
