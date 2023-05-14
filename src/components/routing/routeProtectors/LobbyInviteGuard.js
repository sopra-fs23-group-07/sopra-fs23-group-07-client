import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import { api, handleError } from "helpers/api.js";
import { Routes, Route, useParams, useHistory } from 'react-router-dom';
import React, {useEffect, useRef, useState} from "react";

/**
 *
 * Another way to export directly your functional component.
 */
export const LobbyInviteGuard = props => {

      if(localStorage.getItem("lobbyId")) {
                                  return props.children; }

      let { lobbyId } = useParams();
      console.log("this is lobby id: " + lobbyId);
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      console.log(userId);
      const history = useHistory();

      if(!localStorage.getItem("userId")) {return <Redirect to="/login"/>;}

      useEffect( () => {
              async function fetchData() {
                  try {

                      const response = await api.get(`/users/${userId}`);
                      if(token != response.data.token) { return <Redirect to="/login"/>;}

                      console.log("this is lobby id: " + lobbyId);
                      const requestBody = JSON.stringify({
                        userId: userId,
                      });
                      await api.put(`/lobbies/${lobbyId}/join`, requestBody);

                      localStorage.setItem("lobbyId", lobbyId);
                      //history.push("/Lobby/" + String(props.lobbyId));
                      history.push("/Lobby/" + String(lobbyId));

                  } catch (err) {
                      console.log(err);
                  }
              }
              fetchData();


          }, []);



        return <Redirect to="/register"/>;

};

LobbyInviteGuard.propTypes = {
  children: PropTypes.node,
  lobbyId: PropTypes.number
};

//export default LobbyInviteGuard;