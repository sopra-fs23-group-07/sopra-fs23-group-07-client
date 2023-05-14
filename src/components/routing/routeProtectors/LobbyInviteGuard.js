import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import { api, handleError } from "helpers/api.js";
import { Routes, Route, useParams, useHistory } from 'react-router-dom';
import React, {useEffect, useRef, useState} from "react";
import { toast } from "react-toastify";

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
                      console.log(token);
                      console.log(response.data.token);
                      if(token != response.data.token) {
                        console.log("LOl");
                        history.push("/Login");
                        }
                       else {

                      console.log("this is lobby id: " + lobbyId);
                      const requestBody = JSON.stringify({
                        userId: userId,
                        token: token,
                      });
                      await api.put(`/lobbies/${lobbyId}/join`, requestBody);

                      localStorage.setItem("lobbyId", lobbyId);
                      //history.push("/Lobby/" + String(props.lobbyId));
                      history.push("/Lobby/" + String(lobbyId));
                      }

                  } catch (error) {
                      toast.error(handleError(error));
                  }
              }
              fetchData();


          }, []);



        return <Redirect to="/Home"/>;

};

LobbyInviteGuard.propTypes = {
  children: PropTypes.node,
  lobbyId: PropTypes.number
};

//export default LobbyInviteGuard;