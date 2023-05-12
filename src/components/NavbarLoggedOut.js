// Shows all the buttons on the top of the page
import { Button } from "@mui/material";
import React from "react";
import { useHistory } from "react-router-dom";

const NavbarLoggedOut = () => {
  const history = useHistory();

  const handleHomeClick = () => {
    history.push("/Home");
  };

  const handleLobbiesClick = () => {
    history.push("/Lobbies");
  };

  const handleEventsClick = () => {
    history.push("/Events");
  };

  const handleRegisterClick = () => {
    history.push("/Register");
  };

  const handleLoginClick = () => {
    history.push("/Login");
  };

  const handleFAQClick = () => {
      history.push("/FAQ");
  }

  // displays all buttons you should see in the navbar when you are logged out
  return (
    <div >
      <Button onClick={() => handleHomeClick()}>Home</Button>
      <Button onClick={() => handleLobbiesClick()}>Lobbies</Button>
      <Button onClick={() => handleEventsClick()}>Events</Button>
      <Button onClick={() => handleFAQClick()}>FAQ</Button>
      <Button onClick={() => handleRegisterClick()}>Register</Button>
      <Button onClick={() => handleLoginClick()}>Login</Button>

    </div>
  );
};

export { NavbarLoggedOut };
