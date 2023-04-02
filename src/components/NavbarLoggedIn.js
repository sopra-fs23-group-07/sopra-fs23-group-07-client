import React from "react";
import { useHistory } from "react-router-dom";
import { api, handleError } from "helpers/api";
import { Button } from "components/ui/Button";

// Shows all the buttons on the top of the page
const NavbarLoggedIn = () => {
  const history = useHistory();
  const userId = localStorage.getItem("userId");

  const handleHomeClick = () => {
    history.push("/Home");
  };

  const handleLobbiesClick = () => {
    history.push("/Lobbies");
  };

  const handleEventsClick = () => {
    history.push("/Events");
  };

  // needs to be adjusted when implementing MyEvents screen probably with userid and Guard
  const handleMyEventsClick = () => {
    history.push("/MyEvents");
  };

  // needs to be adjusted when implementing Profile screen probably with userid and Guard
  const handleProfileClick = () => {
    history.push("/Profile");
  };

  // TODO: Log out works for tokens but not for updating header
  const handleLogoutClick = async () => {
    try {
      const response = await api.post(`/users/logout/${userId}`);

      localStorage.removeItem("token");
      localStorage.removeItem("userId");

      history.push("/Home");
      console.log(response);
    } catch (error) {
      alert(`Something went wrong during the logout: \n${handleError(error)}`);
    }
  };

  // displays all buttons you should see in the navbar when you are logged in
  return (
    <div className="login button-container">
      <Button onClick={() => handleHomeClick()}>Home</Button>
      <Button onClick={() => handleLobbiesClick()}>Lobbies</Button>
      <Button onClick={() => handleEventsClick()}>Events</Button>
      <Button onClick={() => handleMyEventsClick()}>My Events</Button>
      <Button onClick={() => handleProfileClick()}>Profile</Button>
      <Button onClick={() => handleLogoutClick()}>Logout</Button>
    </div>
  );
};

export { NavbarLoggedIn };
