import PropTypes from "prop-types";
import { NavbarLoggedOut } from "../NavbarLoggedOut.js";
import { NavbarLoggedIn } from "../NavbarLoggedIn.js";
import React, { useContext } from "react";
import { GlobalContext } from "../../helpers/GlobalState";
import Logo from "../../speetup-high-resolution-color-logo.png";
import { AppBar, Toolbar } from "@mui/material";
import { palette } from "@mui/system";

/**
 * This is an example of a Functional and stateless component (View) in React. Functional components are not classes and thus don't handle internal state changes.
 * Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.
 * They are reusable pieces, and think about each piece in isolation.
 * Functional components have to return always something. However, they don't need a "render()" method.
 * https://reactjs.org/docs/components-and-props.html
 * @FunctionalComponent
 */
const Header = (props) => {
  const { user } = useContext(GlobalContext);

  return (
    <AppBar position="static" >
      <Toolbar>
        <img width="180px" src={Logo} alt="SpeetUp Logo" style={{padding: "10px"}}/>
        {user ? <NavbarLoggedIn /> : <NavbarLoggedOut />}
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  height: PropTypes.string,
};

export default Header;
