import {useHistory} from "react-router-dom";
import PropTypes from "prop-types";
import React, {useState} from "react";
import {api} from "../../../helpers/api";
import {toast} from "react-toastify";
import Spinner from "components/ui/Spinner";


export const MyEventsGuard = (props) => {


    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const [toProfile, setToProfile] = useState(false);

    const history = useHistory();
    async function fetchData() {
        try {
            const response = await api.get(`/users/${userId}`);

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

    fetchData().catch(err => console.log(err));
    if(toProfile) { return props.children; }
    return <Spinner />
};

MyEventsGuard.propTypes = {
    children: PropTypes.node,
};
