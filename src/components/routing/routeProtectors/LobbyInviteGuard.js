import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import { api, handleError } from "helpers/api.js";
import { Routes, Route, useParams } from 'react-router-dom';
import React, {useEffect, useRef, useState} from "react";

/**
 *
 * Another way to export directly your functional component.
 */
export const LobbyInviteGuard = props => {

      let { lobbyId } = useParams();
      console.log("this is lobby id: " + lobbyId);
      const userId = localStorage.getItem("userId");
      console.log(userId);

      if(!localStorage.getItem("userId")) {return <Redirect to="/login"/>;}

      useEffect( () => {
              async function fetchData() {
                  try {
                      console.log("this is lobby id: " + lobbyId);
                      const requestBody = JSON.stringify({
                        userId: userId,
                      });
                      await api.put(`/lobbies/${lobbyId}/join`, requestBody);

                      localStorage.setItem("lobbyId", lobbyId);
                      //history.push("/Lobby/" + String(props.lobbyId));
                      return <Lobby />;

                  } catch (err) {
                      console.log(err);
                  }
              }
              fetchData();


          }, []);

        if(localStorage.getItem("lobbyId")) {
                            return props.children; }
        else {
        return <Redirect to="/register"/>;}

};

LobbyInviteGuard.propTypes = {
  children: PropTypes.node,
  lobbyId: PropTypes.number
};

//export default LobbyInviteGuard;