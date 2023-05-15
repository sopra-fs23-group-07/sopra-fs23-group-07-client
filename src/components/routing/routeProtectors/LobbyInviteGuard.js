import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import { api, handleError } from "helpers/api.js";
import { Routes, Route, useParams, useHistory } from 'react-router-dom';
import React, {useEffect, useRef, useState} from "react";
import { toast } from "react-toastify";
import Login from "components/views/Login";

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


      //if(!localStorage.getItem("userId")) {return <Redirect to="/login"/>;}
      if(!localStorage.getItem("userId")) {return <Login lobby="true" lobbyId={lobbyId} />;}

      useEffect( () => {
              async function fetchData() {
                  try {

                      const response = await api.get(`/users/${userId}`);
                      console.log(token);
                      console.log(response.data.token);
                      if(token != response.data.token) {
                        console.log("LOl");
                        //history.push("/Login");
                        return <Login lobby="true" lobbyId={lobbyId} />;
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
                      console.log(error.response);
                      if(error.response.status == 404 && error.response.data == "The userId provided was not found") {
                            localStorage.removeItem("token");
                            localStorage.removeItem("userId");
                            console.log(returnToLobby);
                            }

                  }
              }
              fetchData();


          }, []);


        return <Login lobby="true" lobbyId={lobbyId} />;
};

LobbyInviteGuard.propTypes = {
  children: PropTypes.node,
  lobbyId: PropTypes.number
};

//export default LobbyInviteGuard;