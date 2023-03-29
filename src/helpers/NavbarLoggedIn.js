import React from "react";
import { useHistory } from "react-router-dom";

import { Button } from "components/ui/Button";

const NavbarLoggedIn = () => {
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

  const handleMyEventsClick = () => {
    history.push("/MyEvents");
  };

  const handleProfileClick = () => {
    history.push("/Profile");
  };

  const handleLogoutClick = () => {
    history.push("/Logout");
  };

  const handleRegisterClick = () => {
    history.push("/Register");
  };

  const handleLoginClick = () => {
    history.push("/Login");
  };

  //   const handleLobbyIdClick = () => {
  //     history.push("/Lobby/{Id}");
  //   };

  //   const handleEventIdClick = () => {
  //     history.push("/Event{Id}");
  //   };

  return (
    <div className="login button-container">
      <Button onClick={() => handleHomeClick()}>Home</Button>
      <Button onClick={() => handleLobbiesClick()}>Lobbies</Button>
      <Button onClick={() => handleEventsClick()}>Events</Button>
      <Button onClick={() => handleMyEventsClick()}>My Events</Button>
      <Button onClick={() => handleProfileClick()}>Profile</Button>
      <Button onClick={() => handleLogoutClick()}>Logout</Button>

      {/* <Button onClick={() => handleRegisterClick()}>Register</Button>
      <Button onClick={() => handleLoginClick()}>Login</Button> */}
      {/* <Button onClick={() => handleLobbyIdClick()}>Lobby/{Id}</Button>
      <Button onClick={() => handleEventIdClick()}>Event{Id}</Button> */}
    </div>
  );
};

export { NavbarLoggedIn };
