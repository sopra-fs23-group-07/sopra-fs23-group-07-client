import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import {api} from "helpers/api.js";

/**
 *
 * Another way to export directly your functional component.
 */
export const LoginGuard = props => {

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    // if user is already logged in, redirects to the main /app
    if (userId && token) {
        return <Redirect to="/Home"/>;
    } else {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        return props.children;

};

LoginGuard.propTypes = {
    children: PropTypes.node
}}