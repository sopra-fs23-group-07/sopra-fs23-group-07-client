import {useHistory, useParams} from "react-router-dom";
import PropTypes from "prop-types";
import {api} from "helpers/api.js";
import React, {useState} from "react";
import Login from "components/views/Login";
import Spinner from "components/ui/Spinner";

/**
 *
 * Another way to export directly your functional component.
 */
export const LobbyInviteGuard = props => {

    let {lobbyId} = useParams();
    const [toLogin, setToLogin] = useState(false);
    const history = useHistory();

    if (localStorage.getItem("lobbyId")) {
        return props.children;
    }

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    async function fetchData() {
        try {

            const response = await api.get(`/users/${userId}`);
            if (!localStorage.getItem("userId") || !localStorage.getItem("token") || token != response.data.token) {
                
                localStorage.clear();
                window.dispatchEvent(new CustomEvent("localstorage-update"));
                setToLogin(true);
                await api.post(`/users/logout/${userId}`);
            } else {

                const requestBody = JSON.stringify({
                    userId: userId,
                    token: token,
                });
                await api.put(`/lobbies/${lobbyId}/join`, requestBody);

                localStorage.setItem("lobbyId", lobbyId);
                history.push("/Lobby/" + String(lobbyId));
            }

        } catch (error) {
            if (error.response.status === 404 && error.response.data === "The lobbyId provided was not found") {
                history.push("/Home"); }
            else if (error.response.status === 404 || error.response.status === 401 || error.response.status === 400) {
                localStorage.clear();
                window.dispatchEvent(new CustomEvent("localstorage-update"));
                setToLogin(true);
                await api.post(`/users/logout/${userId}`);
            }
            else {
            history.push("/Home");}

        }
    }

    fetchData().catch(err => console.log(err));




    if (toLogin){ return <Login lobby="true" lobbyId={lobbyId}/>; }

    return <Spinner />;
};

LobbyInviteGuard.propTypes = {
    children: PropTypes.node,
    lobbyId: PropTypes.number
};

