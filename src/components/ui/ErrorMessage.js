import React from 'react';
import Alert from '@mui/material/Alert';
import {AlertTitle, Portal} from "@mui/material";

const ErrorMessage = ({ error, onClose }) => {
    if (!error) return null;

    return (
        <Portal>
            <div style={{ position: 'fixed', top:0 , padding: '5%', width: '100%', zIndex: 999 }}>
                <Alert severity="error" onClose={onClose}>
                    <AlertTitle>Error</AlertTitle>
                    {error.message || error}
                </Alert>
            </div>
        </Portal>

);
};

export default ErrorMessage;
