import PropTypes from "prop-types";
import "styles/views/Header.scss";
import { NavbarLoggedOut } from "../NavbarLoggedOut.js";
import { NavbarLoggedIn } from "../NavbarLoggedIn.js";
import Logo from "../../speetup-high-resolution-color-logo.png";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { api, handleError } from "helpers/api";
//TODO: organize imports after fixing isLoggedIn Issue below

/**
 * This is an example of a Functional and stateless component (View) in React. Functional components are not classes and thus don't handle internal state changes.
 * Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.
 * They are reusable pieces, and think about each piece in isolation.
 * Functional components have to return always something. However, they don't need a "render()" method.
 * https://reactjs.org/docs/components-and-props.html
 * @FunctionalComponent
 */
const Header = (props) => {
  // TODO: Update isLoggedIn whenever a token is removed or added. Now you need to reload page.
  // Tried with eventlistener and useeffect both didn't work for me.
  // Possible solution  globalvariable for loggedin or Libary React Context API
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [localStorage.getItem("token")]);

  return (
    <div className="header container" style={{ height: props.height }}>
      <h1 className="header title">SoPra FS23 Group 07</h1>
      <img width="180px" src={Logo} alt="SpeetUp Logo" />
      {isLoggedIn ? <NavbarLoggedIn /> : <NavbarLoggedOut />}
    </div>
  );
};

Header.propTypes = {
  height: PropTypes.string,
};

export default Header;
