import * as React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import EventBusyIcon from '@mui/icons-material/EventBusy';

const StyledGridOverlay = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: "100%"
}));

export function CustomNoRowsOverlay() {
    return (
        <StyledGridOverlay>
            <Box>
                <EventBusyIcon fontSize="large"/>
            </Box>
            <Box sx={{ mt: 1 }}>
                Currently no events available! Go to the Lobbies Page and start creating one.
            </Box>
        </StyledGridOverlay>
    );
}