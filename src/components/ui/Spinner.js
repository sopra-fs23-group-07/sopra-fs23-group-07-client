import React from "react";
import {LinearProgress, Paper} from '@mui/material';


export const Spinner = () => (
    <Paper
        sx={{
                p: 4,
                mt: 2,
                maxWidth: 1200,
                flexGrow: 1,

        }}
        elevation={3}
    >
        <LinearProgress/>
    </Paper>
);
export default Spinner;
