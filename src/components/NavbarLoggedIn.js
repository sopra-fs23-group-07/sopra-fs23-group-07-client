import React, {useContext, useState} from "react";
import {useHistory} from "react-router-dom";
import {api, handleError} from "helpers/api";
import {Button} from "@mui/material";
import {GlobalContext} from "../helpers/GlobalState";
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import {toast} from "react-toastify";


// Shows all the buttons on the top of the page
const NavbarLoggedIn = () => {
    const history = useHistory();
    const userId = localStorage.getItem("userId");
    const {setUser} = useContext(GlobalContext)
    const lobbyId = localStorage.getItem("lobbyId");
    const [open, setOpen] = useState(false);
    const [pushTo, setPushTo] = useState("");
    const [isLogOut, setIsLogOut] = useState(false);
    const token = localStorage.getItem("token");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleLeaveLobby = async () => {
        try {
            console.log("handleLeaveLobby was called");
            const requestBody = JSON.stringify({
                userId: userId,
                token: token,
            });
            await api.put("/lobbies/" + lobbyId + "/leave", requestBody);
            localStorage.removeItem("lobbyId");
            handleClose(); // Close the dialog
            history.push(pushTo);
            if (isLogOut) {
                handleLogOut().catch(err => console.log(err));
            }
        } catch (error) {

            toast.error(handleError(error));
            localStorage.removeItem("lobbyId");
            if(error.response.status == 401) { localStorage.clear(); }
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

    const handleFAQClick = () => {
        if (localStorage.getItem("lobbyId")) {
            setPushTo("/FAQ");
            handleClickOpen();
        } else {
            history.push("/FAQ");
        }
    };

    const handleLogoutClick = async () => {
        if (localStorage.getItem("lobbyId")) {
            console.log("handleLogoutClick was called inside if");
            setPushTo("/login");
            setIsLogOut(true);
            handleClickOpen();
        } else {
            try {
                const response = await api.post(`/users/logout/${userId}`);
                localStorage.clear();
                setUser(null);
                history.push("/login");
                console.log(response);
            } catch (error) {
                toast.error(`Something went wrong during the logout: \n${handleError(error)}`);
                history.push("/login");
            }
        }
    };


    const handleLogOut = async () => {

        try {
            await api.post(`/users/logout/${userId}`);


            localStorage.clear();
            setUser(null);

            console.log("handleLogoutClick was called inside try");
        } catch (error) {
            toast.error(`Something went wrong during the logout: \n${handleError(error)}`);
            history.push("/login");
        }
    }

    const LeaveLobbyConfirmation = ({open, handleClose, handleLeaveLobby}) => {
        return (
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Leave Lobby</DialogTitle>
                <DialogContent>
                    <p>You are about to leave the lobby. Are you sure?</p>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleClose} >
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={handleLeaveLobby}>
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
                    }).catch(err => {console.log(err)});
                }}
            />


            <div>

                <Button onClick={() => handleHomeClick()}>Home</Button>
                <Button onClick={() => handleLobbiesClick()}>Lobbies</Button>
                <Button onClick={() => handleEventsClick()}>Events</Button>
                <Button onClick={() => handleMyEventsClick()}>My Events</Button>
                <Button onClick={() => handleProfileClick()}>Profile</Button>
                <Button onClick={() => handleFAQClick()}>FAQ</Button>
                <Button onClick={() => handleLogoutClick()}>Logout</Button>

            </div>
        </>

    );
};

export {NavbarLoggedIn};
