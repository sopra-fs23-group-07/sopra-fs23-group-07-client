import PropTypes from "prop-types";
import { NavbarLoggedOut } from "../NavbarLoggedOut.js";
import { NavbarLoggedIn } from "../NavbarLoggedIn.js";
import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../helpers/GlobalState";
import Logo from "../../speetup-high-resolution-color-logo.png";
import { AppBar, Toolbar } from "@mui/material";
import { palette } from "@mui/system";

const Header = (props) => {
    const { user, setUser, getUser } = useContext(GlobalContext);

    useEffect(() => {
        function handleLocalStorageUpdate() {
            const userId = localStorage.getItem("userId");
            const token = localStorage.getItem("token");

            if (userId && token) {
                getUser(userId);
            } else {
                setUser(null);
            }
        }

        window.addEventListener("localstorage-update", handleLocalStorageUpdate);
        return () => {
            window.removeEventListener("localstorage-update", handleLocalStorageUpdate);
        };
    }, []);

    return (
        <AppBar position="static">
            <Toolbar>
                <img width="180px" src={Logo} alt="SpeetUp Logo" style={{ padding: "10px" }} />
                {user ? <NavbarLoggedIn /> : <NavbarLoggedOut />}
            </Toolbar>
        </AppBar>
    );
};

Header.propTypes = {
    height: PropTypes.string,
};

export default Header;
