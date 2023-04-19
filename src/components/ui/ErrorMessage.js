import React from 'react';
import Alert from '@mui/material/Alert';

const ErrorMessage = ({ error, onClose }) => {
    if (!error) return null;

    return (
        <Alert severity="error" onClose={onClose}>
            {error.message || error}
        </Alert>
    );
};

export default ErrorMessage;
