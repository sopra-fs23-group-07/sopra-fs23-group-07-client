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
    const [loggedIn, setLoggedIn] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {

                const response = await api.get(`/users/${userId}`);
                if (token != response.data.token) {
                    setLoggedIn(false);
                }

            } catch (err) {
                console.log(err);
            }
        }

        fetchData();


    }, []);

    // if user is already logged in, redirects to the main /app
    if (!loggedIn) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        return props.children;
    } else {
        return <Redirect to="/Home"/>;
    }

};

LoginGuard.propTypes = {
    children: PropTypes.node
}