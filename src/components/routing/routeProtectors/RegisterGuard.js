import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import {api} from "../../../helpers/api";
import {useEffect, useState} from "react";

export const RegisterGuard = (props) => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    // if user is already logged in, redirects to the main /app
    if (userId && token) {
        return <Redirect to="/Home"/>;
    } else {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        return props.children;
    }

};

RegisterGuard.propTypes = {
    children: PropTypes.node,
};
