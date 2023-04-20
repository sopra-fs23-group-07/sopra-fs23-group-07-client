import PropTypes from "prop-types";
import "styles/views/Header.scss";
import {NavbarLoggedOut} from "../NavbarLoggedOut.js";
import {NavbarLoggedIn} from "../NavbarLoggedIn.js";
import Logo from "../../speetup-high-resolution-color-logo.png";
import React, {useContext} from "react";
import {GlobalContext} from "../../helpers/GlobalState";
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
    const {user} = useContext(GlobalContext);

    return (
        <div className="header container" style={{height: props.height}}>
            <div
                style={{
                    //   fontSize: "24px",
                    //   color: "#333",
                    //   textAlign: "right",
                    //   padding: "20px",
                    //   backgroundColor: "#eee",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: "24px",
                    color: "#333",
                    padding: "20px",
                    marginLeft: "0px",
                    marginRight: "140px",
                }}
            >
                {user ? <NavbarLoggedIn/> : <NavbarLoggedOut/>}
                <img width="180px" src={Logo} alt="SpeetUp Logo"/>
            </div>
        </div>
    );
};

Header.propTypes = {
    height: PropTypes.string,
};

export default Header;
