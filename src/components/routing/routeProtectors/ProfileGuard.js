import {Redirect, useHistory} from "react-router-dom";
import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import {api, handleError} from "../../../helpers/api";
import {toast} from "react-toastify";
import Spinner from "components/ui/Spinner";


export const ProfileGuard = (props) => {


    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    console.log(userId);
    console.log(token);
    const [toProfile, setToProfile] = useState(false);

    const history = useHistory();

    //useEffect(() => {
        async function fetchData() {
          try {
            const response = await api.get(`/users/${userId}`);
            console.log(response.data.token);

            if(token === response.data.token) {
                setToProfile(true); }
            else {
                localStorage.removeItem("token");
                localStorage.removeItem("userId");
                history.push("/Login");
                window.dispatchEvent(new CustomEvent("localstorage-update"));
                toast.error("You could not be authenticated. Please log in or register.");
            }



          } catch (error) {
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            history.push("/Login");
          }
        }

        fetchData();
      //}, []);
    if(setToProfile) { return props.children; }
    return <Spinner />
};

ProfileGuard.propTypes = {
    children: PropTypes.node,
};
