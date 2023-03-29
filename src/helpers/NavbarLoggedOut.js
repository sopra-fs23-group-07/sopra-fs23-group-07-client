// version 1
/*
const handleClicks = () => {
  const keywords = [
    "Home",
    "Lobbies",
    "Events",
    "MyEvents",
    "Profile",
    "Register",
    "Login",
    "Lobby/{Id}",
    "Event{Id}",
  ];

  keywords.forEach((keyword) => {
    const handleKeywordClick = () => {
      history.push(`/${keyword}`);
    };
  });
};
*/

// version 2
import { Button } from "components/ui/Button";
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

  const handleMyEventsClick = () => {
    history.push("/MyEvents");
  };

  const handleProfileClick = () => {
    history.push("/Profile");
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
      {/* <button onClick={() => handleMyEventsClick()}>MyEvents</button>
      <button onClick={() => handleProfileClick()}>Profile</button> */}
      <Button onClick={() => handleRegisterClick()}>Register</Button>
      <Button onClick={() => handleLoginClick()}>Login</Button>
      {/* <button onClick={() => handleLobbyIdClick()}>Lobby/{Id}</button>
      <button onClick={() => handleEventIdClick()}>Event{Id}</button> */}
    </div>
  );
};

export { NavbarLoggedOut };
