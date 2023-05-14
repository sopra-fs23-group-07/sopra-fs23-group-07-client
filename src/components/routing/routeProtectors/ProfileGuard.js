import {Redirect, useHistory} from "react-router-dom";
import PropTypes from "prop-types";
import React, {useEffect} from "react";
import {api, handleError} from "../../../helpers/api";
import {toast} from "react-toastify";

export const ProfileGuard = (props) => {


    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const history = useHistory();


    useEffect(() => {
        async function fetchData() {
            try {

                const response = await api.get(`/users/${userId}`);
                if (token != response.data.token) {

                    history.push("/Login");
                    // return <Login lobby="true" lobbyId={lobbyId} />;
                } else {
                    return props.children;
                }


            } catch (error) {
                toast.error(handleError(error));
            }
        }

        fetchData();


    }, []);

    if (
        localStorage.getItem("token") !== "null" &&
        localStorage.getItem("token")
    ) {
        return props.children;
    }
    return <Redirect to="/login"/>;
};

ProfileGuard.propTypes = {
    children: PropTypes.node,
};
