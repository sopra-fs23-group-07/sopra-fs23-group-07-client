import React, {useContext, useState} from "react";
import {useHistory} from "react-router-dom";
import {api, handleError} from "helpers/api";
import {Button} from "components/ui/Button";
import {GlobalContext} from "../helpers/GlobalState";
import ErrorMessage from "./ui/ErrorMessage";
import {Dialog, DialogActions, DialogContent, DialogTitle, Portal} from "@material-ui/core";


// Shows all the buttons on the top of the page
const NavbarLoggedIn = () => {
    const history = useHistory();
    const userId = localStorage.getItem("userId");
    const {setUser} = useContext(GlobalContext)
    const [error, setError] = useState(null);
    const lobbyId = localStorage.getItem("lobbyId");
    const [open, setOpen] = useState(false);
    const [pushTo, setPushTo] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleLeaveLobby = async () => {
        try {
            console.log("handleLeaveLobby was called");
            const requestBody = JSON.stringify({userId});
            await api.put("/lobbies/" + lobbyId + "/leave", requestBody);
            localStorage.removeItem("lobbyId");
            handleClose(); // Close the dialog
            history.push(pushTo);
        } catch (error) {
            setError(handleError(error));
            history.push(pushTo);

        }
    };


    const handleHomeClick = () => {
        if (localStorage.getItem("lobbyId")) {
            setPushTo("/Home");
            handleClickOpen();
        } else {
            history.push("/Home");
        }
    };


    const handleLobbiesClick = () => {
        if (localStorage.getItem("lobbyId")) {
            setPushTo("/Lobbies");
            handleClickOpen();
        } else {
            history.push("/Lobbies");
        }
    };

    const handleEventsClick = () => {
        if (localStorage.getItem("lobbyId")) {
            setPushTo("/Events");
            handleClickOpen();
        } else {
            history.push("/Events");
        }
    };

    // needs to be adjusted when implementing MyEvents screen probably with userid and Guard
    const handleMyEventsClick = () => {
        if (localStorage.getItem("lobbyId")) {
            setPushTo("/MyEvents");
            handleClickOpen();
        } else {
            history.push("/MyEvents");
        }
    };

    // needs to be adjusted when implementing Profile screen probably with userid and Guard
    const handleProfileClick = () => {
        if (localStorage.getItem("lobbyId")) {
            setPushTo("/Profile/" + userId);
            handleClickOpen();
        } else {
            history.push("/Profile/" + userId);
        }
    };

    // TODO: Log out works for tokens but not for updating header
    const handleLogoutClick = async () => {
        try {
            const response = await api.post(`/users/logout/${userId}`);

            // localStorage.removeItem("token");
            // localStorage.removeItem("userId");
            // localStorage.removeItem("lobbyId");
            localStorage.clear();
            setUser(null);

            history.push("/login");
            console.log(response);
        } catch (error) {
            alert(`Something went wrong during the logout: \n${handleError(error)}`);
        }
    };

    const LeaveLobbyConfirmation = ({open, handleClose, handleLeaveLobby}) => {
        return (
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Leave Lobby</DialogTitle>
                <DialogContent>
                    <p>You are about to leave the lobby. Are you sure?</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleLeaveLobby} color="primary">
                        Leave
                    </Button>
                </DialogActions>
            </Dialog>
        );
    };

    // displays all buttons you should see in the navbar when you are logged in
    return (

        <>
            {/* Render your other components here */}
            <LeaveLobbyConfirmation
                open={open}
                handleClose={handleClose}
                handleLeaveLobby={() => {
                    handleLeaveLobby().then(() => {
                        handleClose();
                    });
                }}
            />


            <div className="login button-container">

                <Button onClick={() => handleHomeClick()}>Home</Button>
                <Button onClick={() => handleLobbiesClick()}>Lobbies</Button>
                <Button onClick={() => handleEventsClick()}>Events</Button>
                <Button onClick={() => handleMyEventsClick()}>My Events</Button>
                <Button onClick={() => handleProfileClick()}>Profile</Button>
                <Button onClick={() => handleLogoutClick()}>Logout</Button>

            </div>
            <Portal>
                <div style={{position: 'fixed', top: 100, width: '75%', zIndex: 999}}>
                    {/* Render the Alert component here */}
                    <ErrorMessage error={error} onClose={() => setError(null)}/>
                </div>
            </Portal>
        </>

    );
};

export {NavbarLoggedIn};
