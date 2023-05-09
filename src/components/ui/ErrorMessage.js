import React from 'react';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ErrorMessage = ({ error }) => {
    if (!error) return null;

    // Call toast with the error message or object
    return (
            toast.error(error || error.message, {
            position: "top-right",
            autoClose: 15000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })

    );
};

export default ErrorMessage;
